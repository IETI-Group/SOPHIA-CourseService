FROM node:lts-alpine AS base
RUN npm install -g pnpm@10.22.0

FROM base AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpm prisma:generate
RUN pnpm build

FROM base AS production
WORKDIR /app

# Copiar archivos de configuración
COPY package.json pnpm-lock.yaml ./

# Copiar schema de Prisma ANTES de generar
COPY src/schemas/prisma ./src/schemas/prisma

# Instalar dependencias de producción
RUN pnpm install --prod --frozen-lockfile && pnpm add -D prisma && pnpm prisma:generate

# Copiar aplicación compilada
COPY --from=build /app/dist ./dist

# Instalar wget para health check
RUN apk add --no-cache wget

ENV NODE_ENV=production
ENV PORT=80

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/api/v1/health || exit 1

CMD ["pnpm", "start"]
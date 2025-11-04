import { z } from 'zod';

export const DEFAULT_STRING_MIN_LENGTH = 1;
export const DEFAULT_STRING_MAX_LENGTH = 300;
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_MAX_PAGE_SIZE = 100;
export const DEFAULT_MIN_PAGE = 1;

export const stringSchema = (options?: {
  min?: number;
  max?: number;
  optional?: boolean;
  nullable?: boolean;
  trim?: boolean;
  regex?: RegExp;
}) => {
  const {
    min = DEFAULT_STRING_MIN_LENGTH,
    max = DEFAULT_STRING_MAX_LENGTH,
    optional = false,
    nullable = false,
    trim = false,
    regex,
  } = options ?? {};

  let schema = z.string().min(min).max(max);

  if (regex) {
    schema = schema.regex(regex);
  }

  if (trim) {
    const trimmedSchema = z.preprocess((v) => (typeof v === 'string' ? v.trim() : v), schema);
    if (nullable) return trimmedSchema.nullable();
    if (optional) return trimmedSchema.optional();
    return trimmedSchema;
  }

  if (nullable) return schema.nullable();
  if (optional) return schema.optional();
  return schema;
};

export const numberSchema = (options?: {
  min?: number;
  max?: number;
  optional?: boolean;
  nullable?: boolean;
  int?: boolean;
  coerce?: boolean;
  defaultValue?: number;
}) => {
  const {
    min,
    max,
    optional = false,
    nullable = false,
    int = false,
    coerce = false,
    defaultValue,
  } = options ?? {};

  let schema = coerce ? z.coerce.number() : z.number();

  if (typeof min === 'number' && Number.isFinite(min)) {
    schema = schema.min(min);
  }

  if (typeof max === 'number' && Number.isFinite(max)) {
    schema = schema.max(max);
  }

  if (int) {
    schema = schema.int();
  }

  if (defaultValue !== undefined) {
    return schema.default(defaultValue);
  }

  if (nullable) return schema.nullable();
  if (optional) return schema.optional();
  return schema;
};

export const booleanSchema = (options?: { optional?: boolean; coerce?: boolean }) => {
  const { optional = false, coerce = false } = options ?? {};

  const schema = coerce ? z.coerce.boolean() : z.boolean();

  return optional ? schema.optional() : schema;
};

export const dateSchema = (options?: {
  optional?: boolean;
  nullable?: boolean;
  coerce?: boolean;
}) => {
  const { optional = false, nullable = false, coerce = false } = options ?? {};

  const schema = coerce ? z.coerce.date() : z.date();

  if (nullable) return schema.nullable();
  if (optional) return schema.optional();
  return schema;
};

export const enumSchema = <T extends [string, ...string[]]>(
  values: T,
  options?: { optional?: boolean }
) => {
  const { optional = false } = options ?? {};

  const schema = z.enum(values);

  return optional ? schema.optional() : schema;
};

export const requestSchema = <T extends Record<string, string | number>>(sortEnum: T) => {
  return z.object({
    page: z.coerce.number().min(DEFAULT_MIN_PAGE).default(DEFAULT_PAGE),
    size: z.coerce
      .number()
      .min(DEFAULT_MIN_PAGE)
      .max(DEFAULT_MAX_PAGE_SIZE)
      .default(DEFAULT_PAGE_SIZE),
    sortDirection: z.enum(['asc', 'desc']).default('asc'),
    sortFields: z.array(z.enum(sortEnum)).default([]),
  });
};

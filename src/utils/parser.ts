import { z } from 'zod';

export const stringSchema = (options?: {
  min?: number;
  max?: number;
  optional?: boolean;
  trim?: boolean;
  regex?: RegExp;
}) => {
  const { min = 1, max = 300, optional = false, trim = false, regex } = options ?? {};

  let schema = z.string().min(min).max(max);

  if (regex) {
    schema = schema.regex(regex);
  }

  if (trim) {
    return optional
      ? z.preprocess((v) => (typeof v === 'string' ? v.trim() : v), schema).optional()
      : z.preprocess((v) => (typeof v === 'string' ? v.trim() : v), schema);
  }

  return optional ? schema.optional() : schema;
};

export const numberSchema = (options?: {
  min?: number;
  max?: number;
  optional?: boolean;
  int?: boolean;
  coerce?: boolean;
}) => {
  const { min, max, optional = false, int = false, coerce = false } = options ?? {};

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

  return optional ? schema.optional() : schema;
};

export const booleanSchema = (options?: { optional?: boolean; coerce?: boolean }) => {
  const { optional = false, coerce = false } = options ?? {};

  const schema = coerce ? z.coerce.boolean() : z.boolean();

  return optional ? schema.optional() : schema;
};

export const dateSchema = (options?: { optional?: boolean; coerce?: boolean }) => {
  const { optional = false, coerce = false } = options ?? {};

  const schema = coerce ? z.coerce.date() : z.date();

  return optional ? schema.optional() : schema;
};

export const enumSchema = <T extends [string, ...string[]]>(
  values: T,
  options?: { optional?: boolean }
) => {
  const { optional = false } = options ?? {};

  const schema = z.enum(values);

  return optional ? schema.optional() : schema;
};

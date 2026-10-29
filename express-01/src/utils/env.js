import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string({ error: 'DATABASE_URL é obrigatória' }).url('DATABASE_URL deve ser uma URL válida'),
  PORT: z.coerce.number().default(4001),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  ALLOWED_ORIGINS: z.string({ error: 'ALLOWED_ORIGINS é obrigatória' }).min(1, 'ALLOWED_ORIGINS não pode ser vazia'),
  JWT_SECRET: z
    .preprocess((val) => val ?? process.env.MY_SECRET, z.string({ error: 'JWT_SECRET é obrigatória' }).min(10, 'JWT_SECRET deve ter no mínimo 10 caracteres')),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('❌ Variáveis de ambiente inválidas ou ausentes:');
  console.error(result.error.format());
  process.exit(1);
}

export const env = result.data;


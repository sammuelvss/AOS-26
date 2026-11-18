import 'dotenv/config';
import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z
    .string({ error: 'DATABASE_URL é obrigatória' })
    .min(1, 'DATABASE_URL é obrigatória')
    .url('DATABASE_URL deve ser uma URL válida'),
  PORT: z.coerce.number().int().positive().default(4001),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  ALLOWED_ORIGINS: z
    .string()
    .min(1, 'ALLOWED_ORIGINS não pode ser vazia')
    .default('http://localhost:3000,http://localhost:4001'),
  JWT_SECRET: z.string().min(1).optional(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('❌ Variáveis de ambiente inválidas ou ausentes:');
  console.error(result.error.format());
  process.exit(1);
}

export const env = result.data;
export default env;

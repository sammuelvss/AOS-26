import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    username: z
      .string({ required_error: 'Campo obrigatório', error: 'Campo obrigatório' })
      .min(1, 'Campo obrigatório'),
    email: z
      .string({ required_error: 'Campo obrigatório', error: 'Campo obrigatório' })
      .email('Formato de e-mail inválido'),
  }),
});

export const userIdParamSchema = z.object({
  params: z.object({
    userId: z
      .string({ required_error: 'Campo obrigatório', error: 'Campo obrigatório' })
      .uuid('Formato de UUID inválido'),
  }),
});

export const createMessageSchema = z.object({
  body: z.object({
    text: z
      .string({ required_error: 'Campo obrigatório', error: 'Campo obrigatório' })
      .min(1, 'Campo obrigatório')
      .max(1000, 'O texto deve ter no máximo 1000 caracteres'),
  }),
});

export const messageIdParamSchema = z.object({
  params: z.object({
    messageId: z
      .string({ required_error: 'Campo obrigatório', error: 'Campo obrigatório' })
      .uuid('Formato de UUID inválido'),
  }),
});


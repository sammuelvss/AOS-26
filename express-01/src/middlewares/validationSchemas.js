import { z } from 'zod';

export const createTarefaSchema = z.object({
  body: z.object({
    descricao: z
      .string({ error: 'A descrição é obrigatória' })
      .trim()
      .min(1, 'A descrição é obrigatória'),
    concluida: z
      .boolean({ error: 'O campo concluida deve ser um booleano' })
      .optional()
      .default(false),
  }),
});

export const updateTarefaSchema = z.object({
  params: z.object({
    objectId: z
      .string({ error: 'O objectId é obrigatório' })
      .uuid('Formato de UUID inválido'),
  }),
  body: z
    .object({
      descricao: z
        .string({ error: 'A descrição deve ser uma string' })
        .trim()
        .min(1, 'A descrição não pode ser vazia')
        .optional(),
      concluida: z
        .boolean({ error: 'O campo concluida deve ser um booleano' })
        .optional(),
    })
    .refine(
      (data) => data.descricao !== undefined || data.concluida !== undefined,
      {
        message: 'Pelo menos um dos campos (descricao ou concluida) deve ser informado',
      }
    ),
});

export const tarefaIdParamSchema = z.object({
  params: z.object({
    objectId: z
      .string({ error: 'O objectId é obrigatório' })
      .uuid('Formato de UUID inválido'),
  }),
});

export const createUserSchema = z.object({
  body: z.object({
    username: z
      .string({ error: 'O username é obrigatório' })
      .trim()
      .min(1, 'O username é obrigatório'),
    email: z
      .string({ error: 'E-mail inválido' })
      .trim()
      .email('Formato de e-mail inválido')
      .optional(),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    userId: z.coerce
      .number({ error: 'ID do usuário inválido' })
      .int('ID do usuário inválido')
      .positive('ID do usuário inválido'),
  }),
  body: z
    .object({
      username: z
        .string({ error: 'O username deve ser uma string' })
        .trim()
        .min(1, 'O username não pode ser vazio')
        .optional(),
      email: z
        .string({ error: 'E-mail inválido' })
        .trim()
        .email('Formato de e-mail inválido')
        .optional(),
    })
    .refine(
      (data) => data.username !== undefined || data.email !== undefined,
      {
        message: 'Pelo menos um campo (username ou email) deve ser informado',
      }
    ),
});

export const userIdParamSchema = z.object({
  params: z.object({
    userId: z.coerce
      .number({ error: 'ID do usuário inválido' })
      .int('ID do usuário inválido')
      .positive('ID do usuário inválido'),
  }),
});

export const createMessageSchema = z.object({
  body: z.object({
    text: z
      .string({ error: 'O texto da mensagem é obrigatório' })
      .trim()
      .min(1, 'O texto da mensagem é obrigatório')
      .max(1000, 'O texto deve ter no máximo 1000 caracteres'),
    userId: z.coerce
      .number({ error: 'userId inválido' })
      .int('userId inválido')
      .positive('userId inválido')
      .optional(),
  }),
});

export const updateMessageSchema = z.object({
  params: z.object({
    messageId: z.coerce
      .number({ error: 'ID da mensagem inválido' })
      .int('ID da mensagem inválido')
      .positive('ID da mensagem inválido'),
  }),
  body: z.object({
    text: z
      .string({ error: 'O texto da mensagem é obrigatório' })
      .trim()
      .min(1, 'O texto da mensagem é obrigatório')
      .max(1000, 'O texto deve ter no máximo 1000 caracteres'),
  }),
});

export const messageIdParamSchema = z.object({
  params: z.object({
    messageId: z.coerce
      .number({ error: 'ID da mensagem inválido' })
      .int('ID da mensagem inválido')
      .positive('ID da mensagem inválido'),
  }),
});

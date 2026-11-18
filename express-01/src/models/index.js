import { Sequelize } from 'sequelize';
import pg from 'pg';
import { env } from '../utils/index.js';
import getTarefaModel from './tarefa.js';
import getUserModel from './user.js';
import getMessageModel from './message.js';

const isLocalDb =
  env.DATABASE_URL.includes('localhost') || env.DATABASE_URL.includes('127.0.0.1');

const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  logging: false,
  ...(!isLocalDb && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }),
});

const Tarefa = getTarefaModel(sequelize, Sequelize);
const User = getUserModel(sequelize, Sequelize);
const Message = getMessageModel(sequelize, Sequelize);

const models = {
  Tarefa,
  User,
  Message,
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize, Tarefa, User, Message };
export default models;

const getTarefaModel = (sequelize, { DataTypes }) => {
  const Tarefa = sequelize.define(
    'tarefa',
    {
      objectId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'A descrição da tarefa não pode ser vazia.',
          },
        },
      },
      concluida: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: 'tarefas',
      timestamps: true,
    }
  );

  return Tarefa;
};

export default getTarefaModel;
export { getTarefaModel };

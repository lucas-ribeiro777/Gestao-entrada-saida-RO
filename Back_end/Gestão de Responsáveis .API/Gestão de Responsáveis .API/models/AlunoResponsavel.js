module.exports = (sequelize, DataTypes) => {
  return sequelize.define('AlunoResponsavel', {
    id_aluno: DataTypes.INTEGER,
    id_responsavel: DataTypes.INTEGER,
  });
};

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Responsavel', {
    nome_responsavel: DataTypes.STRING,
    email: DataTypes.STRING,
    fone: DataTypes.STRING,
    data_nasc: DataTypes.DATEONLY,
  });
};

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('gestao_escolar', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

const Responsavel = require('./Responsavel')(sequelize, DataTypes);
const AlunoResponsavel = require('./AlunoResponsavel')(sequelize, DataTypes);

Responsavel.belongsToMany(AlunoResponsavel, { through: 'AlunoResponsavel' });

sequelize.sync();

module.exports = {
  sequelize,
  Responsavel,
  AlunoResponsavel
};

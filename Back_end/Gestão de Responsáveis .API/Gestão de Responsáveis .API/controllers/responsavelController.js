const { Responsavel, AlunoResponsavel } = require('../models');

exports.criarResponsavel = async (req, res) => {
  try {
    const novo = await Responsavel.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.listarResponsaveis = async (req, res) => {
  const todos = await Responsavel.findAll();
  res.json(todos);
};

exports.relateResponsavelAluno = async (req, res) => {
  const { id_aluno, id_responsavel } = req.body;
  try {
    const relacao = await AlunoResponsavel.create({ id_aluno, id_responsavel });
    res.status(201).json(relacao);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

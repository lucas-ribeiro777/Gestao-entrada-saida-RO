const express = require('express');
const router = express.Router();
const controller = require('../controllers/responsavelController');

router.post('/', controller.criarResponsavel);
router.get('/', controller.listarResponsaveis);
router.put('/relacionar', controller.relateResponsavelAluno);

module.exports = router;

import './FormCadastro.css';
import React, { useState } from 'react';



function FormCadastro({ tipo, campos, fotoSelecionada }) {
  const [formData, setFormData] = useState({});
  const [usoDados, setUsoDados] = useState(false);
  const [lgpd, setLgpd] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Envia o cadastro do aluno
      const responseAluno = await fetch('http://localhost:3001/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          foto: fotoSelecionada ? fotoSelecionada.name : null,
        }),
      });

      if (!responseAluno.ok) {
        throw new Error('Erro ao enviar os dados do aluno');
      }

      const alunoCriado = await responseAluno.json();

      // Supondo que a resposta contenha o id do aluno criado
      const idAluno = alunoCriado.id;

      // 2. Envia os dados de autorização para a outra tabela
      const responseAutorizacao = await fetch('http://localhost:3001/autorizacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_aluno: idAluno,
          uso_dados: usoDados ? 1 : 0,
          lgpd: lgpd ? 1 : 0,
        }),
      });

      if (!responseAutorizacao.ok) {
        throw new Error('Erro ao enviar os dados de autorização');
      }

      const autorizacaoCriada = await responseAutorizacao.json();

      alert('Cadastro e autorizações enviados com sucesso!');
    } catch (erro) {
      console.error('Erro ao cadastrar:', erro.message);
      alert('Erro ao cadastrar. Tente novamente.');
    }
  };


  return (
    <form onSubmit={handleSubmit} className="formulario">
      <h2 className="titulo">Preencha os dados para se cadastrar</h2>
      <div className="grid-form">
        {campos.map((campo, index) => (
          <div
            key={campo.name}
            className={`campo ${index < 2 ? 'full-width' : ''}`}
          >
            <label htmlFor={campo.name}>{campo.label}</label>
            <input
              id={campo.name}
              type={campo.type || 'text'}
              name={campo.name}
              placeholder={campo.placeholder || ''}
              value={formData[campo.name] || ''}
              onChange={handleChange}
              required={campo.required}
            />
          </div>
        ))}
      </div>

      {tipo === 'aluno' && (
        <div className="termos">
          <div className="termo1">
            <input
              type="checkbox"
              checked={lgpd}
              onChange={(e) => setLgpd(e.target.checked)}
            />
            <p>
              Você entende que está assegurado(a) pelas normas da{' '}
              <a
                href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                LGPD
              </a>
            </p>
          </div>
          <div className="termo1">
            <input
              type="checkbox"
              checked={usoDados}
              onChange={(e) => setUsoDados(e.target.checked)}
            />
            <p>
              Você concorda com nossos <a href="#">termos de uso</a>
            </p>
          </div>
        </div>
      )}

      <p className="login-link">
        Já possui uma conta? <a href="/login">Faça login</a>.
      </p>

      <button type="submit" className="botao-concluir-cadastro">
        Concluir Cadastro
      </button>
    </form>
  );
}

export default FormCadastro;


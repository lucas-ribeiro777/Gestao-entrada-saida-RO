import './FormCadastro.css';
import React, { useState } from 'react';

function FormCadastro({ tipo, campos }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('COLOCAR O CAMINHO DA API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados');
      }

      const resultado = await response.json();
      console.log('Cadastro enviado com sucesso:', resultado);
      alert('Cadastro concluído com sucesso!');
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
            <input type="radio" />
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
            <input type="radio" />
            <p>
              Você concorda com nossos <a href="#">termos de uso</a>
            </p>
          </div>
        </div>
      )}

      <p className="login-link">
        Já possui uma conta? <a href="/login">Faça login</a>.
      </p>

      <button type="submit" className="botao">
        Concluir Cadastro
      </button>
    </form>
  );
}

export default FormCadastro;

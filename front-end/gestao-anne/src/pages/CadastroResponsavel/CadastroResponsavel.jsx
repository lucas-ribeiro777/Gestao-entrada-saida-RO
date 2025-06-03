import React from 'react';
import './CadastroResponsavel.css'; // estilos específicos do formulário

// ajuste os caminhos conforme a estrutura do seu projeto
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import Rodape from '../../components/Rodape/Rodape';

const CadastroResponsavel = () => {
  return (
    <>
      {/* Cabeçalho */}
      <Cabecalho />

      {/* Conteúdo do formulário */}
      <div className="form-wrapper">
        <h3 className="form-title">Preencha os dados para se cadastrar</h3>

        <div className="form-container">
          <div className="form-row">
            {/* Nome completo */}
            <input
              type="text"
              placeholder="Digite algo..."
              className="input-full"
            />
          </div>

          <div className="form-row">
            {/* E-mail */}
            <input
              type="email"
              placeholder="Digite algo..."
              className="input-full"
            />
          </div>

          <div className="form-row">
            {/* Nome do dependente */}
            <input
              type="text"
              placeholder="Digite algo..."
              className="input-half"
            />
            {/* Telefone */}
            <input
              type="tel"
              placeholder="+55 ( )"
              className="input-half"
            />
          </div>

          <div className="form-row">
            {/* Senha */}
            <input
              type="password"
              placeholder="Digite sua senha..."
              className="input-half"
            />
            {/* Confirmar senha */}
            <input
              type="password"
              placeholder="Digite sua senha..."
              className="input-half"
            />
          </div>

          <div className="form-login">
            <span>
              Já possui uma conta? <a href="#">Faça login.</a>
            </span>
          </div>

          <button className="btn-submit">CONCLUIR CADASTRO</button>
        </div>
      </div>

      {/* Rodapé */}
      <Rodape />
    </>
  );
};

export default CadastroResponsavel;

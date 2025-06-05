import React from 'react';
import './CadastroResponsavel.css';

import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import Rodape from '../../components/Rodape/Rodape';

const CadastroResponsavel = () => {
  return (
    <>
      <MenuCadastro />

      <div className="form-wrapper">
        <h3 className="form-title">Preencha os dados para se cadastrar</h3>

        <div className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nome">Nome Completo</label>
              <input type="text" id="nome" placeholder="Digite algo..." className="input-full" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" placeholder="Digite algo..." className="input-full" />
            </div>
          </div>

          <div className="form-row form-row-spacing">
            <div className="form-group">
              <label htmlFor="dependente">Nome do Dependente</label>
              <input type="text" id="dependente" placeholder="Digite algo..." className="input-half" />
            </div>
            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input type="tel" id="telefone" placeholder="+55 ( )" className="input-half" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" placeholder="Digite sua senha..." className="input-half" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmar-senha">Confirmar Senha</label>
              <input type="password" id="confirmar-senha" placeholder="Digite sua senha..." className="input-half" />
            </div>
          </div>

          <div className="form-login">
            <span>
              Já possui uma conta? <a href="/login">Faça login.</a>
            </span>
          </div>
        </div>

        {/* Botão fora do container azul */}
        <div className="submit-wrapper">
          <button className="btn-submit-outside">CONCLUIR CADASTRO</button>
        </div>
      </div>

      <Rodape />
    </>
  );
};

export default CadastroResponsavel;

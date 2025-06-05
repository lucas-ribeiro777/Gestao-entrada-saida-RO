import React from 'react';
import './CadastroCoordenador.css';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import Rodape from '../../components/Rodape/Rodape';

const CadastroCoordenador = () => {
  return (
    <>
      <MenuCadastro />

      <div className="form-wrapper-coordenador">
        <h3 className="form-title-coordenador">Preencha os dados para se cadastrar</h3>

        <div className="form-container-coordenador">
          <div className="form-row-coordenador">
            <div className="form-group-coordenador">
              <label htmlFor="nome">Nome Completo</label>
              <input type="text" id="nome" placeholder="Digite algo..." className="input-full-coordenador" />
            </div>
          </div>

          <div className="form-row-coordenador">
            <div className="form-group-coordenador">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" placeholder="Digite algo..." className="input-full-coordenador" />
            </div>
          </div>

          <div className="form-row-coordenador">
            <div className="form-group-coordenador">
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" placeholder="Digite sua senha..." className="input-half-coordenador" />
            </div>
            <div className="form-group-coordenador">
              <label htmlFor="confirmar-senha">Confirmar Senha</label>
              <input type="password" id="confirmar-senha" placeholder="Digite sua senha..." className="input-half-coordenador" />
            </div>
          </div>

          <div className="form-row-spacing-coordenador">
            <div className="form-group-coordenador">
              <label htmlFor="telefone">Telefone</label>
              <input type="tel" id="telefone" placeholder="+55 ( )" className="input-half-coordenador" />
            </div>
          </div>

          <div className="form-login-coordenador">
            <span>
              Já possui uma conta? <a href="/login">Faça login.</a>
            </span>
          </div>
        </div>

        <div className="submit-wrapper-coordenador">
          <button className="btn-submit-outside-coordenador">CONCLUIR CADASTRO</button>
        </div>
      </div>

      <Rodape />
    </>
  );
};

export default CadastroCoordenador;

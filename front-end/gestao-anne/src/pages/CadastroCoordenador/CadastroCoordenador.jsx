import React from 'react';
import './CadastroCoordenador.css'; 

import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import Rodape from '../../components/Rodape/Rodape';

const CadastroCoordenador = () => {
  return (
    <>
      <MenuCadastro />

      <div className="form-wrapper">
        <h3 className="form-title">Preencha os dados para se cadastrar</h3>

        <div className="form-container">
          <div className="form-row">
            <input
              type="text"
              placeholder="Digite algo..."
              className="input-full"
            />
          </div>

          <div className="form-row">
            <input
              type="email"
              placeholder="Digite algo..."
              className="input-full"
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              placeholder="Digite algo..."
              className="input-half"
            />
            <input
              type="tel"
              placeholder="+55 ( )"
              className="input-half"
            />
          </div>

          <div className="form-row">
            <input
              type="password"
              placeholder="Digite sua senha..."
              className="input-half"
            />
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
      
      <Rodape />
    </>
  );
};

export default CadastroCoordenador;

import React from 'react';
import './CadastroCoordenador.css';

import FormCadastro from '../../components/FormCadastro/FormCadastro';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import Rodape from '../../components/Rodape/Rodape';

function CadastroCoordenador() {
  const camposCoordenador = [
    { name: 'nome', label: 'Nome Completo', required: true, placeholder: 'Digite algo...' },
    { name: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'Digite algo...' },
    { name: 'senha', label: 'Senha', type: 'password', required: true, placeholder: 'Digite sua senha' },
    { name: 'confirmarSenha', label: 'Confirmar Senha', type: 'password', required: true, placeholder: 'Digite sua senha' },
    { name: 'telefone', label: 'Telefone', type: 'tel', placeholder: '+55 ()' },
  ];

  return (
    <>
      <MenuCadastro />

      <div className="form-wrapper-coordenador">
        <h3 className="form-title">Preencha os dados para se cadastrar</h3>

        <div className="form-container-coordenador">
          <div className="form-row-coordenador">
            <input
              type="text"
              placeholder="Digite algo..."
              className="input-full-coordenador"
            />
          </div>

          <div className="form-row-coordenador">
            <input
              type="email"
              placeholder="Digite algo..."
              className="input-full-coordenador"
            />
          </div>

          <div className="form-row-coordenador">
            <input
              type="text"
              placeholder="Digite algo..."
              className="input-half-coordenador"
            />
            <input
              type="tel"
              placeholder="+55 ( )"
              className="input-half-coordenador"
            />
          </div>

          <div className="form-row-coordenador">
            <input
              type="password"
              placeholder="Digite sua senha..."
              className="input-half-coordenador"
            />
            <input
              type="password"
              placeholder="Digite sua senha..."
              className="input-half-coordenador"
            />
          </div>

          <div className="login-coordenador">
            <span>
              Já possui uma conta? <a href="#">Faça login.</a>
            </span>
          </div>

          <button className="btn-submit-coordenador">CONCLUIR CADASTRO</button>
        </div>

        <div className="centro-coordenador">
          <FormCadastro
            tipo="coordenador"
            campos={camposCoordenador}
            onSubmit={(data) => console.log(data)}
          />
        </div>
      </div>

      <Rodape />
    </>
  );
}

export default CadastroCoordenador;


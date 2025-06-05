import React from 'react';
import './CadastroCoordenador.css';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import FormCadastro from '../../components/FormCadastro/FormCadastro';
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



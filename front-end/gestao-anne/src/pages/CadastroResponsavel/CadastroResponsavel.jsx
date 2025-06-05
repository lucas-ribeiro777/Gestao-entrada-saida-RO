import React from 'react';
import './CadastroResponsavel.css';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import FormCadastro from '../../components/FormCadastro/FormCadastro';
import Rodape from '../../components/Rodape/Rodape';

function CadastroResponsavel() {
  const camposResponsavel = [
    { name: 'nome', label: 'Nome Completo', required: true, placeholder: 'Digite algo...' },
    { name: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'Digite algo...' },
    { name: 'nomeDependente', label: 'Nome do Dependente', required: true, placeholder: 'Digite algo...' },
    { name: 'telefone', label: 'Telefone', type: 'tel', placeholder: '+55 ()' },
    { name: 'senha', label: 'Senha', type: 'password', required: true, placeholder: 'Digite sua senha...' },
    { name: 'confirmarSenha', label: 'Confirmar Senha', type: 'password', required: true, placeholder: 'Digite sua senha...' },
  ];

  return (
    <>
      <MenuCadastro />

      <div className="form-wrapper-responsavel">
        <div className="centro-responsavel">
          <FormCadastro
            tipo="responsavel"
            campos={camposResponsavel}
            onSubmit={(data) => console.log(data)}
          />
        </div>
      </div>

      <Rodape />
    </>
  );
}

export default CadastroResponsavel;
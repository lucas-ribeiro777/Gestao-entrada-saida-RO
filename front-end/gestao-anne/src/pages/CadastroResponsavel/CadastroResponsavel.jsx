import React from 'react';
import './CadastroResponsavel.css';
import { Link } from 'react-router-dom'; // Adicionado para navegação
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import Rodape from '../../components/Rodape/Rodape';
import FormCadastroResponsavel from '../../components/FormCadastroResponsavel/FormCadastroResponsavel';



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
          <FormCadastroResponsavel tipo="responsavel" campos={camposResponsavel} />
        </div>
      </div>

      <Rodape />
    </>
  );
}

export default CadastroResponsavel;

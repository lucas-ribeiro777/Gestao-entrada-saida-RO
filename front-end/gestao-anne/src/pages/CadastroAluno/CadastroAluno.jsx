import React, { useState } from 'react';
import FormCadastro from '../../components/FormCadastro/FormCadastro';
import Foto from '../../components/Foto/Foto';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import Rodape from '../../components/Rodape/Rodape';
import './CadastroAluno.css';

function CadastroAluno() {
  const [fotoSelecionada, setFotoSelecionada] = useState(null);

  const camposAluno = [
    { name: 'nome', label: 'Nome Completo', required: true, placeholder: 'Digite algo...' },
    { name: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'Digite algo...' },
    { name: 'data_nasc', label: 'Data de Nascimento', type: 'text', placeholder: '__/__/__' },
    { name: 'telefone', label: 'Telefone', type: 'tel', placeholder: '+55 ( )' },
    { name: 'senha', label: 'Senha', type: 'password', required: true, placeholder: 'Digite sua senha' },
    { name: 'confirmarSenha', label: 'Confirmar Senha', type: 'password', required: true, placeholder: 'Repita a senha' },
  ];

  return (
    <>
      <MenuCadastro />
      <div className='centro'>
        <Foto onFotoSelecionada={setFotoSelecionada} />
        <FormCadastro 
          tipo="aluno" 
          campos={camposAluno} 
          fotoSelecionada={fotoSelecionada} 
        />
      </div>
      <Rodape />
    </>
  );
}

export default CadastroAluno;

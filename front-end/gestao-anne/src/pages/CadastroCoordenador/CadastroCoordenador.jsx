import React from 'react';
import './CadastroCoordenador.css';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import Rodape from '../../components/Rodape/Rodape';
import FormCadastroCoordenador from '../../components/FormCadastroCoordenador/FormCadastroCoordenador';

function CadastroCoordenador() {
  const camposCoordenador = [
    { name: 'nome', label: 'Nome Completo', required: true, placeholder: 'Digite algo...' },
    { name: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'Digite algo...' },
    { name: 'senha', label: 'Senha', type: 'password', required: true, placeholder: 'Digite sua senha' },
    { name: 'confirmarSenha', label: 'Confirmar Senha', type: 'password', required: true, placeholder: 'Repita a senha' },
    { name: 'telefone', label: 'Telefone', type: 'tel', placeholder: '+55 ( )' },
  ];


  return (
    <>
      <MenuCadastro />
      <div className='centro-coordenador'>
        <FormCadastroCoordenador tipo="coordenador" campos={camposCoordenador}/>
      </div>
      <Rodape />
    </>
  );
}


export default CadastroCoordenador;
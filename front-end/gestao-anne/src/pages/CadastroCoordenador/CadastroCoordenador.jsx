import React from 'react';
import './CadastroCoordenador.css';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import Rodape from '../../components/Rodape/Rodape';
import FormCadastro from '../../components/FormCadastro/FormCadastro';

function CadastroCoordenador() {
  const camposCoordenador = [
    { name: 'nome', label: 'Nome Completo', required: true, placeholder: 'Digite algo...' },
    { name: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'Digite algo...' },
    { name: 'senha', label: 'Senha', type: 'password', required: true, placeholder: 'Digite sua senha' },
    { name: 'confirmarSenha', label: 'Confirmar Senha', type: 'password', required: true, placeholder: 'Repita a senha' },
    { name: 'telefone', label: 'Telefone', type: 'tel', placeholder: '+55 ( )' },
  ];

  const handleSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/Coordenador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
      } else {
        alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <>
      <MenuCadastro />
      <div className='centro'>
        <FormCadastro tipo="docente" campos={camposDocente} onSubmit={handleSubmit} />
      </div>
      <Rodape />
    </>
  );
}


export default CadastroCoordenador;
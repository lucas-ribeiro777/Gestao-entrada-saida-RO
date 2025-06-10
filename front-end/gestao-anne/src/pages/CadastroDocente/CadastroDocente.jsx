import React from 'react';
import './CadastroDocente.css';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import Rodape from '../../components/Rodape/Rodape';
import FormCadastroDocente from '../../components/FormCadastroDocente/FormCadastroDocente';

function CadastroDocente() {
  const camposDocente = [
    { name: 'nome', label: 'Nome Completo', required: true, placeholder: 'Digite algo...' },
    { name: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'Digite algo...' },
    { name: 'senha', label: 'Senha', type: 'password', required: true, placeholder: 'Digite sua senha' },
    { name: 'confirmarSenha', label: 'Confirmar Senha', type: 'password', required: true, placeholder: 'Repita a senha' },
    { name: 'telefone', label: 'Telefone', type: 'tel', placeholder: '+55 ( )', className: 'campo-centralizado' },
  ];

  const salvarLocalmente = (formData) => {
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
    cadastros.push(formData);
    localStorage.setItem('cadastros', JSON.stringify(cadastros));
    console.log('Cadastro salvo localmente:', formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.lgpd || !formData.termos) {
      alert('Você deve aceitar a LGPD e os termos de uso.');
      return;
    }

    // Salva localmente antes de enviar para a API
    salvarLocalmente(formData);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Resposta da API:', data);
      alert('Cadastro enviado com sucesso (simulado)!');

    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao enviar os dados.');
    }
  };

  return (
    <>
      <MenuCadastro />
      <div className='centro'>
        <FormCadastroDocente tipo="docente" campos={camposDocente} onSubmit={handleSubmit} />
      </div>
      <Rodape />
    </>
  );
}

export default CadastroDocente;
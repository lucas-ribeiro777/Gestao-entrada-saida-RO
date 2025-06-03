import FormCadastro from '../../components/FormCadastro/FormCadastro';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import Rodape from '../../components/Rodape/Rodape';
import './CadastroDocente.css';

function CadastroDocente() {
  const camposDocente = [
    { name: 'nome', label: 'Nome Completo', required: true, placeholder: 'Digite algo...' },
    { name: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'Digite algo...' },
    { name: 'senha', label: 'Senha', type: 'password', required: true, placeholder: 'Digite sua senha' },
    { name: 'confirmarSenha', label: 'Confirmar Senha', type: 'password', required: true, placeholder: 'Repita a senha' },
    { name: 'telefone', label: 'Telefone', type: 'tel', placeholder: '+55 ( )' },
  ];
  return (
    <>
      <MenuCadastro/>
      
      <div className='centro'>
        <Foto/>
        <FormCadastro tipo="docente" campos={camposDocente} onSubmit={(data) => console.log(data)} />
      </div>

      <Rodape/>
    </>

  );
}

export default CadastroDocente;
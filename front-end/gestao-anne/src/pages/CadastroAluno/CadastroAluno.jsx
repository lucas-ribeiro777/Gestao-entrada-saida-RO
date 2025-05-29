import FormCadastro from '../../components/FormCadastro/FormCadastro';
import Foto from '../../components/Foto/Foto';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import Rodape from '../../components/Rodape/Rodape';
import './CadastroAluno.css';

function CadastroAluno() {
  const camposAluno = [
    { name: 'nome', label: 'Nome Completo', required: true },
    { name: 'email', label: 'E-mail', type: 'email', required: true },
    { name: 'data_nasc', label: 'Data de Nascimento', type: 'date' },
    { name: 'telefone', label: 'Telefone', type: 'tel' },
    { name: 'senha', label: 'Senha', type: 'password', required: true },
    { name: 'confirmarSenha', label: 'Confirmar Senha', type: 'password', required: true },
  ];

  return (
    <>
      <MenuCadastro/>
      <div className='centro'>
        <Foto/>
        <FormCadastro tipo="aluno" campos={camposAluno} onSubmit={(data) => console.log(data)} />
      </div>

      <Rodape/>
    </>

  );
}

export default CadastroAluno;
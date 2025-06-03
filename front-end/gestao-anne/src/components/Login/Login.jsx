import './Login.css';
import FormCadastro from '../FormCadastro/FormCadastro'; // corrigido aqui
import Rodape from './Rodape'; // certifique-se de que esse arquivo existe

function Login() {
  const camposLogin = [
    { name: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'Digite seu e-mail' },
    { name: 'senha', label: 'Senha', type: 'password', required: true, placeholder: 'Digite sua senha' },
  ];

  return (
    <>
      <div className="centro">
        <FormCadastro tipo="login" campos={camposLogin} />
      </div>
      <Rodape />
    </>
  );
}

export default Login;

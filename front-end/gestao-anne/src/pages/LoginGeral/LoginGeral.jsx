import './LoginGeral.css'
import Rodape from '../../components/Rodape/Rodape';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';

const LoginGeral= () => {
  return (
    <>
        <MenuCadastro />

        <div className="login-wrapper">
        <h3 className="login-title">Preencha os dados para fazer login</h3>

        <div className="login-container">
          <div className="login-row">
            <input 
              type="email"
              placeholder="Digite algo..."
              className="input-full"
            />
          </div>

          <div className="login-row">
            <input
              type="password"
              placeholder="Digite sua senha..."
              className="input-half"
            />
          </div>

          <div className="form-cadastro">
            <span>
              Não possui uma conta? <a href="#">Faça seu Cadastro.</a>
            </span>
          </div>

          <button className="btn-submit">ENTRAR</button>
        </div>
      </div>

      <Rodape />
    </>
  );
};

export default LoginGeral;
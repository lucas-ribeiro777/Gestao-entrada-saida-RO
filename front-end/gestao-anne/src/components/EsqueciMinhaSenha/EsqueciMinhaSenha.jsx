import './EsqueciMinhaSenha.css';
import { useState } from 'react';


const EsqueciMinhaSenha = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    // Lógica de envio aqui
    alert('Código enviado para o e-mail informado.');
  };

  return (
    <div className="container_senha">
      <div className="form-box">
        <h2>Preencha os dados para redefinir sua senha</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">ENVIAR CÓDIGO</button>
        </form>
        <p className="note">
          Enviaremos um código de verificação para redefinição de senha ao e-mail cadastrado.
        </p>
      </div>
      <footer>
        <div>DÚVIDAS? ENTRE EM CONTATO:</div>
        <div>(XX) XXXXX-XXXX | (XX) XXXXX-XXXX</div>
        <div>VENHA NOS VISITAR: R. Aristeu Rodrigues Sampaio, 271 - Jardim das Nacoes, Lençóis Paulista - SP, 18685-730</div>
      </footer>
    </div>
  );
};

export default EsqueciMinhaSenha;
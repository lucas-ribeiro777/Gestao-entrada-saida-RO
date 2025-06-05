import './CadastroDocente.css';
import React, { useState } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';

function CadastroDocente() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    lgpd: false,
    termos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.lgpd || !formData.termos) {
      alert('Você deve aceitar a LGPD e os termos de uso.');
      return;
    }

    console.log('Dados enviados:', formData);
    // Aqui vai sua lógica de envio para o backend
  };

  return (
    <>
      <MenuCadastro />

      <div className="cadastro-box">
        <h2 className="titulo-cadastro">Preencha os dados para se cadastrar</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome Completo</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite algo..."
            value={formData.nome}
            onChange={handleChange}
          />

          <label>E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="Digite algo..."
            value={formData.email}
            onChange={handleChange}
          />

          <div className="senha-container">
            <div className="input-group">
              <label>Senha</label>
              <input
                type="password"
                name="senha"
                placeholder="Digite sua senha..."
                value={formData.senha}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Confirmar Senha</label>
              <input
                type="password"
                name="confirmarSenha"
                placeholder="Digite sua senha..."
                value={formData.confirmarSenha}
                onChange={handleChange}
              />
            </div>
          </div>

          <label>Telefone</label>
          <input
            type="tel"
            name="telefone"
            placeholder="+55 ( )"
            value={formData.telefone}
            onChange={handleChange}
          />

          <div className="checkbox-container">
  <label className="checkbox-item">
    <input
      type="checkbox"
      name="lgpd"
      checked={formData.lgpd}
      onChange={handleChange}
    />
    <span className="fake-checkbox"></span>
    Você entende que está assegurado pelas normas da <a href="#"> LGPD</a>
  </label>

  <label className="checkbox-item">
    <input
      type="checkbox"
      name="termos"
      checked={formData.termos}
      onChange={handleChange}
    />
    <span className="fake-checkbox"></span>
    Você concorda com nossos <a href="#">termos de uso</a>
  </label>
</div>


          <p className="login-link">
            Já possui uma conta? <a href="#">Faça login.</a>
          </p>

          <button type="submit" className="botao-cadastro">CONCLUIR CADASTRO</button>
        </form>
      </div>

      <Rodape />
    </>
  );
}

export default CadastroDocente;

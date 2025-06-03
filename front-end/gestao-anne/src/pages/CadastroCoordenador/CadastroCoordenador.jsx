import React from 'react';
import './CadastroCoordenador.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function MenuCadastro() {
  return (
    <header>
      <h1>Menu de Cadastro</h1>
    </header>
  );
}

function Rodape() {
  return (
    <footer>
      <p>Rodapé do sistema</p>
    </footer>
  );
}

function FormCadastro({ tipo, campos, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {};
    campos.forEach((campo) => {
      data[campo.name] = e.target[campo.name].value;
    });
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de {tipo}</h2>
      {campos.map((campo) => (
        <div key={campo.name}>
          <label>
            {campo.label}
            <input
              type={campo.type || 'text'}
              name={campo.name}
              placeholder={campo.placeholder}
              required={campo.required}
            />
          </label>
        </div>
      ))}
      <button type="submit">Cadastrar</button>
    </form>
  );
}

function CadastroCoordenador() {
  const camposCoordenador = [
    { name: 'nome', label: 'Nome Completo', required: true, placeholder: 'Digite algo...' },
    { name: 'email', label: 'E-mail', type: 'email', required: true, placeholder: 'Digite algo...' },
    { name: 'senha', label: 'Senha', type: 'password', required: true, placeholder: 'Digite sua senha' },
    { name: 'confirmarSenha', label: 'Confirmar Senha', type: 'password', required: true, placeholder: 'Digite sua senha' },
    { name: 'telefone', label: 'Telefone', type: 'tel', placeholder: '+55 ()' },
  ];

  return (
    <>
      <MenuCadastro />

      <div className="form-wrapper">
        <h3 className="form-title">Preencha os dados para se cadastrar</h3>

        <div className="form-container">
          <div className="form-row">
            <input type="text" placeholder="Digite algo..." className="input-full" />
          </div>

          <div className="form-row">
            <input type="email" placeholder="Digite algo..." className="input-full" />
          </div>

          <div className="form-row">
            <input type="text" placeholder="Digite algo..." className="input-half" />
            <input type="tel" placeholder="+55 ( )" className="input-half" />
          </div>

          <div className="form-row">
            <input type="password" placeholder="Digite sua senha..." className="input-half" />
            <input type="password" placeholder="Digite sua senha..." className="input-half" />
          </div>

          <div className="form-login">
            <span>
              Já possui uma conta? <a href="#">Faça login.</a>
            </span>
          </div>

          <button className="btn-submit">CONCLUIR CADASTRO</button>
        </div>

        <div className="centro">
          <FormCadastro
            tipo="coordenador"
            campos={camposCoordenador}
            onSubmit={(data) => console.log(data)}
          />
        </div>
      </div>

      <Rodape />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CadastroCoordenador />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

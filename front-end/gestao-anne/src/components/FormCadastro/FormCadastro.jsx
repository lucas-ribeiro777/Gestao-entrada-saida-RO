import './FormCadastro.css';
import React, { useState } from 'react';

export default function FormCadastro({ tipo, campos, onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
        

        <form onSubmit={handleSubmit} className="formulario">
            <h2 className="titulo">Preencha os dados para se cadastrar</h2>
            <div className="grid-form">
                {campos.map((campo, index) => (
                <div
                    key={campo.name}
                    className={`campo ${index < 2 ? 'full-width' : ''}`} // os dois primeiros ocupam a linha toda
                >
                    <label htmlFor={campo.name}>{campo.label}</label>
                    <input
                    id={campo.name}
                    type={campo.type || 'text'}
                    name={campo.name}
                    placeholder={campo.placeholder || ''}
                    value={formData[campo.name]}
                    onChange={handleChange}
                    required={campo.required}
                    />
                </div>
                ))}
            </div>

            {tipo === 'aluno' && (
                <div className="termos">
                <p>🔵 Você entende que está assegurado(a) pelas normas da <strong>LGPD</strong></p>
                <p>🔴 Você concorda com nossos <a href="#">termos de uso</a></p>
                </div>
            )}

            <p className="login-link">
                Já possui uma conta? <a href="/login">Faça login</a>.
            </p>

            <button type="submit" className="botao">Concluir Cadastro</button>
        </form>
    </>
  );
}

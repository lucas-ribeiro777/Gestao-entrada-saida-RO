import CriarAssinatura from '../CriarAssinatura/CriarAssinatura';
import './FormCadastro.css';
import React, { useState } from 'react';

function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}

function FormCadastro({ tipo, campos, fotoSelecionada }) {
    const [formData, setFormData] = useState({});
    const [usoDados, setUsoDados] = useState(false);
    const [lgpd, setLgpd] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const [assinaturaImg, setAssinaturaImg] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fotoSelecionada) {
            alert('Por favor, selecione uma foto.');
            return;
        }

        if (!assinaturaImg) {
            alert('Por favor, crie a assinatura.');
            return;
        }

        if (!lgpd) {
            alert('Você precisa aceitar a LGPD para continuar.');
            return;
        }

        if (!usoDados) {
            alert('Você precisa concordar com os termos de uso para continuar.');
            return;
        }

        try {
            const formDataToSend = new FormData();

            Object.entries(formData).forEach(([chave, valor]) => {
                formDataToSend.append(chave, valor);
            });

            // Envia apenas o nome do arquivo da foto
            formDataToSend.append('foto', fotoSelecionada.name);

            if (assinaturaImg) {
                const assinaturaFile = dataURLtoFile(assinaturaImg, 'assinatura.png');
                formDataToSend.append('assinatura', assinaturaFile);
            }

            const response = await fetch('http://localhost:3000/alunos', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar os dados do aluno');
            }

            console.log('Aluno cadastrado com sucesso!');
            alert('Aluno cadastrado com sucesso!');

        } catch (erro) {
            console.error('Erro ao cadastrar:', erro.message);
            alert('Erro ao cadastrar. Tente novamente.');
        }
    };



    return (
        <>

            <form onSubmit={handleSubmit} className="formulario">
                <h2 className="titulo">Preencha os dados para se cadastrar</h2>
                <div className="grid-form">
                    {campos.map((campo, index) => (
                        <div
                            key={campo.name}
                            className={`campo ${index < 2 ? 'full-width' : ''}`}
                        >
                            <label htmlFor={campo.name}>{campo.label}</label>
                            <input
                                id={campo.name}
                                type={campo.type || 'text'}
                                name={campo.name}
                                placeholder={campo.placeholder || ''}
                                value={formData[campo.name] || ''}
                                onChange={handleChange}
                                required={campo.required}
                            />
                        </div>
                    ))}
                </div>

                <div className="container-botao-assinar">
                    <button type="button" onClick={() => setModalAberto(true)} className='botao-assinar'>
                        Criar uma assinatura
                    </button>
                </div>

                <div className="container-assinatura">
                    {assinaturaImg && (
                        <img src={assinaturaImg} alt="Assinatura" className='img-assinatura' style={{ width: '200px', marginTop: '10px' }} />
                    )}
                </div>


                <CriarAssinatura
                    aberto={modalAberto}
                    aoFechar={() => setModalAberto(false)}
                    aoSalvar={(img) => setAssinaturaImg(img)}
                />


                <div className="termos">
                    <div className="termo1">
                        <input
                            type="checkbox"
                            checked={lgpd}
                            onChange={(e) => setLgpd(e.target.checked)}
                        />
                        <p>
                            Você entende que está assegurado(a) pelas normas da{' '}
                            <a
                                href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LGPD
                            </a>
                        </p>
                    </div>
                    <div className="termo1">
                        <input
                            type="checkbox"
                            checked={usoDados}
                            onChange={(e) => setUsoDados(e.target.checked)}
                        />
                        <p>
                            Você concorda com nossos <a href="#">termos de uso</a>
                        </p>
                    </div>
                </div>


                <p className="login-link">
                    Já possui uma conta? <a href="/login">Faça login</a>.
                </p>

                <button type="submit" className="botao-concluir-cadastro">
                    Concluir Cadastro
                </button>
            </form>
        </>
    );
}

export default FormCadastro;


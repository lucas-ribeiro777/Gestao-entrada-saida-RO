import Botao from '../Botao/Botao';
import CampoTexto from '../CampoTexto/CampoTexto';
import CriarAssinatura from '../CriarAssinatura/CriarAssinatura';
import Termos from '../Termos/Termos';
import './FormCadastroCoordenador.css';
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

function FormCadastroCoordenador({ tipo, campos, fotoSelecionada }) {
    const [modalAberto, setModalAberto] = useState(false);
    const [assinaturaImg, setAssinaturaImg] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [termosValidos, setTermosValidos] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        if (senha !== confirmarSenha) {
            alert("Senhas não conferem!");
            return;
        }

        if (!assinaturaImg) {
            alert("Por favor, crie sua assinatura.");
            return;
        }

        if (!termosValidos) {
            alert('Você precisa aceitar todos os termos obrigatórios para continuar.');
            return;
        }

        const nomeArquivoAssinatura = `assinatura_${Date.now()}.png`;

        // Converte a imagem da assinatura para um arquivo
        const arquivoAssinatura = dataURLtoFile(assinaturaImg, nomeArquivoAssinatura);

        // Monta o FormData com os dados
        const formData = new FormData();
        formData.append("Nome", nome);
        formData.append("Email", email);
        formData.append("Telefone", telefone);
        formData.append("Senha", senha);
        formData.append("Assinatura", arquivoAssinatura); 

        try {
            const response = await fetch('http://10.90.146.27:5121/api/Coordenadores/criar', {
                method: 'POST',
                body: formData, // FormData automaticamente define o Content-Type como multipart/form-data
            });

            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
                setNome('');
                setEmail('');
                setTelefone('');
                setSenha('');
                setConfirmarSenha('');
                setAssinaturaImg(null);
                setModalAberto(false);
            } else {
                alert("Erro no cadastro.");
            }
        } catch (error) {
            alert("Erro na comunicação com a API.");
            console.error(error);
        }
    }

    return (
        <form className="formulario" onSubmit={handleSubmit}>
            <h2 className="titulo">Preencha os dados para cadastrar um COORDENADOR</h2>

            <div className="campos">
                <CampoTexto
                    valor={nome}
                    onChange={e => setNome(e.target.value)}
                    label="Nome"
                    placeholder="Digite Algo..."
                />
                <CampoTexto
                    valor={email}
                    onChange={e => setEmail(e.target.value)}
                    label="E-mail"
                    placeholder="Digite Algo..."
                />
            <div className="linha2">
                <CampoTexto 
                id="senha" 
                label="Senha" 
                valor={senha} 
                onChange={e => setSenha(e.target.value)} 
                placeholder="Digite Sua Senha..." 
                senha={true} 
                />
                <CampoTexto 
                id="confirmarSenha" 
                label="Confirmar Senha" 
                valor={confirmarSenha} 
                onChange={e => setConfirmarSenha(e.target.value)} 
                placeholder="Confirme Sua Senha..." 
                senha={true} 
                />
            </div>
            <div className="linha1-docente">
                <CampoTexto
                valor={telefone}
                onChange={e => setTelefone(e.target.value)}
                label="Telefone"
                placeholder="+55 ()"
                />
            </div>
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

            <Termos onValidadeChange={setTermosValidos} />
            <Botao descricao="Concluir Cadastro" type="submit" />
        </form>
    );
}

export default FormCadastroCoordenador;

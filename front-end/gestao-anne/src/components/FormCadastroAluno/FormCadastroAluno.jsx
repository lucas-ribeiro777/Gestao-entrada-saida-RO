import Botao from '../Botao/Botao';
import CampoTexto from '../CampoTexto/CampoTexto';
import CriarAssinatura from '../CriarAssinatura/CriarAssinatura';
import Termos from '../Termos/Termos';
import './FormCadastroAluno.css';
import React, { useState } from 'react';

function FormCadastroAluno({ tipo, campos, fotoSelecionada }) {
    const [modalAberto, setModalAberto] = useState(false);
    const [assinaturaImg, setAssinaturaImg] = useState(null);
    const [nomeArquivoAssinatura, setNomeArquivoAssinatura] = useState(null);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [datanasc, setDataNasc] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [termosValidos, setTermosValidos] = useState(false);

    const nomeArquivoFoto = fotoSelecionada ? fotoSelecionada.name : null;

    const dataFormatada = datanasc.replaceAll('/', '-');

    function aoSalvarAssinatura(base64Img) {
        setAssinaturaImg(base64Img);
        const nomeArquivo = `assinatura_${Date.now()}.png`;
        setNomeArquivoAssinatura(nomeArquivo);
        setModalAberto(false);
    }

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

    async function handleSubmit(event) {
        event.preventDefault();

        if (senha !== confirmarSenha) {
            alert('As senhas não conferem!');
            return;
        }

        if (!nomeArquivoAssinatura || !assinaturaImg) {
            alert('Por favor, crie a assinatura.');
            return;
        }

        if (!termosValidos) {
            alert('Você precisa aceitar todos os termos obrigatórios para continuar.');
            return;
        }

        if (!fotoSelecionada) {
            alert('Por favor, selecione uma foto de perfil.');
            return;
        }

        const formData = new FormData();
        formData.append('Nome', nome);
        formData.append('Email', email);
        formData.append('DataNascimento', dataFormatada);
        formData.append('Telefone', telefone);
        formData.append('Senha', senha);
        formData.append('Imagem', fotoSelecionada); 
        formData.append('Assinatura', dataURLtoFile(assinaturaImg, nomeArquivoAssinatura));

        try {
            const response = await fetch('http://10.90.146.27:5121/api/Alunos', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const erro = await response.text();
                throw new Error('Erro ao cadastrar aluno:\n' + erro);
            }

            const data = await response.json();
            alert('Cadastro realizado com sucesso!'); 
            
            console.log('Resposta da API:', data);

            setNome('');
            setEmail('');
            setDataNasc('');
            setTelefone('');
            setSenha('');
            setConfirmarSenha('');
            setAssinaturaImg(null);
            setNomeArquivoAssinatura(null);
        } catch (error) {
            alert(error.message);
        }
    }


    return (
        <>
            <form className="formulario" onSubmit={handleSubmit}>
                <h2 className="titulo">Preencha os dados para se cadastrar - ALUNO</h2>

                <div className="campos">
                    <CampoTexto 
                    valor={nome} 
                    label="Nome" 
                    placeholder="Digite Algo..." 
                    onChange={e => setNome(e.target.value)} 
                    />
                    <CampoTexto 
                    valor={email} 
                    label="E-mail" 
                    placeholder="Digite Algo..." 
                    onChange={e => setEmail(e.target.value)} 
                    />
                    <div className="linha1">
                        <CampoTexto 
                            valor={datanasc} 
                            label="Data de Nascimento" 
                            placeholder="__/__/____" 
                            onChange={e => setDataNasc(e.target.value)} 
                        />
                        <CampoTexto 
                            valor={telefone} 
                            label="Telefone" 
                            placeholder="+55 ()" 
                            onChange={e => setTelefone(e.target.value)} 
                        />
                    </div>
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
                </div>

                <div className="container-botao-assinar">
                    <button type="button" onClick={() => setModalAberto(true)} className="botao-assinar">
                        Criar uma assinatura
                    </button>
                </div>

                <div className="container-assinatura">
                    {assinaturaImg && (
                        <img src={assinaturaImg} alt="Assinatura" className="img-assinatura" style={{ width: '200px', marginTop: '10px' }} />
                    )}
                </div>

                <CriarAssinatura
                    aberto={modalAberto}
                    aoFechar={() => setModalAberto(false)}
                    aoSalvar={aoSalvarAssinatura}
                />

                <Termos onValidadeChange={setTermosValidos} />

                <Botao descricao="Concluir Cadastro" type="submit" />
            </form>
        </>
    );
}

export default FormCadastroAluno;

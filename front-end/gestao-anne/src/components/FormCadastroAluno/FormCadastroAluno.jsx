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

    function aoSalvarAssinatura(base64Img) {
        setAssinaturaImg(base64Img);
        const nomeArquivo = `assinatura_${Date.now()}.png`;
        setNomeArquivoAssinatura(nomeArquivo);
        setModalAberto(false);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (senha !== confirmarSenha) {
            alert('As senhas não conferem!');
            return;
        }

        if (!nomeArquivoAssinatura) {
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

        const aluno = {
            nome,
            email,
            dataNascimento: datanasc,
            telefone,
            senha,
            foto: nomeArquivoFoto,
            assinatura: nomeArquivoAssinatura,
        };

        try {
            const response = await fetch('http://localhost:3000/alunos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(aluno),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar aluno');
            }

            const data = await response.json();
            alert('Cadastro realizado com sucesso!');
            console.log('Resposta da API:', data);

            // Limpar campos
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
                    <CampoTexto valor={nome} label="Nome" placeholder="Digite Algo..." aoAlterar={e => setNome(e.target.value)} />
                    <CampoTexto valor={email} label="E-mail" placeholder="Digite Algo..." aoAlterar={e => setEmail(e.target.value)} />
                    <div className="linha1">
                        <CampoTexto valor={datanasc} label="Data de Nascimento" placeholder="__/__/____" aoAlterar={e => setDataNasc(e.target.value)} />
                        <CampoTexto valor={telefone} label="Telefone" placeholder="+55 ()" aoAlterar={e => setTelefone(e.target.value)} />
                    </div>
                    <div className="linha2">
                        <CampoTexto valor={senha} label="Senha" placeholder="Digite Sua Senha..." aoAlterar={e => setSenha(e.target.value)} />
                        <CampoTexto valor={confirmarSenha} label="Confirmar Senha" placeholder="Confirme Sua Senha..." aoAlterar={e => setConfirmarSenha(e.target.value)} />
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

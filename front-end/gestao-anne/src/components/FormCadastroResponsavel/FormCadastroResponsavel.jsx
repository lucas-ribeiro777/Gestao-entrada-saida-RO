import Botao from '../Botao/Botao';
import CampoTexto from '../CampoTexto/CampoTexto';
import CriarAssinatura from '../CriarAssinatura/CriarAssinatura';
import Termos from '../Termos/Termos';
import ModalRecado from '../ModalRecado/ModalRecado';
import './FormCadastroResponsavel.css';
import React, { useState } from 'react';

function FormCadastroResponsavel({ tipo, campos, fotoSelecionada }) {
    const [modalAberto, setModalAberto] = useState(false);
    const [assinaturaImg, setAssinaturaImg] = useState(null);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [nomeDependente, setnomeDependente] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [termosValidos, setTermosValidos] = useState(false);

    // Controle do ModalRecado
    const [modalRecadoAberto, setModalRecadoAberto] = useState(false);
    const [mensagemRecado, setMensagemRecado] = useState("");

    function mostrarRecado(msg) {
        setMensagemRecado(msg);
        setModalRecadoAberto(true);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // Validações
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarRecado('Por favor, insira um e-mail válido.');
            return;
        }

        const telNumeros = telefone.replace(/\D/g, '');
        if (!(telNumeros.length === 10 || telNumeros.length === 11)) {
            mostrarRecado('Telefone inválido. Use 10 ou 11 dígitos (somente números).');
            return;
        }

        if (senha.length < 6 || !/\d/.test(senha)) {
            mostrarRecado('Senha deve ter no mínimo 6 caracteres e conter pelo menos um número.');
            return;
        }

        if (senha !== confirmarSenha) {
            mostrarRecado("Senhas não conferem!");
            return;
        }

        if (!termosValidos) {
            mostrarRecado("Você precisa aceitar todos os termos obrigatórios para continuar.");
            return;
        }

        const body = {
            nome,
            email,
            telefone,
            senha,
            nomesAlunos: nomeDependente ? [nomeDependente] : []
        };

        try {
            const response = await fetch('http://10.90.146.16:5121/api/Responsaveis/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                mostrarRecado("Cadastro realizado com sucesso!");
                setNome('');
                setEmail('');
                setnomeDependente('');
                setTelefone('');
                setSenha('');
                setConfirmarSenha('');
                setAssinaturaImg(null);
                setModalAberto(false);
            } else {
                const errorData = await response.json();
                mostrarRecado(`Erro no cadastro: ${errorData.message || 'Requisição inválida'}`);
                console.error('Erro no cadastro:', body);
            }
        } catch (error) {
            mostrarRecado("Erro na comunicação com a API.");
            console.error(error);
        }
    }

    return (
        <>
            <form className="formulario" onSubmit={handleSubmit}>
                <h2 className="titulo">Preencha os dados para cadastrar um RESPONSÁVEL</h2>

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
                    <div className="linha1">
                        <CampoTexto
                            valor={nomeDependente}
                            onChange={e => setnomeDependente(e.target.value)}
                            label="Nome do Dependente"
                            placeholder="Digite Algo..."
                        />
                        <CampoTexto
                            valor={telefone}
                            onChange={e => setTelefone(e.target.value)}
                            label="Telefone"
                            placeholder="(14...)"
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

                <Termos onValidadeChange={setTermosValidos} />
                <Botao descricao="Concluir Cadastro" type="submit" />
            </form>

            <ModalRecado
                aberto={modalRecadoAberto}
                mensagem={mensagemRecado}
                aoFechar={() => setModalRecadoAberto(false)}
            />
        </>
    );
}

export default FormCadastroResponsavel;

import Botao from '../Botao/Botao';
import CampoTexto from '../CampoTexto/CampoTexto';
import CriarAssinatura from '../CriarAssinatura/CriarAssinatura';
import Termos from '../Termos/Termos';
import './FormCadastroResponsavel.css';
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

function FormCadastroResponsavel({ tipo, campos, fotoSelecionada }) {
    const [modalAberto, setModalAberto] = useState(false);
    const [assinaturaImg, setAssinaturaImg] = useState(null);

    const [nome, setNome]= useState ('')
    const [email, setEmail]= useState ('')
    const [nomeDependente, setnomeDependente]= useState ('')
    const [telefone, setTelefone]= useState ('')
    const [senha, setSenha]= useState ('')
    const [confirmarSenha, setConfimarSenha]= useState ('')

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

        // Converte dataURL em arquivo
        const arquivoAssinatura = dataURLtoFile(assinaturaImg, nomeArquivoAssinatura);

        // Cria FormData e adiciona os campos
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('email', email);
        formData.append('nomeDependente', nomeDependente);
        formData.append('telefone', telefone);
        formData.append('senha', senha);
        formData.append('assinatura', arquivoAssinatura);

        console.log([...formData.entries()]);

        try {
            const response = await fetch('http://10.90.146.27:5121/api/Responsaveis/cadastro', {
                method: 'POST',
                body: formData, // importante: não colocar headers Content-Type
            });

            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
                setNome('');
                setEmail('');
                setnomeDependente('');
                setTelefone('');
                setSenha('');
                setConfimarSenha('');
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
        <>

            <form className="formulario" onSubmit={handleSubmit}>
                <h2 className="titulo">Preencha os dados para se cadastrar RESP</h2>

                <div className="campos">
                    <CampoTexto 
                        valor={nome} 
                        aoAlterar={e => setNome(e.target.value)}
                        label ="Nome"
                        placeholder="Digite Algo..."
                    />
                    <CampoTexto 
                        valor={email}
                        aoAlterar={e => setEmail(e.target.value)} 
                        label ="E-mail" 
                        placeholder="Digite Algo..."
                    />
                    <div className="linha1">
                        <CampoTexto 
                            valor={nomeDependente}
                            aoAlterar={e => setnomeDependente(e.target.value)} 
                            label ="Nome do Dependente" 
                            placeholder="Digite Algo..."
                        />
                        <CampoTexto 
                            valor={telefone}
                            aoAlterar={e => setTelefone(e.target.value)} 
                            label ="Telefone" 
                            placeholder="+55 ()"
                        />
                    </div>
                    <div className="linha2">
                        <CampoTexto 
                            valor={senha}
                            aoAlterar={e => setSenha(e.target.value)} 
                            label ="Senha" 
                            placeholder="Digite Sua Senha..."
                        />
                        <CampoTexto 
                            valor={confirmarSenha}
                            aoAlterar={e => setConfimarSenha(e.target.value)} 
                            label ="Confirmar Senha" 
                            placeholder="Confirme Sua Senha..."
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
                <Botao descricao= "Concluir Cadastro" type="submit"/>
            </form>
        </>
    );
}

export default FormCadastroResponsavel;


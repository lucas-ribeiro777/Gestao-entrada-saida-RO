import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Rodape from "../../components/Rodape/Rodape";
import CabecalhoPages from "../../components/CabecalhoPages/CabecalhoPages";
import InfoBox from "../../components/InfoBox/InfoBox";
import CriarAssinatura from "../../components/CriarAssinatura/CriarAssinatura"; 
import "./VisualizacaoResponsavel.css";
import { API_BASE_URL } from '../../constantes';

const VisualizacaoResponsavel = () => {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const idResponsavelLogado = localStorage.getItem("usuarioId");
  const API_URL = `${API_BASE_URL}api/Responsaveis/${idResponsavelLogado}`;
  const navigate = useNavigate();

useEffect(() => {
  const buscarDadosResponsavel = async () => {
    try {
      const resResponsavel = await fetch(`${API_BASE_URL}api/Responsaveis/${idResponsavelLogado}`);
      if (!resResponsavel.ok) throw new Error("Falha ao buscar responsável");
      const responsavel = await resResponsavel.json();

      let nomesAlunos = "Filho não encontrado";
      if (responsavel.idsAlunos && responsavel.idsAlunos.length > 0) {
        const alunosPromises = responsavel.idsAlunos.map(async (idAluno) => {
          try {
            const resAluno = await fetch(`${API_BASE_URL}api/Aluno/${idAluno}`);
            if (!resAluno.ok) throw new Error("Erro ao buscar aluno");
            const aluno = await resAluno.json();
            return aluno.nome || "Desconhecido";
          } catch {
            return "Desconhecido";
          }
        });

        const nomes = await Promise.all(alunosPromises);
        nomesAlunos = nomes.join(", "); 
      }

      setDados({
        nome: responsavel.nome,
        nascimento: responsavel.data_nasc ? formatarData(responsavel.data_nasc) : "",
        email: responsavel.email,
        telefone: responsavel.telefone,
        aluno: nomesAlunos, 
        assinatura: responsavel.assinatura || "",
      });

      setCarregando(false);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setCarregando(false);
    }
  };

  buscarDadosResponsavel();
}, []);

  const formatarData = (dataStr) => {
    if (!dataStr) return "";
    if (dataStr.includes("/")) return dataStr;
    const data = new Date(dataStr);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleEditar = (campo) => {
    const valorAtual = dados[campo];
    const novoValor = prompt(`Editar ${campo}:`, valorAtual);
    if (novoValor !== null && novoValor.trim() !== "") {
      const novosDados = { ...dados, [campo]: novoValor.trim() };
      setDados(novosDados);

      const payload = {
        ...novosDados,
        data_nasc:
          campo === "nascimento"
            ? novoValor.split("/").reverse().join("-")
            : novosDados.nascimento.split("/").reverse().join("-"),
      };

      fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((err) => {
        console.error("Erro ao salvar alterações:", err);
        alert("Erro ao salvar no servidor");
      });
    }
  };

  const abrirModalAssinatura = () => {
    setModalAberto(true);
  };

  const fecharModalAssinatura = () => {
    setModalAberto(false);
  };

const salvarAssinatura = async (arquivoAssinatura) => {
  try {
    const formData = new FormData();
    formData.append("assinatura", arquivoAssinatura); 

    const resposta = await fetch(
      `${API_BASE_URL}api/Responsaveis/${idResponsavelLogado}/assinatura`,
      {
        method: "POST",
        body: formData, 
      }
    );

    if (!resposta.ok) throw new Error("Falha ao salvar assinatura no servidor");

    setDados((prev) => ({
      ...prev,
      assinatura: URL.createObjectURL(arquivoAssinatura),
    }));

    fecharModalAssinatura();
    alert("Assinatura salva com sucesso!");
  } catch (err) {
    console.error("Erro ao salvar assinatura:", err);
    alert("Erro ao salvar assinatura no servidor");
  }
};


  if (carregando || !dados) {
    return <p>Carregando dados...</p>;
  }

  return (
    <div className="pagina-responsavel">
      <CabecalhoPages rotaAtual={location.pathname}>
        <li key="inicio">
          <Link to="/InicialResponsavel">Início</Link>
        </li>
        <li key="solicitacoes">
          <Link to="/VerSolicitacaoResponsavel">Solicitações</Link>
        </li>
        <li key="conta">
          <Link to="/VisualizacaoResponsavel">Conta</Link>
        </li>
      </CabecalhoPages>

      <div className="conteudo-principal">
        <div className="cartao">
          <InfoBox
            icone={<img src="/images/nome.png" alt="nome" />}
            texto={dados.nome}
            onEditar={() => handleEditar("nome")}
            editavel={false}
            cor="claro"
          />
          <InfoBox
            icone={<img src="/images/email.png" alt="email" />}
            texto={dados.email}
            onEditar={() => handleEditar("email")}
            editavel={false}
            cor="escuro"
          />
          <InfoBox
            icone={<img src="/images/telefoneconta.png" alt="Telefone" />}
            texto={dados.telefone}
            onEditar={() => handleEditar("telefone")}
            editavel={false}
            cor="claro"
          />
          <InfoBox
            icone={<img src="/images/family.png" alt="filho" />}
            texto={dados.aluno}
            onEditar={() => handleEditar("filho")}
            editavel={false}
            cor="escuro"
          />

          {/* Assinatura: botão ou imagem */}
          {(!dados.assinatura || dados.assinatura.trim() === "") ? (
            <div className="assinatura-box">
              <button
                className="btn-adicionar-assinatura"
                onClick={abrirModalAssinatura}
              >
                ➕ Adicionar Assinatura
              </button>
            </div>
          ) : (
            <InfoBox
              icone={<img src="/images/assinatura.png" alt="Assinatura" />}
              texto={
              <img
                src={`${API_BASE_URL}${dados.assinatura}`}
                alt="Assinatura"
                style={{ maxWidth: '150px', maxHeight: '50px', borderRadius: '70px' }}
                id='assinatura-coordenador'
              />
              }
              editavel={false}
              cor="claro"
            />
          )}
        </div>
      </div>

      {modalAberto && (
        <CriarAssinatura
          aberto={modalAberto}
          aoFechar={fecharModalAssinatura}
          aoSalvar={salvarAssinatura}
        />
      )}

      <Rodape />
    </div>
  );
};

export default VisualizacaoResponsavel;

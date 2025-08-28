import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Rodape from "../../components/Rodape/Rodape";
import CabecalhoPages from "../../components/CabecalhoPages/CabecalhoPages";
import InfoBox from "../../components/InfoBox/InfoBox";
import CriarAssinatura from "../../components/CriarAssinatura/CriarAssinatura"; // import modal assinatura
import "./VisualizacaoResponsavel.css";

const VisualizacaoResponsavel = () => {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const idResponsavelLogado = localStorage.getItem("usuarioId");
  const API_URL = `http://10.90.146.16:5121/api/Responsaveis/${idResponsavelLogado}`;
  const navigate = useNavigate();

useEffect(() => {
  const buscarDadosResponsavel = async () => {
    try {
      // 1. Buscar dados do responsável
      const resResponsavel = await fetch(API_URL);
      if (!resResponsavel.ok) throw new Error("Falha ao buscar responsável");
      const responsavel = await resResponsavel.json();

      // 2. Pegar o ID do primeiro aluno (ou você pode mapear todos depois)
      const idAluno = responsavel.idsAlunos?.[0];

      let nomeAluno = "Filho não encontrado";

      if (idAluno) {
        // 3. Buscar dados do aluno
        const resAluno = await fetch(`http://10.90.146.16:5121/api/Aluno/${idAluno}`);
        if (resAluno.ok) {
          const aluno = await resAluno.json();
          nomeAluno = aluno.nome || nomeAluno;
        }
      }

      // 4. Atualizar estado com os dados
      setDados({
        nome: responsavel.nome,
        nascimento: responsavel.data_nasc ? formatarData(responsavel.data_nasc) : "",
        email: responsavel.email,
        telefone: responsavel.telefone,
        aluno: nomeAluno,
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

      // Ajusta data para formato yyyy-mm-dd se for campo nascimento
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
    formData.append("assinatura", arquivoAssinatura); // arquivo PNG real

    const resposta = await fetch(
      `http://10.90.146.16:5121/api/Responsaveis/${idResponsavelLogado}/assinatura`,
      {
        method: "POST",
        body: formData, // envia como multipart/form-data automaticamente
      }
    );

    if (!resposta.ok) throw new Error("Falha ao salvar assinatura no servidor");

    // Atualiza localmente, se quiser mostrar no front
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
                src={`http://10.90.146.16:5121${dados.assinatura}`} // <--- concatena IP + caminho da API
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

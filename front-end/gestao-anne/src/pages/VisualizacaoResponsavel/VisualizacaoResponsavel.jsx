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
  const API_URL = "http://localhost:3000/responsaveis/2"; // ajuste o ID
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setDados({
          nome: data.nome,
          nascimento: formatarData(data.data_nasc),
          email: data.email,
          telefone: data.telefone,
          aluno: data.nome_aluno || "Filho não encontrado",
          assinatura: data.assinatura || "", // adiciona assinatura aqui
        });
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados:", err);
        setCarregando(false);
      });
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

  const salvarAssinatura = (assinaturaBase64) => {
    const novosDados = { ...dados, assinatura: assinaturaBase64 };
    setDados(novosDados);

    // Atualiza no servidor
    fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...dados, assinatura: assinaturaBase64 }),
    }).catch((err) => {
      console.error("Erro ao salvar assinatura:", err);
      alert("Erro ao salvar assinatura no servidor");
    });

    fecharModalAssinatura();
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
          <Link to="/#">Solicitações</Link>
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
            editavel={true}
            cor="escuro"
          />
          <InfoBox
            icone={<img src="/images/niver.png" alt="nascimento" />}
            texto={dados.nascimento}
            onEditar={() => handleEditar("nascimento")}
            editavel={true}
            cor="claro"
          />
          <InfoBox
            icone={<img src="/images/email.png" alt="email" />}
            texto={dados.email}
            onEditar={() => handleEditar("email")}
            editavel={true}
            cor="escuro"
          />
          <InfoBox
            icone={<img src="/images/telefoneconta.png" alt="Telefone" />}
            texto={dados.telefone}
            onEditar={() => handleEditar("telefone")}
            editavel={true}
            cor="claro"
          />
          <InfoBox
            icone={<img src="/images/family.png" alt="filho" />}
            texto={dados.aluno}
            onEditar={() => handleEditar("filho")}
            editavel={true}
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
                  src={dados.assinatura}
                  alt="Assinatura"
                  style={{ maxWidth: '150px', maxHeight: '50px', borderRadius: '70px' }}
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

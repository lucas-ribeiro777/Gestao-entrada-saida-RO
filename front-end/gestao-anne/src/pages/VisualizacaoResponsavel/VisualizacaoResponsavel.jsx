import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Rodape from "../../components/Rodape/Rodape";
import CabecalhoPages from "../../components/CabecalhoPages/CabecalhoPages";
import "./VisualizacaoResponsavel.css";

const VisualizacaoResponsavel = () => {
  const [dados, setDados] = useState(null);
  const [formData, setFormData] = useState({});
  const [responsavelId, setResponsavelId] = useState(null);
  const [editandoCampo, setEditandoCampo] = useState(null);

  useEffect(() => {
    fetch("/Mocks/Responsaveis.json")
      .then((res) => res.json())
      .then((data) => {
        const responsavel = data.responsaveis[0];
        if (responsavel) {
          setResponsavelId(responsavel.id);
          const aluno = data.alunos.find((a) => a.id_filho === responsavel.id_filho);
          const nomeAluno = aluno ? aluno.nome : "Filho não encontrado";
          const dadosFormatados = {
            nome: responsavel.nome,
            nascimento: formatarData(responsavel.data_nasc),
            email: responsavel.email,
            telefone: responsavel.telefone,
            aluno: nomeAluno
          };
          setDados(dadosFormatados);
          setFormData(dadosFormatados);
        }
      })
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  const formatarData = (dataStr) => {
    if (!dataStr) return "";
    if (dataStr.includes("/")) return dataStr;
    const data = new Date(dataStr);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const handleCampoChange = (campo, valor) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleEditarCampo = (campo) => {
    setEditandoCampo(campo);
  };

  const handleSalvarCampo = (campo) => {
    const valorAtualizado = formData[campo];

    const payload = {
      ...dados,
      [campo]: campo === "nascimento"
        ? valorAtualizado.split("/").reverse().join("-")
        : valorAtualizado
    };

    fetch(`http://localhost:3001/Responsaveis/${responsavelId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then(() => {
        setDados((prev) => ({ ...prev, [campo]: valorAtualizado }));
        setEditandoCampo(null);
      })
      .catch((err) => console.error("Erro ao salvar campo:", err));
  };

  if (!dados) return <div className="loading">Carregando dados...</div>;

  return (
    <div className="pagina-responsavel">
      <CabecalhoPages>
        <li><NavLink to="/InicialResponsavel" className={({ isActive }) => isActive ? "ativo" : "nativo"}>Início</NavLink></li>
        <li><NavLink to="/autorizarEntradaSaida" className={({ isActive }) => isActive ? "ativo" : "nativo"}>Autorizar Entrada/Saída</NavLink></li>
        <li><NavLink to="/VisualizacaoResponsavel" className={({ isActive }) => isActive ? "ativo" : "nativo"}>Conta</NavLink></li>
      </CabecalhoPages>

      <main className="conteudo-principal">
        <div className="cartao">
          <Campo
            icone="🗂️"
            valor={formData.nome}
            campo="nome"
            editando={editandoCampo === "nome"}
            onEditar={handleEditarCampo}
            onSalvar={handleSalvarCampo}
            onChange={handleCampoChange}
            fundo="azul"
          />
          <Campo
            icone="📅"
            valor={formData.nascimento}
            campo="nascimento"
            editando={editandoCampo === "nascimento"}
            onEditar={handleEditarCampo}
            onSalvar={handleSalvarCampo}
            onChange={handleCampoChange}
            fundo="azul-claro"
          />
          <Campo
            icone="📧"
            valor={formData.email}
            campo="email"
            editando={editandoCampo === "email"}
            onEditar={handleEditarCampo}
            onSalvar={handleSalvarCampo}
            onChange={handleCampoChange}
            fundo="azul"
          />
          <Campo
            icone="📞"
            valor={formData.telefone}
            campo="telefone"
            editando={editandoCampo === "telefone"}
            onEditar={handleEditarCampo}
            onSalvar={handleSalvarCampo}
            onChange={handleCampoChange}
            fundo="azul-claro"
          />
          <Campo
            icone="👨‍👧"
            valor={formData.aluno}
            campo="aluno"
            editando={false}
            fundo="azul"
          />
        </div>
      </main>

      <Rodape />
    </div>
  );
};

const Campo = ({ icone, valor, campo, editando, onEditar, onSalvar, onChange, fundo }) => (
  <div className={`campo ${fundo}`}>
    <span className="icone">{icone}</span>
    {editando ? (
      <input
        className="input-edicao"
        type="text"
        value={valor || ""}
        onChange={(e) => onChange(campo, e.target.value)}
      />
    ) : (
      <span className="texto">{valor}</span>
    )}
    {campo !== "aluno" && (
      <span
        className="icone-editar"
        onClick={() => editando ? onSalvar(campo) : onEditar(campo)}
      >
        {editando ? "💾" : "✏️"}
      </span>
    )}
  </div>
);

export default VisualizacaoResponsavel;

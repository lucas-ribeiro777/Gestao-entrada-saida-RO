import React, { useEffect, useState } from "react";
import Rodape from "../../components/Rodape/Rodape";
import "./VisualizacaoResponsavel.css";
import CabecalhoPages from "../../components/CabecalhoPages/CabecalhoPages";

const VisualizacaoResponsavel = () => {
  const [dados, setDados] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({});
  const [responsavelId, setResponsavelId] = useState(null); // para o PUT

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

  const handleEditar = () => setEditando(true);

  const handleSalvar = () => {
    const dadosParaEnviar = {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      data_nasc: formData.nascimento.split("/").reverse().join("-"),
      filho_nome: formData.aluno
    };

    fetch(`http://localhost:3001/Responsaveis/${responsavelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dadosParaEnviar)
    })
      .then((res) => res.json())
      .then(() => {
        setDados(formData);
        setEditando(false);
      })
      .catch((err) => console.error("Erro ao salvar dados:", err));
  };

  const handleChange = (campo, valor) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  if (!dados) return <div className="loading">Carregando dados...</div>;

  return (
    
    <div className="container">
      < CabecalhoPages />
      <main className="content">
        <div className="card">
          <Item
            icone="🧾"
            valor={formData.nome}
            campo="nome"
            editando={editando}
            onChange={handleChange}
            bg="azul"
          />
          <Item
            icone="📅"
            valor={formData.nascimento}
            campo="nascimento"
            editando={editando}
            onChange={handleChange}
            bg="azul-claro"
          />
          <Item
            icone="📧"
            valor={formData.email}
            campo="email"
            editando={editando}
            onChange={handleChange}
            bg="azul"
          />
          <Item
            icone="📞"
            valor={formData.telefone}
            campo="telefone"
            editando={editando}
            onChange={handleChange}
            bg="azul-claro"
          />
          <Item
            icone="👨‍👧"
            valor={formData.aluno}
            campo="aluno"
            editando={false}
            onChange={handleChange}
            bg="azul"
          />
        </div>

        <button className="botao-editar" onClick={editando ? handleSalvar : handleEditar}>
          {editando ? (
            <>
              💾 <span className="texto-botao">Salvar</span>
            </>
          ) : (
            <>
              <span className="texto-botao">Editar</span> ✏️
            </>
          )}
        </button>
      </main>
      <Rodape />
    </div>
  );
};

const Item = ({ icone, valor, campo, editando, onChange, bg }) => (
  <div className={`item ${bg}`}>
    <span className="icone">{icone}</span>
    {editando ? (
      <input
        className="input-edicao"
        type="text"
        value={valor}
        onChange={(e) => onChange(campo, e.target.value)}
      />
    ) : (
      <span className="text">{valor}</span>
    )}
  </div>
);

export default VisualizacaoResponsavel;

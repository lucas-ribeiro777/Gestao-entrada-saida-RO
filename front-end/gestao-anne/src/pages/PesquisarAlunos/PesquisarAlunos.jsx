import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CabecalhoPages from "./CabecalhoPages";
import Rodape from "./Rodape";

function PesquisarAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [cursoSelecionado, setCursoSelecionado] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/alunos") // ajuste para o seu endpoint se necessário
      .then((res) => res.json())
      .then((data) => {
        const alunosValidos = data.filter(aluno => aluno.curso);
        setAlunos(alunosValidos);
        const cursosUnicos = [...new Set(alunosValidos.map((aluno) => aluno.curso))];
        setCursos(cursosUnicos);
      })
      .catch((err) => console.error("Erro ao buscar alunos:", err));
  }, []);

  const alunosFiltrados = cursoSelecionado
    ? alunos.filter((aluno) => aluno.curso === cursoSelecionado)
    : alunos;

  return (
    <>
      <CabecalhoPages rotaAtual={location.pathname}>
        <li><Link to="/#">Início</Link></li>
        <li><Link to="/#">Ocorrências</Link></li>
        <li>
          <input
            className="input-pesquisar-aluno"
            type="text"
            placeholder="Pesquise um Aluno"
            onClick={() => navigate('/PesquisarAluno')}
          />
        </li>
        <li><Link to="/#">Solicitações</Link></li>
        <li><Link to="/VisualizarContaCoordenador">Conta</Link></li>
        <li>
          <Link to="/docente">
            <img src="/images/engrenagem.png" alt="Engrenagem" />
          </Link>
        </li>
      </CabecalhoPages>

      <div className="container-alunos">
        <label htmlFor="filtro-curso">Filtrar por curso:</label>
        <select
          id="filtro-curso"
          value={cursoSelecionado}
          onChange={(e) => setCursoSelecionado(e.target.value)}
        >
          <option value="">Todos os cursos</option>
          {cursos.map((curso, index) => (
            <option key={index} value={curso}>
              {curso}
            </option>
          ))}
        </select>

        <ul className="lista-alunos">
          {alunosFiltrados.map((aluno) => (
            <li key={aluno.id}>
              {aluno.nome} - Curso: {aluno.curso}
            </li>
          ))}
        </ul>
      </div>

      <Rodape />
    </>
  );
}

export default PesquisarAlunos;

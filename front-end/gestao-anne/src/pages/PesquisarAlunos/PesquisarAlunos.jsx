import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import Rodape from '../../components/Rodape/Rodape';
import BoxAluno from '../../components/BoxAluno/BoxAluno';
import DetalhesAluno from '../../components/DetalhesAluno/DetalhesAluno';
import './PesquisarAlunos.css';

function PesquisarAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [cursoSelecionado, setCursoSelecionado] = useState("");
  const [termoBusca, setTermoBusca] = useState("");
  const [alunoExpandido, setAlunoExpandido] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/alunos")
      .then((res) => res.json())
      .then((data) => {
        const alunosValidos = data.filter(aluno => aluno.curso);
        setAlunos(alunosValidos);
        const cursosUnicos = [...new Set(alunosValidos.map((aluno) => aluno.curso))];
        setCursos(cursosUnicos);
      })
      .catch((err) => console.error("Erro ao buscar alunos:", err));
  }, []);

  const alunosFiltrados = alunos.filter((aluno) => {
    const condicaoCurso = cursoSelecionado ? aluno.curso === cursoSelecionado : true;
    const condicaoBusca = aluno.nome.toLowerCase().includes(termoBusca.toLowerCase());
    return condicaoCurso && condicaoBusca;
  });

  return (
    <>
      <CabecalhoPages rotaAtual={location.pathname}>
        <li key="inicio"><Link to="/#">Início</Link></li>
        <li key="ocorrencias"><Link to="/#">Ocorrências</Link></li>
        <li key="pesquisar">
          <input
            id="pesquisar-aluno"
            className="input-pesquisar-aluno"
            type="text"
            placeholder="Pesquise um Aluno"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </li>
        <li key="solicitacoes"><Link to="/#">Solicitações</Link></li>
        <li key="conta"><Link to="/VisualizarContaCoordenador">Conta</Link></li>
        <li key="egrenagem">
          <Link to="/docente">
            <img src="/images/engrenagem.png" alt="Engrenagem" />
          </Link>
        </li>
      </CabecalhoPages>

      <div className="container-alunos">
        <div className="filtro">
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
        </div>


        <div className="lista-alunos">
          {alunosFiltrados.length > 0 ? (
            alunosFiltrados.map((aluno, index) => (
              <div key={aluno.id}>
                <BoxAluno
                  imagem={aluno.imagem || "/images/perfil.png"}
                  nome={aluno.nome}
                  curso={aluno.curso}
                  onVisualizar={() =>
                    setAlunoExpandido(alunoExpandido === aluno.id ? null : aluno.id)
                  }
                  cor={index % 2 === 0 ? "claro" : "escuro"}
                />
                {alunoExpandido === aluno.id && (
                  <DetalhesAluno idAluno={aluno.id} curso={aluno.curso} />
                )}
              </div>
            ))
          ) : (
            <div className="nenhum-resultado">
              <div className="imagens-notfound">
                <img src="/images/lupa.png" alt="Nenhum resultado" />
                <img src="/images/joia-baixa.png" alt="" />
              </div>
              <p>Nenhum aluno "{termoBusca}" encontrado</p>
            </div>
          )}
        </div>


      </div>

      <Rodape />
    </>
  );
}

export default PesquisarAlunos;


import './MenuCadastro.css';
import { NavLink } from 'react-router-dom';
import CabecalhoPages from '../CabecalhoPages/CabecalhoPages';
import { useNavigate } from 'react-router-dom';


  function irCadastros() {
    navigate('/responsavel');
  }

function MenuCadastro() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container-menu-cadastro">
        <CabecalhoPages rotaAtual={location.pathname}>
          <li key="inicio" ><a href="/#">Início</a></li>
          <li key="ocorrencias" ><a href="/#">Ocorrências</a></li>
          <li key="pesquisar-aluno">
            <input
              className="input-pesquisar-aluno"
              type="text"
              placeholder="Pesquise um Aluno"
              onClick={() => navigate("/PesquisarAluno")}
            />
          </li>
          <li key="solicitacoes"><a href="/#">Solicitações</a></li>
          <li key="conta"><a href="/VisualizarContaCoordenador">Conta</a></li>
          <li key="engrenagem"><img src="/images/engrenagem.png" alt="" /></li>
        </CabecalhoPages>

        <div className="menu">
          <ul>
            <li>  <NavLink
              to="/docente"
              className={({ isActive }) => isActive ? "ativo" : "nativo"}
            >
              DOCENTE
            </NavLink></li>
            <li>|</li>
            <li>  <NavLink
              to="/responsavel"
              className={({ isActive }) => isActive ? "ativo" : "nativo"}
            >
              RESPONSÁVEL
            </NavLink></li>
            <li>|</li>
            <li>  <NavLink
              to="/coordenacao"
              className={({ isActive }) => isActive ? "ativo" : "nativo"}
            >
              COORDENAÇÃO
            </NavLink></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default MenuCadastro;

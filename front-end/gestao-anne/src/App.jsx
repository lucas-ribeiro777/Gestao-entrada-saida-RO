import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroAluno from './pages/CadastroAluno/CadastroAluno';
import CadastroDocente from './pages/CadastroDocente/CadastroDocente';
import CadastroResponsavel from './pages/CadastroResponsavel/CadastroResponsavel';
import LoginGeral from './pages/LoginGeral/LoginGeral';
import EsqueciMinhaSenha from './pages/EsqueciMinhaSenha/EsqueciMinhaSenha';
import VisualizarOcorrenciasAluno from './pages/VisualizarOcorrenciasAluno/VisualizarOcorrenciasAluno';
import VisualizarContaAluno from './pages/VisualizarContaAluno/VisualizarContaAluno';
import CadastroCoordenador from './pages/CadastroCoordenador/CadastroCoordenador';
import VisualizacaoResponsavel from './pages/VisualizacaoResponsavel/VisualizacaoResponsavel';
import InicialResponsavel from './pages/InicialResponsavel/InicialResponsavel';
import VisualizarContaCoordenador from './pages/VisualizarContaCoordenador/VisualizarContaCoordenador';
import InicialAluno from './pages/InicialAluno/InicialAluno';
import InicialProfessor from './pages/InicialProfessor/inicialProfessor';
import VisualizarSolicitacaoAluno from './pages/VisualizarSolicitacaoAluno/VisualizarSolicitacaoAluno';
import PesquisarAluno from './pages/PesquisarAlunos/PesquisarAlunos';
import VisualizarSolicitacaoCoordenador from './pages/VisualizarSolicitacaoCoordenador/VisualizarSolicitacaoCoordenador';
import VerSolicitacaoAluno from './pages/VerSolicitacaoAluno/VerSolicitacaoAluno';
import InicialCoordenador from './pages/InicialCoordenador/InicialCoordenador';
import VisualizarContaProfessor from './pages/VisualizarContaProfessor/VisualizarContaProfessor';
import SolicitacaoProfessor from './pages/SolicitacaoProfessor/SolicitacaoProfessor';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CadastroAluno />} />
        <Route path="/login" element={<LoginGeral />} />
        <Route path="/esqueciminhasenha" element={<EsqueciMinhaSenha />} />
        <Route path="/docente" element={<CadastroDocente />} />
        <Route path="/responsavel" element={<CadastroResponsavel />} />
        <Route path="/coordenacao" element={<CadastroCoordenador />} />
        // Alunos
        <Route path="/visualizarocorrenciasaluno" element={<VisualizarOcorrenciasAluno />} />
        <Route path="/visualizarcontaaluno" element={<VisualizarContaAluno />} /> 
        <Route path="/inicialAluno" element={<InicialAluno />} />
        <Route path="/visualizarsolicitacaoaluno" element={<VisualizarSolicitacaoAluno />} />
        <Route path="/VerSolicitacaoAluno" element={<VerSolicitacaoAluno />} />

        // Professores
        <Route path="/InicialProfessor" element={<InicialProfessor />} />
        <Route path="/visualizarContaProfessor" element={<VisualizarContaProfessor />} />

        // Responsavel
        <Route path="/VisualizacaoResponsavel" element={<VisualizacaoResponsavel />} />
        <Route path="/InicialResponsavel" element={<InicialResponsavel />} />

        // Coordenador
        <Route path="/VisualizarContaCoordenador" element={<VisualizarContaCoordenador />} />
        <Route path="/PesquisarAluno" element={<PesquisarAluno />} />
        <Route path="/VisualizarSolicitacoes" element={<VisualizarSolicitacaoCoordenador />} />
        <Route path="/InicialCoordenador" element={<InicialCoordenador />} />
        <Route path="/SolicitacaoProfessor" element={<SolicitacaoProfessor />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

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
import VerSolicitacaoResponsavel from './pages/VerSolicitacaoResponsavel/VerSolicitacaoResponsavel';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/cadastroaluno" element={<CadastroAluno />} />
        <Route path="/" element={<LoginGeral />} />
        <Route path="/esqueciminhasenha" element={<EsqueciMinhaSenha />} />

        {/* Rotas Aluno */}
        <Route
          path="/inicialAluno"
          element={
            <PrivateRoute allowedTypes={['aluno']}>
              <InicialAluno />
            </PrivateRoute>
          }
        />
        <Route
          path="/visualizarcontaaluno"
          element={
            <PrivateRoute allowedTypes={['aluno']}>
              <VisualizarContaAluno />
            </PrivateRoute>
          }
        />
        <Route
          path="/visualizarsolicitacaoaluno"
          element={
            <PrivateRoute allowedTypes={['aluno']}>
              <VisualizarSolicitacaoAluno />
            </PrivateRoute>
          }
        />
        <Route
          path="/VerSolicitacaoAluno"
          element={
            <PrivateRoute allowedTypes={['aluno']}>
              <VerSolicitacaoAluno />
            </PrivateRoute>
          }
        />

        {/* Rotas Professor */}
        <Route
          path="/InicialProfessor"
          element={
            <PrivateRoute allowedTypes={['professor']}>
              <InicialProfessor />
            </PrivateRoute>
          }
        />
        <Route
          path="/SolicitacaoProfessor"
          element={
            <PrivateRoute allowedTypes={['professor']}>
              <SolicitacaoProfessor />
            </PrivateRoute>
          }
        />
        <Route
          path="/visualizarContaProfessor"
          element={
            <PrivateRoute allowedTypes={['professor']}>
              <VisualizarContaProfessor />
            </PrivateRoute>
          }
        />

        {/* Rotas Responsável */}
        <Route
          path="/InicialResponsavel"
          element={
            <PrivateRoute allowedTypes={['responsavel']}>
              <InicialResponsavel />
            </PrivateRoute>
          }
        />
        <Route
          path="/VisualizacaoResponsavel"
          element={
            <PrivateRoute allowedTypes={['responsavel']}>
              <VisualizacaoResponsavel />
            </PrivateRoute>
          }
        />
        <Route
          path="/VerSolicitacaoResponsavel"
          element={
            <PrivateRoute allowedTypes={['responsavel']}>
              <VerSolicitacaoResponsavel />
            </PrivateRoute>
          }
        />

        {/* Rotas Coordenador */}
        <Route
          path="/InicialCoordenador"
          element={
            <PrivateRoute allowedTypes={['coordenador']}>
              <InicialCoordenador />
            </PrivateRoute>
          }
        />
        <Route
          path="/VisualizarSolicitacoes"
          element={
            <PrivateRoute allowedTypes={['coordenador']}>
              <VisualizarSolicitacaoCoordenador />
            </PrivateRoute>
          }
        />
        <Route
          path="/VisualizarContaCoordenador"
          element={
            <PrivateRoute allowedTypes={['coordenador']}>
              <VisualizarContaCoordenador />
            </PrivateRoute>
          }
        />
        <Route
          path="/docente"
          element={
            <PrivateRoute allowedTypes={['coordenador']}>
              <CadastroDocente />
            </PrivateRoute>
          }
        />
        <Route
          path="/responsavel"
          element={
            <PrivateRoute allowedTypes={['coordenador']}>
              <CadastroResponsavel />
            </PrivateRoute>
          }
        />
        <Route
          path="/coordenacao"
          element={
            <PrivateRoute allowedTypes={['coordenador']}>
              <CadastroCoordenador />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

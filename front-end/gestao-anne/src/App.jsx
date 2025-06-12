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
        <Route path="/visualizarocorrenciasaluno" element={<VisualizarOcorrenciasAluno />} />
        <Route path="/visualizarcontaaluno" element={<VisualizarContaAluno />} />
        <Route path="/VisualizacaoResponsavel" element={<VisualizacaoResponsavel />} />
        <Route path="/InicialResponsavel" element={<InicialResponsavel />} />
        <Route path="/VisualizarContaCoordenador" element={<VisualizarContaCoordenador />} />
        <Route path="/InicialAluno" element={<InicialAluno />} />
        
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroAluno from './pages/CadastroAluno/CadastroAluno';
import CadastroDocente from './pages/CadastroDocente/CadastroDocente';
import CadastroResponsavel from './pages/CadastroResponsavel/CadastroResponsavel';
import CadastroCoordenador from './pages/CadastroCoordenador/CadastroCoordenador';
import LoginGeral from './pages/LoginGeral/LoginGeral';
import EsqueciMinhaSenha from './pages/EsqueciMinhaSenha/EsqueciMinhaSenha';
import VisualizarContaAluno from './pages/VisualizarContaAluno/VisualizarContaAluno'
import VisualizarOcorrenciasAluno from './pages/VisualizarOcorrenciasAluno/VisualizarOcorrenciasAluno';


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
      </Routes>
    </Router>
  );
}

export default App;
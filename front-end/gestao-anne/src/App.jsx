import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuCadastro from './components/MenuCadastro/MenuCadastro';
import CadastroAluno from './pages/CadastroAluno/CadastroAluno';
import CadastroDocente from './pages/CadastroDocente/CadastroDocente';
import CadastroResponsavel from './pages/CadastroResponsavel/CadastroResponsavel';  // corrigido aqui
import CadastroCoordenador from './pages/CadastroCoordenador/CadastroCoordenador';
import Rodape from './components/Rodape/Rodape';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/aluno" element={<CadastroAluno />} />
          <Route path="/docente" element={<CadastroDocente />} />
          <Route path="/responsavel" element={<CadastroResponsavel />} />
          <Route path="/coordenacao" element={<CadastroCoordenador />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

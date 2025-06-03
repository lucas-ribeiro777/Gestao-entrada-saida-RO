import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuCadastro from './components/MenuCadastro/MenuCadastro';
import CadastroAluno from '../src/pages/CadastroAluno/CadastroAluno';
import CadastroDocente from '../src/pages/CadastroDocente/CadastroDocente';
import CadastroResponsavel from '../src/pages/CadastroResponsavel/CadastroResponsavel';  // corrigido aqui
import CadastroCoordenador from '../src/pages/CadastroCoordenador/CadastroCoordenador';
import Rodape from '../src/components/Rodape/Rodape';

function App() {
  return (
    <>
      <Router>
        <MenuCadastro />
        <Routes>
          <Route path="/aluno" element={<CadastroAluno />} />
          <Route path="/docente" element={<CadastroDocente />} />
          <Route path="/responsavel" element={<CadastroResponsavel />} />
          <Route path="/coordenacao" element={<CadastroCoordenador />} />
        </Routes>
      </Router>
      <Rodape />
    </>
  );
}

export default App;

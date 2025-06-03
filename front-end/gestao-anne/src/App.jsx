import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CadastroAluno from "./pages/CadastroAluno/CadastroAluno";
import CadastroResponsavel from "./pages/CadastroResponsavel/CadastroResponsavel";
import './App.css'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CadastroAluno />} />
        <Route path="/Cadastro-Responsavel" element={<CadastroResponsavel />} />
        <Route path="/Cadastro-Coordenador" element={<Viloes />} />
        <Route path="/Cadastro-Professor" element={<Favoritos />} />
      </Routes>
    </Router>
  );

}

export default App;


import React from 'react';
import MenuCadastro from "./components/MenuCadastro/MenuCadastro";
import Rodape from "./components/Rodape/Rodape";
import './App.css'
import CadastroResponsavel from './pages/CadastroResponsavel/CadastroResponsavel';

function App() {
  return (
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


    <div className="container-geral">
      <MenuCadastro />
      
      <main className="conteudo-principal">
        < CadastroResponsavel />
      </main>

     <Rodape />
    </div>
     
  );
  
}

export default App;

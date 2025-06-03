
import React from 'react';
import MenuCadastro from "./components/MenuCadastro/MenuCadastro";
import Rodape from "./components/Rodape/Rodape";
import './App.css'
import CadastroResponsavel from './pages/CadastroResponsavel/CadastroResponsavel';

function App() {
  return (

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


import React from 'react';
import Cabecalho from "./components/Cabecalho/Cabecalho";
import Rodape from "./components/Rodape/Rodape";
import './App.css'
import CadastroAluno from './pages/CadastroAluno/CadastroAluno'
import CadastroResponsavel from './pages/CadastroResponsavel/CadastroResponsavel';



function App() {
  return (

    <div className="container-geral">
      <Cabecalho />
      
      <main className="conteudo-principal">
        {/* Aqui vai o conteúdo principal da página */}
      </main>

      <Rodape />
    </div>
  );
    <>
      <CadastroAluno/>
    </>
  
}

export default App;

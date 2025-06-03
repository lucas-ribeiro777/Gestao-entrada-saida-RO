import React from 'react';
import Cabecalho from "./componentes/Cabecalho";
import Rodape from "./componentes/Rodape";
import './App.css'; // Arquivo com os estilos globais


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
}

export default App;

import './MenuCadastro.css';

function MenuCadastro() {
  return (
    <>
      <div className="topo">
        <img src="./images/SENAI_logo_texto.png" alt="SENAI" />
      </div>
      <div className="menu">
        <ul>
          <li><a href="/CadastroAluno">SOU ALUNO</a></li>
          <li>|</li>
          <li><a href="/CadastroDocente">SOU DOCENTE</a></li>
          <li>|</li>
          <li><a href="/CadastroResponsavel">SOU RESPONSÁVEL</a></li>
          <li>|</li>
          <li><a href="/coordenacao">SOU COORDENAÇÃO</a></li>
        </ul>
      </div>
    </>
  );
}

export default MenuCadastro;

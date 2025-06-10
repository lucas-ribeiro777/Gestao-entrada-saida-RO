import './CabecalhoPages.css';

function CabecalhoPages({ children }) {
  return (
    <>
      <div className="topo-pages">
        <img src="./images/LogoSenaiSemAsEscritaDoLado.png" alt="SENAI" />
      </div>
      <div className="menu-pages">
        <ul>{children}</ul>
      </div>
    </>
  );
}

export default CabecalhoPages;

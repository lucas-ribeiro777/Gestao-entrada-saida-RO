import './Rodape.css';

function Rodape() {
  return (
    <footer className="rodape-geral">
      <div className="pt1">
        <p className="titulo-duvidas">DÚVIDAS? ENTRE EM CONTATO!</p>
        <div className="infos">
          <div className="contato">
            <img src="./images/whatsapp.png" alt="Ícone do WhatsApp" />
            <a href="https://wa.me/551432693952" target="_blank" rel="noopener noreferrer" className="link-contato">
              (14) 3269-3952
            </a>
          </div>
          <div className="contato">
            <img src="./images/telefone.png" alt="Ícone de Telefone" />
            <a href="tel:+551432693969" className="link-contato">
              (14) 3269-3969
            </a>
          </div>
        </div>
      </div>

      <div className="pt2">
        <p className="venha">VENHA NOS VISITAR!</p>
        <p>R. Aristeu Rodrigues Sampaio, 271 - Jardim das Nacoes, Lençóis Paulista - SP, 18685-730 </p>
      </div>
    </footer>
  );
}

export default Rodape;
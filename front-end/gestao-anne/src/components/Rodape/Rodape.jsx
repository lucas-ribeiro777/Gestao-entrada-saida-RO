import './Rodape.css';

function Rodape() {
  return (
  <footer className="rodape">
    <div className="pt1">
      <p className="titulo">DÚVIDAS? ENTRE EM CONTATO!</p>
      <div className="infos">
        <div className="contato">
          <img src="./images/whatsapp.png" alt="Ícone do WhatsApp" />
          <p>(XX) XXXXX-XXXX</p>
        </div>
        <div className="contato">
          <img src="./images/telefone.png" alt="Ícone de Telefone" />
          <p>(XX) XXXX-XXXX</p>
        </div>
      </div>
    </div>

    <div className="pt2">
      <p className='venha'>VENHA NOS VISITAR!</p>
      <p>R. Aristeu Rodrigues Sampaio, 271 - Jardim das Nacoes, Lençóis Paulista - SP, 18685-730 </p>
    </div>
  </footer>
);
}

export default Rodape;
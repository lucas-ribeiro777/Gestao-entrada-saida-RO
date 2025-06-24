import './CaixaInfos.css';

function CaixaInfo({ titulo, itens }) {
  return (
    <div className="caixa">
      <div className="titulo-caixa">{titulo}</div>
      {itens.map((item, index) => (
        <div key={index}>
          <div className="item">{item}</div>
          {index !== itens.length - 1 && <div className="linha"></div>}
        </div>
      ))}
    </div>
  );
}

export default CaixaInfo;

import React from 'react';
import './InicialCoordenador.css';
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';

const controleSaidaData = [
  { label: '12:30', value: 35, color: '#E8490F' },
  { label: '15:30', value: 25, color: '#ED9170' },
  { label: '10:50', value: 20, color: '#1F5592' },
  { label: '17:00', value: 20, color: '#87ADD8' },
];

const motivoSaidaData = [
  { label: 'Perda de hora', value: 40, color: '#E8490F' },
  { label: 'Saúde', value: 25, color: '#ED9170' },
  { label: 'Empresa', value: 20, color: '#1F5592' },
  { label: 'Outros', value: 15, color: '#87ADD8' },
];

const renderPizza = (data) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return data.map((item, index) => {
    const dash = (item.value / 100) * circumference;
    const dashOffset = circumference - offset;
    offset += dash;
    return (

      <circle
        key={index}
        r={radius}
        cx="100"
        cy="100"
        fill="transparent"
        stroke={item.color}
        strokeWidth="40"
        strokeDasharray={`${dash} ${circumference - dash}`}
        strokeDashoffset={dashOffset}
      />
    );
  });
};

const InicialCoordenador = () => {
  return (

    <>

    <CabecalhoPages />
    
    <div className="graficos-container">
      <div className="grafico-box">
        <h2>CONTROLE DE SAÍDA</h2>
        <div className="conteudo">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {renderPizza(controleSaidaData)}
          </svg>
          <ul className="legenda">
            {controleSaidaData.map((item, index) => (
              <li key={index}>
                <span className="cor" style={{ backgroundColor: item.color }}></span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grafico-box">
        <h2>MOTIVO DE SAÍDA</h2>
        <div className="conteudo">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {renderPizza(motivoSaidaData)}
          </svg>
          <ul className="legenda">
            {motivoSaidaData.map((item, index) => (
              <li key={index}>
                <span className="cor" style={{ backgroundColor: item.color }}></span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Rodape />
    </div>
    </>
  );
};

export default InicialCoordenador;
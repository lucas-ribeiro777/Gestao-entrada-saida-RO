import React from 'react';
import './InicialCoordenador.css';
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const controleSaidaData = [
  { label: '12:30', value: 36, color: '#E8490F' },
  { label: '15:30', value: 25, color: '#ED9170' },
  { label: '10:50', value: 30, color: '#1F5592' },
  { label: '17:00', value: 9, color: '#87ADD8' },
];
//futuramente, esses dados devem ser obtidos de uma API ou banco de dados com filtro de cursos (talvez)
const motivoSaidaData = [
  { label: 'Perda de hora', value: 40, color: '#E8490F' },
  { label: 'Saúde', value: 25, color: '#ED9170' },
  { label: 'Empresa', value: 20, color: '#1F5592' },
  { label: 'Outros', value: 15, color: '#87ADD8' },
];

const renderPizzaCheia = (data) => {
  const radius = 100;
  const center = 100;
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let startAngle = 0;

  return data.map((item, index) => {
    const sliceAngle = (item.value / total) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;

    // Ponto inicial do arco (na circunferência)
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);

    // Ponto final do arco
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    // Flag para arco grande (maior que 180 graus)
    const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

    const pathData = `
      M ${center} ${center} 
      L ${x1} ${y1} 
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} 
      Z
    `;

    startAngle = endAngle;

    return <path key={index} d={pathData} fill={item.color} />;
  });
};


const InicialCoordenador = () => {
  return (
    <>
      <CabecalhoPages rotaAtual={location.pathname}>
        <li><Link to="/InicialCoordenador">Início</Link></li>
        <li><Link to="/#">Ocorrências</Link></li>
        <li>
          <input
            className="input-pesquisar-aluno"
            type="text"
            placeholder="Pesquise um Aluno"
            onClick={() => navigate("/PesquisarAluno")}
          />
        </li>
        <li><Link to="/VisualizarSolicitacoes">Solicitações</Link></li>
        <li><Link to="/VisualizarContaCoordenador">Conta</Link></li>
        <li>
          <Link to="/docente">
            <img src="/images/engrenagem.png" alt="" />
          </Link>
        </li>
      </CabecalhoPages>

      <div className="graficos-container">
        <h2 className="titulo-fora">CONTROLE DE SAÍDA</h2>
        <div className="grafico-box">
          <div className="conteudo">
            <svg width="430" height="430" viewBox="0 0 200 200">
              {renderPizzaCheia(controleSaidaData)}
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

        <h2 className="titulo-fora">MOTIVO DE SAÍDA</h2>
        <div className="grafico-box">
          <div className="conteudo invertido">
            <ul className="legenda legenda-esquerda">
              {motivoSaidaData.map((item, index) => (
                <li key={index}>
                  <span className="cor" style={{ backgroundColor: item.color }}></span>
                  {item.label}
                </li>
              ))}
            </ul>
            <svg width="430" height="430" viewBox="0 0 200 200">
              {renderPizzaCheia(motivoSaidaData)}
            </svg>
          </div>
        </div>
      </div>

      <Rodape />
    </>
  );
};

export default InicialCoordenador;
import React, { useEffect, useState } from 'react';
import './InicialCoordenador.css';
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import { useNavigate, Link } from 'react-router-dom';

const renderPizzaCheia = (data, onHover) => {
  const radius = 100;
  const center = 100;
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let startAngle = 0;

  return data.map((item, index) => {
    const sliceAngle = (item.value / total) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);
    const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

    const pathData = `
      M ${center} ${center} 
      L ${x1} ${y1} 
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} 
      Z
    `;

    startAngle = endAngle;

    return (
      <path
        key={index}
        d={pathData}
        fill={item.color}
        onMouseEnter={() => onHover(item)}
        onMouseLeave={() => onHover(null)}
        style={{ cursor: 'pointer' }}
      />
    );
  });
};

const InicialCoordenador = () => {
  const [controleSaidaData, setControleSaidaData] = useState([]);
  const [motivoSaidaData, setMotivoSaidaData] = useState([]);
  const [hoveredControle, setHoveredControle] = useState(null);
  const [hoveredMotivo, setHoveredMotivo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resControle = await fetch('http://localhost:3000/controleSaida');
        const controleData = await resControle.json();

        const resMotivo = await fetch('http://localhost:3000/motivoSaida');
        const motivoData = await resMotivo.json();

        setControleSaidaData(controleData);
        setMotivoSaidaData(motivoData);
      } catch (err) {
        console.error('Erro ao buscar dados dos gráficos:', err);
      }
    };

    fetchData();
  }, []);

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
        <div className="grafico-box conteudo invertido" style={{ position: 'relative' }}>
          {/* Tooltip externo acima */}
          {hoveredControle && (
            <div
              className="tooltip"
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '6px 12px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                borderRadius: '4px',
                pointerEvents: 'none',
                fontSize: '14px',
                transition: 'opacity 0.3s',
                whiteSpace: 'nowrap',
                zIndex: 10,
              }}
            >
              {`${hoveredControle.label}: ${hoveredControle.value}`}
            </div>
          )}
          <svg width="430" height="430" viewBox="0 0 200 200">
            {renderPizzaCheia(controleSaidaData, setHoveredControle)}
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

        <h2 className="titulo-fora">MOTIVO DE SAÍDA</h2>
        <div className="grafico-box conteudo invertido" style={{ position: 'relative' }}>
          {hoveredMotivo && (
            <div
              className="tooltip"
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '6px 12px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                borderRadius: '4px',
                pointerEvents: 'none',
                fontSize: '14px',
                transition: 'opacity 0.3s',
                whiteSpace: 'nowrap',
                zIndex: 10,
              }}
            >
              {`${hoveredMotivo.label}: ${hoveredMotivo.value}`}
            </div>
          )}
          <svg width="430" height="430" viewBox="0 0 200 200">
            {renderPizzaCheia(motivoSaidaData, setHoveredMotivo)}
          </svg>
          <ul className="legenda legenda-esquerda">
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
    </>
  );
};

export default InicialCoordenador;
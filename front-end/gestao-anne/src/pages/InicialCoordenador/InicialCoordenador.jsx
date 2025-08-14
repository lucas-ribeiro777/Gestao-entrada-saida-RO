import React, { useEffect, useState } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import { useNavigate, Link } from 'react-router-dom';
import './InicialCoordenador.css';

const renderPizzaCheia = (data, onHover) => {
  const radius = 100;
  const center = 100;
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let startAngle = 0;

  if (total === 0) return null; // evita divisão por zero

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
  const [cursos, setCursos] = useState([]);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  const [motivosData, setMotivosData] = useState([]);
  const [horariosData, setHorariosData] = useState([]);

  const [hoveredMotivo, setHoveredMotivo] = useState(null);
  const [hoveredHorario, setHoveredHorario] = useState(null);

  const navigate = useNavigate();

  // Paleta de azul pastel
  const pastelBlueColors = [
    '#A9CCE3', // azul claro pastel
    '#AED6F1',
    '#85C1E9',
    '#5DADE2',
    '#5499C7',
    '#2980B9',
    '#2471A3',
    '#1F618D',
    '#1A5276',
    '#154360',
  ];

  const getPastelBlueColor = (index) => pastelBlueColors[index % pastelBlueColors.length];

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await fetch('http://10.90.146.16:5121/api/Grafico/cursos');
        if (!res.ok) throw new Error('Erro ao buscar cursos');
        const data = await res.json();
        console.log('Cursos recebidos:', data);
        setCursos(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCursos();
  }, []);

  useEffect(() => {
    if (!cursoSelecionado) {
      setMotivosData([]);
      setHorariosData([]);
      return;
    }

    const fetchDados = async () => {
      try {
        const res = await fetch(`http://10.90.146.16:5121/api/Grafico/resumo/${cursoSelecionado.id}`);

        if (!res.ok) {
          throw new Error(`Erro na resposta: ${res.status}`);
        }

        const data = await res.json();

        const horariosFormatados = data.horariosMaisFrequentes.map((item, idx) => ({
          label: item.hora,
          value: item.quantidade,
          color: getPastelBlueColor(idx),
        }));

        const motivosFormatados = data.motivosMaisFrequentes.map((item, idx) => ({
          label: item.motivo,
          value: item.quantidade,
          color: getPastelBlueColor(idx + 5), // desloca para cores diferentes das de horários
        }));

        setHorariosData(horariosFormatados);
        setMotivosData(motivosFormatados);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setHorariosData([]);
        setMotivosData([]);
      }
    };

    fetchDados();
  }, [cursoSelecionado]);

  return (
    <>
      <CabecalhoPages rotaAtual={location.pathname}>
        <li><Link to="/InicialCoordenador">Início</Link></li>
        <li><Link to="/VisualizarSolicitacoes">Solicitações</Link></li>
        <li>
          <input
            className="input-pesquisar-aluno"
            type="text"
            placeholder="Pesquise um Aluno"
            onClick={() => navigate('/PesquisarAluno')}
          />
        </li>
        <li><Link to="/VisualizarContaCoordenador">Conta</Link></li>
        <li>
          <Link to="/docente">
            <img src="/images/engrenagem.png" alt="Configurações" />
          </Link>
        </li>
      </CabecalhoPages>

      <div className='div-select-cursos'>
        <label htmlFor="selectCurso" className="select-cursos-label">Selecione o curso:</label>
        <select
          id="selectCurso"
          value={cursoSelecionado ? cursoSelecionado.id : ''}
          onChange={e => {
            const curso = cursos.find(c => c.id === Number(e.target.value));
            setCursoSelecionado(curso || null);
          }}
          className="select-cursos"
        >
          <option value="">-- Escolha um curso --</option>
          {cursos.map(curso => (
            <option key={curso.id} value={curso.id}>
              {curso.nomeCurso || curso.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="graficos-container">
        <h2>Motivos Mais Frequentes</h2>
        <div className="grafico-box conteudo invertido" style={{ position: 'relative' }}>
          {motivosData.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
              Sem dados para o gráfico de motivos.
            </p>
          ) : (
            <>
              {hoveredMotivo && (
                <div className="tooltip" style={{
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
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                }}>
                  {`${hoveredMotivo.label}: ${hoveredMotivo.value}`}
                </div>
              )}
              <svg width="430" height="430" viewBox="0 0 200 200">
                {renderPizzaCheia(motivosData, setHoveredMotivo)}
              </svg>
              <ul className="legenda legenda-esquerda">
                {motivosData.map((item, i) => (
                  <li key={i}>
                    <span className="cor" style={{ backgroundColor: item.color }}></span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <h2>Horários Mais Frequentes</h2>
        <div className="grafico-box conteudo invertido" style={{ position: 'relative' }}>
          {horariosData.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
              Sem dados para o gráfico de horários.
            </p>
          ) : (
            <>
              {hoveredHorario && (
                <div className="tooltip" style={{
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
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                }}>
                  {`${hoveredHorario.label}: ${hoveredHorario.value}`}
                </div>
              )}
              <svg width="430" height="430" viewBox="0 0 200 200">
                {renderPizzaCheia(horariosData, setHoveredHorario)}
              </svg>
              <ul className="legenda">
                {horariosData.map((item, i) => (
                  <li key={i}>
                    <span className="cor" style={{ backgroundColor: item.color }}></span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <Rodape />
    </>
  );
};

export default InicialCoordenador;

import './DetalhesAluno.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function DetalhesAluno({ idAluno, curso }) {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [ocorrencias, setOcorrencias] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/solicitacoes')
      .then(res => res.json())
      .then(data => {
        const doAluno = data.filter(s => s.id_aluno === idAluno);
        setSolicitacoes(doAluno);
      });

    fetch('http://localhost:3000/ocorrencias')
      .then(res => res.json())
      .then(data => {
        const doAluno = data.filter(o => o.id_aluno === idAluno);
        setOcorrencias(doAluno);
      });
  }, [idAluno]);

  const formatarDataHora = (datahora) => {
    const [data, hora] = datahora.split(' ');
    return { data, hora };
  };

  return (
    <div className="detalhes-aluno">
      {solicitacoes.map((s, i) => {
        const { data, hora } = formatarDataHora(s.datahora);
        const tipo = s.tipo.toLowerCase();
        return (
          <div className={`box-${tipo}`} key={i}>
            <strong>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</strong>
            <span>{data}</span>
            <span>{hora}</span>
            <span>{curso}</span>
          </div>
        );
      })}

      {ocorrencias.map((o, i) => {
        const { data, hora } = formatarDataHora(o.datahora);
        return (
          <div className="box-ocorrencia" key={`ocorrencia-${i}`}>
            <strong>Ocorrência</strong>
            <span>{data}</span>
            <span>{hora}</span>
            <span>{o.motivo}</span>
          </div>
        );
      })}
    </div>
  );
}

DetalhesAluno.propTypes = {
  idAluno: PropTypes.number.isRequired,
  curso: PropTypes.string.isRequired,
};

export default DetalhesAluno;

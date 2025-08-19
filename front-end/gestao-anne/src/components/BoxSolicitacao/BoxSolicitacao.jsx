import './BoxSolicitacao.css';
import PropTypes from 'prop-types';

function BoxSolicitacao({ imagem, nome, curso, data, horario, motivo, tipo, cor = 'escuro' }) {
  return (
    <div className={`box-solicitacao ${cor}`}>
      <img className="aluno-foto" src={imagem} alt={`Foto de ${nome}`} />
      <div className="info-solicitacao">    
        <div className="infos1">
            <p className="aluno-nome">{nome}</p>
            <p className="aluno-curso2">{curso}</p>
        </div>
        <div className="infos2">
            <p>DATA: {data}</p>
            <p>HORÁRIO: {horario}</p>
            <p>MOTIVO DA SOLICITAÇÃO: {motivo}</p>
            <p>TIPO DE SOLICITAÇÃO: {tipo}</p>
        </div>
      </div>
    </div>
  );
}

BoxSolicitacao.propTypes = {
  imagem: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  curso: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  horario: PropTypes.string.isRequired,
  motivo: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  cor: PropTypes.oneOf(['claro', 'escuro', 'laranja']),
};

export default BoxSolicitacao;

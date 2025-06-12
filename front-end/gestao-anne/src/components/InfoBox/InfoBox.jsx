import './InfoBox.css';
import { Pencil } from 'lucide-react'; // ou outro pacote de ícones
import PropTypes from 'prop-types';

const InfoBox = ({ icone, texto, onEditar, editavel = true, cor = 'escuro' }) => {
  return (
    <div className={`info-box ${cor === 'escuro' ? 'escuro' : 'claro'}`}>
      <div className="info-icone">{icone}</div>
      <div className="info-texto">{texto}</div>
      {editavel && (
        <button className="info-editar" onClick={onEditar}>
          <Pencil size={18} color="#fff" />
        </button>
      )}
    </div>
  );
};

InfoBox.propTypes = {
  icone: PropTypes.element.isRequired,
  texto: PropTypes.string.isRequired,
  onEditar: PropTypes.func,
  editavel: PropTypes.bool,
  cor: PropTypes.oneOf(['claro', 'escuro']),
};

export default InfoBox;

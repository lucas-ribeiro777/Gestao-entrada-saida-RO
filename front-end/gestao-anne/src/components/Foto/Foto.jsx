import './Foto.css';
import { useState } from 'react';

function Foto({ onFotoSelecionada }) {
  const [imagemPreview, setImagemPreview] = useState('./images/perfil.png');

  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagemPreview(previewURL);
      onFotoSelecionada(file);
    }
  };

  return (
    <div className="container">
      <h2>Foto de Perfil</h2>

      <div className="imagem">
        <img src={imagemPreview} alt="Foto de Perfil" />
      </div>

      <input 
        type="file" 
        id="foto" 
        name="foto" 
        accept="image/*" 
        onChange={handleImagemChange} 
        hidden 
      />
      <label htmlFor="foto" className="botao1">
        Clique para adicionar <br /> uma foto de perfil
      </label>
    </div>
  );
}

export default Foto;

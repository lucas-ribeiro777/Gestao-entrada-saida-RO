import './Foto.css';
import { useState } from 'react';

function Foto({
  onFotoSelecionada,
  imagem,
  titulo = "Foto de Perfil",
  textoBotao = "Clique para adicionar uma foto de perfil",
  desativarUpload = false
}) {
  const [imagemPreview, setImagemPreview] = useState(imagem || './images/perfil.png');

  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagemPreview(previewURL);
      onFotoSelecionada(file);
    }
  };

  return (
    <div className="container-foto">
      <h2 id="h2">{titulo}</h2>

      <div className="imagem">
        <img src={imagemPreview} alt="Foto de Perfil" />
      </div>

      {!desativarUpload ? (
        <>
          <input 
            type="file" 
            id="foto" 
            name="foto" 
            accept="image/*" 
            onChange={handleImagemChange} 
            hidden 
          />
          <label htmlFor="foto" className="botao1">
            {textoBotao}
          </label>
        </>
      ) : (
        <div className="botao1" style={{ cursor: 'default' }}>
          {textoBotao}
        </div>
      )}
    </div>
  );
}

export default Foto;
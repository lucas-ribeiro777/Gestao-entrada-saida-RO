import React, { useState } from 'react';
import FormCadastroAluno from '../../components/FormCadastroAluno/FormCadastroAluno';
import Foto from '../../components/Foto/Foto';
import Rodape from '../../components/Rodape/Rodape';
import './CadastroAluno.css';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';

function CadastroAluno() {
  const [fotoSelecionada, setFotoSelecionada] = useState(null);


  return (
    <>
      <CabecalhoPages />
      <div className='centro'>
        <Foto onFotoSelecionada={setFotoSelecionada} />
        <FormCadastroAluno 
          tipo="aluno" 
          fotoSelecionada={fotoSelecionada} 
        />
      </div>
      <Rodape />
    </>
  );
}

export default CadastroAluno;

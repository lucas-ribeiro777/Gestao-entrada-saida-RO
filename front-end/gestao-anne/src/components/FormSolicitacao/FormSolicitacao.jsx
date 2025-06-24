import React from 'react';
import './FormSolicitacao.css';

const FormSolicitacao = ({ dados }) => {
  return (
    <form className="form-solicitacao">
      <label>Aluno:</label>
      <input type="text" value={dados.aluno} readOnly />

      <label>Curso:</label>
      <input type="text" value={dados.curso} readOnly />

      <label>Solicito autorização para:</label>
      <div className="radio-group-solicitacao">
        <label><input type="radio" checked={dados.autorizacao === 'Entrar'} readOnly /> Entrar</label>
        <label><input type="radio" checked={dados.autorizacao === 'Saída'} readOnly /> Saída</label>
      </div>

      <label>Motivo:</label>
      <div className="motivos-solicitacao">
        <label><input type="radio-solicitacao" checked={dados.motivo === 'Perda de hora'} readOnly /> Perda de hora</label>
        <label><input type="radio-solicitacao" checked={dados.motivo === 'Saúde'} readOnly /> Saúde</label>
        <label><input type="radio-solicitacao" checked={dados.motivo === 'Condução'} readOnly /> Condução</label>
        <label><input type="radio-solicitacao" checked={dados.motivo === 'Empresa'} readOnly /> Empresa</label>
        <label><input type="radio-solicitacao" checked={dados.motivo === 'Interesse particular'} readOnly /> Interesse particular</label>
      </div>
      <input type="text" value={dados.outroMotivo || ''} readOnly />

      <label>Hora do retorno:</label>
      <input type="time" value={dados.horaRetorno} readOnly />

      <label>Data:</label>
      <input type="date" value={dados.data} readOnly />

      <label>Assinatura do docente:</label>
      <input type="text" value={dados.assinaturaDocente} readOnly />

      <label>Coordenação:</label>
      <input type="text" value={dados.coordenacao} readOnly />

      <label>Aluno:</label>
      <input type="text" value={dados.nomeAluno} readOnly />

      <label>Responsável:</label>
      <input type="text" value={dados.responsavel} readOnly />

      <p className="termo-solicitacao">
        Declaro estar ciente das normas estabelecidas pela escola quanto à entrada com atraso ou saída antecipada.
      </p>

      <button className="botao-solicitar" disabled>SOLICITAÇÃO ENVIADA</button>
    </form>
  );
};

export default FormSolicitacao;

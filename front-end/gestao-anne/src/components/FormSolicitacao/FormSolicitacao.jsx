import React from 'react';
import './FormSolicitacao.css';

const FormSolicitacao = ({ dados }) => (
  <form className="form-solicitacao">
    <div className="cabecalho-escola">
      <img className="logo-senai" src="/images/LogoSenaiSemAsEscritaDoLado.png" alt="Logo SENAI" />
      <div className="info-escola">
        <h2>Escola SENAI - Lençóis Paulista</h2>
        <p>Controle de entradas e saídas fora do horário - CT 7.92</p>
      </div>
    </div>

    <div className="campo-dual">
      <div className="campo-metade">
        <label className="label-grande">Aluno:</label>
        <input type="text" value={dados.aluno} readOnly />
      </div>
      <div className="campo-metade">
        <label className="label-grande">Curso:</label>
        <input type="text" value={dados.curso} readOnly />
      </div>
    </div>

    <label className="label-grande full">Solicito autorização para:</label>
    <div className="radio-group-solicitacao full">
      <label><input type="radio" checked={dados.autorizacao === 'Entrar'} readOnly /> Entrar</label>
      <label><input type="radio" checked={dados.autorizacao === 'Saída'} readOnly /> Saída</label>
    </div>

    <label className="label-grande full">Motivo:</label>
    <div className="motivos-solicitacao full">
      {['Perda de hora','Saúde','Condução','Empresa','Interesse particular'].map(mot => (
        <label key={mot}>
          <input type="radio" checked={dados.motivo===mot} readOnly /> {mot}
        </label>
      ))}
    </div>

    <div className="campo-dual">
      <div className="campo-metade">
        <label className="label-media">Hora do retorno:</label>
        <input type="time" value={dados.horaRetorno||''} readOnly />
      </div>
      <div className="campo-metade">
        <label className="label-media">Data:</label>
        <input type="date" value={dados.data||''} readOnly />
      </div>
    </div>

    <div className="assinaturas-pares full">
      <div className="campo-assinatura">
        <label className="label-media">Assinatura do docente:</label>
        <input type="text" value={dados.assinaturaDocente} readOnly />
      </div>
      <div className="campo-assinatura">
        <label className="label-media">Coordenação:</label>
        <input type="text" value={dados.coordenacao} readOnly />
      </div>
    </div>
    <div className="assinaturas-pares full">
      <div className="campo-assinatura">
        <label className="label-media">Aluno:</label>
        <input type="text" value={dados.nomeAluno} readOnly />
      </div>
      <div className="campo-assinatura">
        <label className="label-media">Responsável:</label>
        <input type="text" value={dados.responsavel} readOnly />
      </div>
    </div>

    <p className="termo-solicitacao">
      Declaro estar ciente das normas estabelecidas pela escola quanto à entrada com atraso ou saída antecipada.
    </p>

    <button className="botao-solicitar" type="button">SOLICITAR</button>
  </form>
);

export default FormSolicitacao;

import React, { useState } from 'react';
import './FormSolicitacao.css';

const FormSolicitacao = ({ dados }) => {
  const [formData, setFormData] = useState({
    aluno: '',
    curso: '',
    autorizacao: '',
    motivo: '',
    horaRetorno: '',
    data: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { aluno, curso, autorizacao, motivo, data } = formData;
    if (!aluno || !curso || !autorizacao || !motivo || !data) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    alert('Solicitação enviada com sucesso!');
    console.log(formData);
  };

  return (
    <form className="form-solicitacao" onSubmit={handleSubmit}>
      <div className="cabecalho-escola">
        <img className="logo-senai" src="/images/LogoSenaiSemAsEscritaDoLado.png" alt="Logo SENAI" />
        <div className="info-escola">
          <h2>Escola SENAI - Lençóis Paulista</h2>
          <p>Controle de entradas e saídas fora do horário - CT 7.92</p>
        </div>
      </div>

      <div className="campo-single">
        <label className="label-grande">Aluno:</label>
        <input type="text" name="aluno" value={formData.aluno} onChange={handleChange} />
      </div>

      <div className="campo-single">
        <label className="label-grande">Curso:</label>
        <select id="curso" name="curso" value={formData.curso} onChange={handleChange} required >
        <option value="">Selecione o curso</option>
            <option value="Eletricista de Manutenção Eletroeletrônica - AI3EEM-T6">Eletricista de Manutenção Eletroeletrônica -  Manhã - Segunda a Sexta-feira</option>
            <option value="Eletricista de Manutenção Eletroeletrônica - AI1EET-T7">Eletricista de Manutenção Eletroeletrônica - Tarde - Segunda a Sexta-feira</option>
            <option value="Mecânico de Manutenção - AI3MMM-T6">Mecânico de Manutenção - Manhã - Segunda a Sexta-feira</option>
            <option value="Caldeireiro - A1CALM-T4">Caldeireiro - Manhã - Segunda a Sexta-feira</option>
            <option value="Caldeireiro - A1CALT-T4">Caldeireiro - Tarde - Segunda a Sexta-feira</option>
            <option value="Mecânico de Manutenção de Máquinas Agrícolas e Veículos Pesados - A4-MMARV-23">Mecânico de Manutenção de Máquinas Agrícolas e Veículos Pesados - Tarde - Segunda a Sexta-feira</option>
            <option value="Mecânico de Manutenção de Veículos Pesados Rodoviários - MMVPR-2S-2024">Mecânico de Manutenção de Veículos Pesados Rodoviários - Tarde - Segunda a Sexta-feira</option>
            <option value="Auxiliar de Mecânico de Veículos Pesados - AUX.MVP2S-2024">Auxiliar de Mecânico de Veículos Pesados - Manhã - Segunda a Sexta-feira</option>
            <option value="Auxiliar de Linha de Produção - AUXLPROD-2-2024">Auxiliar de Linha de Produção - Tarde -Segunda a Sexta-feira</option>
            <option value="Operador de Processos Logísticos - AIOPLOG-1S-2025">Operador de Processos Logísticos - Tarde - Segunda a Sexta-feira</option>
            <option value="Técnico em Eletroeletrônica - T3EEM-T9">Técnico em Eletroeletrônica - Manhã - Segunda a Sexta-feira</option>
            <option value="Técnico em Manutenção de Máquinas Industriais - T3MMI-DEXCO-24">Técnico em Manutenção de Máquinas Industriais - Manhã - Segunda a Sexta-feira</option>
            <option value="Técnico em Instrumentação Industrial - T1INSTRUM-T2">Técnico em Instrumentação Industrial - Tarde - Segunda a Sexta-feira</option>
            <option value="Técnico em Manutenção de Máquinas Industriais - T1MMT-T5">Técnico em Manutenção de Máquinas Industriais - Tarde - Segunda a Sexta-feira</option>
            <option value="Técnico em Desenvolvimento de Sistemas - TECDVS2S-LP">Técnico em Desenvolvimento de Sistemas - Integral - Terça e Quinta-feira</option>
            <option value="Técnico em Desenvolvimento de Sistemas - TECDVSS1-LP-2025">Técnico em Desenvolvimento de Sistemas - Integral - Quarta e Sexta-feira</option>
            <option value="Técnico em Administração - TECADM1-LP-2025">Técnico em Administração - Integral - Quarta e Sexta-feira</option>
            <option value="Técnico em Manutenção de Máquinas Industriais - T2MMI-SEDUC-24">Técnico em Manutenção de Máquinas Industriais - Integral - Segunda e Terça-feira</option>
            <option value="Técnico em Eletroeletrônica - TEE-SEDUC-VB-25">Técnico em Eletroeletrônica - Integral - Segunda e Terça-feira</option>
            <option value="Técnico em Manutenção de Máquinas Industriais - TMM-SEDUC-VC-25">Técnico em Manutenção de Máquinas Industriais - Integral - Segunda e Terça-feira</option>
            <option value="Técnico em Manutenção de Máquinas Industriais - TMM-SEDUC-RP-25">Técnico em Manutenção de Máquinas Industriais -  Integral - Quinta e Sexta-feira</option>
          </select>
      </div>

      <label className="label-grande full">Solicito autorização para:</label>
      <div className="radio-group-solicitacao full">
        <label>
          <input type="radio" name="autorizacao" value="Entrar" onChange={handleChange} checked={formData.autorizacao === 'Entrar'} />
          Entrar
        </label>
        <label>
          <input type="radio" name="autorizacao" value="Saída" onChange={handleChange} checked={formData.autorizacao === 'Saída'} />
          Saída
        </label>
      </div>

      <label className="label-grande full">Motivo:</label>
      <div className="motivos-solicitacao full">
        {['Perda de hora','Saúde','Condução','Empresa','Interesse particular'].map((mot) => (
          <label key={mot}>
            <input
              type="radio"
              name="motivo"
              value={mot}
              onChange={handleChange}
              checked={formData.motivo === mot}
            />
            {mot}
          </label>
        ))}
      </div>

      <div className="campo-dual">
        <div className="campo-metade">
          <label className="label-media">Hora do retorno:</label>
          <input type="time" name="horaRetorno" value={formData.horaRetorno} onChange={handleChange} />
        </div>
        <div className="campo-metade">
          <label className="label-media">Data:</label>
          <input type="date" name="data" value={formData.data} onChange={handleChange} />
        </div>
      </div>

      <div className="assinaturas-pares full spacing-labels">
        <div className="campo-assinatura">
          <label className="label-media">Assinatura do docente:</label>
          <input type="text" name="assinaturaDocente" value={formData.assinaturaDocente} onChange={handleChange} />
        </div>
        <div className="campo-assinatura">
          <label className="label-media">Coordenação:</label>
          <input type="text" name="coordenacao" value={formData.coordenacao} onChange={handleChange} />
        </div>
      </div>

      <div className="assinaturas-pares full spacing-labels">
        <div className="campo-assinatura">
          <label className="label-media">Aluno:</label>
          <input type="text" name="nomeAluno" value={formData.nomeAluno} onChange={handleChange} />
        </div>
        <div className="campo-assinatura">
          <label className="label-media">Responsável:</label>
          <input type="text" name="responsavel" value={formData.responsavel} onChange={handleChange} />
        </div>
      </div>

      <p className="termo-solicitacao">
        Declaro estar ciente das normas estabelecidas pela escola quanto à entrada com atraso ou saída antecipada.
      </p>

      <button className="botao-solicitar" type="submit">SOLICITAR</button>
    </form>
  );
};

export default FormSolicitacao;
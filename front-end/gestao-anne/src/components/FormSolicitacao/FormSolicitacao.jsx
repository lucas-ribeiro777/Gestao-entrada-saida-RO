import React, { useState, useEffect } from 'react';
import './FormSolicitacao.css';

const FormSolicitacao = ({ dados, tipoUsuario }) => {
  const [formData, setFormData] = useState({
    aluno: '',
    curso: '',
    autorizacao: '',
    motivo: '',
    horaRetorno: '',
    data: '',
    assinaturaDocente: 'Assinatura do Docente',
    coordenacao: 'Assinatura da Coordenação',
    nomeAluno: 'Aluno', // só texto
    responsavel: 'Assinatura do Responsável'
  });

  const [assinaturaAlunoImg, setAssinaturaAlunoImg] = useState(''); // novo estado só pra imagem

  const [cursos, setCursos] = useState([]);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Buscar cursos
  useEffect(() => {
    
    const fetchCursos = async () => {
      try {
        const res = await fetch('http://10.90.146.16:5121/api/Grafico/cursos');
        if (!res.ok) throw new Error('Erro ao buscar cursos');
        const data = await res.json();
        setCursos(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCursos();
  }, []);

  useEffect(() => {
  if (tipoUsuario === "responsavel") {
    handleAssinarAluno();
  }
  }, [tipoUsuario]);


  // Função para buscar assinatura do aluno logado
  const handleAssinarAluno = async () => {
    try {
      const alunoId = localStorage.getItem('usuarioId');
      if (!alunoId) throw new Error('Aluno não está logado');

      const res = await fetch(`http://10.90.146.16:5121/api/Alunos/${alunoId}`);
      if (!res.ok) throw new Error('Erro ao buscar perfil do aluno');

      const alunoData = await res.json();

      // Pega assinatura e nome do aluno
      const assinatura = alunoData.assinatura
        ? `http://10.90.146.16:5121${alunoData.assinatura}`
        : '';
      const nome = alunoData.nome || '';

      // Atualiza os estados
      setAssinaturaAlunoImg(assinatura);
      setFormData((prev) => ({ ...prev, aluno: nome, nomeAluno: nome }));
    } catch (err) {
      console.error(err);
      setErro('Não foi possível carregar o perfil do aluno.');
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setSucesso(false);

    try {
      const alunoId = parseInt(localStorage.getItem('usuarioId'));
      if (!alunoId) throw new Error('Aluno não logado');

      const cursoSelecionado = cursos.find(c => 
        (c.nome_curso) === formData.curso
      );
      if (!cursoSelecionado) throw new Error('Curso inválido');

      const novaSolicitacao = {
        idSolicitacao: 0, // não é null, API espera número
        idAluno: alunoId,
        idCoordenador: 0, // ajuste se houver coordenador
        idResponsavel: 0, // ajuste se houver responsável
        turma: cursoSelecionado.turma || 0,
        tipo: formData.autorizacao,
        dataHora: new Date(`${formData.data}T${formData.horaRetorno || '00:00'}:00`).toISOString(),
        retorno: { ticks: 0 },
        motivo: formData.motivo,
        idNomeCurso: cursoSelecionado.id,
        curso: {
          id: cursoSelecionado.id,
          nomeCurso: cursoSelecionado.nome_curso,
          codigo: cursoSelecionado.codigo || '',
          periodo: cursoSelecionado.periodo || '',
          diasDeAula: cursoSelecionado.dias_de_aula || ''
        }
      };

      console.log('Nova solicitação enviada:', novaSolicitacao);

      const response = await fetch("http://10.90.146.16:5121/api/Solicitacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaSolicitacao)
      });

      if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

      setSucesso(true);
      setFormData({
        aluno: '',
        curso: '',
        autorizacao: '',
        motivo: '',
        horaRetorno: '',
        data: '',
        assinaturaDocente: 'Assinatura do Docente',
        coordenacao: 'Coordenação',
        nomeAluno: 'Clique para assinar',
        responsavel: ''
      });
      setAssinaturaAlunoImg('');
    } catch (error) {
      console.error(error);
      setErro(error.message || 'Ocorreu um erro ao enviar a solicitação.');
    }
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
      <div className="line"></div>

      <div className="campo-single">
        <label className="label-grande">Aluno:</label>
        <input type="text" name="aluno" value={formData.aluno} onChange={handleChange} />
      </div>

      <div className='campo-single'>
        <label htmlFor="selectCurso" className="label-grande">Selecione o curso:</label>
        <select
          id="selectCurso"
          name="curso"
          value={formData.curso}
          onChange={handleChange}
          className="select-cursos"
          required
        >
          <option value="">-- Escolha um curso --</option>
          {cursos.map(curso => (
            <option key={curso.id} value={curso.nomeCurso || curso.nome}>
              {curso.nomeCurso || curso.nome}
            </option>
          ))}
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
          <input type="text" name="assinaturaDocente" value={formData.assinaturaDocente} readOnly />
        </div>
        <div className="campo-assinatura">
          <label className="label-media">Coordenação:</label>
          <input type="text" name="coordenacao" value={formData.coordenacao} readOnly />
        </div>
      </div>

      <div className="assinaturas-pares full spacing-labels">
        {/* Assinatura do Aluno */}
        <div className="campo-assinatura">
          <label className="label-media">Aluno:</label>
          {assinaturaAlunoImg ? (
            <img
              src={assinaturaAlunoImg}
              alt="Assinatura do aluno"
              style={{
                width: '200px',
                height: '50px',
                objectFit: 'contain',
                border: '1px solid #000000ff',
                borderRadius: '20px'
              }}
              className="assinatura-aluno"
            />
          ) : (
            tipoUsuario === "aluno" && (
              <button
                type="button"
                onClick={handleAssinarAluno}
                className="botao-assinar-aluno"
              >
                Clique para assinar
              </button>
            )
          )}
        </div>

        {/* Assinatura do Responsável */}
        <div className="campo-assinatura">
          <label className="label-media">Responsável:</label>
          {tipoUsuario === "responsavel" ? (
            formData.responsavel && formData.responsavel !== 'Assinatura do Responsável' ? (
              <img
                src={formData.responsavel}
                alt="Assinatura do responsável"
                style={{
                  width: '200px',
                  height: '50px',
                  objectFit: 'contain',
                  border: '1px solid #000000ff',
                  borderRadius: '20px'
                }}
                className="assinatura-responsavel"
              />
            ) : (
              <button
                type="button"
                onClick={async () => {
                  try {
                    // Aqui você pode trocar para pegar a assinatura do responsável na API
                    const responsavelId = localStorage.getItem('usuarioId');
                    if (!responsavelId) throw new Error("Responsável não logado");

                    const res = await fetch(`http://10.90.146.16:5121/api/Responsaveis/${responsavelId}`);
                    if (!res.ok) throw new Error("Erro ao buscar assinatura do responsável");

                    const respData = await res.json();
                    const assinaturaResp = respData.assinatura
                      ? `http://10.90.146.16:5121${respData.assinatura}`
                      : '';

                    setFormData((prev) => ({
                      ...prev,
                      responsavel: assinaturaResp
                    }));
                  } catch (err) {
                    console.error(err);
                    setErro("Não foi possível carregar a assinatura do responsável.");
                  }
                }}
                className="botao-assinar-aluno"
              >
                Assinar como responsável
              </button>
            )
          ) : (
            <input
              type="text"
              name="responsavel"
              value={formData.responsavel}
              onChange={handleChange}
              readOnly
            />
          )}
        </div>
      </div>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {sucesso && <p style={{ color: 'green' }}>Solicitação enviada com sucesso!</p>}

      <p className="termo-solicitacao">
        Declaro estar ciente das normas estabelecidas pela escola quanto à entrada com atraso ou saída antecipada.
      </p>

      <button className="botao-solicitar" type="submit">SOLICITAR</button>
    </form>
  );
};

export default FormSolicitacao;

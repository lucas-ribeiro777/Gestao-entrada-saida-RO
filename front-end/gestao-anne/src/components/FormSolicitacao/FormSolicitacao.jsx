import React, { useState, useEffect } from 'react';
import './FormSolicitacao.css';
import ModalRecado from '../ModalRecado/ModalRecado';
import { API_BASE_URL } from '../../constantes';

const FormSolicitacao = ({ dados, tipoUsuario, alunoId }) => {
  const [formData, setFormData] = useState({
    aluno: '',
    curso: '',
    autorizacao: '',
    motivo: '',
    horaSaida: '',
    horaRetorno: '',
    data: '',
    assinaturaDocente: 'Assinatura do Docente',
    coordenacao: 'Assinatura da Coordenação',
    nomeAluno: 'Aluno', 
    responsavel: 'Assinatura do Responsável'
  });

  const [assinaturaAlunoImg, setAssinaturaAlunoImg] = useState('');
  const [cursos, setCursos] = useState([]);
  
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagemModal, setMensagemModal] = useState('');
  const [tituloModal, setTituloModal] = useState('Aviso');

  const abrirModal = (titulo, mensagem) => {
    setTituloModal(titulo);
    setMensagemModal(mensagem);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setMensagemModal('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}api/Grafico/cursos`);
        if (!res.ok) throw new Error('Erro ao buscar cursos');
        const data = await res.json();
        setCursos(data);
      } catch (err) {
        console.error(err);
        abrirModal("Erro", "Não foi possível carregar os cursos.");
      }
    };
    fetchCursos();
  }, []);

  const [alunosVinculados, setAlunosVinculados] = useState([]);
  const [alunoVinculadoId, setAlunoVinculadoId] = useState(null);

  useEffect(() => {
    const fetchAlunosDoResponsavel = async () => {
      if (tipoUsuario !== "responsavel") return;

      try {
        const responsavelId = localStorage.getItem('usuarioId');
        const res = await fetch(`${API_BASE_URL}api/Responsaveis/${responsavelId}`);
        const respData = await res.json();

        if (!Array.isArray(respData.idsAlunos) || respData.idsAlunos.length === 0) {
          throw new Error("Nenhum aluno vinculado a este responsável");
        }

        // Buscar todos os alunos do responsável
        const alunosData = await Promise.all(
          respData.idsAlunos.map(async (id) => {
            const resAluno = await fetch(`${API_BASE_URL}api/Aluno/${id}`);
            const aluno = await resAluno.json();
            return { id, nome: aluno.nome, assinatura: aluno.assinatura };
          })
        );

        setAlunosVinculados(alunosData);
        setAlunoVinculadoId(alunosData[0].id); // seleciona o primeiro como padrão

      } catch (err) {
        console.error(err);
        abrirModal("Erro", "Não foi possível carregar os alunos vinculados.");
      }
    };

    fetchAlunosDoResponsavel();
  }, [tipoUsuario]);


// quando muda o aluno selecionado, carrega assinatura
useEffect(() => {
  const alunoSelecionado = alunosVinculados.find(a => a.id === alunoVinculadoId);
  if (alunoSelecionado) {
    setFormData(prev => ({
      ...prev,
      aluno: alunoSelecionado.nome,
      nomeAluno: alunoSelecionado.nome
    }));
    setAssinaturaAlunoImg(alunoSelecionado.assinatura ? `${API_BASE_URL}${alunoSelecionado.assinatura}` : '');
  }
}, [alunoVinculadoId, alunosVinculados]);


  const handleAssinarAluno = async (alunoId) => {
    try {
      const res = await fetch(`${API_BASE_URL}api/Aluno/${alunoId}`);
      if (!res.ok) throw new Error("Erro ao buscar assinatura do aluno");

      const data = await res.json();
      const assinaturaUrl = data.assinatura ? `${API_BASE_URL}${data.assinatura}` : '';

      setAssinaturaAlunoImg(assinaturaUrl);
      setFormData(prev => ({ 
        ...prev, 
        aluno: localStorage.getItem('nomeAluno') || '', 
        nomeAluno: localStorage.getItem('nomeAluno') || '' 
      }));
    } catch (err) {
      console.error(err);
      abrirModal("Erro", "Não foi possível carregar a assinatura do aluno.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const usuarioId = parseInt(localStorage.getItem('usuarioId'));
      if (!usuarioId) throw new Error(`${tipoUsuario} não logado`);

      const idAlunoFinal = tipoUsuario === "aluno" 
        ? usuarioId 
        : alunoVinculadoId || alunoId;

      if (!idAlunoFinal) throw new Error('ID do aluno não definido');

      const cursoSelecionado = cursos.find(c => String(c.idCurso) === formData.curso);
      if (!cursoSelecionado) throw new Error('Curso inválido');

      if (!formData.autorizacao) throw new Error('Selecione a autorização (Entrada/Saída)');
      if (!formData.motivo) throw new Error('Selecione o motivo da solicitação');
      if (!formData.data || !formData.horaSaida || !formData.horaRetorno) throw new Error('Preencha data, hora de saída e hora de retorno');

      const dataHoraSaida = new Date(`${formData.data}T${formData.horaSaida}`);
      if (isNaN(dataHoraSaida.getTime())) throw new Error("Data ou hora de saída inválida");

      // Pegar o tipo de usuário diretamente do localStorage
      const tipoUsuarioLocalStorage = localStorage.getItem('usuarioTipo'); // Assumindo que você salva no localStorage como 'tipoUsuario'

      // Definir o statusResponsavel com base no tipo de usuário
      const statusResponsavel = tipoUsuarioLocalStorage === "responsavel" ? "Sim" : "Pendente";

      const novaSolicitacao = {
        idSolicitacao: 0,
        idAlunos: Number(idAlunoFinal),
        idNomeCurso: Number(cursoSelecionado.idCurso),
        tipo: formData.autorizacao,
        motivo: formData.motivo,
        dataHora: `${formData.data}T${formData.horaSaida}:00`,
        retorno: formData.horaRetorno,
        statusProfessor: "Pendente",
        statusResponsavel: statusResponsavel, // Usando o valor dinâmico baseado no tipo de usuário
        statusCoordenador: "Pendente"
      };

      const response = await fetch(`${API_BASE_URL}api/Solicitacao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaSolicitacao)
      });

      if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

      abrirModal("Sucesso", "Solicitação enviada com sucesso!");

      setFormData({
        aluno: '',
        curso: '',
        autorizacao: '',
        motivo: '',
        horaSaida: '',
        horaRetorno: '',
        data: '',
        assinaturaDocente: 'Assinatura do Docente',
        coordenacao: 'Coordenação',
        nomeAluno: 'Clique para assinar',
        responsavel: 'Assinatura do Responsável'
      });
      setAssinaturaAlunoImg('');
    } catch (error) {
      console.error(error);
      abrirModal("Erro", error.message || 'Ocorreu um erro ao enviar a solicitação.');
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

      <div className='campo-single'>
        <label htmlFor="selectCurso" className="label-grande">Selecione o curso:</label>
        <select
          name="curso"
          value={formData.curso}
          onChange={handleChange}
        >
          <option value="">Selecione um curso</option>
          {cursos.map(curso => (
            <option key={curso.idCurso} value={String(curso.idCurso)}>
              {curso.nomeCurso}
              {curso.periodo ? ` - ${curso.periodo}` : ''}
            </option>
          ))}
        </select>
      </div>

      <label className="label-grande full">Solicito autorização para:</label>
      <div className="radio-group-solicitacao full">
        <label>
          <input type="radio" name="autorizacao" value="Entrada" onChange={handleChange} checked={formData.autorizacao === 'Entrada'} />
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
          <label className="label-media">Hora da saida:</label>
          <input type="time" name="horaSaida" value={formData.horaSaida} onChange={handleChange} />
        </div>        
        <div className="campo-metade">
          <label className="label-media">Hora do retorno:</label>
          <input type="time" name="horaRetorno" value={formData.horaRetorno} onChange={handleChange} />
        </div>
        <div className="campo-metade">
          <label className="label-media">Data:</label>
          <input id="data-arrumar" type="date" name="data" value={formData.data} onChange={handleChange} />
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
        <div className="campo-assinatura">
          <label className="label-media">Aluno:</label>
          {assinaturaAlunoImg ? (
            <img
              src={assinaturaAlunoImg}
              alt="Assinatura do aluno"
              style={{ width: '200px', height: '50px', objectFit: 'contain', border: '1px solid #000', borderRadius: '70px' }}
            />
          ) : tipoUsuario === "aluno" ? (
            
            <button type="button" onClick={() => handleAssinarAluno(localStorage.getItem('usuarioId'))} className='botao-assinar-aluno'>
              Clique para assinar
            </button>
          ) : (
            <p>{formData.nomeAluno}</p>
          )}
        </div>

        <div className="campo-assinatura">
          {tipoUsuario === "responsavel" && alunosVinculados.length > 0 && (
            <div className="campo-single full">
              <label htmlFor="selectAluno" className="label-media">Selecione o filho:</label>
              <select
                id="selectAluno"
                value={alunoVinculadoId || ''}
                onChange={(e) => setAlunoVinculadoId(Number(e.target.value))}
              >
                {alunosVinculados.map((aluno) => (
                  <option key={aluno.id} value={aluno.id}>
                     {aluno.nome}
                  </option> 
                ))}
              </select>
            </div>
          )}

        </div>
      </div>

      <p className="termo-solicitacao">
        Declaro estar ciente das normas estabelecidas pela escola quanto à entrada com atraso ou saída antecipada.
      </p>

      <button className="botao-solicitar" type="submit">SOLICITAR</button>
      
      <ModalRecado
        aberto={modalAberto}
        titulo={tituloModal}
        mensagem={mensagemModal}
        aoFechar={fecharModal}
      />      
    </form>


  );
};

export default FormSolicitacao;
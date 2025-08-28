import Botao from '../Botao/Botao';
import CampoTexto from '../CampoTexto/CampoTexto';
import CriarAssinatura from '../CriarAssinatura/CriarAssinatura';
import Termos from '../Termos/Termos';
import ModalRecado from '../ModalRecado/ModalRecado';
import './FormCadastroDocente.css';
import React, { useState, useEffect } from 'react';

function FormCadastroDocente() {
  const [modalAberto, setModalAberto] = useState(false);
  const [assinaturaImg, setAssinaturaImg] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [termosValidos, setTermosValidos] = useState(false);

  const [todosCursos, setTodosCursos] = useState([]); 
  const [cursosSelecionados, setCursosSelecionados] = useState(['']); 

  const [modalRecadoAberto, setModalRecadoAberto] = useState(false);
  const [mensagemRecado, setMensagemRecado] = useState("");

  function mostrarRecado(msg) {
    setMensagemRecado(msg);
    setModalRecadoAberto(true);
  }

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await fetch('http://10.90.146.16:5121/api/Grafico/cursos');
        if (!res.ok) throw new Error('Erro ao buscar cursos');
        const data = await res.json();
        setTodosCursos(data);
        console.log("Cursos recebidos da API:", data);

      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    };
    fetchCursos();
  }, []);

  function handleCursoChange(index, value) {
    const novos = [...cursosSelecionados];
    novos[index] = value;
    setCursosSelecionados(novos);
  }

  function adicionarCurso() {
    setCursosSelecionados([...cursosSelecionados, '']);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const cursosIds = cursosSelecionados
      .filter(c => c) 
      .map(id => Number(id));

    if (!nome || !email || !senha) {
      mostrarRecado("Nome, email e senha são obrigatórios.");
      return;
    }

    if (cursosIds.length === 0) {
      mostrarRecado("Selecione pelo menos um curso.");
      return;
    }

    const body = {
      nome,
      email,
      telefone: telefone || "",  
      senha,
      cursosIds: cursosIds
    };

    console.log("Enviando para API:", body);

    try {
      const response = await fetch("http://10.90.146.16:5121/api/Professor", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        mostrarRecado("Cadastro realizado com sucesso!");
        // Reset campos
        setNome('');
        setEmail('');
        setTelefone('');
        setSenha('');
        setConfirmarSenha('');
        setAssinaturaImg(null);
        setCursosSelecionados(['']);
      } else {
        const erro = await response.json();
        mostrarRecado(`Erro no cadastro: ${JSON.stringify(erro.errors || erro)}`);
      }
    } catch (error) {
      mostrarRecado("Erro na comunicação com a API.");
      console.error(error);
    }
  }



  return (
    <>
      <form className="formulario" onSubmit={handleSubmit}>
        <h2 className="titulo">Preencha os dados para cadastrar um DOCENTE</h2>

        <div className="campos">
          <CampoTexto valor={nome} onChange={e => setNome(e.target.value)} label="Nome" placeholder="Digite Algo..." />
          <CampoTexto valor={email} onChange={e => setEmail(e.target.value)} label="E-mail" placeholder="Digite Algo..." />

          <div className="linha2">
            <CampoTexto id="senha" label="Senha" valor={senha} onChange={e => setSenha(e.target.value)} placeholder="Digite Sua Senha..." senha={true} />
            <CampoTexto id="confirmarSenha" label="Confirmar Senha" valor={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} placeholder="Confirme Sua Senha..." senha={true} />
          </div>

          <div className="linha1-docente">
            <CampoTexto valor={telefone} onChange={e => setTelefone(e.target.value)} label="Telefone" placeholder="(14...)" />
          </div>

          {cursosSelecionados.map((cursoId, i) => (
            <div key={i} className="linha1-docente">
              <label className='label-docente'>Curso {i + 1}</label>
              <select
                value={cursoId || ''}
                onChange={e => handleCursoChange(i, e.target.value)}
                className='select-docente'
              >
                <option value="">Selecione um curso</option>
                {todosCursos.map(curso => (
                <option key={curso.idCurso} value={curso.idCurso}>
                  {curso.nomeCurso}{curso.periodo ? ` - ${curso.periodo}` : ''}
                </option>
                ))}
              </select>
          
            </div>
          ))}
          <div className="divdobotao">
            <button type="button" onClick={adicionarCurso} className="botao-add-curso">
              <strong>+</strong>     Adicionar curso
            </button>               
          </div>


        </div>

        <Termos onValidadeChange={setTermosValidos} />

        <Botao descricao="Concluir Cadastro" type="submit" />
      </form>

      <ModalRecado aberto={modalRecadoAberto} mensagem={mensagemRecado} aoFechar={() => setModalRecadoAberto(false)} />
    </>
  );
}

export default FormCadastroDocente;

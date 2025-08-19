import './VisualizarContaAluno.css';
import { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import Foto from '../../components/Foto/Foto';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import { Link } from 'react-router-dom';
import InfoBox from '../../components/InfoBox/InfoBox';

const VisualizarContaAluno = () => {
  const [dados, setDados] = useState({
    nome: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    responsavel: '',
  });

  const [imagemPerfil, setImagemPerfil] = useState('');
  const [erroFoto, setErroFoto] = useState('');
  const alunoId = localStorage.getItem('usuarioId'); 
  const [larguraTela, setLarguraTela] = useState(window.innerWidth);

  const formatarData = (dataISO) => {
    if (!dataISO) return '';
    const [data] = dataISO.split('T');
    const partes = data.split('-');
    if (partes.length !== 3) return dataISO;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  useEffect(() => {
    const buscarDadosDoAluno = async () => {
      if (!alunoId) return;

      try {
        const respostaAluno = await fetch(`http://10.90.146.16:5121/api/Alunos/${alunoId}`);
        if (!respostaAluno.ok) throw new Error('Falha na resposta da API do aluno');

        const aluno = await respostaAluno.json();

        const responsavelId = aluno.alunosResponsaveis?.[0]?.idResponsavel || null;
        let nomeResponsavel = '';

        if (responsavelId) {
          const respostaResponsavel = await fetch(`http://10.90.146.16:5121/api/Responsaveis/${responsavelId}`);
          if (!respostaResponsavel.ok) throw new Error('Falha na resposta da API do responsável');

          const responsavel = await respostaResponsavel.json();
          nomeResponsavel = responsavel.nome || '';
        }

        setDados({
          nome: aluno.nome,
          dataNascimento: aluno.dataNascimento,
          email: aluno.email,
          telefone: aluno.telefone,
          responsavel: nomeResponsavel,
        });

        setImagemPerfil(aluno.imagem ? `http://10.90.146.16:5121${aluno.imagem}` : '/images/default-profile.png');
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
      }
    };

    buscarDadosDoAluno();
  }, [alunoId]);

  const handleEditar = (campo) => {
    const valorAtual = dados[campo];
    const novoValor = prompt(`Editar ${campo}:`, valorAtual);
    if (novoValor !== null && novoValor.trim() !== '') {
      setDados(prev => ({ ...prev, [campo]: novoValor.trim() }));
    }
  };

  // Função chamada pelo componente Foto quando o usuário seleciona uma nova imagem
  const handleFotoSelecionada = async (file) => {
    const formData = new FormData();
    formData.append('imagem', file);

    try {
      const resposta = await fetch(`http://10.90.146.16:5121/api/Alunos/${alunoId}/imagem`, {
        method: 'PUT',
        body: formData,
      });

      if (!resposta.ok) throw new Error('Erro ao enviar imagem');

      // Atualiza o preview automaticamente
      const novaImagem = URL.createObjectURL(file);
      setImagemPerfil(novaImagem);
      setErroFoto('');
    } catch (err) {
      console.error(err);
      setErroFoto('Não foi possível atualizar a foto.');
    }
  };

  useEffect(() => {
    const handleResize = () => setLarguraTela(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <CabecalhoPages>
        <li key="inicio"><Link to="/InicialAluno">Início</Link></li>
        <li key="solicitacoes"><Link to="/visualizarsolicitacaoaluno">Solicitações</Link></li>
        <li key="conta"><Link to="/VisualizarContaaluno">Conta</Link></li>
      </CabecalhoPages>

      <div className="container-central">
  
          <Foto 
            titulo="Foto de Perfil"
            imagem={imagemPerfil}
            onFotoSelecionada={handleFotoSelecionada}
            textoBotao=""></Foto>

        <div className="dados-box">
          <InfoBox
            icone={<img src="/images/nome.png" alt="Nome" />}
            texto={dados.nome}
            onEditar={() => handleEditar('nome')}
            editavel
            cor="escuro"
          />
          <InfoBox
            icone={<img src="/images/niver.png" alt="Nascimento" />}
            texto={formatarData(dados.dataNascimento)}
            editavel={false}
            cor="claro"
          />
          <InfoBox
            icone={<img src="/images/email.png" alt="Email" />}
            texto={dados.email}
            onEditar={() => handleEditar('email')}
            editavel
            cor="escuro"
          />
          <InfoBox
            icone={<img src="/images/telefoneconta.png" alt="Telefone" />}
            texto={dados.telefone}
            onEditar={() => handleEditar('telefone')}
            editavel
            cor="claro"
          />
          <InfoBox
            icone={<img src="/images/family.png" alt="Responsável" />}
            texto={dados.responsavel}
            editavel={false}
            cor="escuro"
          />
        </div>
      </div>

      <Rodape />
    </>
  );
};

export default VisualizarContaAluno;

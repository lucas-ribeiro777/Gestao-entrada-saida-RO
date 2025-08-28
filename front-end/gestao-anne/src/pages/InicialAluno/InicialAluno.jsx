import './InicialAluno.css';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CaixaInfos from "../../components/CaixaInfos/CaixaInfos";
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';

function InicialAluno() {
  const [historico, setHistorico] = useState([]);
  const [responsaveis, setResponsaveis] = useState([]);
  const navigate = useNavigate();

  const idAluno = localStorage.getItem('usuarioId');
  const tipo = localStorage.getItem('usuarioTipo'); // 'aluno', 'professor', 'coordenador', 'responsavel'

  useEffect(() => {
    if (!idAluno) {
      console.warn("ID do aluno não encontrado no localStorage.");
      return;
    }

  async function buscarHistorico() {
    try {
      const res = await fetch(`http://10.90.146.16:5121/api/Solicitacao/aluno/${idAluno}`);

      if (!res.ok) {
        throw new Error(`Erro na API: ${res.status}`);
      }

      let data;
      try {
        data = await res.json(); // tenta interpretar como JSON
      } catch {
        // Se não for JSON, trata como array vazio
        data = [];
        console.warn("Resposta não é JSON, retornando array vazio");
      }

      // garante que data seja array
      if (!Array.isArray(data)) {
        console.warn("Data não é array, convertendo para array vazio");
        data = [];
      }

      const hoje = new Date().toISOString().split("T")[0];

      const historicoDoDia = data.filter(s => s.dataHora && s.dataHora.startsWith(hoje));

      const textosFormatados = historicoDoDia.map(s => {
        const hora = s.dataHora.slice(11, 16);
        const statusFinal =
          s.statusProfessor === 'Sim' &&
          s.statusResponsavel === 'Sim' &&
          s.statusCoordenador === 'Sim'
            ? 'Autorizada'
            : 'Pendente';
        return `${hora} - ${s.tipo} ${statusFinal}`;
      });


      setHistorico(textosFormatados);
    } catch (err) {
      console.error('Erro ao buscar histórico:', err);
      setHistorico([]); // garante que o estado fique válido
    }
  }
    buscarHistorico();
  }, [idAluno, navigate]);

useEffect(() => {
  if (!idAluno) return;

  async function buscarResponsaveis() {
    try {
      const resAluno = await fetch(`http://10.90.146.16:5121/api/Aluno/${idAluno}`);
      if (!resAluno.ok) throw new Error('Falha ao buscar aluno');
      const aluno = await resAluno.json();

      // CORREÇÃO: já é array de IDs
      const idsResponsaveis = aluno.idResponsaveis || [];

      const nomes = [];
      for (let id of idsResponsaveis) {
        const res = await fetch(`http://10.90.146.16:5121/api/Responsaveis/${id}`);
        if (!res.ok) continue;
        const r = await res.json();
        if (r.nome) nomes.push(r.nome);
      }

      setResponsaveis(nomes);
    } catch (err) {
      console.error('Erro ao buscar responsáveis:', err);
    }
  }

  buscarResponsaveis();
}, [idAluno]);

  return (
    <>
      <CabecalhoPages>
        <li key="inicio"><Link to="/InicialAluno">Início</Link></li>
        <li key="solicitacoes"><Link to="/visualizarsolicitacaoaluno">Solicitações</Link></li>
        <li key="conta"><Link to="/VisualizarContaaluno">Conta</Link></li>
      </CabecalhoPages>

      <div className="pagina-inicial">
        <main className="content-area">
          <div className="caixas">
          {/* Histórico */}
          {historico.length > 0 ? (
            <CaixaInfos titulo="HISTÓRICO DO DIA" itens={historico} />
          ) : (
            <div className="caixa-vazia">
              <div className="titulo-caixa"><h2>HISTÓRICO DO DIA</h2></div>
              <img src="/images/lupa.png" alt="Nenhuma solicitação" />
              <img src="/images/joia-baixa.png" alt="Nenhuma solicitação" />
              <h4>Nenhuma solicitação registrada hoje.</h4>
            </div>
          )}

          {/* Responsáveis */}
          {responsaveis.length > 0 ? (
            <CaixaInfos titulo="RESPONSÁVEIS DO ALUNO" itens={responsaveis} />
          ) : (
            <div className="caixa-vazia">
              <div className="titulo-caixa"><h2>RESPONSÁVEIS DO ALUNO</h2></div>
              <img src="/images/lupa.png" alt="Nenhum responsável" />
              <img src="/images/joia-baixa.png" alt="Nenhum responsável" />
              <div className="infos-inicial-aluno">
                <h4>Nenhum responsável cadastrado.</h4>
                <p>*Caso seja menor de idade, aguarde o responsável ser cadastrado para prosseguir com o uso do site*</p>
              </div>
            </div>
          )}
        </div>

        </main>
      </div>

      <Rodape />
    </>
  );
}

export default InicialAluno;

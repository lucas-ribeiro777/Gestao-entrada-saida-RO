import './Termos.css';
import React, { useState, useEffect } from 'react';

function Termos({ onValidadeChange }) {
  const [usoDados, setUsoDados] = useState(false);
  const [lgpd, setLgpd] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Sempre que mudar, avisa o pai se tá válido ou não
  useEffect(() => {
    onValidadeChange && onValidadeChange(usoDados && lgpd);
  }, [usoDados, lgpd, onValidadeChange]);

  return (
    <div className="termos">
      {/* Checkbox LGPD */}
      <div className="termo1">
        <input
          type="checkbox"
          checked={lgpd}
          onChange={(e) => setLgpd(e.target.checked)}
          id="lgpd-checkbox"
        />
        <label htmlFor="lgpd-checkbox">
          Você entende que está assegurado(a) pelas normas da{' '}
          <a
            href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
            target="_blank"
            rel="noopener noreferrer"
          >
            LGPD
          </a>
        </label>
      </div>

      {/* Checkbox termos de uso */}
      <div className="termo1">
        <input
          type="checkbox"
          checked={usoDados}
          onChange={(e) => setUsoDados(e.target.checked)}
          id="usoDados-checkbox"
        />
        <label htmlFor="usoDados-checkbox">
          Você concorda com nossos{' '}
          <button
            type="button"
            className="link-termos"
            onClick={() => setMostrarModal(true)}
          >
            termos de uso
          </button>
        </label>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="modal-overlay2" onClick={() => setMostrarModal(false)}>
          <div
            className="modal-content2"
            onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro
          >
            <h2>Termos de Uso - Sistematize</h2>
            <p>
              <strong>Última atualização: 12 de agosto de 2025<br/><br/></strong>

              <strong>1. Objeto<br/></strong>
              O presente Termo de Uso estabelece as condições para utilização do sistema Sistematize, de propriedade e gestão do Serviço Nacional de Aprendizagem Industrial – SENAI Lençóis Paulista, destinado exclusivamente ao controle interno de registros de entradas tardias e saídas antecipadas de alunos.<br/>
<br/>
              <strong>2. Acesso e Utilização<br/></strong>
              2.1. O acesso ao Sistematize é restrito a usuários autorizados pela administração do SENAI Lençóis Paulista.<br/>
              2.2. É vedada a utilização do sistema por terceiros não autorizados, bem como a cessão de credenciais de acesso.<br/>
              2.3. O usuário compromete-se a utilizar o Sistematize única e exclusivamente para os fins previstos neste Termo.<br/><br/>

              <strong>3. Coleta e Tratamento de Dados<br/></strong>
              3.1. O Sistematize coleta e armazena dados pessoais dos usuários, incluindo, mas não se limitando a: nome completo, número de telefone, horários de entrada e saída, e eventuais justificativas relacionadas às ausências ou atrasos.<br/>
              3.2. Os dados coletados serão utilizados exclusivamente para fins administrativos e de controle escolar, de acordo com a Lei nº 13.709/2018 – Lei Geral de Proteção de Dados Pessoais (LGPD).<br/>
              3.3. Não haverá compartilhamento de dados com terceiros, salvo nos casos previstos em lei ou mediante autorização expressa do usuário ou de seu responsável legal.<br/><br/>

              <strong>4. Segurança da Informação<br/></strong>
              4.1. O SENAI Lençóis Paulista adota medidas técnicas e administrativas para proteger os dados pessoais contra acessos não autorizados, perda, alteração ou destruição.<br/>
              4.2. O usuário é responsável por manter a confidencialidade de suas credenciais de acesso.<br/><br/>

              <strong>5. Responsabilidades do Usuário<br/></strong>
              5.1. Fornecer informações verdadeiras, completas e atualizadas.<br/>
              5.2. Não utilizar o sistema para fins ilícitos ou que possam prejudicar terceiros ou a instituição.<br/>
              5.3. Comunicar imediatamente a administração em caso de suspeita de uso indevido de sua conta.<br/><br/>

              <strong>6. Modificações dos Termos<br/></strong>
              O SENAI Lençóis Paulista reserva-se o direito de alterar este Termo de Uso a qualquer momento, mediante aviso prévio aos usuários. A continuação do uso do Sistematize após tais alterações implicará aceitação das novas condições.<br/><br/>

              <strong>7. Disposições Gerais<br/> </strong>
              7.1. Este Termo é regido pelas leis da República Federativa do Brasil.<br/>
              7.2. Fica eleito o foro da Comarca de Lençóis Paulista/SP como competente para dirimir quaisquer controvérsias oriundas deste Termo.<br/>
            </p>
            <button onClick={() => setMostrarModal(false)} className='btn-fechar'>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Termos;

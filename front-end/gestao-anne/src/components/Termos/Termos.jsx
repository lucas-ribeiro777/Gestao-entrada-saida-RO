import './Termos.css';
import React, { useState, useEffect } from 'react';

function Termos({ onValidadeChange }) {
  const [usoDados, setUsoDados] = useState(false);
  const [lgpd, setLgpd] = useState(false);

  // Sempre que mudar, avisa o pai se tá válido ou não
  useEffect(() => {
    onValidadeChange && onValidadeChange(usoDados && lgpd);
  }, [usoDados, lgpd, onValidadeChange]);

  return (
    <div className="termos">
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
      <div className="termo1">
        <input
          type="checkbox"
          checked={usoDados}
          onChange={(e) => setUsoDados(e.target.checked)}
          id="usoDados-checkbox"
        />
        <label htmlFor="usoDados-checkbox">
          Você concorda com nossos <a href="#">termos de uso</a>
        </label>
      </div>
    </div>
  );
}

export default Termos;

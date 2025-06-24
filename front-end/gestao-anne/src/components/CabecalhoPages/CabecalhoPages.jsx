import './CabecalhoPages.css';
import { useLocation } from 'react-router-dom';
import { cloneElement, isValidElement } from 'react';

function CabecalhoPages({ children }) {
  const location = useLocation();

  const childrenComClasses = Array.isArray(children)
    ? children.map((child) => {
        if (!isValidElement(child)) return child;

        const innerChild = child.props.children;

        if (isValidElement(innerChild) && innerChild.props?.to) {
          const isAtivo = location.pathname === innerChild.props.to;

          return cloneElement(child, {
            children: cloneElement(innerChild, {
              className: isAtivo ? 'ativo' : 'nativo',
            }),
          });
        }

        return child;
      })
    : children;

  return (
    <>
      <div className="topo-pages">
        <img src="/images/LogoSenaiSemAsEscritaDoLado.png" alt="SENAI" />
      </div>
      <div className="menu-pages">
        <ul>{childrenComClasses}</ul>
      </div>
    </>
  );
}

export default CabecalhoPages;

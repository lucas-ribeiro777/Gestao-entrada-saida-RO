import './CabecalhoPages.css';
import { useLocation } from 'react-router-dom';
import { cloneElement, isValidElement } from 'react';


function CabecalhoPages({ children }) {
  const location = useLocation();

  const childrenComClasses = Array.isArray(children)
    ? children.map((child) => {
        if (!isValidElement(child)) return child;
        return cloneElement(child, {
          children: cloneElement(child.props.children, {
            className:
              location.pathname === child.props.children.props.to
                ? 'ativo'
                : 'nativo',
          }),
        });
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

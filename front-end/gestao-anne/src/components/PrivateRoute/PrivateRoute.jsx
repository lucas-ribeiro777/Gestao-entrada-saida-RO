import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, allowedTypes }) {
  const usuarioId = localStorage.getItem('usuarioId');
  const usuarioTipo = localStorage.getItem('usuarioTipo')?.toLowerCase();

  if (!usuarioId) {
    return <Navigate to="/login" replace />;
  }

  if (allowedTypes && !allowedTypes.includes(usuarioTipo)) {
    // redireciona para a página inicial correta
    switch (usuarioTipo) {
      case 'aluno':
        return <Navigate to="/inicialAluno" replace />;
      case 'professor':
        return <Navigate to="/InicialProfessor" replace />;
      case 'responsavel':
        return <Navigate to="/InicialResponsavel" replace />;
      case 'coordenador':
        return <Navigate to="/InicialCoordenador" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
}

export default PrivateRoute;

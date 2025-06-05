
USE gestao_entrada_saida_ro;

-- Tabela de Usuários: Pode ser aluno, responsável, professor ou coordenador
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    tipo ENUM('aluno', 'responsavel', 'professor', 'coordenador') NOT NULL,
    senha_hash VARCHAR(255) NOT NULL, -- para autenticação, guardar hash da senha
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela específica para alunos (dados adicionais se precisar)
CREATE TABLE alunos (
    id INT PRIMARY KEY, -- id corresponde a usuarios.id
    matricula VARCHAR(20) UNIQUE NOT NULL,
    data_nascimento DATE,
    FOREIGN KEY (id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de responsáveis, vinculados a usuários do tipo 'responsavel'
CREATE TABLE responsaveis (
    id INT PRIMARY KEY, -- id corresponde a usuarios.id
    parentesco VARCHAR(50),
    FOREIGN KEY (id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela que relaciona alunos e responsáveis (vários responsáveis para um aluno)
CREATE TABLE aluno_responsavel (
    aluno_id INT,
    responsavel_id INT,
    PRIMARY KEY (aluno_id, responsavel_id),
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (responsavel_id) REFERENCES responsaveis(id) ON DELETE CASCADE
);

-- Solicitações de Entrada/Saída antecipada
CREATE TABLE solicitacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    aluno_id INT NOT NULL,
    tipo ENUM('entrada', 'saida') NOT NULL,
    data_hora_solicitada DATETIME NOT NULL,
    motivo TEXT,
    status ENUM('pendente', 'aprovada', 'recusada') DEFAULT 'pendente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);

-- Registro de Ocorrências (RO)
CREATE TABLE ocorrencias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    aluno_id INT NOT NULL,
    professor_id INT, -- Removido o NOT NULL para permitir SET NULL
    descricao TEXT NOT NULL,
    data_ocorrencia DATE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (professor_id) REFERENCES usuarios(id) ON DELETE SET NULL
);


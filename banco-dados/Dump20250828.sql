-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: gestao_anne
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aluno_responsavel`
--

DROP TABLE IF EXISTS `aluno_responsavel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aluno_responsavel` (
  `id_alunos` int NOT NULL,
  `id_responsavel` int NOT NULL,
  PRIMARY KEY (`id_alunos`,`id_responsavel`),
  KEY `fk_aluno_resp_aluno` (`id_alunos`),
  KEY `fk_aluno_resp_responsavel` (`id_responsavel`),
  CONSTRAINT `fk_aluno_resp_aluno` FOREIGN KEY (`id_alunos`) REFERENCES `alunos` (`id_alunos`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_aluno_resp_responsavel` FOREIGN KEY (`id_responsavel`) REFERENCES `responsaveis` (`id_responsaveis`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aluno_responsavel`
--

LOCK TABLES `aluno_responsavel` WRITE;
/*!40000 ALTER TABLE `aluno_responsavel` DISABLE KEYS */;
/*!40000 ALTER TABLE `aluno_responsavel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alunos`
--

DROP TABLE IF EXISTS `alunos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunos` (
  `id_alunos` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `data_nasc` date NOT NULL,
  `id_responsavel` int DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `imagem` varchar(200) DEFAULT NULL,
  `assinatura` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_alunos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos`
--

LOCK TABLES `alunos` WRITE;
/*!40000 ALTER TABLE `alunos` DISABLE KEYS */;
/*!40000 ALTER TABLE `alunos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coordenadores`
--

DROP TABLE IF EXISTS `coordenadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coordenadores` (
  `id_coordenador` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL DEFAULT '',
  `Email` varchar(100) NOT NULL,
  `Telefone` varchar(20) NOT NULL,
  `Senha` varchar(255) NOT NULL,
  `assinatura` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_coordenador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coordenadores`
--

LOCK TABLES `coordenadores` WRITE;
/*!40000 ALTER TABLE `coordenadores` DISABLE KEYS */;
/*!40000 ALTER TABLE `coordenadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `id_nome_curso` int NOT NULL AUTO_INCREMENT,
  `nome_curso` varchar(100) NOT NULL,
  `codigo` varchar(40) NOT NULL,
  `periodo` varchar(45) NOT NULL,
  `dias_de_aula` varchar(45) NOT NULL,
  PRIMARY KEY (`id_nome_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (1,'Eletricista de Manutenção Eletroeletrônica','AI3EEM-T6','Manhã','Segunda a Sexta-feira'),(2,'Eletricista de Manutenção Eletroeletrônica','AI1EET-T7','Tarde','Segunda a Sexta-feira'),(3,'Mecânico de Manutenção','AI3MMM-T6','Manhã','Segunda a Sexta-feira'),(4,'Caldeireiro','A1CALM-T4','Manhã','Segunda a Sexta-feira'),(5,'Caldeireiro','A1CALT-T4','Tarde','Segunda a Sexta-feira'),(6,'Mecânico de Manutenção de Máquinas Agrícolas e Veículos Pesados','A4-MMARV-23','Tarde','Segunda a Sexta-feira'),(7,'Mecânico de Manutenção de Veículos Pesados Rodoviários','MMVPR-2S-2024','Tarde','Segunda a Sexta-feira'),(8,'Auxiliar de Mecânico de Veículos Pesados','AUX.MVP2S-2024','Manhã','Segunda a Sexta-feira'),(9,'Auxiliar de Linha de Produção','AUXLPROD-2-2024','Tarde','Segunda a Sexta-feira'),(10,'Operador de Processos Logísticos','AIOPLOG-1S-2025','Tarde','Segunda a Sexta-feira'),(11,'Técnico em Eletroeletrônica','T3EEM-T9','Manhã','Segunda a Sexta-feira'),(12,'Técnico em Manutenção de Máquinas Industriais','T3MMI-DEXCO-24','Manhã','Segunda a Sexta-feira'),(13,'Técnico em Instrumentação Industrial','T1INSTRUM-T2','Tarde','Segunda a Sexta-feira'),(14,'Técnico em Manutenção de Máquinas Industriais','T1MMT-T5','Tarde','Segunda a Sexta-feira'),(15,'Técnico em Desenvolvimento de Sistemas','TECDVS2S-LP','Integral','Terça e Quinta'),(16,'Técnico em Desenvolvimento de Sistemas','TECDVS1-LP-2025','Integral','Quarta e Sexta'),(17,'Técnico em Administração','TECADM1-LP-2025','Integral','Quarta e Sexta'),(18,'Técnico em Manutenção de Máquinas Industriais','T2MMI-SEDUC-24','Integral','Segunda e Terça'),(19,'Técnico em Eletroeletrônica','TEE-SEDUC-VB-25','Integral','Segunda e Terça'),(20,'Técnico em Manutenção de Máquinas Industriais','TMM-SEDUC-VC-25','Integral','Segunda e Terça'),(21,'Técnico em Manutenção de Máquinas Industriais','TMM-SEDUC-RP-25','Integral','Quinta e Sexta');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grafico`
--

DROP TABLE IF EXISTS `grafico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grafico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_nome_curso` int NOT NULL,
  `hora` time NOT NULL,
  `motivo` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`hora`,`id_nome_curso`,`motivo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grafico`
--

LOCK TABLES `grafico` WRITE;
/*!40000 ALTER TABLE `grafico` DISABLE KEYS */;
/*!40000 ALTER TABLE `grafico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor_curso`
--

DROP TABLE IF EXISTS `professor_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor_curso` (
  `id_professores` int NOT NULL,
  `id_nome_curso` int NOT NULL,
  PRIMARY KEY (`id_professores`,`id_nome_curso`),
  KEY `id_nome_curso` (`id_nome_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor_curso`
--

LOCK TABLES `professor_curso` WRITE;
/*!40000 ALTER TABLE `professor_curso` DISABLE KEYS */;
/*!40000 ALTER TABLE `professor_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professores`
--

DROP TABLE IF EXISTS `professores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professores` (
  `id_professores` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) DEFAULT NULL,
  `telefone` varchar(11) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `senha` varchar(255) NOT NULL,
  `assinatura` varchar(100) DEFAULT NULL,
  `id_nome_curso` int DEFAULT NULL,
  PRIMARY KEY (`id_professores`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professores`
--

LOCK TABLES `professores` WRITE;
/*!40000 ALTER TABLE `professores` DISABLE KEYS */;
/*!40000 ALTER TABLE `professores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qrcode`
--

DROP TABLE IF EXISTS `qrcode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qrcode` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_alunos` int DEFAULT NULL,
  `id_nome_curso` int NOT NULL,
  `status_professor` varchar(45) DEFAULT 'pendente',
  `status_responsavel` varchar(45) DEFAULT 'pendente',
  `status_coordenador` varchar(45) DEFAULT 'pendente',
  `caminhoarquivo` varchar(255) NOT NULL,
  `datahora` datetime NOT NULL,
  `AlunoIdAlunos` int DEFAULT NULL,
  `CoordenadorId` int DEFAULT NULL,
  `CursoIdNomeCurso` int DEFAULT NULL,
  `ProfessorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_QrCode_Alunos` (`id_alunos`),
  KEY `FK_QrCode_Cursos` (`id_nome_curso`),
  CONSTRAINT `FK_QrCode_Alunos` FOREIGN KEY (`id_alunos`) REFERENCES `alunos` (`id_alunos`),
  CONSTRAINT `FK_QrCode_Cursos` FOREIGN KEY (`id_nome_curso`) REFERENCES `cursos` (`id_nome_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qrcode`
--

LOCK TABLES `qrcode` WRITE;
/*!40000 ALTER TABLE `qrcode` DISABLE KEYS */;
/*!40000 ALTER TABLE `qrcode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsaveis`
--

DROP TABLE IF EXISTS `responsaveis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsaveis` (
  `id_responsaveis` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `id_aluno` int DEFAULT NULL,
  `senha` varchar(255) NOT NULL,
  `assinatura` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_responsaveis`),
  KEY `fk_responsavel_aluno` (`id_aluno`),
  CONSTRAINT `fk_responsavel_aluno` FOREIGN KEY (`id_aluno`) REFERENCES `alunos` (`id_alunos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsaveis`
--

LOCK TABLES `responsaveis` WRITE;
/*!40000 ALTER TABLE `responsaveis` DISABLE KEYS */;
/*!40000 ALTER TABLE `responsaveis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitacao`
--

DROP TABLE IF EXISTS `solicitacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitacao` (
  `id_solicitacao` int NOT NULL AUTO_INCREMENT,
  `id_alunos` int NOT NULL,
  `id_nome_curso` int DEFAULT NULL,
  `tipo` varchar(50) NOT NULL DEFAULT 'entrada',
  `motivo` varchar(255) NOT NULL DEFAULT 'Não informado',
  `data_hora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `retorno` time DEFAULT NULL,
  `status_professor` varchar(50) NOT NULL DEFAULT 'pendente',
  `status_responsavel` varchar(50) NOT NULL DEFAULT 'pendente',
  `status_coordenador` varchar(50) NOT NULL DEFAULT 'pendente',
  PRIMARY KEY (`id_solicitacao`),
  KEY `fk_solicitacao_curso` (`id_nome_curso`),
  CONSTRAINT `fk_solicitacao_curso` FOREIGN KEY (`id_nome_curso`) REFERENCES `cursos` (`id_nome_curso`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitacao`
--

LOCK TABLES `solicitacao` WRITE;
/*!40000 ALTER TABLE `solicitacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitacao` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-28 11:24:10

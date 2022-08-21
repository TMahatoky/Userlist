-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: registerdatabase
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `user_registered`
--

DROP TABLE IF EXISTS `user_registered`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_registered` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail_UNIQUE` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_registered`
--

LOCK TABLES `user_registered` WRITE;
/*!40000 ALTER TABLE `user_registered` DISABLE KEYS */;
INSERT INTO `user_registered` VALUES (1,'rova','fifaliana','rova@gmail.com','Cakelovingp1$ch'),(2,'tahina','mahatoky','thaina@mahatak.com','T@hina1.'),(3,'tahina','mampionona','tahina@mahatak.com','T@hina1.1'),(4,'Mahatoky','Mampionona','tahinadanny@gmail.com','Godmy1inlife!'),(5,'miora','emanuella','emaaljaona@gmail.com','$2b$10$gQ9WlPtcM146LUk.Zir/TeB7S39txFamXpZtAWIq/.s9WRbhwlRp.'),(7,'rova','fifaliana','rovaaaf@gmail.com','$2b$10$TVcwyOOtWu6f8BgFkWzqoOiF1OhGrhU6bN0KVjDzjwKEeUJXT698.'),(8,'tsiky','Oceane','TNO@gmail.com','$2b$10$O7A9lj/4g8JB6nVzfwCUmupG4RxF1IfVtKHvPR601VVvSd0ZuvFki'),(10,'miora','rakotoniaina','nyanja@gmail.com','$2b$10$CMZpRk.OqoMdIpwoBDM4Uep27PFGiMn1JmBig71AX2P7lEEoWelim'),(11,'ngrryr','ytuytrtutr','t@k.gl','$2b$10$LIMrxQKTGy.ZSOCvjlHwmen3Zki2LqO/GhFv.3lt36iJ7NQR1AZvi'),(13,'Mema','Neilla','princess@gmail.com','$2b$10$oMseY95tXTxWf6cIkWwrWOlMbr0JBlP.INt1dO.BPntfs8nQ8Ok4G');
/*!40000 ALTER TABLE `user_registered` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-21 10:37:18

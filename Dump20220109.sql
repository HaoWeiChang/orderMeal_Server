-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ordermeal
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createTime` datetime NOT NULL,
  `valid` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'1234@gmail.com','$2b$10$QO.3quQf6NTLeZnnHSvta.rCjnf20yhsSG1WRQr6owDDe247YGWXa','Haowei','2021-12-20 14:38:12',1),(3,'test@gmail.com','$2b$10$SJjySZhDJKpJk8j3oE36seUsCmQY./e2DjeLAS9AZWZwjTaffeWPS','Haowei','2021-12-22 20:04:56',1),(4,'1@gmail.com','$2b$10$E7GpSbwCLZLOkShwAbzeme17m8Yx8yzIJtv8uuQMmKzr1MPLSHCpO','1','2021-12-24 14:55:31',1),(5,'2@gmail.com','$2b$10$Vr1ygO.xuJ1ImARZxhIm3.0JSSO3syRpNm1T3U/nTcvxLWDTtSR2O','張浩維','2021-12-30 15:53:22',1),(6,'admin','$2b$10$zeKafmF9J2y1WaOYGrO53usZ5Xs1dHMjV4GmKAUt7gVMmUsn9Jzbu','Manager','2022-01-04 10:59:52',1),(7,'9487@gmail.com','$2b$10$VbJPWKR3qUU2rJ/M2ct3oOXwzauOKTxzEL4g24XzmEiE5VjKX5MAu','黃','2022-01-06 14:38:34',1),(8,'test','$2b$10$5ob8NFLi/MOWqB3jhdKQduRYwOu19uRm0FqiDa.KFK/cPABFfyp6K','teset','2022-01-06 15:17:28',1),(9,'9488@gmail.com','$2b$10$x8eR7qh9afrp3lEklKbX/u8Y10t3at9nqnmOvkO08dUgprCvod1Fy','禹豪','2022-01-06 16:56:21',1),(10,'1123@gmail.com','$2b$10$Ol9RgQ1eFNveejN5Plw5COmjkhkIdp6luDh0OuJSgddUwr3OjWJdu','張','2022-01-07 17:45:12',1);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) NOT NULL,
  `store_id` int NOT NULL,
  `user_id` int NOT NULL,
  `createtime` datetime NOT NULL,
  `endtime` datetime NOT NULL,
  `valid` tinyint(1) DEFAULT '0',
  `Isdelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `store_id` (`store_id`),
  KEY `activity_ibfk_2` (`user_id`),
  CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`),
  CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (1,'中午訂餐',2,1,'2021-12-20 14:38:12','2021-12-20 14:38:12',0,0),(2,'中午訂餐',2,1,'2021-12-20 14:38:12','2021-12-20 14:38:12',0,0),(3,'中午訂餐',2,1,'2021-12-20 14:38:12','2021-12-20 14:38:12',0,0),(4,'123',1,6,'2022-01-04 12:10:48','2022-01-04 18:45:25',0,0),(5,'測試測試',2,6,'2022-01-04 12:56:12','2022-01-04 16:45:38',0,0),(6,'訂餐',2,4,'2022-01-05 10:33:27','2022-01-05 13:45:21',0,1),(7,'1111',6,4,'2022-01-05 11:14:26','2022-01-05 12:00:07',0,1),(8,'22222',5,4,'2022-01-05 11:14:53','2022-01-05 12:14:43',0,1),(9,'中午訂餐',1,4,'1969-07-20 20:17:00','2021-12-30 21:54:22',0,0),(10,'中午訂餐',1,4,'2021-12-01 04:17:00','2021-12-30 21:54:22',0,0),(11,'今日午餐',2,6,'2022-01-05 16:46:42','2022-01-05 19:45:16',0,0),(12,'今日晚餐',3,6,'2022-01-05 17:09:11','2022-01-05 18:08:50',0,0),(13,'明天午餐',6,6,'2022-01-05 17:12:37','2022-01-05 18:08:50',0,0),(14,'明日晚餐',5,6,'2022-01-05 19:10:53','2022-01-05 20:15:55',0,0),(15,'01/06',5,4,'2022-01-05 19:15:38','2022-01-05 20:15:07',0,0),(16,'1',3,6,'2022-01-06 11:53:33','2022-01-06 12:53:27',0,0),(17,'123',1,6,'2022-01-06 11:54:28','2022-01-06 12:54:19',0,0),(18,'123',1,6,'2022-01-06 11:54:40','2022-01-06 12:54:31',0,0),(19,'123',1,6,'2022-01-06 11:55:05','2022-01-06 12:54:49',0,0),(20,'123',1,6,'2022-01-06 11:55:23','2022-01-06 12:54:49',0,0),(21,'123',1,6,'2022-01-06 11:59:22','2022-01-06 12:57:56',0,0),(22,'12',1,4,'2022-01-06 12:01:29','2022-01-06 13:01:23',0,0),(23,'346',1,4,'2022-01-06 12:02:49','2022-01-06 13:02:42',0,0),(24,'123',3,4,'2022-01-06 12:05:57','2022-01-06 13:05:50',0,0),(25,'11241',5,4,'2022-01-06 12:08:38','2022-01-06 13:08:31',0,0),(26,'12314',1,4,'2022-01-06 12:12:14','2022-01-06 13:12:09',0,0),(27,'123',2,4,'2022-01-06 12:21:03','2022-01-06 13:20:58',0,0),(28,'123',1,4,'2022-01-06 12:21:38','2022-01-06 13:21:32',0,0),(29,'asdfasdf',1,4,'2022-01-06 12:21:42','2022-01-06 13:21:32',0,0),(30,'123',2,6,'2022-01-06 13:24:35','2022-01-06 15:24:17',0,0),(31,'112312',2,4,'2022-01-06 14:28:34','2022-01-06 18:28:27',0,0),(32,'45465',4,7,'2022-01-06 14:38:57','2022-01-06 15:38:50',0,0),(33,'測測',5,9,'2022-01-06 16:56:55','2022-01-06 17:56:40',0,0),(34,'12313',1,6,'2022-01-07 12:32:41','2022-01-07 13:32:30',0,0),(35,'中午訂餐',1,6,'2021-12-01 04:17:00','2021-12-30 21:54:22',0,0),(36,'4124',1,6,'2022-01-07 12:38:28','2022-01-07 13:35:18',0,0),(37,'12313',6,4,'2022-01-07 13:39:40','2022-01-07 17:39:32',0,0),(38,'123',2,6,'2022-01-07 14:01:11','2022-01-07 14:54:07',0,0),(39,'12313',2,4,'2022-01-07 15:20:16','2022-01-07 16:20:10',0,0),(40,'123',1,4,'2022-01-07 15:56:24','2022-01-07 16:56:16',0,0),(41,'123',1,4,'2022-01-07 17:44:48','2022-01-07 18:44:39',0,0),(42,'123123',1,4,'2022-01-07 17:51:08','2022-01-07 19:00:49',0,0),(43,'123123',1,4,'2022-01-08 13:47:37','2022-01-08 14:47:31',0,0),(44,'1231',2,4,'2022-01-08 13:48:30','2022-01-08 15:48:18',0,0),(45,'123123',5,4,'2022-01-08 18:56:25','2022-01-08 19:55:09',0,0),(46,'123',6,4,'2022-01-08 19:05:05','2022-01-08 20:00:37',0,0);
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meal`
--

DROP TABLE IF EXISTS `meal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` int DEFAULT NULL,
  `store_id` int NOT NULL,
  `note` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `meal_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meal`
--

LOCK TABLES `meal` WRITE;
/*!40000 ALTER TABLE `meal` DISABLE KEYS */;
INSERT INTO `meal` VALUES (1,'韭菜水餃',50,2,'一份10顆'),(2,'招牌水餃',50,2,'一份10顆'),(3,'辣味鍋貼',50,2,'一份10顆'),(4,'田園雞肉鍋貼',50,2,'一份10顆'),(5,'玉米鍋貼',50,2,'一份10顆'),(6,'咖哩鍋貼',50,2,'一份10顆'),(7,'酸辣湯',30,2,'一份'),(8,'玉米濃湯',30,2,'一份'),(9,'蕈菇湯',30,2,'一份'),(10,'旗魚花枝丸湯',30,2,'一份'),(11,'蘿蔔排骨湯',30,2,'一份'),(12,'無骨雞排飯',120,3,'一份'),(13,'一級排骨飯',120,3,'一份'),(14,'蒜泥白肉',120,3,'一份'),(15,'浦燒鯛魚',120,3,'一份'),(16,'宮保雞丁',120,3,'一份'),(17,'無骨蜜酥雞腿',130,3,'一份'),(18,'香酥炸雞腿',130,3,'一份'),(19,'紅燒牛肉',130,3,'一份'),(20,'海苔壽司',80,5,'一份11個'),(21,'綜合壽司',80,5,'一份11個'),(22,'豆皮壽司',80,5,'一份11個'),(23,'素海苔壽司',80,5,'一份11個'),(24,'甜不辣(小)',50,5,''),(25,'甜不辣(大)',70,5,''),(26,'蛋花湯',25,5,''),(27,'丸子湯',25,5,''),(28,'味噌湯',25,5,''),(29,'光華垃圾麵',50,6,''),(30,'麻將麵',50,6,''),(31,'排骨麵',70,6,''),(32,'客家麵',50,6,''),(33,'肉羹麵',50,6,''),(34,'陽春麵',35,6,''),(35,'蛋花湯',30,6,''),(36,'餛飩湯',40,6,''),(37,'豬腸湯',32,6,''),(38,'一番豚',110,4,''),(39,'炙燒鯖魚',130,4,''),(40,'惡雞',140,4,''),(41,'極牛',130,4,''),(42,'厚餅夾油條',55,1,''),(43,'豆漿',30,1,''),(44,'糙米漿',30,1,''),(45,'薄燒餅',25,1,''),(46,'蔥花鹹餅',25,1,''),(47,'蔥花蛋',15,1,''),(48,'荷包蛋',15,1,''),(49,'蛋餅',30,1,''),(50,'蛋餅夾油條',55,1,''),(51,'鹹豆漿',40,1,'');
/*!40000 ALTER TABLE `meal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderhistory`
--

DROP TABLE IF EXISTS `orderhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderhistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `activity_id` int NOT NULL,
  `delete` tinyint DEFAULT '0',
  `accept` tinyint DEFAULT '0',
  `createtime` datetime NOT NULL,
  `updatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `activity_id` (`activity_id`),
  CONSTRAINT `orderhistory_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `account` (`id`),
  CONSTRAINT `orderhistory_ibfk_2` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderhistory`
--

LOCK TABLES `orderhistory` WRITE;
/*!40000 ALTER TABLE `orderhistory` DISABLE KEYS */;
INSERT INTO `orderhistory` VALUES (3,6,8,0,0,'2022-01-05 13:15:38',NULL),(4,6,7,0,0,'2022-01-05 13:39:48',NULL),(5,6,13,0,0,'2022-01-05 18:38:49',NULL),(6,6,13,0,0,'2022-01-05 19:04:37',NULL),(7,6,13,0,0,'2022-01-05 19:04:48',NULL),(8,6,29,0,0,'2022-01-06 13:14:44',NULL),(9,6,29,0,0,'2022-01-06 13:15:04',NULL),(10,6,29,0,0,'2022-01-06 13:15:24',NULL),(11,6,29,0,0,'2022-01-06 13:17:26',NULL),(12,6,29,0,0,'2022-01-06 13:20:20',NULL),(13,6,29,0,0,'2022-01-06 13:21:16',NULL),(14,6,29,0,0,'2022-01-06 13:24:08',NULL),(15,6,30,0,0,'2022-01-06 13:24:41',NULL),(16,6,30,0,0,'2022-01-06 13:25:18',NULL),(17,6,30,0,0,'2022-01-06 13:25:45',NULL),(18,6,30,0,0,'2022-01-06 13:31:10',NULL),(19,6,30,0,0,'2022-01-06 13:31:41',NULL),(20,6,30,0,0,'2022-01-06 13:31:52',NULL),(21,6,30,0,0,'2022-01-06 13:32:54',NULL),(22,6,21,0,0,'2022-01-06 13:48:50',NULL),(23,7,32,0,0,'2022-01-06 14:39:12',NULL),(24,4,32,0,0,'2022-01-06 14:50:34',NULL),(25,9,31,0,0,'2022-01-06 16:56:40',NULL),(26,9,33,0,0,'2022-01-06 16:57:04',NULL),(27,4,33,0,0,'2022-01-06 17:52:46',NULL),(28,6,34,0,0,'2022-01-07 12:35:18',NULL),(29,6,37,0,0,'2022-01-07 13:53:44',NULL),(30,4,37,0,0,'2022-01-07 14:53:51',NULL),(31,7,43,0,0,'2022-01-08 14:01:40',NULL),(32,6,44,0,0,'2022-01-08 14:14:13',NULL),(33,4,44,0,0,'2022-01-08 15:32:56',NULL),(34,4,43,0,0,'2022-01-08 15:36:53',NULL),(35,5,44,0,0,'2022-01-08 15:51:39',NULL);
/*!40000 ALTER TABLE `orderhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordermeal`
--

DROP TABLE IF EXISTS `ordermeal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordermeal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `meal_id` int NOT NULL,
  `num` int NOT NULL DEFAULT '1',
  `user_id` int NOT NULL,
  `activity_id` int NOT NULL,
  `history_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `meal_id` (`meal_id`),
  KEY `user_id` (`user_id`),
  KEY `history_id` (`history_id`),
  KEY `activity_id` (`activity_id`),
  CONSTRAINT `ordermeal_ibfk_1` FOREIGN KEY (`meal_id`) REFERENCES `meal` (`id`),
  CONSTRAINT `ordermeal_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `account` (`id`),
  CONSTRAINT `ordermeal_ibfk_3` FOREIGN KEY (`history_id`) REFERENCES `orderhistory` (`id`),
  CONSTRAINT `ordermeal_ibfk_4` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordermeal`
--

LOCK TABLES `ordermeal` WRITE;
/*!40000 ALTER TABLE `ordermeal` DISABLE KEYS */;
INSERT INTO `ordermeal` VALUES (2,24,1,6,8,3),(3,34,1,6,7,4),(4,33,1,6,7,4),(5,34,1,6,13,5),(6,33,3,6,13,6),(7,29,1,6,13,7),(8,30,1,6,13,7),(9,32,2,6,13,7),(10,46,1,6,29,8),(11,47,3,6,29,9),(12,46,3,6,29,9),(13,47,1,6,29,10),(14,46,1,6,29,11),(15,47,2,6,29,12),(16,47,1,6,29,13),(17,47,1,6,29,14),(18,6,2,6,30,15),(19,6,2,6,30,16),(20,5,2,6,30,17),(21,6,3,6,30,18),(22,6,1,6,30,19),(23,6,1,6,30,20),(24,6,1,6,30,21),(25,47,5,6,21,22),(26,41,1,7,32,23),(27,40,1,7,32,23),(28,39,1,7,32,23),(29,38,1,7,32,23),(30,41,1,4,32,24),(31,6,1,9,31,25),(32,25,1,9,33,26),(33,25,3,4,33,27),(34,46,3,6,34,28),(35,33,3,6,37,29),(36,34,3,4,37,30),(37,42,1,7,43,31),(38,6,1,6,44,32),(39,5,5,4,44,33),(40,45,1,4,43,34),(41,44,2,4,43,34),(42,43,2,4,43,34),(43,46,2,4,43,34),(44,42,1,4,43,34),(45,49,2,4,43,34),(46,50,1,4,43,34),(47,51,3,4,43,34),(48,5,5,5,44,35),(49,11,1,5,44,35),(50,6,1,5,44,35),(51,4,1,5,44,35),(52,10,1,5,44,35),(53,9,1,5,44,35),(54,3,1,5,44,35),(55,2,1,5,44,35),(56,8,1,5,44,35),(57,7,1,5,44,35),(58,1,1,5,44,35);
/*!40000 ALTER TABLE `ordermeal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('eFVD-3tUwN-h3KKD7xwH_cFNRpRveUu9',1644232306,'{\"cookie\":{\"originalMaxAge\":2592000000,\"expires\":\"2022-02-07T10:49:31.970Z\",\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"data\":{\"id\":4,\"name\":\"1\"}}'),('j4k5LMGoCoTB-11lxvBuk09K6cEm-4NL',1644232209,'{\"cookie\":{\"originalMaxAge\":2592000000,\"expires\":\"2022-02-07T11:09:51.724Z\",\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"data\":{\"id\":4,\"name\":\"1\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `address` varchar(255) NOT NULL DEFAULT '無地址',
  `valid` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,'阜行豆漿','(02)2392-2175','台北市中正區忠孝東路一段108號2樓',1),(2,'八方雲集(台北忠孝東三店)','(02)2731-5212','台北市大安區忠孝東路三段212號中華郵政限時大樓',1),(3,'一級排骨','(02)2371-9739','台北市萬華區成都路27巷11號地下一樓',1),(4,'惡燒肉便當','(02)2755-6566','台北市大安區和平東路二段311巷19號',1),(5,'民權壽司','(02)2595-0922','台北市民權東路二段71巷31號',1),(6,'垃圾麵','0939-285-577','台北市中正區八德路一段82巷9弄',1);
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'ordermeal'
--

--
-- Dumping routines for database 'ordermeal'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-09  1:08:05

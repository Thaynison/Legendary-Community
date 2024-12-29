-- --------------------------------------------------------
-- Servidor:                     legendarycommunity.com.br
-- Versão do servidor:           8.0.40 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para zirix
CREATE DATABASE IF NOT EXISTS `zirix` /*!40100 DEFAULT CHARACTER SET latin1 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `zirix`;

-- Copiando estrutura para tabela zirix.phone_app_chat
CREATE TABLE IF NOT EXISTS `phone_app_chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `channel` varchar(20) NOT NULL,
  `message` varchar(255) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela zirix.phone_app_chat: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela zirix.phone_calls
CREATE TABLE IF NOT EXISTS `phone_calls` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner` varchar(10) NOT NULL COMMENT 'Num tel proprio',
  `num` varchar(10) NOT NULL COMMENT 'Num reférence du contact',
  `incoming` int NOT NULL COMMENT 'Défini si on est à l''origine de l''appels',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `accepts` int NOT NULL COMMENT 'Appels accepter ou pas',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela zirix.phone_calls: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela zirix.phone_messages
CREATE TABLE IF NOT EXISTS `phone_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transmitter` varchar(10) NOT NULL,
  `receiver` varchar(10) NOT NULL,
  `message` varchar(255) NOT NULL DEFAULT '0',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isRead` int NOT NULL DEFAULT '0',
  `owner` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela zirix.phone_messages: 0 rows
/*!40000 ALTER TABLE `phone_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `phone_messages` ENABLE KEYS */;

-- Copiando estrutura para tabela zirix.phone_users_contacts
CREATE TABLE IF NOT EXISTS `phone_users_contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identifier` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `number` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `display` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '-1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela zirix.phone_users_contacts: 0 rows
/*!40000 ALTER TABLE `phone_users_contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `phone_users_contacts` ENABLE KEYS */;

-- Copiando estrutura para tabela zirix.twitter_accounts
CREATE TABLE IF NOT EXISTS `twitter_accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '0',
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Copiando dados para a tabela zirix.twitter_accounts: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela zirix.twitter_likes
CREATE TABLE IF NOT EXISTS `twitter_likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `authorId` int DEFAULT NULL,
  `tweetId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_twitter_likes_twitter_accounts` (`authorId`),
  KEY `FK_twitter_likes_twitter_tweets` (`tweetId`),
  CONSTRAINT `FK_twitter_likes_twitter_accounts` FOREIGN KEY (`authorId`) REFERENCES `twitter_accounts` (`id`),
  CONSTRAINT `FK_twitter_likes_twitter_tweets` FOREIGN KEY (`tweetId`) REFERENCES `twitter_tweets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Copiando dados para a tabela zirix.twitter_likes: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela zirix.twitter_tweets
CREATE TABLE IF NOT EXISTS `twitter_tweets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `authorId` int NOT NULL,
  `realUser` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `likes` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_twitter_tweets_twitter_accounts` (`authorId`),
  CONSTRAINT `FK_twitter_tweets_twitter_accounts` FOREIGN KEY (`authorId`) REFERENCES `twitter_accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela zirix.twitter_tweets: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela zirix.vrp_business
CREATE TABLE IF NOT EXISTS `vrp_business` (
  `user_id` int NOT NULL,
  `capital` int DEFAULT NULL,
  `laundered` int DEFAULT NULL,
  `reset_timestamp` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_business_users` FOREIGN KEY (`user_id`) REFERENCES `vrp_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela zirix.vrp_business: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela zirix.vrp_estoque
CREATE TABLE IF NOT EXISTS `vrp_estoque` (
  `vehicle_id` int NOT NULL AUTO_INCREMENT,
  `vehicle` varchar(100) NOT NULL,
  `quantidade` int NOT NULL,
  `valor` int DEFAULT NULL,
  PRIMARY KEY (`vehicle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela zirix.vrp_estoque: ~7 rows (aproximadamente)
INSERT INTO `vrp_estoque` (`vehicle_id`, `vehicle`, `quantidade`, `valor`) VALUES
	(1, 'elegy', 9, 150000),
	(2, 'brioso', 50, 15000),
	(3, 'akuma', 30, 35000),
	(4, 'baller5', 2, 950000),
	(5, 'buffalo2', 10, 130000),
	(6, 'elegy2', 2, 300000),
	(7, 'futo', 5, 95000);

-- Copiando estrutura para tabela zirix.vrp_homes_permissions
CREATE TABLE IF NOT EXISTS `vrp_homes_permissions` (
  `owner` int NOT NULL,
  `user_id` int NOT NULL,
  `garage` int NOT NULL,
  `home` varchar(100) NOT NULL DEFAULT '',
  `tax` varchar(24) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela zirix.vrp_homes_permissions: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela zirix.vrp_item_loja
CREATE TABLE IF NOT EXISTS `vrp_item_loja` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item` varchar(50) DEFAULT NULL,
  `valor` int DEFAULT NULL,
  `quantidade` int DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela zirix.vrp_item_loja: ~6 rows (aproximadamente)
INSERT INTO `vrp_item_loja` (`item_id`, `item`, `valor`, `quantidade`) VALUES
	(1, 'celular', 1500, 1),
	(2, 'radio', 500, 3),
	(3, 'mochila', 5000, 0),
	(4, 'taco', 25, 100),
	(5, 'agua', 12, 200),
	(6, 'oculos', 300, 5);

-- Copiando estrutura para tabela zirix.vrp_srv_data
CREATE TABLE IF NOT EXISTS `vrp_srv_data` (
  `dkey` varchar(100) NOT NULL,
  `dvalue` text,
  PRIMARY KEY (`dkey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela zirix.vrp_srv_data: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela zirix.vrp_users
CREATE TABLE IF NOT EXISTS `vrp_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `whitelisted` tinyint(1) DEFAULT NULL,
  `banned` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela zirix.vrp_users: ~3 rows (aproximadamente)
INSERT INTO `vrp_users` (`id`, `whitelisted`, `banned`) VALUES
	(1, 1, 0),
	(2, 1, 0),
	(3, 0, 0),
	(4, 1, 0),
	(5, 0, 0);

-- Copiando estrutura para tabela zirix.vrp_user_data
CREATE TABLE IF NOT EXISTS `vrp_user_data` (
  `user_id` int NOT NULL,
  `dkey` varchar(100) NOT NULL,
  `dvalue` text,
  PRIMARY KEY (`user_id`,`dkey`),
  CONSTRAINT `fk_user_data_users` FOREIGN KEY (`user_id`) REFERENCES `vrp_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela zirix.vrp_user_data: ~8 rows (aproximadamente)
INSERT INTO `vrp_user_data` (`user_id`, `dkey`, `dvalue`) VALUES
	(1, 'currentCharacterMode', '{"chestModel":-1,"chinPosition":0,"fathersID":0,"shapeMix":0.65,"noseBridge":0,"blushColor":0,"chestColor":0,"jawWidth":0,"jawHeight":0,"noseTip":0,"cheeksWidth":0,"noseShift":0,"cheekboneWidth":0,"makeupModel":-1,"chinLength":0,"chinWidth":0,"chinShape":0,"noseLength":0,"beardColor":29,"frecklesModel":-1,"lipstickModel":-1,"blushModel":-1,"blemishesModel":-1,"hairModel":19,"skinColor":0,"secondHairColor":30,"firstHairColor":29,"eyebrowsModel":11,"beardModel":3,"ageingModel":-1,"eyesColor":7,"eyebrowsHeight":0,"sundamageModel":-1,"complexionModel":-1,"cheekboneHeight":0,"noseWidth":0,"mothersID":21,"lipstickColor":0,"eyebrowsColor":29,"noseHeight":0,"neckWidth":0,"lips":0,"eyebrowsWidth":0}'),
	(1, 'vRP:datatable', '{"weapons":[],"colete":0,"hunger":3.96521293152167,"health":400,"groups":{"mindmaster":true},"thirst":16.10106465760834,"gaptitudes":{"physical":{"strength":20}},"customization":{"1":[-1,0,2],"2":[19,0,0],"3":[15,0,2],"4":[61,0,2],"5":[-1,0,2],"6":[16,0,2],"7":[-1,0,2],"8":[15,0,2],"9":[-1,0,2],"10":[-1,0,2],"11":[104,0,2],"12":[0,0,0],"13":[0,0,0],"14":[0,0,0],"15":[0,0,0],"16":[0,0,0],"17":[0,0,0],"18":[0,0,0],"19":[0,0,0],"20":[0,0,0],"p1":[7,0],"p2":[-1,0],"p3":[-1,0],"p4":[-1,0],"p6":[-1,0],"p5":[-1,0],"p8":[-1,0],"p7":[-1,0],"p9":[-1,0],"modelhash":1885233650,"p0":[-1,0],"p10":[-1,0],"0":[0,0,0]},"position":{"y":2647.845703125,"z":37.80459213256836,"x":1173.2989501953126},"inventory":{"celular":{"amount":1}}}'),
	(1, 'vRP:spawnController', '2'),
	(2, 'currentCharacterMode', '{"frecklesModel":-1,"gender":0,"eyebrowsWidth":0.99,"noseLength":-1,"fathersID":5,"shapeMix":1,"beardColor":0,"jawHeight":0,"mothersID":24,"lipstickModel":-1,"cheekboneHeight":0.99,"lips":0,"eyesColor":26,"chinShape":0,"makeupModel":-1,"chestColor":0,"chinPosition":0,"secondHairColor":0,"noseHeight":0.99,"eyebrowsModel":0,"jawWidth":0,"cheeksWidth":0,"cheekboneWidth":0,"complexionModel":-1,"sundamageModel":-1,"noseBridge":0.99,"hairModel":4,"firstHairColor":0,"lipstickColor":0,"chinLength":0,"neckWidth":0,"chestModel":-1,"blemishesModel":-1,"noseTip":0.99,"eyebrowsColor":0,"skinColor":11,"blushModel":-1,"ageingModel":-1,"noseShift":0,"chinWidth":0,"noseWidth":0.99,"beardModel":-1,"blushColor":0,"eyebrowsHeight":0.99}'),
	(2, 'vRP:datatable', '{"hunger":9.96045256494349,"position":{"z":14.14633560180664,"y":-3384.677734375,"x":-891.804443359375},"thirst":33.21059615805095,"colete":0,"gaptitudes":{"physical":{"strength":20}},"groups":{"mindmaster":true},"weapons":{"WEAPON_ASSAULTRIFLE_MK2":{"ammo":249}},"customization":{"1":[0,0,0],"2":[0,0,0],"3":[0,0,0],"4":[0,0,0],"5":[0,0,0],"6":[0,0,0],"7":[0,0,0],"8":[0,0,0],"9":[0,0,0],"10":[0,0,0],"11":[0,0,0],"12":[0,0,0],"13":[0,0,0],"14":[0,0,0],"15":[0,0,0],"16":[0,0,0],"17":[0,0,0],"18":[0,0,0],"19":[0,0,0],"20":[0,0,0],"p6":[-1,0],"p7":[-1,0],"p4":[-1,0],"p5":[-1,0],"p9":[-1,0],"p8":[-1,0],"0":[0,0,0],"p10":[-1,0],"modelhash":-1469565163,"p1":[-1,0],"p0":[-1,0],"p3":[-1,0],"p2":[-1,0]},"inventory":{"mochila":{"amount":2},"wammo|WEAPON_ASSAULTRIFLE_MK2":{"amount":7752},"wbody|WEAPON_ASSAULTRIFLE_MK2":{"amount":8}},"health":400}'),
	(2, 'vRP:spawnController', '2'),
	(4, 'currentCharacterMode', '{"jawHeight":0,"noseLength":0,"jawWidth":0,"lipstickModel":-1,"beardColor":0,"cheekboneWidth":0.99,"complexionModel":-1,"chinWidth":0,"firstHairColor":0,"eyebrowsWidth":0,"noseShift":0,"noseTip":0,"neckWidth":0,"eyebrowsColor":0,"secondHairColor":0,"noseBridge":0,"eyesColor":0,"noseWidth":0,"chinLength":0,"mothersID":24,"blemishesModel":-1,"ageingModel":-1,"lips":-1,"frecklesModel":-1,"fathersID":0,"eyebrowsHeight":0,"blushModel":-1,"chestModel":-1,"chinShape":0,"eyebrowsModel":0,"blushColor":0,"makeupModel":-1,"sundamageModel":-1,"beardModel":-1,"lipstickColor":0,"chinPosition":0,"shapeMix":1,"cheeksWidth":-1,"cheekboneHeight":0,"hairModel":4,"skinColor":12,"noseHeight":0,"chestColor":0}'),
	(4, 'vRP:datatable', '{"gaptitudes":{"physical":{"strength":20}},"groups":{"mindmaster":true},"position":{"z":80.59275817871094,"y":-70.90138244628906,"x":792.8346557617188},"colete":0,"inventory":[],"weapons":{"WEAPON_ASSAULTRIFLE_MK2":{"ammo":90},"WEAPON_PISTOL_MK2":{"ammo":0},"WEAPON_PUMPSHOTGUN_MK2":{"ammo":22},"WEAPON_KNIFE":{"ammo":0},"WEAPON_KNUCKLE":{"ammo":0}},"thirst":100,"hunger":28.25894685014056,"customization":{"1":[-1,0,2],"2":[4,0,0],"3":[15,0,2],"4":[61,0,2],"5":[-1,0,2],"6":[16,0,2],"7":[-1,0,2],"8":[15,0,2],"9":[-1,0,2],"10":[-1,0,2],"11":[104,0,2],"12":[0,0,0],"13":[0,0,0],"14":[0,0,0],"15":[0,0,0],"16":[0,0,0],"17":[0,0,0],"18":[0,0,0],"19":[0,0,0],"20":[0,0,0],"0":[0,0,0],"modelhash":1885233650,"p0":[-1,0],"p3":[-1,0],"p1":[7,0],"p4":[-1,0],"p2":[-1,0],"p6":[-1,0],"p5":[-1,0],"p7":[-1,0],"p8":[-1,0],"p9":[-1,0],"p10":[-1,0]},"health":160}'),
	(4, 'vRP:spawnController', '2');

-- Copiando estrutura para tabela zirix.vrp_user_homes
CREATE TABLE IF NOT EXISTS `vrp_user_homes` (
  `user_id` int NOT NULL,
  `home` varchar(255) NOT NULL,
  `number` int DEFAULT NULL,
  PRIMARY KEY (`user_id`,`home`),
  CONSTRAINT `fk_user_homes_users` FOREIGN KEY (`user_id`) REFERENCES `vrp_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela zirix.vrp_user_homes: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela zirix.vrp_user_identities
CREATE TABLE IF NOT EXISTS `vrp_user_identities` (
  `user_id` int NOT NULL,
  `registration` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `foto` varchar(10000) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `foragido` int NOT NULL DEFAULT '0',
  `licensa` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  KEY `registration` (`registration`),
  KEY `phone` (`phone`),
  CONSTRAINT `fk_user_identities_users` FOREIGN KEY (`user_id`) REFERENCES `vrp_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela zirix.vrp_user_identities: ~2 rows (aproximadamente)
INSERT INTO `vrp_user_identities` (`user_id`, `registration`, `phone`, `firstname`, `name`, `age`, `foto`, `foragido`, `licensa`) VALUES
	(1, '98UZR670', '307-901', 'Couto', 'Thaynison', 22, 'https://media.discordapp.net/attachments/1297683368623865907/1316074590262263829/image.png?ex=6759b979&is=675867f9&hm=f74288ce0feb5e72e365ccb4f5a37da2ac5803ddeec5986596863d262b72c857&=&format=webp&quality=lossless&width=304&height=350', 0, 0),
	(2, '30UZA117', '207-688', 'reclama', 'martins', 90, 'https://media.discordapp.net/attachments/1297683368623865907/1316090604421255228/image.png?ex=6759c863&is=675876e3&hm=61701a3e672f5cea46118099614ee32bb1bf2dfc187578aa372bc47cfef71445&=&format=webp&quality=lossless&width=233&height=350', 0, 0),
	(4, '28DJR392', '677-835', '', '', 0, NULL, 0, 0);

-- Copiando estrutura para tabela zirix.vrp_user_ids
CREATE TABLE IF NOT EXISTS `vrp_user_ids` (
  `identifier` varchar(100) NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`identifier`),
  KEY `fk_user_ids_users` (`user_id`),
  CONSTRAINT `fk_user_ids_users` FOREIGN KEY (`user_id`) REFERENCES `vrp_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela zirix.vrp_user_ids: ~26 rows (aproximadamente)
INSERT INTO `vrp_user_ids` (`identifier`, `user_id`) VALUES
	('discord:302921790185799682', 1),
	('license2:cc46207e0729bd25f3317801f94e39fa8494d382', 1),
	('license:7ad6ad9ef2e926a393be9bd6821b2458b216eafe', 1),
	('live:914798595909400', 1),
	('steam:110000134a9e336', 1),
	('xbl:2535422907610065', 1),
	('discord:668898364150251542', 2),
	('license2:61f6bad36497f8a02ef1c1cd770113da7997f806', 2),
	('license:bd93f541399ed339858fa96d1a01b9c781d2fbe1', 2),
	('live:1055518919050260', 2),
	('steam:11000014ce3c9a7', 2),
	('xbl:2535450682374158', 2),
	('discord:190195067007401986', 3),
	('license2:da9cb13c9cbf335ed55755eba622d1b39f46f439', 3),
	('license:176a4f10b26c427a1a29aa537392b861a46b87cf', 3),
	('live:1759221338588507', 3),
	('steam:11000015ce22813', 3),
	('xbl:2533274842341398', 3),
	('discord:451472651395792896', 4),
	('license2:a77ccafda97383a9523f2d27331d5c09eb57a0c1', 4),
	('license:a77ccafda97383a9523f2d27331d5c09eb57a0c1', 4),
	('steam:11000013cf74c0a', 4),
	('license2:d37c623e2a7d1a4104f893a5a01e4eb22e104235', 5),
	('license:23e13c17193696aa3afec386e764feddb8f9196a', 5),
	('live:985155397901803', 5),
	('steam:11000016db33c09', 5);

-- Copiando estrutura para tabela zirix.vrp_user_moneys
CREATE TABLE IF NOT EXISTS `vrp_user_moneys` (
  `user_id` int NOT NULL,
  `wallet` int DEFAULT NULL,
  `bank` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_user_moneys_users` FOREIGN KEY (`user_id`) REFERENCES `vrp_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela zirix.vrp_user_moneys: ~2 rows (aproximadamente)
INSERT INTO `vrp_user_moneys` (`user_id`, `wallet`, `bank`) VALUES
	(1, 1495017, 16256),
	(2, 998849100, 11000),
	(4, 2000, 18000);

-- Copiando estrutura para tabela zirix.vrp_user_vehicles
CREATE TABLE IF NOT EXISTS `vrp_user_vehicles` (
  `user_id` int NOT NULL,
  `vehicle` varchar(100) NOT NULL,
  `detido` int NOT NULL DEFAULT '0',
  `time` varchar(24) NOT NULL DEFAULT '0',
  `engine` int NOT NULL DEFAULT '1000',
  `body` int NOT NULL DEFAULT '1000',
  `fuel` int NOT NULL DEFAULT '100',
  `ipva` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`vehicle`),
  CONSTRAINT `fk_user_vehicles_users` FOREIGN KEY (`user_id`) REFERENCES `vrp_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela zirix.vrp_user_vehicles: ~2 rows (aproximadamente)
INSERT INTO `vrp_user_vehicles` (`user_id`, `vehicle`, `detido`, `time`, `engine`, `body`, `fuel`, `ipva`) VALUES
	(1, 'elegy', 0, '0', 1000, 1000, 64, '1733888791'),
	(2, 'baller5', 0, '0', 1000, 1000, 100, '1733932586');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

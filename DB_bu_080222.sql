-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.21-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for ims_proto
CREATE DATABASE IF NOT EXISTS `ims_proto` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `ims_proto`;

-- Dumping structure for table ims_proto.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(50) NOT NULL DEFAULT 'New',
  `id_supplier` int(11) DEFAULT NULL,
  `ordered_by` varchar(50) DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_orders_suppliers` (`id_supplier`),
  CONSTRAINT `FK_orders_suppliers` FOREIGN KEY (`id_supplier`) REFERENCES `suppliers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1127 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table ims_proto.orders: ~73 rows (approximately)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` (`id`, `status`, `id_supplier`, `ordered_by`, `date_created`) VALUES
	(1000, 'New', 2, NULL, '2022-02-08 01:47:04'),
	(1001, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1002, 'New', 2, NULL, '2022-02-08 01:47:04'),
	(1003, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1046, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1047, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1048, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1049, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1050, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1051, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1052, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1053, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1066, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1067, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1068, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1069, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1070, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1071, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1072, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1073, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1074, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1075, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1076, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1077, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1078, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1079, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1080, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1081, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1082, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1083, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1084, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1085, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1086, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1087, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1088, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1089, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1090, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1091, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1092, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1093, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1094, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1095, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1096, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1097, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1098, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1099, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1100, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1101, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1102, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1103, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1104, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1105, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1106, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1107, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1108, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1109, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1110, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1111, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1112, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1113, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1114, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1115, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1116, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1117, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1118, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1119, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1120, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1121, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1122, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1123, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1124, 'New', 1, NULL, '2022-02-08 01:47:04'),
	(1125, 'New', 3, NULL, '2022-02-08 01:47:04'),
	(1126, 'New', 1, NULL, '2022-02-08 01:57:54');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Dumping structure for table ims_proto.order_items
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL DEFAULT 0,
  `id_product` int(11) NOT NULL DEFAULT 0,
  `requested_quantity` int(11) DEFAULT NULL,
  `supplier_approval_status` varchar(50) DEFAULT 'New',
  `supp_avail_qty` int(11) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_order_items_products` (`id_product`),
  KEY `FK_order_items_orders` (`order_id`),
  CONSTRAINT `FK_order_items_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table ims_proto.order_items: ~81 rows (approximately)
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` (`id`, `order_id`, `id_product`, `requested_quantity`, `supplier_approval_status`, `supp_avail_qty`, `date_created`, `last_updated`) VALUES
	(2, 1000, 87, 100, 'Partial', 92, '2022-02-04 16:23:31', '2022-02-06 04:04:37'),
	(3, 1001, 82, 125, 'Partial', 124, '2022-02-04 16:23:49', '2022-02-06 05:33:45'),
	(8, 1001, 87, 35, 'Partial', 34, '2022-02-04 17:29:24', '2022-02-06 04:04:37'),
	(9, 1001, 95, 200, 'Partial', 199, '2022-02-06 03:46:25', '2022-02-06 05:34:40'),
	(10, 1003, 53, 68, 'Partial', 60, '2022-02-06 03:51:13', '2022-02-08 01:56:53'),
	(11, 1003, 54, 100, 'New', NULL, '2022-02-06 03:51:13', NULL),
	(12, 1003, 55, 52, 'New', NULL, '2022-02-06 03:51:13', NULL),
	(13, 1003, 56, 68, 'New', NULL, '2022-02-06 03:51:13', NULL),
	(14, 1003, 60, 25, 'New', NULL, '2022-02-06 03:51:13', NULL),
	(15, 1003, 66, 100, 'New', NULL, '2022-02-06 03:51:13', NULL),
	(16, 1003, 69, 2, 'New', NULL, '2022-02-06 03:51:13', NULL),
	(17, 1003, 70, 68, 'New', NULL, '2022-02-06 03:51:13', NULL),
	(18, 1003, 72, 100, 'New', NULL, '2022-02-06 03:51:13', NULL),
	(19, 1003, 73, 1, 'New', NULL, '2022-02-06 03:51:13', NULL),
	(20, 1003, 76, 68, 'New', NULL, '2022-02-06 03:51:13', NULL),
	(21, 1003, 77, 68, 'New', NULL, '2022-02-06 03:51:13', NULL),
	(22, 1003, 82, 68, 'New', NULL, '2022-02-06 03:51:13', NULL),
	(23, 1003, 84, 100, 'New', NULL, '2022-02-06 03:51:13', NULL),
	(24, 1003, 90, 68, 'New', NULL, '2022-02-06 03:51:13', NULL),
	(25, 1003, 91, 100, 'New', NULL, '2022-02-06 03:51:13', NULL),
	(60, 1066, 52, 5, 'New', NULL, '2022-02-07 20:55:45', '2022-02-07 20:55:45'),
	(61, 1067, 53, 4, 'New', NULL, '2022-02-07 20:55:45', '2022-02-07 20:55:45'),
	(62, 1067, 54, 1, 'New', NULL, '2022-02-07 20:55:45', '2022-02-07 20:55:45'),
	(63, 1068, 52, 5, 'New', NULL, '2022-02-07 20:59:13', '2022-02-07 20:59:13'),
	(64, 1069, 53, 4, 'New', NULL, '2022-02-07 20:59:13', '2022-02-07 20:59:13'),
	(65, 1069, 54, 1, 'New', NULL, '2022-02-07 20:59:13', '2022-02-07 20:59:13'),
	(66, 1070, 52, 5, 'New', NULL, '2022-02-07 21:13:04', '2022-02-07 21:13:04'),
	(67, 1071, 53, 4, 'New', NULL, '2022-02-07 21:13:04', '2022-02-07 21:13:04'),
	(68, 1071, 54, 1, 'New', NULL, '2022-02-07 21:13:04', '2022-02-07 21:13:04'),
	(69, 1072, 52, 1, 'New', NULL, '2022-02-07 21:20:02', '2022-02-07 21:20:02'),
	(70, 1073, 53, 1, 'New', NULL, '2022-02-07 21:20:02', '2022-02-07 21:20:02'),
	(71, 1074, 52, 1, 'New', NULL, '2022-02-07 21:25:59', '2022-02-07 21:25:59'),
	(72, 1075, 53, 1, 'New', NULL, '2022-02-07 21:25:59', '2022-02-07 21:25:59'),
	(73, 1076, 52, 1, 'New', NULL, '2022-02-07 21:27:39', '2022-02-07 21:27:39'),
	(74, 1077, 54, 1, 'New', NULL, '2022-02-07 21:27:39', '2022-02-07 21:27:39'),
	(75, 1078, 52, 1, 'New', NULL, '2022-02-07 21:33:20', '2022-02-07 21:33:20'),
	(76, 1079, 54, 1, 'New', NULL, '2022-02-07 21:33:20', '2022-02-07 21:33:20'),
	(77, 1080, 52, 1, 'New', NULL, '2022-02-07 21:41:03', '2022-02-07 21:41:03'),
	(78, 1081, 53, 1, 'New', NULL, '2022-02-07 21:41:03', '2022-02-07 21:41:03'),
	(79, 1082, 52, 1, 'New', NULL, '2022-02-07 21:41:32', '2022-02-07 21:41:32'),
	(80, 1083, 53, 1, 'New', NULL, '2022-02-07 21:41:33', '2022-02-07 21:41:33'),
	(81, 1084, 52, 1, 'New', NULL, '2022-02-07 21:43:32', '2022-02-07 21:43:32'),
	(82, 1085, 52, 1, 'New', NULL, '2022-02-07 21:43:45', '2022-02-07 21:43:45'),
	(83, 1086, 52, 1, 'New', NULL, '2022-02-07 21:44:08', '2022-02-07 21:44:08'),
	(84, 1087, 53, 1, 'New', NULL, '2022-02-07 21:44:08', '2022-02-07 21:44:08'),
	(85, 1088, 52, 1, 'New', NULL, '2022-02-07 21:45:40', '2022-02-07 21:45:40'),
	(86, 1089, 53, 1, 'New', NULL, '2022-02-07 21:45:40', '2022-02-07 21:45:40'),
	(87, 1090, 52, 1, 'New', NULL, '2022-02-07 21:55:39', '2022-02-07 21:55:39'),
	(88, 1091, 52, 2, 'New', NULL, '2022-02-07 21:57:07', '2022-02-07 21:57:07'),
	(89, 1092, 52, 1, 'New', NULL, '2022-02-07 21:57:26', '2022-02-07 21:57:26'),
	(90, 1093, 53, 1, 'New', NULL, '2022-02-07 21:57:26', '2022-02-07 21:57:26'),
	(91, 1094, 52, 1, 'New', NULL, '2022-02-07 21:58:02', '2022-02-07 21:58:02'),
	(92, 1095, 53, 1, 'New', NULL, '2022-02-07 21:58:02', '2022-02-07 21:58:02'),
	(93, 1096, 52, 1, 'New', NULL, '2022-02-07 21:58:35', '2022-02-07 21:58:35'),
	(94, 1097, 53, 1, 'New', NULL, '2022-02-07 21:58:35', '2022-02-07 21:58:35'),
	(95, 1098, 52, 1, 'New', NULL, '2022-02-07 21:59:51', '2022-02-07 21:59:51'),
	(96, 1099, 53, 1, 'New', NULL, '2022-02-07 21:59:51', '2022-02-07 21:59:51'),
	(97, 1100, 52, 1, 'New', NULL, '2022-02-07 22:05:18', '2022-02-07 22:05:18'),
	(98, 1101, 53, 5, 'New', NULL, '2022-02-07 22:05:18', '2022-02-07 22:05:18'),
	(99, 1103, 52, 1, 'New', NULL, '2022-02-08 00:45:10', '2022-02-08 00:45:10'),
	(100, 1105, 52, 1, 'New', NULL, '2022-02-08 01:05:27', '2022-02-08 01:05:27'),
	(101, 1106, 53, 2, 'New', NULL, '2022-02-08 01:05:27', '2022-02-08 01:05:27'),
	(102, 1107, 52, 1, 'New', NULL, '2022-02-08 01:07:02', '2022-02-08 01:07:02'),
	(103, 1108, 53, 1, 'New', NULL, '2022-02-08 01:07:02', '2022-02-08 01:07:02'),
	(104, 1108, 54, 1, 'New', NULL, '2022-02-08 01:07:02', '2022-02-08 01:07:02'),
	(105, 1111, 52, 1, 'New', NULL, '2022-02-08 01:10:04', '2022-02-08 01:10:04'),
	(106, 1112, 53, 1, 'New', NULL, '2022-02-08 01:10:04', '2022-02-08 01:10:04'),
	(107, 1114, 52, 1, 'New', NULL, '2022-02-08 01:18:09', '2022-02-08 01:18:09'),
	(108, 1115, 52, 1, 'New', NULL, '2022-02-08 01:18:20', '2022-02-08 01:18:20'),
	(109, 1116, 52, 1, 'New', NULL, '2022-02-08 01:18:49', '2022-02-08 01:18:49'),
	(110, 1117, 53, 1, 'New', NULL, '2022-02-08 01:18:49', '2022-02-08 01:18:49'),
	(111, 1118, 52, 1, 'New', NULL, '2022-02-08 01:19:53', '2022-02-08 01:19:53'),
	(112, 1119, 53, 1, 'New', NULL, '2022-02-08 01:19:53', '2022-02-08 01:19:53'),
	(113, 1120, 52, 4, 'New', NULL, '2022-02-08 01:20:46', '2022-02-08 01:20:46'),
	(114, 1121, 53, 1, 'New', NULL, '2022-02-08 01:20:46', '2022-02-08 01:20:46'),
	(115, 1121, 54, 1, 'New', NULL, '2022-02-08 01:20:46', '2022-02-08 01:20:46'),
	(116, 1122, 52, 1, 'New', NULL, '2022-02-08 01:25:47', '2022-02-08 01:25:47'),
	(117, 1123, 53, 3, 'New', NULL, '2022-02-08 01:25:47', '2022-02-08 01:25:47'),
	(118, 1124, 52, 3, 'New', NULL, '2022-02-08 01:37:47', '2022-02-08 01:37:47'),
	(119, 1125, 53, 1, 'New', NULL, '2022-02-08 01:37:47', '2022-02-08 01:37:47'),
	(120, 1126, 63, 6, 'New', NULL, '2022-02-08 01:57:54', '2022-02-08 01:57:54');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;

-- Dumping structure for table ims_proto.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) DEFAULT NULL,
  `product_code` varchar(50) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `manufacturer` varchar(50) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `qty_avail` int(11) DEFAULT 0,
  `date_created` datetime DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_products_suppliers` (`supplier_id`) USING BTREE,
  CONSTRAINT `FK_products_suppliers` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table ims_proto.products: ~58 rows (approximately)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id`, `category`, `product_code`, `description`, `manufacturer`, `supplier_id`, `qty_avail`, `date_created`, `last_updated`) VALUES
	(52, 'RRU', 'RRU96-YC-5Z', 'RRU5501 for Multi-mode 1800MHz~2100MHz (4T4R*2, 4*60W)', 'Huawei', 1, 91, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(53, 'RRU', 'RRU96-YC-5Z', 'RRU5301 4T4R for 800MHz Trial', 'Huawei', 3, 94, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(54, 'Transceiver', 'OPT96-YC-5Z', 'Optical Transceiver,SFP+,1310nm,9.8G,-8.2dBm~+0.5dBm,-10.3dBm,LC,SM,1.4km', 'Nokia', 3, 94, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(55, 'Power', 'FUN96-YC-5Z', 'Function Module,HERT BBU,WD2MUPEUe,Power and Environment interface Unit(-48V)', 'Huawei', 3, 88, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(56, 'Power', 'FUN96-YC-5Z', 'Function Module,HERT BBU,WD2BBBUE,HERT BBU BOX', 'Nokia', 3, 57, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(57, 'Cooling', 'FUN96-YC-5Z', 'Function Module,HERT BBU,WD2E2FANF,2U FAN Module FanCfgPFAS3390', 'Nokia', 2, 21, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(58, 'Transmission', 'FIN96-YC-5Z', 'Finished Board Unit,HERT BBU,WD22UMPTe2,Universal Main Processing & Transmission Unit (2 Electrical FE/GE&2 Optical FE/GE/XGE,UMPTe2)', 'Ericsson', 2, 34, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(59, 'Cabling', 'IT 96-YC-5Z', 'IT Equipment Cable,For BBU local maintenance adapter,0.38m,USB3.0 standard A Type Male,CC2P0.48B(S)-I,MP8(S)-III,LSZH', 'Ericsson', 2, 4, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(60, 'Baseband', 'UNI96-YC-5Z', 'Universal Baseband Processing Unit e6', 'Huawei', 3, 21, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(61, 'Cabling', 'OPT96-YC-5Z', 'Optical Cable Parts,DLC/UPC,DLC/UPC,single mode,5m,2 cores,0.03m/0.03m,GYFJH-2G.657A2,7.0mm,2mm,LSZH,Armored branch', 'Nokia', 1, 90, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(62, 'Cabling', 'PAT96-YC-5Z', 'Patch Cord,LC/UPC,LC/UPC,SINGLE-MODE,5m,G.657A2,2mm,LSZH', 'Ericsson', 1, 86, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(63, 'Power', 'DC 96-YC-5Z', 'DC Power Distribution Unit', 'Ericsson', 1, 62, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(64, 'Cabling', 'SIN96-YC-5Z', 'Single Cable,Indicator Cable,LED D5G10,22UL1007R+22UL1007B,H2(2.5),HONET V600', 'Nokia', 1, 49, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(65, 'Power', 'CON96-YC-5Z', 'Contactor,Normally Open,DC48V Contact,400A,1a(SPST-NO),48Vdc Coil,Double Coil,DC Contactor', 'Nokia', 2, 61, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(66, 'Power', 'CUR96-YC-5Z', 'Current Divider,500A,0W,25mV,1000ohm,0.3%,101*45*22mm', 'Huawei', 3, 54, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(67, 'Power', 'POW96-YC-5Z', 'Power Arrester,60kA,2000V,230VAC,Rail Mounting', 'Huawei', 1, 90, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(68, 'Rectifiers', 'R4896-YC-5Z', 'R4875G1-4000W High Efficiency Rectifier', 'Ericsson', 2, 86, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(69, 'Power', 'POW96-YC-5Z', 'Power Monitor Unit', 'Huawei', 3, 60, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(70, 'Combiners', '21096-YC-5Z', '2100M adjacent band combiner,dual, fixed cross over', 'Nokia', 3, 41, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(71, 'RRU', 'RRU96-YC-5Z', 'RRU5301 4T4R for 1400MHz Trial', 'Nokia', 2, 25, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(72, 'Transceiver', 'OPT96-YC-5Z', 'Optical Transceiver,SFP+,1310nm,6.144G,-8.4dBm~+0.5dBm,-13.8dBm,LC,SM,2km', 'Ericsson', 3, 3, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(73, 'Antennas', 'DIR96-YC-5Z', 'Directional Antenna,D7X-690-960/690-960/1427-1528/1427-1528/3x(1695-2690)-65/65/65/65/65/65/65-14.5i/14.5i/17.5i/18i/18i/18i/18i-M/M/M/M/M/M/M-R-14*4.3-10 Female', 'Huawei', 3, 39, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(74, 'Cabling', 'SIG96-YC-5Z', 'Signal Cable,AISG Communication cable,5m,D9M+D9(PS)(W),CC4P0.5PB(S),RC8SF(S)-I', 'Nokia', 1, 85, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(75, 'Amplifiers', 'MTM96-YC-5Z', 'MTMA-1800&2100-Bypass 617-960/1427-1520-10-12dB-2BTSport6ANTport,AISG v2.0,8*4.3-10 Female (Long neck)', 'Nokia', 2, 7, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(76, 'Combiners', 'OUT96-YC-5Z', 'Outdoor Combiner,TC-617-960/1427-1520/1690-2690-111,8*4.3-10 Female', 'Huawei', 3, 78, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(77, 'Switches', 'SWI96-YC-5Z', 'Switch and Route Processing Unit A10(32G Memory)', 'Nokia', 3, 70, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(78, 'SFU', '2TB96-YC-5Z', '2Tbps Switch Fabric Unit D(SFUI-2T-D)', 'Huawei', 2, 13, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(79, 'Power', '30096-YC-5Z', '3000W AC&HVDC Power Module', 'Nokia', 1, 57, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(80, 'Transmission', '4-P96-YC-5Z', '4-Port 100GBase-QSFP28 Integrated Line Processing Unit (LPUI-480)', 'Ericsson', 1, 47, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(81, 'Transmission', '2-P96-YC-5Z', '2-Port 100GBase-QSFP28 + 24-Port 10GBase LAN/WAN-SFP+ Integrated Line Processing Unit (LPUI-480)', 'Ericsson', 1, 61, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(82, 'Transceiver', 'HIG96-YC-5Z', 'High Speed Transceiver,QSFP28,1310nm,100G,-4.3dBm,4.5dBm,-8.6dBm,LC,SMF,10km', 'Ericsson', 3, 313, '2022-02-05 18:28:46', '2022-02-05 20:00:55'),
	(83, 'Transceiver', 'OPT96-YC-5Z', 'Optical transceiver,SFP+,1310nm,10Gb/s,-8.2~0.5dBm,-12.6dBm,LC,SM,10km', 'Nokia', 2, 30, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(84, 'Cabling', 'PAT96-YC-5Z', 'Patch Cord,LC/UPC,FC/UPC,Single-mode,10m,G.657A2,2mm', 'Huawei', 3, 64, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(85, 'Transmission', 'ATN96-YC-5Z', 'ATN 910C-B - 2 channels DC entries, with 4*10GE(o), 8*10GE/GE/FE(o), 8*GE/FE(o), 8*GE/FE(e)', 'Huawei', 2, 28, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(86, 'Transmission', 'NET96-YC-5Z', 'Network Interface Connector,8Bit 8Pin,Crystal Plug,Matching 25050014', 'Nokia', 2, 50, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(87, 'Transceiver', 'OPT96-YC-5Z', 'Optical transceiver,SFP+,850nm,10Gb/s,-7.3~-1dBm,-9.9dBm,LC, MM,0.3km', 'Huawei', 2, 463, '2022-02-05 18:28:46', '2022-02-05 20:41:39'),
	(88, 'Cabling', 'SIG96-YC-5Z', 'Signal Cable,0.3m,MP8-II,CC4P0.5GY(S),MP8(S)-III,ATN Serial adapter cable', 'Huawei', 2, 63, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(89, 'Cabling', 'SIN96-YC-5Z', 'Single Cable,Serial Port Cable,3m,D9F,CC2P0.32PWG1U,MP8-VI,S3026V', 'Ericsson', 2, 28, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(90, 'Cabling', 'PAT96-YC-5Z', 'Patch Cord,LC/UPC,FC/UPC,Single-mode,10m,G.657A2,2mm,PE bags', 'Ericsson', 3, 48, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(91, 'Cabling', 'PAT96-YC-5Z', 'Patch cord-FC/PC-LC/PC-Multimode-A1b-2mm-10m-PVC-Orange', 'Ericsson', 3, 56, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(92, 'Transmission', 'FIX96-YC-5Z', 'Fixed Optical Attenuator,1260nm~1620nm-5dB-LC/PC-45dB', 'Nokia', 1, 38, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(93, 'Cabling', 'CX696-YC-5Z', 'CX600-X2-M8A Integrated DC Chassis Components', 'Nokia', 3, 18, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(94, 'Baseband', 'MAI96-YC-5Z', 'Main Processing Unit K1', 'Ericsson', 3, 79, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(95, 'Power', 'DC 96-YC-5Z', 'DC Power Supply Unit', 'Ericsson', 3, 39, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(96, 'Transmission', 'CX696-YC-5Z', 'CX600-X2-M8A Integrated AC 2400W Chassis Components', 'Nokia', 3, 56, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(97, 'Power', '24096-YC-5Z', '2400W AC Power Module', 'Huawei', 2, 64, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(98, 'Transmission', 'NET96-YC-5Z', 'Network Processing Unit (NPU-1T)', 'Nokia', 1, 51, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(99, 'Transmission', '1-P96-YC-5Z', '1-Port 100GBase-QSFP28+MACsec Interface Card', 'Huawei', 2, 65, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(100, 'Transmission', '10-96-YC-5Z', '10-Port 10GBase LAN/WAN-SFP+ Physical Interface Card(PIC)', 'Huawei', 3, 68, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(101, 'Transceiver', 'OPT96-YC-5Z', 'Optical transceiver(eSFP,1310nm,1.25Gb/s,-9dBm~-3dBm,-20dBm,LC,SM,10km)', 'Huawei', 2, 46, '2022-02-05 18:28:46', '2022-02-05 18:28:46'),
	(104, 'Power', 'sdf', 'sdf', 'sdf', 1, NULL, '2022-02-06 01:17:03', '2022-02-06 01:17:03'),
	(105, 'Power', 'sdf', 'sdf', 'sdf', 1, NULL, '2022-02-06 01:17:12', '2022-02-06 01:17:12'),
	(106, 'Transmission', 'NOK-001-FLEXI', 'Flexi Base Station (5g)', 'Nokia', 2, NULL, '2022-02-06 01:23:49', '2022-02-06 01:23:49'),
	(107, 'Transmission', 'NOK-001-FLEXI', 'Flexi Base Station (5g)', 'Nokia', 2, 0, '2022-02-06 01:24:48', '2022-02-06 01:24:48'),
	(108, 'Power', 'asd', 'asd', 'asd', 1, 0, '2022-02-06 01:28:10', '2022-02-06 01:28:10'),
	(109, 'Transmission', 'asdasd', 'asdasd', 'asdasd', 1, 0, '2022-02-06 01:37:56', '2022-02-06 01:37:56'),
	(110, 'Transmission', 'asdasd', 'asdasdasd', 'asdasd', 1, 0, '2022-02-06 01:39:15', '2022-02-06 01:39:15'),
	(111, 'Transmission', '12345', 'New product item', 'Nokia', 1, 0, '2022-02-07 16:01:04', '2022-02-07 16:01:04');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

-- Dumping structure for table ims_proto.suppliers
CREATE TABLE IF NOT EXISTS `suppliers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(100) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `active` int(11) DEFAULT NULL,
  `onboard_date` datetime DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `contact_email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table ims_proto.suppliers: ~3 rows (approximately)
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` (`id`, `company_name`, `address`, `active`, `onboard_date`, `last_updated`, `contact_email`) VALUES
	(1, 'Network Parts Ltd.', '1 London Road, London, NW1', 1, '2022-02-04 10:46:09', '2022-02-08 00:51:53', 'imsdemosystem@outlook.com'),
	(2, 'GTX Telco Ltd', '36 Spitfire Close, Huntingdon, Cambs, PE1 3DC', 1, '2022-02-04 10:46:11', '2022-02-08 00:51:53', 'imsdemosystem@outlook.com'),
	(3, 'Better Networks Ltd.', '43 Vastern Road, Reading, RG1 8DJ', 1, '2022-02-04 10:46:12', '2022-02-08 00:51:53', 'imsdemosystem@outlook.com');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;

-- Dumping structure for trigger ims_proto.order_items_before_insert
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `order_items_before_insert` BEFORE INSERT ON `order_items` FOR EACH ROW BEGIN
SET NEW.date_created = NOW();

END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger ims_proto.products_before_insert
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `products_before_insert` BEFORE INSERT ON `products` FOR EACH ROW BEGIN
SET NEW.date_created = NOW();

END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

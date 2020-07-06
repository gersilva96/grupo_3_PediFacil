CREATE TABLE `Categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `Orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_order` datetime DEFAULT NULL,
  `total_cost` decimal(8,2) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Users_Orders_user_id(FK)_idx` (`user_id`),
  CONSTRAINT `Users_Orders_user_id(FK)` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`));
  
CREATE TABLE `product_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cost` decimal(8,2) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_order_order_order_id(FK)_idx` (`order_id`),
  KEY `product_order_Products_product_id(FK)_idx` (`product_id`),
  CONSTRAINT `product_order_order_order_id(FK)` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`),
  CONSTRAINT `product_order_Products_product_id(FK)` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`));

CREATE TABLE `Products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `price` decimal(8,2) NOT NULL,
  `discount` int DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Products_Categories_category_id(FK)_idx` (`category_id`),
  CONSTRAINT `Products_Categories_category_id(FK)` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`));
  
CREATE TABLE `Types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin` tinyint NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `business_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  `street_name` varchar(60) DEFAULT NULL,
  `street_number` varchar(60) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `type_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_Users_1_idx` (`type_id`),
  CONSTRAINT `fk_Users_1` FOREIGN KEY (`type_id`) REFERENCES `Types` (`id`))
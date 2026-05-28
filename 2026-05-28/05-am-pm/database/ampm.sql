-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: May 28, 2026 at 10:38 AM
-- Server version: 9.7.0
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ampm`
--
CREATE DATABASE IF NOT EXISTS `ampm` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `ampm`;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
('82011e72-5a80-11f1-8355-1ea4caf26737', 'Beverages', '2026-05-28 10:31:48', '2026-05-28 10:31:48'),
('95a6be5c-5a80-11f1-8355-1ea4caf26737', 'Dairy', '2026-05-28 10:32:25', '2026-05-28 10:32:25'),
('95a6dafa-5a80-11f1-8355-1ea4caf26737', 'Meat', '2026-05-28 10:32:25', '2026-05-28 10:32:25');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `manufacture_date` datetime NOT NULL,
  `expiration_date` datetime NOT NULL,
  `category_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `price` float NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `manufacture_date`, `expiration_date`, `category_id`, `price`, `created_at`, `updated_at`) VALUES
('21abb87b-5a81-11f1-8355-1ea4caf26737', 'Coca Cola', '2026-05-01 13:34:08', '2026-05-27 13:34:08', '82011e72-5a80-11f1-8355-1ea4caf26737', 12, '2026-05-28 10:34:07', '2026-05-28 10:34:07'),
('21abce69-5a81-11f1-8355-1ea4caf26737', 'Fanta', '2026-05-01 13:34:08', '2026-05-31 13:34:08', '82011e72-5a80-11f1-8355-1ea4caf26737', 14, '2026-05-28 10:34:07', '2026-05-28 10:34:07'),
('21abdd6b-5a81-11f1-8355-1ea4caf26737', 'Milky', '2026-05-01 13:36:01', '2026-05-31 13:36:01', '95a6be5c-5a80-11f1-8355-1ea4caf26737', 8, '2026-05-28 10:34:07', '2026-05-28 10:34:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

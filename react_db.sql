-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2019 at 11:11 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_carts`
--

CREATE TABLE `tbl_carts` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) DEFAULT '1',
  `isDelete` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_carts`
--

INSERT INTO `tbl_carts` (`cart_id`, `user_id`, `product_id`, `qty`, `isDelete`, `createdAt`, `updatedAt`) VALUES
(3, 5, 7, 1, 0, '2019-08-06 13:03:41', '2019-08-06 13:03:41'),
(6, 6, 7, 1, 0, '2019-08-07 05:58:15', '2019-08-07 05:58:15');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_fruits`
--

CREATE TABLE `tbl_fruits` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_desc` varchar(255) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_img` varchar(255) NOT NULL,
  `isDelete` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_fruits`
--

INSERT INTO `tbl_fruits` (`product_id`, `product_name`, `product_desc`, `product_price`, `product_img`, `isDelete`, `createdAt`, `updatedAt`) VALUES
(1, 'Apple', 'Red juicy Regular', 110, '[\"1564462381388-apple_1.jpg\",\"1564462381390-apple_2.jpg\",\"1564462381391-apple_3.jpg\"]', 0, '2019-07-29 06:44:30', '2019-07-29 06:44:30'),
(2, 'Mango', 'Kesar Mango', 129, '[\"1564382966901-mango_1.jpg\",\"1564382966902-mango_2.png\",\"1564382966909-mango_3.jpg\",\"1564382966910-mango_4.jpg\"]', 0, '2019-07-29 06:49:26', '2019-07-29 06:49:26'),
(3, 'Grapes', 'Green and banglore blue with seed', 100, '[\"1564383025959-grapes_1.jpg\",\"1564383025960-grapes_2.jpg\",\"1564383025960-grapes_3.jpg\",\"1564383025961-grapes_4.jpg\"]', 0, '2019-07-29 06:50:25', '2019-07-29 06:50:25'),
(4, 'Cherry', 'Red juicy regular', 110, '[\"1564388322726-cherry_1.png\",\"1564388322726-cherry_2.png\",\"1564388322741-cherry_3.jpg\"]', 0, '2019-07-29 06:51:09', '2019-07-29 06:51:09'),
(5, 'Watermelon', 'Fresho watermelons with greenish black', 45, '[\"1564383140413-wmelon_1.jpg\",\"1564383140414-wmelon_2.png\",\"1564383140416-wmelon_3.jpg\"]', 0, '2019-07-29 06:52:20', '2019-07-29 06:52:20'),
(6, 'Banana', 'Fresho Banana - Robusta, 1 kg', 35, '[\"1564383186087-banana_2.jpg\",\"1564383186088-banana_3.jpg\",\"1564383186089-banana_4.jpg\"]', 0, '2019-07-29 06:53:06', '2019-07-29 06:53:06'),
(7, 'Strawberry', 'Delishh Strawberries - Frozen Fresh', 150, '[\"1564383221474-strawberry_1.jpg\",\"1564383221475-strawberry_2.jpg\",\"1564383221475-strawberry_3.jpg\"]', 0, '2019-07-29 06:53:41', '2019-07-29 06:53:41'),
(8, 'Pineapple', 'Fresho Pineapple with the shape of a pine cone', 69, '[\"1564383270431-pineapple_1.png\",\"1564383270433-pineapple_2.jpg\",\"1564383270435-pineapple_3.jpg\"]', 0, '2019-07-29 06:54:30', '2019-07-29 06:54:30'),
(9, 'Orange', 'Fresho brings you an assortment of 4 imported orange', 121, '[\"1564383321164-Orange_1.jpg\",\"1564383321179-orange_2.jpg\",\"1564383321180-orange_3.png\"]', 0, '2019-07-29 06:55:21', '2019-07-29 06:55:21'),
(10, 'Guava', 'Fresho brings you an assortment of 4 imported guava', 59, '[\"1564383349809-guava_2.jpg\",\"1564383349810-guava_3.jpg\"]', 0, '2019-07-29 06:55:49', '2019-07-29 06:55:49'),
(24, 'Litchi', 'Red delicious, regular ', 89, '[\"1564475823830-litchi_1.png\",\"1564475823832-litchi_2.jpg\",\"1564475823832-litchi_3.jpg\"]', 0, '2019-07-30 08:37:03', '2019-07-30 08:37:03'),
(25, 'Kiwi', 'Fresho Baby Kiwi - Green', 260, '[\"1565153626314-kiwi_1.jpg\",\"1565153626314-kiwi_2.jpg\",\"1565153626316-kiwi_3.jpg\"]', 0, '2019-08-07 04:53:46', '2019-08-07 04:53:46');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `fullname`, `email`, `password`, `address`, `city`, `gender`, `createdAt`, `updatedAt`) VALUES
(5, 'Nishi Dalal', 'nishid@lanetteam.com', '$2a$10$sgY1Wbassuvt.IOZz8HfmumSKkcwhIydFtvqCmbLLDZR9lS.wLERy', 'Pal', 'Surat', 'Female', '2019-07-24 11:58:44', '2019-07-24 11:58:44'),
(6, 'Meet Sorathiya', 'meet22@gmail.com', '$2a$10$QahSFxZ081Ru5FD3vCKF6en7VY5iq6.CJys.QA76Tln/DeBkMxgHe', '1410 NE Campus Pkwy\nGalaxy apt', 'Surat', 'Male', '2019-08-06 11:54:20', '2019-08-06 11:54:20'),
(7, 'Hezal Tank', 'hezal9@gmail.com', '$2a$10$QahSFxZ081Ru5FD3vCKF6ecCwuCsekMmOMvCUeImP07D9.Moujyie', 'Kalpana society, Adajan', 'Surat', 'Female', '2019-08-06 12:50:34', '2019-08-06 12:50:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_carts`
--
ALTER TABLE `tbl_carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `tbl_fruits`
--
ALTER TABLE `tbl_fruits`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_carts`
--
ALTER TABLE `tbl_carts`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_fruits`
--
ALTER TABLE `tbl_fruits`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_carts`
--
ALTER TABLE `tbl_carts`
  ADD CONSTRAINT `tbl_carts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `tbl_fruits` (`product_id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

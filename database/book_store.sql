-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2025 at 02:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_to_cart`
--

CREATE TABLE `add_to_cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(10) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `total_amount` int(10) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `company_info`
--

CREATE TABLE `company_info` (
  `id` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `email2` varchar(100) DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `contact2` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_info`
--

INSERT INTO `company_info` (`id`, `email`, `email2`, `contact`, `contact2`, `address`) VALUES
(13, 'jyoti@gmail.com', 'gourav@gmail.com', '63876863', '8972377872', 'road no 432 sadar bazar road, near by coffee house');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `contact_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` int(11) NOT NULL,
  `message` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`contact_id`, `email`, `contact`, `message`) VALUES
(3, '', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_items_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` int(10) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_items_id`, `order_id`, `product_id`, `price`, `quantity`, `total_amount`) VALUES
(82, 63, 21, 200, 1, 200),
(83, 64, 23, 200, 1, 200),
(84, 65, 22, 200, 1, 200),
(85, 66, 22, 200, 1, 200),
(86, 67, 20, 250, 1, 250),
(87, 68, 23, 200, 1, 200),
(88, 69, 22, 200, 1, 200),
(89, 70, 21, 200, 1, 200);

-- --------------------------------------------------------

--
-- Table structure for table `order_table`
--

CREATE TABLE `order_table` (
  `order_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_item` int(10) DEFAULT NULL,
  `total_pay` int(11) DEFAULT NULL,
  `random_number` int(11) DEFAULT floor(100000 + rand() * 900000),
  `order_status` enum('Pending','Shipping','Delivered','Canceled') NOT NULL DEFAULT 'Pending',
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `estimate_delivery_date` timestamp NOT NULL DEFAULT (current_timestamp() + interval 5 day),
  `status_history` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`status_history`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_table`
--

INSERT INTO `order_table` (`order_id`, `address_id`, `user_id`, `total_item`, `total_pay`, `random_number`, `order_status`, `order_date`, `estimate_delivery_date`, `status_history`) VALUES
(63, 9, 10, 1, 200, 212634, 'Canceled', '2025-02-23 14:36:51', '2025-02-28 14:36:51', '[]'),
(64, 9, 10, 1, 200, 937768, 'Canceled', '2025-02-23 14:46:00', '2025-02-28 14:46:00', '[]'),
(65, 12, 14, 1, 200, 350941, 'Delivered', '2025-02-23 14:53:57', '2025-02-28 14:53:57', '[]'),
(66, 12, 14, 1, 200, 641400, 'Canceled', '2025-02-23 14:56:42', '2025-02-28 14:56:42', '[]'),
(67, 14, 15, 1, 250, 111958, 'Delivered', '2025-02-23 17:00:42', '2025-02-28 17:00:42', '[]'),
(68, 13, 12, 1, 200, 188979, 'Canceled', '2025-02-24 12:20:06', '2025-03-01 12:20:06', '[]'),
(69, 13, 12, 1, 200, 342545, 'Shipping', '2025-02-24 14:51:52', '2025-03-01 14:51:52', '[]'),
(70, 13, 12, 1, 200, 358718, 'Canceled', '2025-02-24 14:52:01', '2025-03-01 14:52:01', '[]');

--
-- Triggers `order_table`
--
DELIMITER $$
CREATE TRIGGER `set_default_status_history` BEFORE INSERT ON `order_table` FOR EACH ROW BEGIN
    IF NEW.status_history IS NULL OR NEW.status_history = '' THEN
        SET NEW.status_history = '["Pending"]';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `author` varchar(100) NOT NULL,
  `description` varchar(400) DEFAULT NULL,
  `price` int(10) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `title`, `author`, `description`, `price`, `image`, `is_deleted`) VALUES
(19, 'the power of subsconcious mind', 'rk.jain', 'this the brain power related  content and boost your power', 300, 'uploads\\1739164420469.webp', 0),
(20, 'the art of power', 'shuriti jain', 'art is the powerfull and how to grow your power', 250, 'uploads\\1739164488718.webp', 0),
(21, 'the dopamin detox', 'rr.jain', 'dopamine improve knowlage', 200, 'uploads\\1739200165917.webp', 0),
(22, 'rich dad and poor dad', 'kk.raja', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ', 200, 'uploads\\1739464028477.jpg', 0),
(23, 'you can do it', 'jhon.sharma', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s w', 200, 'uploads\\1739465496351.webp', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `email`, `password`, `role`) VALUES
(10, 'shivani', 'shivani@gmail.com', 'shivani', 'user'),
(11, 'jaya', 'jaya@gmail.com', 'jaya123', 'user'),
(12, 'sneha', 'sneha@gmail.com', 'sneha123', 'user'),
(13, 'jyoti yadav', 'jyoti@gmail.com', 'jyoti123', 'admin'),
(14, 'gourav', 'gourav@gmail.com', 'gourav', 'user'),
(15, 'mansi', 'mansi@gmail.com', 'mansi123', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `address_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `contact` int(10) DEFAULT NULL,
  `pincode` int(10) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `house_no` varchar(10) DEFAULT NULL,
  `road_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_address`
--

INSERT INTO `user_address` (`address_id`, `user_id`, `full_name`, `contact`, `pincode`, `city`, `state`, `house_no`, `road_name`) VALUES
(9, 10, 'shivani yadav', 2147483647, 482002, 'jabalpur', 'mp', 'jayanti co', 'near by shanaya jewellery'),
(10, 10, 'jyoti yadav', 2147483647, 482202, 'jabalpur', 'mp', 'baldevbag ', 'near by little school'),
(11, 11, 'jaya yadav', 766348768, 482002, 'jabalpur', 'mp', 'naya mohll', 'near by jaynti complex'),
(12, 14, 'gourav burman', 2147483647, 482001, 'jabalpur', 'mp', 'baldevbag ', 'baldevbag sanjay school'),
(13, 12, 'snehavishwakarma', 734768763, 482002, 'jabalpur', 'mp', 'near by me', 'futatal '),
(14, 15, 'mansi gupta', 2147483647, 482002, 'jabalpur', 'mp', 'gadha fata', 'near by gadha fatak');

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `profile_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `profile_image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_to_cart`
--
ALTER TABLE `add_to_cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `fk_addCart_userId` (`user_id`),
  ADD KEY `fk_addCart_productId` (`product_id`);

--
-- Indexes for table `company_info`
--
ALTER TABLE `company_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_items_id`),
  ADD KEY `fk_productId_orderItems` (`product_id`),
  ADD KEY `fk_OrderId_orderItems` (`order_id`);

--
-- Indexes for table `order_table`
--
ALTER TABLE `order_table`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_userAddress_orderTable` (`address_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `fk_userId_userAddress` (`user_id`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`profile_id`),
  ADD KEY `fk_userId_userProfile` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_to_cart`
--
ALTER TABLE `add_to_cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT for table `company_info`
--
ALTER TABLE `company_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_items_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `order_table`
--
ALTER TABLE `order_table`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `add_to_cart`
--
ALTER TABLE `add_to_cart`
  ADD CONSTRAINT `fk_addCart_productId` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `fk_addCart_userId` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_OrderId_orderItems` FOREIGN KEY (`order_id`) REFERENCES `order_table` (`order_id`),
  ADD CONSTRAINT `fk_productId_orderItems` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `order_table`
--
ALTER TABLE `order_table`
  ADD CONSTRAINT `fk_userAddress_orderTable` FOREIGN KEY (`address_id`) REFERENCES `user_address` (`address_id`);

--
-- Constraints for table `user_address`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `fk_userId_userAddress` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `fk_userId_userProfile` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2019 at 05:26 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `koala`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `forename` varchar(32) COLLATE utf16_unicode_ci DEFAULT NULL,
  `surname` varchar(32) COLLATE utf16_unicode_ci DEFAULT NULL,
  `email` varchar(32) COLLATE utf16_unicode_ci DEFAULT NULL,
  `subject` varchar(2048) COLLATE utf16_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf16_unicode_ci,
  `dateRecieved` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `forename`, `surname`, `email`, `subject`, `message`, `dateRecieved`) VALUES
(7, 'Minh', 'Trinh', 'trinh@gmail.com', 'Request copy of an invoice', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2019-12-04 11:09:52'),
(8, 'John', 'Holland', 'Holland@gmail.com', 'Request order status', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictum sit amet justo donec enim diam vulputate. Dignissim enim sit amet venenatis urna cursus eget. Donec ac odio tempor orci dapibus ultrices. Dolor morbi non arcu risus quis varius quam.', '2019-12-04 11:10:30'),
(9, 'Quinton', 'Carlsberg', 'Quinton@mail.com', 'Request quotation', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam purus sit amet luctus venenatis. Orci phasellus egestas tellus rutrum tellus pellentesque eu. In metus vulputate eu scelerisque felis. Fringilla est ullamcorper eget nulla facilisi etiam dignissim.', '2019-12-04 11:11:28'),
(10, 'Camille', 'Schneider', 'CamCam@gmail.com', 'Request order status', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Commodo odio aenean sed adipiscing diam donec adipiscing. Tincidunt augue interdum velit euismod in pellentesque massa placerat. Posuere urna nec tincidunt praesent. At consectetur lorem donec massa sapien faucibus. Eget lorem dolor sed viverra.', '2019-12-04 11:12:22');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(32) COLLATE utf16_unicode_ci DEFAULT NULL,
  `img` text COLLATE utf16_unicode_ci NOT NULL,
  `jobTitle` varchar(32) COLLATE utf16_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `img`, `jobTitle`) VALUES
(3, 'John Doe', 'https://i.imgur.com/zwRv9Lz.jpg', 'CEO'),
(4, 'Jane Doe', 'https://i.imgur.com/wLIjvGr.jpg', 'CRO'),
(5, 'John Doe', 'https://i.imgur.com/FM3p4AN.jpg', 'CTO'),
(6, 'Jane Doe', 'https://i.imgur.com/icTAIQA.jpg', 'CFO '),
(7, 'John Doe', 'https://i.imgur.com/d7SE1de.jpg', 'COO'),
(8, 'Jane Doe', 'https://i.imgur.com/BUFIe2u.jpg', 'Founder');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(30) COLLATE utf16_unicode_ci NOT NULL,
  `description` longtext COLLATE utf16_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `img` text COLLATE utf16_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `price`, `img`) VALUES
(1, 'Gunslinger', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor magna eget est lorem ipsum dolor.', 50, 'https://i.imgur.com/cjzGS2g.jpg'),
(2, 'Controller', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis.', 70, 'https://i.imgur.com/t3L2wZa.jpg'),
(3, 'Arcade games', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis.', 50, 'https://i.imgur.com/YgkqGym.jpg'),
(4, 'World map', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam id diam maecenas ultricies.', 12.5, 'https://i.imgur.com/eyCRby4.jpg'),
(5, 'Oculus', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 200, 'https://i.imgur.com/r1Ci0cT.jpg'),
(6, 'Hardware', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus ornare suspendisse sed nisi lacus sed viverra.\r\n', 50, 'https://i.imgur.com/q00Zb6Z.jpg'),
(7, 'Switch', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua \r\n       ', 300, 'https://i.imgur.com/WRJV0QH.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(16) COLLATE utf16_unicode_ci NOT NULL,
  `password` varchar(16) COLLATE utf16_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`) VALUES
('Minh', '1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

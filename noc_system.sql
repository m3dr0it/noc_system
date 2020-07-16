-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 07, 2020 at 11:04 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `noc_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `beam`
--

CREATE TABLE `beam` (
  `beam_id` int(2) NOT NULL,
  `beam` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `beam`
--

INSERT INTO `beam` (`beam_id`, `beam`) VALUES
(1, 1),
(10, 10),
(11, 11);

-- --------------------------------------------------------

--
-- Table structure for table `modem`
--

CREATE TABLE `modem` (
  `modem_id` int(5) NOT NULL,
  `modem` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `modem`
--

INSERT INTO `modem` (`modem_id`, `modem`) VALUES
(2510, 'Newtec 2510'),
(3310, 'Newtec 3310'),
(5010, 'Newtec 5010');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` varchar(32) NOT NULL,
  `service_name` varchar(32) NOT NULL,
  `bandwith` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `service_name`, `bandwith`) VALUES
('3Mb', '3Mbps 1 to 6', '3Mbps(1:6)'),
('G20', 'Gigstarter 20/5', '20/5 Mbps'),
('G35', 'Gigstarter 35/5', '35/5 Mbps');

-- --------------------------------------------------------

--
-- Table structure for table `sites`
--

CREATE TABLE `sites` (
  `link_id` varchar(32) NOT NULL,
  `site_name` varchar(128) NOT NULL,
  `beam_id` int(2) NOT NULL,
  `service_id` varchar(32) NOT NULL,
  `svno_id` int(1) NOT NULL,
  `modem_id` int(5) NOT NULL,
  `serial_number` bigint(32) NOT NULL,
  `mac_air` varchar(32) NOT NULL,
  `longitude` double(11,7) NOT NULL,
  `latitude` double(11,7) NOT NULL,
  `status_id` int(1) NOT NULL,
  `start_online` date NOT NULL,
  `pid` varchar(32) NOT NULL,
  `terminal_name` varchar(128) NOT NULL,
  `link_portal` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sites`
--

INSERT INTO `sites` (`link_id`, `site_name`, `beam_id`, `service_id`, `svno_id`, `modem_id`, `serial_number`, `mac_air`, `longitude`, `latitude`, `status_id`, `start_online`, `pid`, `terminal_name`, `link_portal`) VALUES
('203141VS031-001', 'Papua - Fak Fak', 1, '3Mb', 2, 2510, 7294500301409, '00:06:39:8c:7a:fa', -2.9348300, 132.3121150, 2, '2020-05-01', '203141-2020-03-031', 'RT_JAV1-1-Fakfak1', 'https://portal.kacific.com:3000/d/wCEpQrzMz/petro-1-all-terminals-monitoring?from=now-3h&to=now&var-Terminal=RT_JAV1-1-Fakfak1&var-TerminalID=26550&var-TerminalRow=RT_JAV1-1-Fakfak1&var-mac=00:06:39:8c:7a:fa');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `status_id` int(1) NOT NULL,
  `status` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`status_id`, `status`) VALUES
(1, 'offline'),
(2, 'online'),
(3, 'activated'),
(4, 'not activated'),
(5, 'suspended');

-- --------------------------------------------------------

--
-- Table structure for table `svno`
--

CREATE TABLE `svno` (
  `svno_id` int(1) NOT NULL,
  `svno` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `svno`
--

INSERT INTO `svno` (`svno_id`, `svno`) VALUES
(1, 'kacific'),
(2, 'petro1');

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `project_id` varchar(32) NOT NULL,
  `vendor` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`project_id`, `vendor`) VALUES
('1003251-2020-05-003', 'MIRZA'),
('1004451-2020-06-001', 'INTECH'),
('203141-2020-03-031', 'JKOM'),
('203141-2020-03-032', 'WIKAS'),
('203351-2020-05-033', 'TJTM'),
('203451-2020-06-034', 'AMIN'),
('203651-2020-06-046', 'FELIX'),
('203851-2020-6-048-01', 'GUNKA');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `beam`
--
ALTER TABLE `beam`
  ADD PRIMARY KEY (`beam_id`);

--
-- Indexes for table `modem`
--
ALTER TABLE `modem`
  ADD PRIMARY KEY (`modem_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `sites`
--
ALTER TABLE `sites`
  ADD PRIMARY KEY (`link_id`),
  ADD KEY `beam` (`beam_id`),
  ADD KEY `modem` (`modem_id`),
  ADD KEY `service` (`service_id`),
  ADD KEY `pid` (`pid`),
  ADD KEY `svno` (`svno_id`),
  ADD KEY `status` (`status_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `svno`
--
ALTER TABLE `svno`
  ADD PRIMARY KEY (`svno_id`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`project_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sites`
--
ALTER TABLE `sites`
  ADD CONSTRAINT `beam` FOREIGN KEY (`beam_id`) REFERENCES `beam` (`beam_id`),
  ADD CONSTRAINT `modem` FOREIGN KEY (`modem_id`) REFERENCES `modem` (`modem_id`),
  ADD CONSTRAINT `pid` FOREIGN KEY (`pid`) REFERENCES `vendor` (`project_id`),
  ADD CONSTRAINT `service` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`),
  ADD CONSTRAINT `status` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`),
  ADD CONSTRAINT `svno` FOREIGN KEY (`svno_id`) REFERENCES `svno` (`svno_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

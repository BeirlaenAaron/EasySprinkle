-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Gegenereerd op: 25 mei 2020 om 20:11
-- Serverversie: 10.3.17-MariaDB-0+deb10u1
-- PHP-versie: 7.3.11-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `EasySprinkledb`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Actie`
--

CREATE TABLE `Actie` (
  `idActie` int(11) NOT NULL,
  `DeviceID` varchar(20) DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  `TijdActie` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `Actie`
--

INSERT INTO `Actie` (`idActie`, `DeviceID`, `Status`, `TijdActie`) VALUES
(1, 'VALVE1', 'OFF', '2020-05-25 08:00:00'),
(2, 'VALVE1', 'OFF', '2020-05-25 08:00:00'),
(3, 'VALVE1', 'ON', '2020-05-25 08:00:00'),
(4, 'VALVE1', 'OFF', '2020-05-25 09:00:00'),
(5, 'VALVE1', 'OFF', '2020-05-25 09:00:00'),
(6, 'VALVE1', 'ON', '2020-05-25 09:00:00'),
(7, 'VALVE1', 'OFF', '2020-05-25 10:00:00'),
(8, 'VALVE1', 'OFF', '2020-05-25 10:00:00'),
(9, 'VALVE1', 'OFF', '2020-05-25 10:00:00'),
(10, 'VALVE1', 'OFF', '2020-05-25 11:00:00'),
(11, 'VALVE1', 'OFF', '2020-05-25 11:00:00'),
(12, 'VALVE1', 'ON', '2020-05-25 11:00:00'),
(13, 'VALVE1', 'OFF', '2020-05-25 12:00:00'),
(14, 'VALVE1', 'OFF', '2020-05-25 12:00:00'),
(15, 'VALVE1', 'OFF', '2020-05-25 12:00:00'),
(16, 'VALVE1', 'OFF', '2020-05-25 13:00:00'),
(17, 'VALVE1', 'ON', '2020-05-25 13:00:00'),
(18, 'VALVE1', 'OFF', '2020-05-25 13:00:00'),
(19, 'VALVE1', 'OFF', '2020-05-25 14:00:00'),
(20, 'VALVE1', 'ON', '2020-05-25 14:00:00'),
(21, 'VALVE1', 'OFF', '2020-05-25 14:00:00'),
(22, 'VALVE1', 'OFF', '2020-05-25 15:00:00'),
(23, 'VALVE1', 'OFF', '2020-05-25 15:00:00'),
(24, 'VALVE1', 'OFF', '2020-05-25 15:00:00'),
(25, 'VALVE1', 'OFF', '2020-05-25 16:00:00'),
(26, 'VALVE1', 'ON', '2020-05-25 16:00:00'),
(27, 'VALVE1', 'OFF', '2020-05-25 16:00:00'),
(28, 'VALVE1', 'OFF', '2020-05-25 17:00:00'),
(29, 'VALVE1', 'OFF', '2020-05-25 17:00:00'),
(30, 'VALVE1', 'OFF', '2020-05-25 17:00:00'),
(31, 'VALVE1', 'ON', '2020-05-25 18:00:00'),
(32, 'VALVE1', 'OFF', '2020-05-25 18:00:00'),
(33, 'VALVE1', 'OFF', '2020-05-25 18:00:00'),
(34, 'VALVE1', 'ON', '2020-05-25 19:00:00'),
(35, 'VALVE1', 'OFF', '2020-05-25 19:00:00'),
(36, 'VALVE1', 'OFF', '2020-05-25 19:00:00'),
(37, 'VALVE1', 'OFF', '2020-05-25 20:00:00'),
(38, 'VALVE1', 'OFF', '2020-05-25 20:00:00'),
(39, 'VALVE1', 'OFF', '2020-05-25 20:00:00'),
(40, 'VALVE1', 'ON', '2020-05-25 21:00:00'),
(41, 'VALVE1', 'OFF', '2020-05-25 21:00:00'),
(42, 'VALVE1', 'OFF', '2020-05-25 21:00:00'),
(43, 'VALVE1', 'OFF', '2020-05-25 22:00:00'),
(44, 'VALVE1', 'OFF', '2020-05-25 22:00:00'),
(45, 'VALVE1', 'ON', '2020-05-25 22:00:00'),
(46, 'VALVE1', 'OFF', '2020-05-25 23:00:00'),
(47, 'VALVE1', 'OFF', '2020-05-25 23:00:00'),
(48, 'VALVE1', 'ON', '2020-05-25 23:00:00'),
(49, 'VALVE1', 'OFF', '2020-05-26 00:00:00'),
(50, 'VALVE1', 'OFF', '2020-05-26 00:00:00'),
(51, 'VALVE1', 'OFF', '2020-05-26 00:00:00');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Device`
--

CREATE TABLE `Device` (
  `idDevice` varchar(20) NOT NULL,
  `Type` varchar(100) DEFAULT NULL,
  `Meeteenheid` varchar(45) DEFAULT NULL,
  `Beschrijving` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `Device`
--

INSERT INTO `Device` (`idDevice`, `Type`, `Meeteenheid`, `Beschrijving`) VALUES
('MOIST', 'Bodemvochtigheid', '%', 'Moisture sensor'),
('TEMP', 'Temperatuur', '°C', 'One-wire temperatuursensor'),
('VALVE1', 'Actuator', NULL, 'Magneetventiel'),
('WATER', 'Neerslag waterniveau', 'mm', 'Water level sensor');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Meting`
--

CREATE TABLE `Meting` (
  `idMeting` int(11) NOT NULL,
  `DeviceID` varchar(20) DEFAULT NULL,
  `Waarde` float DEFAULT NULL,
  `TijdMeting` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `Meting`
--

INSERT INTO `Meting` (`idMeting`, `DeviceID`, `Waarde`, `TijdMeting`) VALUES
(1, 'TEMP', 24.1, '2020-05-25 08:00:00'),
(2, 'MOIST', 6, '2020-05-25 08:00:00'),
(3, 'WATER', 0.3, '2020-05-25 08:00:00'),
(4, 'TEMP', 5.5, '2020-05-25 09:00:00'),
(5, 'MOIST', 90, '2020-05-25 09:00:00'),
(6, 'WATER', 0.4, '2020-05-25 09:00:00'),
(7, 'TEMP', 7.8, '2020-05-25 10:00:00'),
(8, 'MOIST', 76, '2020-05-25 10:00:00'),
(9, 'WATER', 0.4, '2020-05-25 10:00:00'),
(10, 'TEMP', 19, '2020-05-25 11:00:00'),
(11, 'MOIST', 18, '2020-05-25 11:00:00'),
(12, 'WATER', 0.3, '2020-05-25 11:00:00'),
(13, 'TEMP', 10.9, '2020-05-25 12:00:00'),
(14, 'MOIST', 100, '2020-05-25 12:00:00'),
(15, 'WATER', 0.5, '2020-05-25 12:00:00'),
(16, 'TEMP', 15.2, '2020-05-25 13:00:00'),
(17, 'MOIST', 65, '2020-05-25 13:00:00'),
(18, 'WATER', 0.4, '2020-05-25 13:00:00'),
(19, 'TEMP', 5.4, '2020-05-25 14:00:00'),
(20, 'MOIST', 50, '2020-05-25 14:00:00'),
(21, 'WATER', 0.9, '2020-05-25 14:00:00'),
(22, 'TEMP', 24.8, '2020-05-25 15:00:00'),
(23, 'MOIST', 95, '2020-05-25 15:00:00'),
(24, 'WATER', 0.1, '2020-05-25 15:00:00'),
(25, 'TEMP', 24, '2020-05-25 16:00:00'),
(26, 'MOIST', 95, '2020-05-25 16:00:00'),
(27, 'WATER', 0.1, '2020-05-25 16:00:00'),
(28, 'TEMP', 22.6, '2020-05-25 17:00:00'),
(29, 'MOIST', 13, '2020-05-25 17:00:00'),
(30, 'WATER', 0.8, '2020-05-25 17:00:00'),
(31, 'TEMP', 11.1, '2020-05-25 18:00:00'),
(32, 'MOIST', 80, '2020-05-25 18:00:00'),
(33, 'WATER', 0.9, '2020-05-25 18:00:00'),
(34, 'TEMP', 8.9, '2020-05-25 19:00:00'),
(35, 'MOIST', 9, '2020-05-25 19:00:00'),
(36, 'WATER', 0.1, '2020-05-25 19:00:00'),
(37, 'TEMP', 23.4, '2020-05-25 20:00:00'),
(38, 'MOIST', 92, '2020-05-25 20:00:00'),
(39, 'WATER', 0.3, '2020-05-25 20:00:00'),
(40, 'TEMP', 19.9, '2020-05-25 21:00:00'),
(41, 'MOIST', 100, '2020-05-25 21:00:00'),
(42, 'WATER', 0.3, '2020-05-25 21:00:00'),
(43, 'TEMP', 20.8, '2020-05-25 22:00:00'),
(44, 'MOIST', 56, '2020-05-25 22:00:00'),
(45, 'WATER', 0.2, '2020-05-25 22:00:00'),
(46, 'TEMP', 11.1, '2020-05-25 23:00:00'),
(47, 'MOIST', 35, '2020-05-25 23:00:00'),
(48, 'WATER', 0.4, '2020-05-25 23:00:00'),
(49, 'TEMP', 11.5, '2020-05-26 00:00:00'),
(50, 'MOIST', 81, '2020-05-26 00:00:00'),
(51, 'WATER', 0.2, '2020-05-26 00:00:00');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `Actie`
--
ALTER TABLE `Actie`
  ADD PRIMARY KEY (`idActie`),
  ADD UNIQUE KEY `Code_UNIQUE` (`idActie`),
  ADD KEY `fk_DeviceID_idx` (`DeviceID`);

--
-- Indexen voor tabel `Device`
--
ALTER TABLE `Device`
  ADD PRIMARY KEY (`idDevice`),
  ADD UNIQUE KEY `idSensor_UNIQUE` (`idDevice`);

--
-- Indexen voor tabel `Meting`
--
ALTER TABLE `Meting`
  ADD PRIMARY KEY (`idMeting`),
  ADD UNIQUE KEY `idMeting_UNIQUE` (`idMeting`),
  ADD KEY `fk_DeviceID_idx` (`DeviceID`);

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `Actie`
--
ALTER TABLE `Actie`
  ADD CONSTRAINT `fk_ActieDeviceID` FOREIGN KEY (`DeviceID`) REFERENCES `Device` (`idDevice`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Beperkingen voor tabel `Meting`
--
ALTER TABLE `Meting`
  ADD CONSTRAINT `fk_DeviceID` FOREIGN KEY (`DeviceID`) REFERENCES `Device` (`idDevice`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

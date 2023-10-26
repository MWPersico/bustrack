-- Código base para criação do banco de dados e da tabela veículos;
CREATE DATABASE `bustrack`;

CREATE TABLE `bustrack`.`vehicles` (
  `vehicleId` smallint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `lat` Double,
  `long` Double,
  `avgSpeed` Double NOT NULL,
  `vehicleType` varchar(300) NOT NULL,
  `lastTrack` datetime,
PRIMARY KEY (`vehicleId`)
);
CREATE DATABASE IF NOT EXISTS `ucode_web`;

USE `ucode_web`;

DROP TABLE IF EXISTS `ucode_web`.`users`;

CREATE TABLE IF NOT EXISTS `ucode_web`.`users` (
    `id_user` INT NOT NULL AUTO_INCREMENT UNIQUE,
    `login` VARCHAR(45) NOT NULL UNIQUE,
    `password` VARCHAR(45) NOT NULL,
    `has_avatar` BOOLEAN NOT NULL DEFAULT 0,
    `is_searching` BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (`id_user`)
);

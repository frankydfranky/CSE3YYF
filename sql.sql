CREATE DATABASE `medicaltreatment`;
USE `medicaltreatment`; 

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` VARCHAR(50) NOT NULL,
  `userName` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=INNODB  DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `patient`;
CREATE TABLE `patient` (
  `pid` VARCHAR(50) NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `gender` VARCHAR(20) NOT NULL,
  `age` INT NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=INNODB  DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `clinicalstudies`;
CREATE TABLE `clinicalstudies` (
  `cid` VARCHAR(50) NOT NULL,
  `studiesname` VARCHAR(200) NOT NULL,
  `description` LONGTEXT NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=INNODB  DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `trialorganization`;
CREATE TABLE `trialorganization` (
  `tid` VARCHAR(50) NOT NULL,
  `organizationname` VARCHAR(200) NOT NULL,
  `description` LONGTEXT NOT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=INNODB  DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `managestudies`;
CREATE TABLE `managestudies` (
  `cid` VARCHAR(50) NOT NULL,
  `pid` VARCHAR(50) NOT NULL,
  `date` TIMESTAMP NOT NULL,
  CONSTRAINT `managestudies_cid` FOREIGN KEY(cid) REFERENCES clinicalstudies(cid),
  CONSTRAINT `managestudies_pid` FOREIGN KEY(pid) REFERENCES patient(pid),
  PRIMARY KEY (`cid`,`pid`)
) ENGINE=INNODB  DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `observations`;
CREATE TABLE `observations` (
  `oid` VARCHAR(50) NOT NULL,
  `text` LONGTEXT NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `pid` VARCHAR(50) NOT NULL,
  CONSTRAINT `observations_pid` FOREIGN KEY(pid) REFERENCES patient(pid),
  PRIMARY KEY (`oid`)
) ENGINE=INNODB  DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `treatment`;
CREATE TABLE `treatment` (
  `trid` VARCHAR(50) NOT NULL,
  `text` LONGTEXT NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `pid` VARCHAR(50) NOT NULL,
  CONSTRAINT `treatment_pid` FOREIGN KEY(pid) REFERENCES patient(pid),
  PRIMARY KEY (`trid`)
) ENGINE=INNODB  DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer` (
  `aid` VARCHAR(50) NOT NULL,
  `question_text` LONGTEXT NOT NULL,
  `answer_text` LONGTEXT NOT NULL,
  `notes_text` LONGTEXT NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `pid` VARCHAR(50) NOT NULL,
  CONSTRAINT `answer_pid` FOREIGN KEY(pid) REFERENCES patient(pid),
  PRIMARY KEY (`aid`)
) ENGINE=INNODB  DEFAULT CHARSET=utf8;

INSERT INTO `users`(uid,userName,`password`)VALUES('qwe123-qwe23211','root','123');
/* db: bezrukovyra_dev2 */

CREATE TABLE IF NOT EXISTS `termins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(10) NOT NULL,
  `hour` varchar(2) NOT NULL,
  `minute` varchar(2) NOT NULL,
  `fam` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `birthday` varchar(10) NOT NULL,
  `phone1` varchar(15) NOT NULL,
  `phone2` varchar(15) NOT NULL,
  `region` varchar(30) NOT NULL,
  `insurance` varchar(30) NOT NULL,
  `zuweiser` varchar(50) NOT NULL,
  `comments` varchar(300) NOT NULL,
  `userRegister` varchar(30) NOT NULL,
  `visitDateNumber` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `role` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;


INSERT INTO `users` (`id`, `name`, `password`, `email`, `role`) VALUES
(3, 'Иванов Сергей', '7694f4a66316e53c8cdd9d9954bd611d', 'q@q.q', 1),
(9, 'Петров Николай', 'f1290186a5d0b1ceab27f4e77c0c5d68', 'w@w.w', 0);

CREATE USER 'bezrukovyra_dev2'@'localhost' IDENTIFIED VIA mysql_native_password USING '***';GRANT ALL PRIVILEGES ON *.* TO 'bezrukovyra_dev2'@'localhost' REQUIRE NONE WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;GRANT ALL PRIVILEGES ON `bezrukovyra_dev2`.* TO 'bezrukovyra_dev2'@'localhost';
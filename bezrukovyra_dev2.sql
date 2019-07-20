-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Июл 17 2019 г., 20:11
-- Версия сервера: 5.6.39-83.1
-- Версия PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `bezrukovyra_dev2`
--

-- --------------------------------------------------------

--
-- Структура таблицы `dayoffs`
--

CREATE TABLE IF NOT EXISTS `dayoffs` (
  `year` varchar(255) NOT NULL,
  `dates` text NOT NULL,
  PRIMARY KEY (`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `dayoffs`
--

INSERT INTO `dayoffs` (`year`, `dates`) VALUES
('2019', '[\"2019-04-04\",\"2019-04-11\",\"2019-04-18\",\"2019-04-24\",\"2019-04-23\",\"2019-04-22\",\"2019-10-04\",\"2019-10-11\",\"2019-10-18\",\"2019-10-25\",\"2019-10-31\",\"2019-10-30\",\"2019-10-29\",\"2019-10-28\",\"2019-02-15\",\"2019-02-21\",\"2019-01-09\",\"2019-01-10\",\"2019-04-12\",\"2019-07-18\"]');

-- --------------------------------------------------------

--
-- Структура таблицы `termins`
--

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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `termins`
--

INSERT INTO `termins` (`id`, `date`, `hour`, `minute`, `fam`, `name`, `birthday`, `phone1`, `phone2`, `region`, `insurance`, `zuweiser`, `comments`, `userRegister`, `visitDateNumber`) VALUES
(30, '2019-7-8', '06', '00', 'test', 'test', '1990_12_12', '123123', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `role` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `role`) VALUES
(3, 'Иванов Сергей', '7694f4a66316e53c8cdd9d9954bd611d', 'q@q.q', 1),
(9, 'Петров Николай', 'f1290186a5d0b1ceab27f4e77c0c5d68', 'w@w.w', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Июл 15 2019 г., 07:10
-- Версия сервера: 5.7.21-20-beget-5.7.21-20-1-log
-- Версия PHP: 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `mtk25_termin`
--

-- --------------------------------------------------------

--
-- Структура таблицы `dayoffs`
--
-- Создание: Июл 10 2019 г., 08:44
--

DROP TABLE IF EXISTS `dayoffs`;
CREATE TABLE `dayoffs` (
  `year` varchar(255) NOT NULL,
  `dates` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `dayoffs`
--

INSERT INTO `dayoffs` (`year`, `dates`) VALUES
('2019', '[\"2019-10-04\",\"2019-10-11\",\"2019-10-18\",\"2019-10-25\",\"2019-10-31\",\"2019-10-30\",\"2019-10-29\",\"2019-10-28\",\"2019-04-05\",\"2019-04-12\",\"2019-04-19\",\"2019-04-25\",\"2019-04-24\",\"2019-04-23\",\"2019-04-22\"]');

-- --------------------------------------------------------

--
-- Структура таблицы `termins`
--
-- Создание: Июл 05 2019 г., 12:13
--

DROP TABLE IF EXISTS `termins`;
CREATE TABLE `termins` (
  `id` int(11) NOT NULL,
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
  `visitDateNumber` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `termins`
--

INSERT INTO `termins` (`id`, `date`, `hour`, `minute`, `fam`, `name`, `birthday`, `phone1`, `phone2`, `region`, `insurance`, `zuweiser`, `comments`, `userRegister`, `visitDateNumber`) VALUES
(30, '2019-7-8', '06', '00', 'test', 'test', '1990_12_12', '123123', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--
-- Создание: Июл 05 2019 г., 12:13
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `role`) VALUES
(3, 'Иванов Сергей', '7694f4a66316e53c8cdd9d9954bd611d', 'q@q.q', 1),
(9, 'Петров Николай', 'f1290186a5d0b1ceab27f4e77c0c5d68', 'w@w.w', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `dayoffs`
--
ALTER TABLE `dayoffs`
  ADD PRIMARY KEY (`year`);

--
-- Индексы таблицы `termins`
--
ALTER TABLE `termins`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `termins`
--
ALTER TABLE `termins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

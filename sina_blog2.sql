-- phpMyAdmin SQL Dump
-- version 2.10.3
-- http://www.phpmyadmin.net
-- 
-- 主机: localhost
-- 生成日期: 2016 年 09 月 11 日 16:04
-- 服务器版本: 5.0.51
-- PHP 版本: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- 数据库: `sina_blog2`
-- 

-- --------------------------------------------------------

-- 
-- 表的结构 `article`
-- 

CREATE TABLE `article` (
  `id` mediumint(8) NOT NULL auto_increment,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

-- 
-- 导出表中的数据 `article`
-- 

INSERT INTO `article` VALUES (20, 'tr', 'tr', '2016-07-13 13:59:47');
INSERT INTO `article` VALUES (19, 'ds', 'ds', '2016-07-13 12:56:50');
INSERT INTO `article` VALUES (18, '奇怪', '奇怪', '2016-07-12 16:06:58');
INSERT INTO `article` VALUES (17, '789', '456', '2016-07-12 15:58:53');
INSERT INTO `article` VALUES (16, '123', '456', '2016-07-12 15:49:45');
INSERT INTO `article` VALUES (15, 'three', 'threeContent', '2016-07-12 15:30:00');
INSERT INTO `article` VALUES (14, 'two ', 'two twoConten', '2016-07-12 15:29:47');
INSERT INTO `article` VALUES (13, 'one ', 'one content\n', '2016-07-12 15:29:37');

-- --------------------------------------------------------

-- 
-- 表的结构 `register`
-- 

CREATE TABLE `register` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `user` varchar(20) character set ucs2 NOT NULL,
  `pass` char(40) NOT NULL,
  `question` varchar(200) NOT NULL,
  `answer` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `birthday` date NOT NULL,
  `ps` varchar(200) character set ucs2 NOT NULL,
  `reg_time` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=43 ;

-- 
-- 导出表中的数据 `register`
-- 

INSERT INTO `register` VALUES (42, 'asdff', 'asd123', '1', 'asd123', 'asd123s@gemail.com', '2016-01-01', 'asd', '2016-07-09 18:09:37');
INSERT INTO `register` VALUES (41, 'asdf', 'asd123', '1', 'asd123', 'asd123@gemail.com', '2016-01-01', 'asdf', '2016-07-09 18:05:13');

-- --------------------------------------------------------

-- 
-- 表的结构 `skin`
-- 

CREATE TABLE `skin` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `small` varchar(200) character set ucs2 NOT NULL,
  `big` varchar(200) character set ucs2 NOT NULL,
  `color` varchar(200) NOT NULL,
  `flag` tinyint(1) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

-- 
-- 导出表中的数据 `skin`
-- 

INSERT INTO `skin` VALUES (1, 'small_bg1.png', 'bg1.jpg', '#E7E9E8', 0);
INSERT INTO `skin` VALUES (2, 'small_bg2.png', 'bg2.jpg', '#ECF0FC', 0);
INSERT INTO `skin` VALUES (3, 'small_bg3.png', 'bg3.jpg', '#E2E2E2', 0);
INSERT INTO `skin` VALUES (4, 'small_bg4.png', 'bg4.jpg', '#FFFFFF', 0);
INSERT INTO `skin` VALUES (5, 'small_bg5.png', 'bg5.jpg', '#F3F3F3', 0);
INSERT INTO `skin` VALUES (6, 'small_bg6.png', 'bg6.jpg', '#EBDEBE', 1);

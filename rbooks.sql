/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : rbooks

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 20/03/2019 15:51:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `datetime` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `photourl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `love` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `author`(`author`) USING BTREE,
  CONSTRAINT `book_ibfk_1` FOREIGN KEY (`author`) REFERENCES `user` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES (1, '临虚-2 书名也改了', NULL, '这是我很早就想写的小说了，改变了介绍', NULL, NULL, 0);
INSERT INTO `book` VALUES (6, '第二本书', 'wanwenzhuo', '这是用来测试的', '2019-03-18 22:10:37', '...', 3);
INSERT INTO `book` VALUES (7, '第三本书', 'krysta', '这还是用来测试的', '2019-03-18 22:12:10', '没有照片', 111);
INSERT INTO `book` VALUES (8, '第三本书', 'jiangchen', '测试', '2019-03-18 22:12:29', '没有照片', 44);
INSERT INTO `book` VALUES (13, '临虚-2 书名也改了', NULL, '这是我很早就想写的小说了，改变了介绍', NULL, NULL, 0);

-- ----------------------------
-- Table structure for chapter
-- ----------------------------
DROP TABLE IF EXISTS `chapter`;
CREATE TABLE `chapter`  (
  `bookid` int(11) NOT NULL,
  `chaptername` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `content` varchar(20000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `datetime` datetime(0) NOT NULL,
  PRIMARY KEY (`bookid`, `chaptername`) USING BTREE,
  INDEX `chaptername`(`chaptername`) USING BTREE,
  CONSTRAINT `chapter_ibfk_1` FOREIGN KEY (`bookid`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chapter
-- ----------------------------
INSERT INTO `chapter` VALUES (1, '第一章', '该内容', '2019-03-20 15:37:12');
INSERT INTO `chapter` VALUES (1, '第二章', '内容更新', '2019-03-20 15:37:16');
INSERT INTO `chapter` VALUES (1, '虚幻职业', '这是增加章节的测试,还更新了内容', '2019-03-20 15:37:20');
INSERT INTO `chapter` VALUES (6, '第一章', '第一章内容2', '2019-03-20 15:37:25');
INSERT INTO `chapter` VALUES (6, '第二章', '第二章内容2', '2019-03-20 15:37:29');
INSERT INTO `chapter` VALUES (7, '第一章', 'bookid 7 第一章', '2019-03-20 15:37:32');
INSERT INTO `chapter` VALUES (8, '第一章', 'bookid 8 第一章', '2019-03-20 15:37:39');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `bookid` int(11) NOT NULL,
  `chaptername` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `datetime` datetime(0) NOT NULL,
  `commentuser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`bookid`, `chaptername`) USING BTREE,
  INDEX `discussusername`(`commentuser`) USING BTREE,
  INDEX `chaptername`(`chaptername`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`commentuser`) REFERENCES `user` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`chaptername`) REFERENCES `chapter` (`chaptername`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`bookid`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, '第一章', '2019-03-19 08:00:00', 'krysta', '这一章写的不错，');
INSERT INTO `comment` VALUES (1, '第二章', '2019-03-19 09:07:33', 'jiangchen', '这一章不错');
INSERT INTO `comment` VALUES (1, '虚幻职业', '2018-03-23 08:00:00', 'wanwenzhuo', '这是增加评论,还更新了内容');
INSERT INTO `comment` VALUES (6, '第一章', '2019-03-19 08:00:00', 'wanwenzhuo', '这一章写的不错，');
INSERT INTO `comment` VALUES (7, '第一章', '2019-03-19 08:00:00', 'jiangchen', '这一章写的不错，');
INSERT INTO `comment` VALUES (8, '第一章', '2019-03-19 08:00:00', 'xiahongwei', '这一章写的不错，');

-- ----------------------------
-- Table structure for followauthor
-- ----------------------------
DROP TABLE IF EXISTS `followauthor`;
CREATE TABLE `followauthor`  (
  `userid` int(11) NOT NULL,
  `authorid` int(11) NOT NULL,
  PRIMARY KEY (`userid`, `authorid`) USING BTREE,
  INDEX `authorid`(`authorid`) USING BTREE,
  CONSTRAINT `followauthor_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `followauthor_ibfk_2` FOREIGN KEY (`authorid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of followauthor
-- ----------------------------
INSERT INTO `followauthor` VALUES (3, 0);
INSERT INTO `followauthor` VALUES (4, 0);
INSERT INTO `followauthor` VALUES (3, 2);
INSERT INTO `followauthor` VALUES (0, 3);
INSERT INTO `followauthor` VALUES (2, 3);
INSERT INTO `followauthor` VALUES (0, 4);
INSERT INTO `followauthor` VALUES (2, 4);

-- ----------------------------
-- Table structure for followbook
-- ----------------------------
DROP TABLE IF EXISTS `followbook`;
CREATE TABLE `followbook`  (
  `userid` int(11) NOT NULL,
  `bookid` int(11) NOT NULL,
  PRIMARY KEY (`userid`, `bookid`) USING BTREE,
  INDEX `bookid`(`bookid`) USING BTREE,
  CONSTRAINT `followbook_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `followbook_ibfk_2` FOREIGN KEY (`bookid`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of followbook
-- ----------------------------
INSERT INTO `followbook` VALUES (0, 1);
INSERT INTO `followbook` VALUES (2, 1);
INSERT INTO `followbook` VALUES (3, 1);
INSERT INTO `followbook` VALUES (4, 1);
INSERT INTO `followbook` VALUES (0, 6);
INSERT INTO `followbook` VALUES (2, 6);
INSERT INTO `followbook` VALUES (0, 7);
INSERT INTO `followbook` VALUES (2, 7);

-- ----------------------------
-- Table structure for hibernate_sequence
-- ----------------------------
DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE `hibernate_sequence`  (
  `next_val` bigint(20) NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of hibernate_sequence
-- ----------------------------
INSERT INTO `hibernate_sequence` VALUES (14);
INSERT INTO `hibernate_sequence` VALUES (14);
INSERT INTO `hibernate_sequence` VALUES (14);

-- ----------------------------
-- Table structure for information
-- ----------------------------
DROP TABLE IF EXISTS `information`;
CREATE TABLE `information`  (
  `userid` int(11) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `selfintroduction` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `photourl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `githubpage` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `homepage` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`userid`) USING BTREE,
  INDEX `username`(`username`) USING BTREE,
  CONSTRAINT `information_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `information_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`name`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of information
-- ----------------------------
INSERT INTO `information` VALUES (0, 'krysta', 'anti_light@qq.com', 'whuter', '...', 'https://github.com/krystalics', 'krysta.cn');
INSERT INTO `information` VALUES (2, NULL, '这一次设置email', NULL, NULL, NULL, NULL);
INSERT INTO `information` VALUES (3, 'xiahongwei', 'yy@com', 'whuter from 423', '...', 'none', 'none');
INSERT INTO `information` VALUES (4, 'jiangchen', 'zz@com', 'whuter ', '...', 'none', 'none');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (0, 'krysta', 'rbooks', 2);
INSERT INTO `user` VALUES (2, 'wanwenzhuo', '567', 0);
INSERT INTO `user` VALUES (3, 'xiahongwei', '123', 0);
INSERT INTO `user` VALUES (4, 'jiangchen', '321', 0);

SET FOREIGN_KEY_CHECKS = 1;

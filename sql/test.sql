CREATE DATABASE IF NOT EXISTS go_api;
USE go_api;

CREATE TABLE IF NOT EXISTS user
(
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `nick_name` VARCHAR(50),
  `pass_word` VARCHAR(50),
  PRIMARY KEY (`user_id`)
);

CREATE TABLE IF NOT EXISTS adminuser
(
  `admin_user_id` int(10) NOT NULL AUTO_INCREMENT,
  `nick_name` VARCHAR(50),
  `roll_id` int(3),
  `pass_word` VARCHAR(50),
  PRIMARY KEY (`admin_user_id`)
);

CREATE TABLE IF NOT EXISTS adminroll
(
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `roll_name` VARCHAR(50),
  PRIMARY KEY (`id`)
);

INSERT INTO user (nick_name, pass_word) VALUES
("ダミー1", "11111111"),
("ダミー2", "22222222"),
("ダミー3", "33333333"),
("ダミー4", "44444444");

INSERT INTO adminuser (nick_name, roll_id, pass_word) VALUES
("管理者1", 1, "11111111"),
("管理者2", 2, "22222222");

INSERT INTO adminroll (roll_name) VALUES
("管理者"),
("一般");
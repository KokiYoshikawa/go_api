CREATE DATABASE IF NOT EXISTS go_api;
USE go_api;

CREATE TABLE IF NOT EXISTS user
(
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50),
  `last_name` VARCHAR(50),
  `first_name_kana` VARCHAR(50),
  `last_name_kana` VARCHAR(50),
  `mail_address` VARCHAR(100),
  `pass_word` VARCHAR(50),
  PRIMARY KEY (`user_id`)
);

INSERT INTO user (first_name, last_name, first_name_kana, last_name_kana, mail_address, pass_word) VALUES
("姓", "名", "せい", "めい", "sample@xxx.com", "11111111"),
("姓", "名", "せい", "めい", "sample2@xxx.com", "22222222"),
("姓", "名", "せい", "めい", "sample3@xxx.com", "33333333"),
("姓", "名", "せい", "めい", "sample4@xxx.com", "44444444");
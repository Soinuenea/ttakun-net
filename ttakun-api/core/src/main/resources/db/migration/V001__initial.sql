CREATE TABLE IF NOT EXISTS `privilege` (
    `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
    `hash` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `created` DATETIME,
    `updated` DATETIME,
    CONSTRAINT `hash_uindex` UNIQUE (`hash`),
    CONSTRAINT `code_uindex` UNIQUE (`code`)
);

CREATE TABLE IF NOT EXISTS `user` (
    `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
    `hash` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `time_zone` VARCHAR(50),
    `deleted` TINYINT(1) NOT NULL DEFAULT 0,
    `created` DATETIME,
    `updated` DATETIME,
    CONSTRAINT `hash_uindex` UNIQUE (`hash`),
    CONSTRAINT `email_uindex` UNIQUE (`email`)
);

CREATE TABLE IF NOT EXISTS `user_privilege` (
    `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
    `hash` VARCHAR(255) NOT NULL,
    `user_id` INT(11) NOT NULL,
    `privilege_id` INT(11) NOT NULL,
    `created` DATETIME,
    `updated` DATETIME,
    CONSTRAINT `hash_uindex` UNIQUE (`hash`),
    CONSTRAINT `user_privilege_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `user_privilege_privilege_id_fk` FOREIGN KEY (`privilege_id`) REFERENCES `privilege` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `recover_password` (
    `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
    `hash` VARCHAR(255) NOT NULL,
    `user_id` INT(11) NOT NULL,
    `used` TINYINT(1) NOT NULL DEFAULT 0,
    `expiring_time` BIGINT(20) NOT NULL,
    `created` DATETIME,
    `updated` DATETIME,
    CONSTRAINT `hash_uindex` UNIQUE (`hash`),
    CONSTRAINT `recover_password_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `error` (
    `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
    `hash` VARCHAR(255) NOT NULL,
    `user_id` INT(11),
    `message` TEXT,
    `created` DATETIME,
    `updated` DATETIME,
    CONSTRAINT `hash_uindex` UNIQUE (`hash`),
    CONSTRAINT `error_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE DATABASE IF NOT EXISTS challenge;

CREATE TABLE `users` (
    `id` char(36) NOT NULL,
    `email` varchar(255) UNIQUE NOT NULL,
    `name` varchar(255) DEFAULT NULL,
    `password` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE `jobs` (
    `id` char(36) NOT NULL,
    `title` varchar(255) DEFAULT NULL,
    `description` varchar(255) DEFAULT NULL,
    `created_at` datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE `applications` (
    `id` char(36) NOT NULL,
    `job_id` char(36) NOT NULL,
    `user_id` char(36) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `applications_job_id_foreign` (`job_id`),
    KEY `applications_user_id_foreign` (`user_id`),
    CONSTRAINT `applications_job_id_foreign` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`),
    CONSTRAINT `applications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
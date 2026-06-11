CREATE TABLE contact_messages (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(254) NOT NULL,
    message VARCHAR(2000) NOT NULL,
    created_at DATETIME(6) NOT NULL,
    ip VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE guestbook_entries (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nickname VARCHAR(20) NOT NULL,
    message VARCHAR(500) NOT NULL,
    created_at DATETIME(6) NOT NULL,
    ip VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_guestbook_entries_created_at ON guestbook_entries (created_at DESC, id DESC);

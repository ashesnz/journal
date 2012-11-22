CREATE TABLE entry_tbl (
    id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    body text,
    tags VARCHAR(2048) NOT NULL DEFAULT '',
    created TIMESTAMP DEFAULT now(),
    PRIMARY KEY ( id ) );


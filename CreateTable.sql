CREATE TABLE account (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(45) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createTime DATETIME NOT NULL,
    valid BOOLEAN DEFAULT 1,
    PRIMARY KEY (id)
);
CREATE TABLE store (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    phone VARCHAR(45) NOT NULL,
    address VARCHAR(255) NOT NULL,
    valid BOOLEAN DEFAULT 1,
    PRIMARY KEY (id)
);
CREATE TABLE meal (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price INT,
    store_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (store_id)
        REFERENCES store (id)
);
CREATE TABLE activity (
    id INT NOT NULL AUTO_INCREMENT,
    subject VARCHAR(255) NOT NULL,
    store_id INT NOT NULL,
    creator INT NOT NULL,
    creatactivityactivityetime DATETIME NOT NULL,
    endtime DATETIME NOT NULL,
    valid BOOLEAN DEFAULT 1,
    Isdelete BOOLEAN DEFAULT 1,
    PRIMARY KEY (id),
    FOREIGN KEY (store_id)
        REFERENCES store (id),
    FOREIGN KEY (creator)
        REFERENCES account (id)
);
CREATE TABLE ordermeal (
    id INT NOT NULL AUTO_INCREMENT,
    meal VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    num INT NOT NULL DEFAULT 1,
    orderer INT NOT NULL,
    activity INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (orderer)
        REFERENCES account (id),
    FOREIGN KEY (activity)
        REFERENCES activity (id)
);
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
    user_id INT NOT NULL,
    createtime DATETIME NOT NULL,
    endtime DATETIME NOT NULL,
    valid BOOLEAN DEFAULT 1,
    Isdelete BOOLEAN DEFAULT 1,
    PRIMARY KEY (id),
    FOREIGN KEY (store_id)
        REFERENCES store (id),
    FOREIGN KEY (user_id)
        REFERENCES account (id)
);
CREATE TABLE ordermeal (
    id INT NOT NULL AUTO_INCREMENT,
    meal_id INT NOT NULL,
    num INT NOT NULL DEFAULT 1,
    user_id INT NOT NULL,
    activity_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (meal_id)
        REFERENCES meal (id),
    FOREIGN KEY (user_id)
        REFERENCES account (id),
    FOREIGN KEY (activity_id)
        REFERENCES activity (id)
);
CREATE TABLE orderhistory (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    activity_id INT NOT NULL,
    store_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
        REFERENCES account (id),
    FOREIGN KEY (activity_id)
        REFERENCES activity (id),
    FOREIGN KEY (store_id)
        REFERENCES store (id)
);
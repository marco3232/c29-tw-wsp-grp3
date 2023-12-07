DROP DATABASE wspproject;
CREATE DATABASE wspproject;



\c wspproject;


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    contact_number int ,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- CREATE TABLE carts(
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     product_option_id INT NOT NULL,
--     quantity INT NOT NULL,
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     FOREIGN KEY (product_option_id) REFERENCES product_options(id)
-- );
CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    unit_price VARCHAR(255),
    category_id INT,
    image VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)

);
CREATE TABLE product_options(
    id SERIAL PRIMARY KEY,
    product_id INT,
    size VARCHAR(255),
    stock INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);


-- CREATE TABLE receipts(
--     id SERIAL PRIMARY KEY, -- RECEIPT IS INT?? --
--     total INT NOT NULL,
--     quantity INT NOT NULL,
--     user_id INT NOT NULL,
--     stripe_id VARCHAR(255) NOT NULL, -- link to payment --
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY(user_id) REFERENCES users(id)
--     --FOREIGN KEY stripe_id REFERENCES-- until payment
-- );
-- CREATE TABLE receipt_subitems(
--     id SERIAL PRIMARY KEY,
--     product_option_id INT NOT NULL,
--     unit_price INT NOT NULL,
--     quantity INT NOT NULL,
--     sub_total INT NOT NULL,
--     receipt_id INT NOT NULL, -- RECEIPT IS INT?? --
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (product_option_id) REFERENCES product_options(id),
--     FOREIGN key (receipt_id) REFERENCES receipts(id)
-- );
-- CREATE TABLE shipments(
--     id SERIAL PRIMARY KEY,
--     contact_name VARCHAR(255) NOT NULL,
--     contact_number INT NOT NULL,
--     region VARCHAR(255) NOT NULL, -- HKI,KL,NT --
--     district VARCHAR(255) NOT NULL, -- 18區--
--     address VARCHAR(255) NOT NULL,
--     receipt_id INT NOT NULL, -- RECEIPT IS INT?? --
--     status VARCHAR(255),
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (receipt_id) REFERENCES receipts(id)
-- );
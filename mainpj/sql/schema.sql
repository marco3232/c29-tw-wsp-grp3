-- \c wspproject;

-- CREATE DATABASE wspproject; --
-- DROP DATABASE wspproject; --
-- DROP TABLE users; --



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
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    color VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE product_options(
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    size VARCHAR(255) NOT NULL,
    unit_price INT NOT NULL,
    stock INT NOT NULL,
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
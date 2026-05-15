-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- TYPES
CREATE TYPE user_role AS ENUM ('client', 'manager', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'packed', 'shipped', 'delivered','cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'cancelled', 'refunded');
CREATE TYPE stock_status AS ENUM ('active', 'low', 'inactive');
CREATE TYPE batch_status AS ENUM ('active', 'completed');
CREATE TYPE fulfillment_stage AS ENUM ('processing', 'packed', 'shipped');

-- TABLES 
-- USERS
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL,
    password TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT users_unique_email UNIQUE (email)
);
-- CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL,
    CONSTRAINT categories_unique_slug UNIQUE (slug)
);
-- SUBCATEGORIES
CREATE TABLE IF NOT EXISTS subcategories (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT NOT NULL,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL,
    FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE CASCADE,
    CONSTRAINT subcategories_unique_slug UNIQUE (slug)
);
-- BRANDS
CREATE TABLE IF NOT EXISTS brands (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL,
    CONSTRAINT brands_unique_slug UNIQUE (slug)
);
-- PRODUCTS
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    subcategory_id BIGINT NOT NULL,
    brand_id BIGINT,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    discount_percent NUMERIC(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (subcategory_id)
        REFERENCES subcategories(id)
        ON DELETE CASCADE,
    FOREIGN KEY (brand_id)
        REFERENCES brands(id)
        ON DELETE SET NULL,
    CONSTRAINT products_unique_slug UNIQUE (slug),
    CONSTRAINT products_price_check CHECK(price >= 0),
    CONSTRAINT products_discount_percent_check
        CHECK(discount_percent >= 0 AND discount_percent <= 100)
);
-- PRODUCT IMAGES
CREATE TABLE IF NOT EXISTS product_images (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    image_url TEXT NOT NULL,
    is_main BOOLEAN DEFAULT false,
    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);
-- STOCKS
CREATE TABLE IF NOT EXISTS stocks (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    status stock_status GENERATED ALWAYS AS (
        CASE
            WHEN quantity > 10 THEN 'active'::stock_status
            WHEN quantity BETWEEN 1 AND 10 THEN 'low'::stock_status
            ELSE 'inactive'::stock_status
        END
    ) STORED,
    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,
    CONSTRAINT  stocks_unique_product_id UNIQUE (product_id),
    CONSTRAINT stocks_quantity_check CHECK(quantity >= 0)
);
-- TAGS
CREATE TABLE IF NOT EXISTS tags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL,
    CONSTRAINT tags_unique_slug UNIQUE (slug)
);
-- PRODUCTS TAGS
CREATE TABLE IF NOT EXISTS products_tags (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,
    FOREIGN KEY (tag_id)
        REFERENCES tags(id)
        ON DELETE CASCADE,
    CONSTRAINT products_tags_unique UNIQUE(product_id, tag_id)
);
-- CART
CREATE TABLE IF NOT EXISTS cart (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT cart_unique_user_id UNIQUE (user_id)
);
-- CART ITEMS
CREATE TABLE IF NOT EXISTS cart_items (
    id BIGSERIAL PRIMARY KEY,
    cart_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id)
        REFERENCES cart(id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,
    CONSTRAINT cart_items_unique UNIQUE(cart_id, product_id)
);
-- ORDERS
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    status order_status NOT NULL DEFAULT 'pending',
    total NUMERIC(10, 2) NOT NULL,
    shipping_country VARCHAR(150) NOT NULL,
    shipping_city VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES users(id),
    CONSTRAINT orders_total_check CHECK(total >= 0)
);
-- ORDER ITEMS
CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    price_snapshot NUMERIC(10, 2) NOT NULL,
    FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products(id),
    CONSTRAINT order_items_quantity_check CHECK(quantity > 0),
    CONSTRAINT order_items_price_snapshot_check CHECK(price_snapshot >= 0)
);
-- PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    transaction_id TEXT NOT NULL,
    status payment_status NOT NULL DEFAULT 'pending',
    provider TEXT NOT NULL DEFAULT 'stripe',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,
    CONSTRAINT payments_amount_check CHECK(amount >= 0),
    CONSTRAINT payments_unique_transaction_id UNIQUE (transaction_id)
);
-- LOGS
CREATE TABLE IF NOT EXISTS logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    affected_table VARCHAR(100) NOT NULL,
    affected_id TEXT NOT NULL,
    action TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES users(id)
);
-- FULFILLMENT_BATCHES
CREATE TABLE IF NOT EXISTS fulfillment_batches (
    id BIGSERIAL PRIMARY KEY,
    status batch_status NOT NULL DEFAULT 'active',
    stage fulfillment_stage NOT NULL DEFAULT 'processing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- FULFILLMENT_ITEMS
CREATE TABLE fulfillment_items (
    id BIGSERIAL PRIMARY KEY,
    batch_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    FOREIGN KEY (batch_id)
        REFERENCES fulfillment_batches(id)
        ON DELETE CASCADE,
    FOREIGN KEY (order_id)
        REFERENCES orders(id),
    CONSTRAINT fulfillment_items_unique
        UNIQUE(batch_id, order_id)
);
-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    status INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create ticket_items table
CREATE TABLE IF NOT EXISTS ticket_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    stock_initial INTEGER DEFAULT 0,
    stock_available INTEGER DEFAULT 0,
    is_stock_prepared BOOLEAN DEFAULT FALSE,
    price_original BIGINT DEFAULT 0,
    price_flash BIGINT DEFAULT 0,
    sale_start_time TIMESTAMP,
    sale_end_time TIMESTAMP,
    status INTEGER DEFAULT 0,
    activity_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO tickets (name, description, status) VALUES 
('Sample Ticket', 'This is a sample ticket', 1);

INSERT INTO ticket_items (name, description, stock_initial, stock_available, price_original, price_flash, status) VALUES 
('Sample Item', 'This is a sample ticket item', 100, 100, 50000, 45000, 1);

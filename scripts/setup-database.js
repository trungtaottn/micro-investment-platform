#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🗄️ Thiết lập database schemas và initial data...');

// MongoDB initialization script
const mongoInitScript = `
// MongoDB initialization script for Micro Investment Platform
db = db.getSiblingDB('micro_investment');

// Create collections
db.createCollection('users');
db.createCollection('portfolios');
db.createCollection('transactions');
db.createCollection('roundups');
db.createCollection('ai_recommendations');
db.createCollection('notifications');

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "phone": 1 }, { unique: true });
db.users.createIndex({ "createdAt": 1 });

db.portfolios.createIndex({ "userId": 1 });
db.portfolios.createIndex({ "createdAt": 1 });

db.transactions.createIndex({ "userId": 1 });
db.transactions.createIndex({ "type": 1 });
db.transactions.createIndex({ "createdAt": 1 });

db.roundups.createIndex({ "userId": 1 });
db.roundups.createIndex({ "transactionId": 1 });
db.roundups.createIndex({ "createdAt": 1 });

db.ai_recommendations.createIndex({ "userId": 1 });
db.ai_recommendations.createIndex({ "createdAt": 1 });

db.notifications.createIndex({ "userId": 1 });
db.notifications.createIndex({ "read": 1 });
db.notifications.createIndex({ "createdAt": 1 });

// Insert initial admin user
db.users.insertOne({
  _id: ObjectId(),
  email: "admin@microinvestment.vn",
  phone: "+84901234567",
  password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KqKqKq", // hashed "admin123"
  firstName: "Admin",
  lastName: "User",
  role: "admin",
  status: "active",
  kycStatus: "verified",
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert test user
db.users.insertOne({
  _id: ObjectId(),
  email: "test@microinvestment.vn",
  phone: "+84901234568",
  password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KqKqKq", // hashed "test123"
  firstName: "Test",
  lastName: "User",
  role: "user",
  status: "active",
  kycStatus: "verified",
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert sample bank accounts
db.bank_accounts.insertOne({
  _id: ObjectId(),
  userId: db.users.findOne({email: "test@microinvestment.vn"})._id,
  bankName: "Vietcombank",
  accountNumber: "1234567890",
  accountHolder: "Test User",
  status: "active",
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert sample transactions
db.transactions.insertOne({
  _id: ObjectId(),
  userId: db.users.findOne({email: "test@microinvestment.vn"})._id,
  type: "purchase",
  amount: 50000,
  currency: "VND",
  description: "Mua sắm tại Coopmart",
  category: "shopping",
  status: "completed",
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert sample round-ups
db.roundups.insertOne({
  _id: ObjectId(),
  userId: db.users.findOne({email: "test@microinvestment.vn"})._id,
  transactionId: db.transactions.findOne({description: "Mua sắm tại Coopmart"})._id,
  originalAmount: 50000,
  roundUpAmount: 5000,
  investedAmount: 5000,
  status: "invested",
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert sample AI recommendations
db.ai_recommendations.insertOne({
  _id: ObjectId(),
  userId: db.users.findOne({email: "test@microinvestment.vn"})._id,
  type: "portfolio_optimization",
  recommendation: "Tăng tỷ lệ đầu tư vào quỹ index VN30",
  confidence: 0.85,
  riskLevel: "medium",
  expectedReturn: 0.12,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert sample notifications
db.notifications.insertOne({
  _id: ObjectId(),
  userId: db.users.findOne({email: "test@microinvestment.vn"})._id,
  type: "roundup_completed",
  title: "Round-up thành công",
  message: "Đã tự động đầu tư 5,000 VND từ giao dịch mua sắm",
  read: false,
  createdAt: new Date(),
  updatedAt: new Date()
});

print("✅ MongoDB initialization completed successfully!");
`;

// PostgreSQL initialization script
const postgresInitScript = `
-- PostgreSQL initialization script for Micro Investment Platform

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    status VARCHAR(20) DEFAULT 'active',
    kyc_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create bank_accounts table
CREATE TABLE IF NOT EXISTS bank_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    bank_name VARCHAR(100) NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    account_holder VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'VND',
    status VARCHAR(20) DEFAULT 'pending',
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create roundups table
CREATE TABLE IF NOT EXISTS roundups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    transaction_id UUID REFERENCES transactions(id),
    original_amount DECIMAL(15,2) NOT NULL,
    round_up_amount DECIMAL(15,2) NOT NULL,
    invested_amount DECIMAL(15,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create ai_recommendations table
CREATE TABLE IF NOT EXISTS ai_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    recommendation TEXT NOT NULL,
    confidence DECIMAL(3,2),
    risk_level VARCHAR(20),
    expected_return DECIMAL(5,4),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

CREATE INDEX IF NOT EXISTS idx_bank_accounts_user_id ON bank_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_status ON bank_accounts(status);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);

CREATE INDEX IF NOT EXISTS idx_roundups_user_id ON roundups(user_id);
CREATE INDEX IF NOT EXISTS idx_roundups_transaction_id ON roundups(transaction_id);
CREATE INDEX IF NOT EXISTS idx_roundups_created_at ON roundups(created_at);

CREATE INDEX IF NOT EXISTS idx_ai_recommendations_user_id ON ai_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_created_at ON ai_recommendations(created_at);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- Insert initial data
INSERT INTO users (email, phone, password_hash, first_name, last_name, role, kyc_status) VALUES
('admin@microinvestment.vn', '+84901234567', crypt('admin123', gen_salt('bf')), 'Admin', 'User', 'admin', 'verified'),
('test@microinvestment.vn', '+84901234568', crypt('test123', gen_salt('bf')), 'Test', 'User', 'user', 'verified')
ON CONFLICT (email) DO NOTHING;

-- Insert sample bank account
INSERT INTO bank_accounts (user_id, bank_name, account_number, account_holder) VALUES
((SELECT id FROM users WHERE email = 'test@microinvestment.vn'), 'Vietcombank', '1234567890', 'Test User')
ON CONFLICT DO NOTHING;

-- Insert sample transaction
INSERT INTO transactions (user_id, type, amount, description) VALUES
((SELECT id FROM users WHERE email = 'test@microinvestment.vn'), 'purchase', 50000, 'Mua sắm tại Coopmart')
ON CONFLICT DO NOTHING;

-- Insert sample roundup
INSERT INTO roundups (user_id, transaction_id, original_amount, round_up_amount, invested_amount, status) VALUES
((SELECT id FROM users WHERE email = 'test@microinvestment.vn'), 
 (SELECT id FROM transactions WHERE description = 'Mua sắm tại Coopmart'), 
 50000, 5000, 5000, 'invested')
ON CONFLICT DO NOTHING;

-- Insert sample AI recommendation
INSERT INTO ai_recommendations (user_id, type, recommendation, confidence, risk_level, expected_return) VALUES
((SELECT id FROM users WHERE email = 'test@microinvestment.vn'), 
 'portfolio_optimization', 
 'Tăng tỷ lệ đầu tư vào quỹ index VN30', 
 0.85, 'medium', 0.12)
ON CONFLICT DO NOTHING;

-- Insert sample notification
INSERT INTO notifications (user_id, type, title, message) VALUES
((SELECT id FROM users WHERE email = 'test@microinvestment.vn'), 
 'roundup_completed', 
 'Round-up thành công', 
 'Đã tự động đầu tư 5,000 VND từ giao dịch mua sắm')
ON CONFLICT DO NOTHING;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bank_accounts_updated_at BEFORE UPDATE ON bank_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMIT;
`;

// Tạo MongoDB init script
const mongoInitPath = path.join(__dirname, 'mongo-init.js');
try {
  fs.writeFileSync(mongoInitPath, mongoInitScript);
  console.log('✅ Đã tạo MongoDB initialization script');
} catch (error) {
  console.error('❌ Lỗi khi tạo MongoDB init script:', error.message);
}

// Tạo PostgreSQL init script
const postgresInitPath = path.join(__dirname, 'postgres-init.sql');
try {
  fs.writeFileSync(postgresInitPath, postgresInitScript);
  console.log('✅ Đã tạo PostgreSQL initialization script');
} catch (error) {
  console.error('❌ Lỗi khi tạo PostgreSQL init script:', error.message);
}

console.log('\n🎉 Database setup hoàn tất!');
console.log('\n📋 Các file đã được tạo:');
console.log('- scripts/mongo-init.js');
console.log('- scripts/postgres-init.sql');
console.log('\n🚀 Bước tiếp theo:');
console.log('1. Chạy: npm run docker:up');
console.log('2. Databases sẽ được khởi tạo tự động');
console.log('3. Truy cập MongoDB: mongodb://localhost:27017');
console.log('4. Truy cập PostgreSQL: postgresql://localhost:5432');
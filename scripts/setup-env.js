#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 Thiết lập environment variables cho Micro Investment Platform...');

// Tạo JWT secrets
const jwtSecret = crypto.randomBytes(64).toString('hex');
const jwtRefreshSecret = crypto.randomBytes(64).toString('hex');

// Template environment variables
const envTemplate = `# ========================================
# Micro Investment Platform - Environment Variables
# ========================================

# Database Configuration
MONGODB_URI=mongodb://admin:micro_investment_mongo_2024@localhost:27017/micro_investment?authSource=admin
POSTGRES_URI=postgresql://micro_investment_user:micro_investment_postgres_2024@localhost:5432/micro_investment
REDIS_URI=redis://localhost:6379

# JWT Configuration
JWT_SECRET=${jwtSecret}
JWT_REFRESH_SECRET=${jwtRefreshSecret}
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Server Configuration
NODE_ENV=development
PORT=3000
API_VERSION=v1
CORS_ORIGIN=http://localhost:8080

# External API Keys (Cập nhật với keys thực tế)
PAYMENT_GATEWAY_API_KEY=your_payment_gateway_api_key_here
PAYMENT_GATEWAY_SECRET=your_payment_gateway_secret_here
BANK_API_KEY=your_bank_api_key_here
BANK_API_SECRET=your_bank_api_secret_here

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password_here
EMAIL_FROM=noreply@microinvestment.vn

# SMS Configuration
SMS_PROVIDER=twilio
SMS_ACCOUNT_SID=your_twilio_account_sid_here
SMS_AUTH_TOKEN=your_twilio_auth_token_here
SMS_FROM_NUMBER=your_twilio_phone_number_here

# AI/ML Configuration
AI_SERVICE_URL=http://localhost:5000
AI_API_KEY=your_ai_service_api_key_here
ML_MODEL_PATH=./models/investment_recommendation.pkl

# Monitoring Configuration
PROMETHEUS_PORT=9090
GRAFANA_PORT=3001
LOG_LEVEL=info
SENTRY_DSN=your_sentry_dsn_here

# Security Configuration
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100
SESSION_SECRET=${crypto.randomBytes(32).toString('hex')}

# File Upload Configuration
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf

# Feature Flags
ENABLE_AI_RECOMMENDATIONS=true
ENABLE_ROUND_UP=true
ENABLE_SOCIAL_FEATURES=false
ENABLE_ADVANCED_ANALYTICS=false

# Development Configuration
DEBUG=true
LOG_REQUESTS=true
ENABLE_SWAGGER=true
`;

// Tạo file .env
const envPath = path.join(__dirname, '..', '.env');

try {
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ Đã tạo file .env thành công!');
  console.log('📝 Vui lòng cập nhật các API keys thực tế trong file .env');
} catch (error) {
  console.error('❌ Lỗi khi tạo file .env:', error.message);
  process.exit(1);
}

// Tạo file .env.example
const envExamplePath = path.join(__dirname, '..', '.env.example');
const envExampleTemplate = envTemplate.replace(/=.*$/gm, '=your_value_here');

try {
  fs.writeFileSync(envExamplePath, envExampleTemplate);
  console.log('✅ Đã tạo file .env.example thành công!');
} catch (error) {
  console.error('❌ Lỗi khi tạo file .env.example:', error.message);
}

// Tạo thư mục uploads
const uploadsPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsPath)) {
  try {
    fs.mkdirSync(uploadsPath, { recursive: true });
    console.log('✅ Đã tạo thư mục uploads thành công!');
  } catch (error) {
    console.error('❌ Lỗi khi tạo thư mục uploads:', error.message);
  }
}

console.log('\n🎉 Thiết lập environment variables hoàn tất!');
console.log('\n📋 Các bước tiếp theo:');
console.log('1. Cập nhật các API keys thực tế trong file .env');
console.log('2. Chạy: npm run setup:db');
console.log('3. Chạy: npm run docker:up');
console.log('4. Truy cập: http://localhost:8080');
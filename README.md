# 🚀 Micro Investment Platform

Nền tảng Đầu tư Vi mô - Micro Investment Platform cho thị trường Việt Nam

## 📋 Tổng quan dự án

Micro Investment Platform là một ứng dụng fintech hiện đại, được thiết kế để giúp người dùng Việt Nam (đặc biệt là Gen Z và Millennials) bắt đầu hành trình đầu tư một cách dễ dàng và an toàn.

### 🎯 Mục tiêu
- **Đơn giản hóa đầu tư**: Giao diện thân thiện, dễ sử dụng
- **Tự động hóa**: Tính năng round-up tự động từ các giao dịch hàng ngày
- **AI hỗ trợ**: Khuyến nghị đầu tư thông minh dựa trên AI
- **An toàn**: Tuân thủ các tiêu chuẩn bảo mật quốc tế và quy định Việt Nam

### 🚀 Tính năng chính
- ✅ Đăng ký và xác thực người dùng (KYC)
- ✅ Liên kết tài khoản ngân hàng
- ✅ Quản lý danh mục đầu tư
- ✅ Tính năng round-up tự động
- ✅ Khuyến nghị đầu tư AI
- ✅ Thông báo real-time
- ✅ Báo cáo và phân tích

## 🏗️ Kiến trúc hệ thống

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React Native)│◄──►│   (Node.js)     │◄──►│   (MongoDB +    │
│                 │    │                 │    │    PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │   Microservices │    │   Redis Cache   │
│   (iOS/Android) │    │   (Auth, Trans, │    │                 │
│                 │    │    Investment)   │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js v18+
- **Framework**: Express.js v4.18+
- **Language**: TypeScript
- **Architecture**: Microservices
- **Authentication**: JWT, bcrypt
- **Testing**: Jest, Supertest

### Frontend
- **Framework**: React Native v0.72+
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **UI Components**: React Native Elements
- **Testing**: Jest, React Native Testing Library

### Database
- **Primary**: MongoDB (NoSQL) + PostgreSQL (SQL)
- **Caching**: Redis
- **ORM**: Mongoose (MongoDB), Sequelize (PostgreSQL)

### DevOps
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Cloud**: AWS
- **Monitoring**: Prometheus, Grafana

## ⚡ Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js v18+
- Docker & Docker Compose
- Git

### Khởi động nhanh

```bash
# 1. Clone repository
git clone https://github.com/trungtaottn/micro-investment-platform.git
cd micro-investment-platform

# 2. Cài đặt dependencies
npm run install:all

# 3. Thiết lập môi trường
npm run setup

# 4. Khởi động ứng dụng
npm run docker:up
```

### Truy cập ứng dụng
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api-docs
- **Grafana**: http://localhost:3001 (admin/micro_investment_grafana_2024)

## 📁 Cấu trúc dự án

```
micro-investment-platform/
├── backend/                 # Backend API (Node.js/Express)
│   ├── src/
│   │   ├── application/     # Business logic & Use cases
│   │   ├── core/           # Domain entities
│   │   ├── infrastructure/ # External services
│   │   └── interfaces/     # Controllers & Routes
│   ├── tests/
│   └── package.json
├── frontend/               # React Native App
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── screens/        # App Screens
│   │   ├── navigation/     # Navigation
│   │   ├── services/       # API Services
│   │   └── store/          # Redux Store
│   ├── tests/
│   └── package.json
├── docs/                   # Documentation
│   ├── overview.md
│   ├── SRS.md
│   ├── SRS-technical.md
│   ├── Master_Roadmap.md
│   ├── Master_Tasklist.md
│   ├── QUICK_START.md
│   ├── DEVELOPMENT_GUIDE.md
│   └── technical-guide/
│       ├── Technical_Overview.md
│       ├── backend/
│       ├── frontend/
│       ├── database/
│       ├── devops/
│       └── security/
├── scripts/                # Setup scripts
├── monitoring/             # Monitoring configs
├── docker-compose.yml      # Development environment
├── package.json           # Root package.json
└── README.md             # This file
```

## 🧪 Testing

```bash
# Chạy tất cả tests
npm test

# Test backend
npm run test:backend

# Test frontend
npm run test:frontend

# Lint code
npm run lint
```

## 📊 Monitoring & Logs

```bash
# Xem logs
npm run docker:logs

# Truy cập Grafana
open http://localhost:3001
```

## 🛠️ Development

```bash
# Chạy development mode
npm run dev

# Chỉ chạy backend
npm run dev:backend

# Chỉ chạy frontend
npm run dev:frontend

# Build production
npm run build
```

## 🚀 Deployment

### Staging
```bash
# Deploy to staging
git push origin develop
```

### Production
```bash
# Deploy to production
git tag v1.0.0
git push origin v1.0.0
```

## 📚 Tài liệu

- [📋 Tổng quan dự án](docs/overview.md)
- [📖 Yêu cầu hệ thống](docs/SRS.md)
- [🔧 Yêu cầu kỹ thuật](docs/SRS-technical.md)
- [🗺️ Roadmap phát triển](docs/Master_Roadmap.md)
- [📝 Tasklist chi tiết](docs/Master_Tasklist.md)
- [⚡ Hướng dẫn khởi động nhanh](docs/QUICK_START.md)
- [🛠️ Hướng dẫn development](docs/DEVELOPMENT_GUIDE.md)
- [📚 Technical Guide](docs/technical-guide/)

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phân phối dưới giấy phép MIT. Xem `LICENSE` để biết thêm chi tiết.

## 🆘 Hỗ trợ

- 📧 Email: support@microinvestment.vn
- 💬 Discord: [Micro Investment Community](https://discord.gg/microinvestment)
- 📱 Telegram: [@microinvestment_support](https://t.me/microinvestment_support)

## 👥 Team

- **Product Manager**: [Tên PM]
- **Tech Lead**: [Tên Tech Lead]
- **Backend Developer**: [Tên Backend Dev]
- **Frontend Developer**: [Tên Frontend Dev]
- **DevOps Engineer**: [Tên DevOps]
- **QA Engineer**: [Tên QA]

---

<div align="center">

**Made with ❤️ for Vietnam's Fintech Future**

[![GitHub stars](https://img.shields.io/github/stars/trungtaottn/micro-investment-platform?style=social)](https://github.com/trungtaottn/micro-investment-platform/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/trungtaottn/micro-investment-platform?style=social)](https://github.com/trungtaottn/micro-investment-platform/network)
[![GitHub issues](https://img.shields.io/github/issues/trungtaottn/micro-investment-platform)](https://github.com/trungtaottn/micro-investment-platform/issues)
[![GitHub license](https://img.shields.io/github/license/trungtaottn/micro-investment-platform)](https://github.com/trungtaottn/micro-investment-platform/blob/main/LICENSE)

</div>
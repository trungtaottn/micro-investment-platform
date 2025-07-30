# 🚀 Hướng dẫn Khởi động Nhanh

## 📋 Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo bạn có:

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **Docker** & **Docker Compose** ([Download](https://www.docker.com/products/docker-desktop))
- **Git** ([Download](https://git-scm.com/))

## ⚡ Khởi động nhanh (5 phút)

### Bước 1: Clone và cài đặt
```bash
# Clone repository
git clone https://github.com/trungtaottn/micro-investment-platform.git
cd micro-investment-platform

# Cài đặt dependencies
npm run install:all
```

### Bước 2: Thiết lập môi trường
```bash
# Tạo file .env và thiết lập database
npm run setup
```

### Bước 3: Khởi động ứng dụng
```bash
# Khởi động tất cả services
npm run docker:up
```

### Bước 4: Truy cập ứng dụng
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api-docs
- **Grafana**: http://localhost:3001 (admin/micro_investment_grafana_2024)

## 🛠️ Development Workflow

### Chạy development mode
```bash
# Chạy cả backend và frontend
npm run dev

# Chỉ chạy backend
npm run dev:backend

# Chỉ chạy frontend
npm run dev:frontend
```

### Testing
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

## 🔍 Monitoring & Debugging

### Xem logs
```bash
# Xem logs của tất cả services
npm run docker:logs

# Xem logs của service cụ thể
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Truy cập databases
```bash
# MongoDB
docker exec -it micro-investment-mongodb mongosh -u admin -p micro_investment_mongo_2024

# PostgreSQL
docker exec -it micro-investment-postgresql psql -U micro_investment_user -d micro_investment
```

### Truy cập monitoring
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001 (admin/micro_investment_grafana_2024)

## 🧪 Test Accounts

### Admin Account
- **Email**: admin@microinvestment.vn
- **Password**: admin123

### Test User Account
- **Email**: test@microinvestment.vn
- **Password**: test123

## 🔧 Troubleshooting

### Lỗi thường gặp

#### 1. Port đã được sử dụng
```bash
# Kiểm tra port đang sử dụng
lsof -i :3000
lsof -i :8080

# Kill process nếu cần
kill -9 <PID>
```

#### 2. Docker không khởi động
```bash
# Restart Docker
docker system prune -a
docker-compose down
docker-compose up -d
```

#### 3. Database connection failed
```bash
# Kiểm tra database containers
docker-compose ps

# Restart database services
docker-compose restart mongodb postgresql redis
```

#### 4. Node modules issues
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

## 🧹 Full Reset

Nếu muốn reset hoàn toàn môi trường:

```bash
# Dừng và xóa tất cả containers
docker-compose down -v

# Xóa volumes
docker volume prune

# Xóa node_modules
npm run clean

# Cài đặt lại từ đầu
npm run install:all
npm run setup
npm run docker:up
```

## 📱 Mobile Development

### React Native Setup
```bash
# Cài đặt Expo CLI
npm install -g @expo/cli

# Chạy trên mobile
cd frontend
npm run start
```

### iOS Development
```bash
# Cài đặt Xcode
# Chạy trên iOS Simulator
npm run ios
```

### Android Development
```bash
# Cài đặt Android Studio
# Chạy trên Android Emulator
npm run android
```

## 🚀 Production Deployment

### Deploy to Staging
```bash
git push origin develop
```

### Deploy to Production
```bash
git tag v1.0.0
git push origin v1.0.0
```

## 📚 Tài liệu tham khảo

- [📖 Development Guide](DEVELOPMENT_GUIDE.md)
- [🗺️ Master Roadmap](Master_Roadmap.md)
- [📝 Master Tasklist](Master_Tasklist.md)
- [🔧 Technical Guide](technical-guide/)

## 🆘 Hỗ trợ

Nếu gặp vấn đề:

1. **Kiểm tra logs**: `npm run docker:logs`
2. **Restart services**: `docker-compose restart`
3. **Full reset**: Xem phần "Full Reset" ở trên
4. **Tạo issue**: [GitHub Issues](https://github.com/trungtaottn/micro-investment-platform/issues)

---

**🎉 Chúc mừng!** Bạn đã sẵn sàng phát triển Micro Investment Platform!
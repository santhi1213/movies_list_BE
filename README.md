# 🎬 MovieManager - Backend API

A robust RESTful API built with Node.js, Express, and MySQL for managing movie collections. Features JWT authentication, Cloudinary image storage, and full CRUD operations with validation.

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=flat&logo=mysql)
![Sequelize](https://img.shields.io/badge/Sequelize-6.x-52B0E7?style=flat&logo=sequelize)

## ✨ Features

- 🔐 JWT-based authentication with bcrypt password hashing
- 🎬 Full CRUD operations for movies/TV shows
- ☁️ Cloudinary integration for image storage
- ✅ Request validation with Joi
- 📄 Pagination support
- 🗄️ MySQL database with Sequelize ORM
- 🔒 Secure environment configuration
- 🚀 Production-ready with Aiven MySQL hosting
- 📝 RESTful API design
- ⚡ Fast and scalable architecture

## 🛠️ Tech Stack

- **Node.js** 18.x - JavaScript runtime
- **Express** 5.1.0 - Web framework
- **MySQL** 8.x - Relational database
- **Sequelize** 6.37.7 - ORM for MySQL
- **Cloudinary** 1.41.3 - Cloud image storage
- **JWT** (jsonwebtoken) 9.0.2 - Authentication tokens
- **bcrypt** 6.0.0 - Password hashing
- **Joi** 18.0.1 - Request validation
- **Multer** 2.0.2 - File upload handling
- **CORS** 2.8.5 - Cross-origin resource sharing
- **dotenv** 17.2.3 - Environment variables

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **npm** (v9.x or higher) - Comes with Node.js
- **MySQL** (v8.x or higher) - [Download](https://dev.mysql.com/downloads/) OR use cloud service (Aiven, PlanetScale, etc.)
- **Cloudinary Account** - [Sign up free](https://cloudinary.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/movie-manager-backend.git
cd movie-manager-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Required Directories
```bash
mkdir uploads
```

### 4. Setup Cloudinary

1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard and note your:
   - Cloud Name
   - API Key
   - API Secret

### 5. Setup MySQL Database

#### Option A: Local MySQL
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE movies_db;

# Exit MySQL
exit;
```

#### Option B: Cloud MySQL (Aiven - Recommended)

1. Sign up at [Aiven](https://aiven.io/)
2. Create a new MySQL service
3. Download CA certificate (optional but recommended)
4. Note your connection details

### 6. Configure Environment Variables

Create a `.env` file in the root directory:
```env
# Server Configuration
PORT=5000
SERVER_URL=http://localhost:5000

# Database Configuration (Local MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=movies_db
DB_USER=root
DB_PASS=your_mysql_password

# OR Database Configuration (Aiven Cloud)
DB_HOST=mysql-xxxxx-yourproject.aivencloud.com
DB_PORT=26321
DB_NAME=defaultdb
DB_USER=avnadmin
DB_PASS=your_aiven_password
# AIVEN_CA_PATH=./ca.pem  # Optional: Path to CA certificate

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Important Security Notes:**
- Never commit `.env` file to version control
- Change `JWT_SECRET` to a strong random string
- Use different credentials for development and production

### 7. Initialize Database

The application will automatically create tables on first run using Sequelize sync:
```bash
npm start
```

This will:
- Connect to MySQL
- Create `users` and `movies` tables
- Apply schema migrations

### 8. Start the Server

#### Development Mode (with auto-restart)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will run on **http://localhost:5000**

## 📦 Package Dependencies
```json
{
  "dependencies": {
    "bcrypt": "^6.0.0",              // Password hashing
    "cloudinary": "^1.41.3",         // Cloud image storage
    "cors": "^2.8.5",                // CORS middleware
    "dotenv": "^17.2.3",             // Environment variables
    "express": "^5.1.0",             // Web framework
    "joi": "^18.0.1",                // Request validation
    "jsonwebtoken": "^9.0.2",        // JWT authentication
    "multer": "^2.0.2",              // File uploads
    "multer-storage-cloudinary": "^4.0.0",  // Cloudinary + Multer
    "mysql2": "^3.15.3",             // MySQL driver
    "sequelize": "^6.37.7"           // ORM for MySQL
  },
  "devDependencies": {
    "nodemon": "^3.1.10"             // Auto-restart during development
  }
}
```

## 📁 Project Structure
```
movie-manager-backend/
├── config/
│   ├── cloudinary.js          # Cloudinary configuration
│   └── db.js                  # Database connection (Sequelize)
├── controllers/
│   ├── authController.js      # Register & Login logic
│   └── moviesController.js    # CRUD operations for movies
├── middlewares/
│   ├── errorHandler.js        # Global error handling
│   ├── upload.js              # Multer + Cloudinary setup
│   └── validate.js            # Joi validation middleware
├── models/
│   ├── index.js               # Model exports
│   ├── Movie.js               # Movie model schema
│   └── User.js                # User model schema
├── routes/
│   ├── authRoutes.js          # Authentication routes
│   └── moviesRoutes.js        # Movie CRUD routes
├── uploads/                   # Local uploads folder (fallback)
├── utils/
│   └── paginate.js            # Pagination helper
├── .env                       # Environment variables (create this)
├── .gitignore
├── app.js                     # Express app configuration
├── server.js                  # Server entry point
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Movie Endpoints

#### Get All Movies (with pagination)
```http
GET /api/movies?page=1&limit=10

Response: 200 OK
{
  "data": [...],
  "total": 50,
  "limit": 10,
  "offset": 0
}
```

#### Get Single Movie
```http
GET /api/movies/:id

Response: 200 OK
{
  "id": 1,
  "title": "Inception",
  "type": "Movie",
  "director": "Christopher Nolan",
  "budget": "$160M",
  "location": "Los Angeles",
  "duration": "148 min",
  "year": "2010",
  "poster_url": "https://res.cloudinary.com/...",
  "description": "A thief who steals...",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### Create Movie (Protected - Requires JWT)
```http
POST /api/movies
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data

Form Data:
- title: "Inception"
- type: "Movie"
- director: "Christopher Nolan"
- budget: "$160M"
- location: "Los Angeles"
- duration: "148 min"
- year: "2010"
- description: "A thief who steals..."
- poster: [image file]

Response: 201 Created
{
  "id": 1,
  "title": "Inception",
  ...
}
```

#### Update Movie (Protected - Requires JWT)
```http
PUT /api/movies/:id
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data

Form Data:
- title: "Inception (Updated)"
- poster: [new image file] (optional)
- ... other fields

Response: 200 OK
{
  "id": 1,
  "title": "Inception (Updated)",
  ...
}
```

#### Delete Movie (Protected - Requires JWT)
```http
DELETE /api/movies/:id
Authorization: Bearer <your_jwt_token>

Response: 200 OK
{
  "message": "Deleted successfully"
}
```

## 🔒 Authentication

This API uses **JWT (JSON Web Tokens)** for authentication.

### How to Use Protected Routes:

1. Register or login to get a JWT token
2. Include the token in the Authorization header:
```javascript
headers: {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
}
```

### Token Expiration
- Tokens expire after **24 hours**
- Users must login again after expiration

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Movies Table
```sql
CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type ENUM('Movie', 'TV Show') DEFAULT 'Movie',
  director VARCHAR(255),
  budget VARCHAR(255),
  location VARCHAR(255),
  duration VARCHAR(255),
  year VARCHAR(255),
  poster_url TEXT,
  description TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## ☁️ Cloudinary Configuration

### Why Cloudinary?
- Free tier with generous limits
- Automatic image optimization
- CDN delivery for fast loading
- No need to manage local file storage
- Perfect for production deployments

### Setup Steps:
1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get credentials from dashboard
3. Add to `.env` file
4. Images automatically upload to cloud

### Image Handling:
- **Format:** JPG, JPEG, PNG, WebP
- **Folder:** `movies_posters`
- **Returns:** Full Cloudinary URL
- **Fallback:** Default placeholder image

## ✅ Request Validation

Using **Joi** schema validation for all movie operations:
```javascript
{
  title: required, string, 1-255 chars
  type: required, enum ["Movie", "TV Show"]
  director: optional, string, max 255 chars
  budget: optional, string, max 100 chars
  location: optional, string, max 255 chars
  duration: optional, string, max 100 chars
  year: optional, string, max 50 chars
  description: optional, text
}
```

## 📝 Available Scripts
```bash
# Start server (production mode)
npm start

# Start server with auto-restart (development mode)
npm run dev

# Install dependencies
npm install
```

## 🐛 Troubleshooting

### Common Issues:

**1. Database Connection Error**
```bash
# Check MySQL is running
mysql --version
sudo service mysql status

# Verify credentials in .env
# Test connection manually
mysql -h <DB_HOST> -P <DB_PORT> -u <DB_USER> -p
```

**2. Cloudinary Upload Fails**
```
Error: Invalid Cloudinary credentials

Solution:
- Verify CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET in .env
- Check credentials at cloudinary.com/console
- Ensure no extra spaces in .env values
```

**3. JWT Token Invalid**
```
Error: jwt malformed

Solution:
- Ensure JWT_SECRET is set in .env
- Token must be included as: Bearer <token>
- Check token hasn't expired (24h validity)
```

**4. Port Already in Use**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env file
PORT=5001
```

**5. Sequelize Sync Errors**
```bash
# Drop and recreate tables (WARNING: Deletes all data)
# In db.js, change:
await sequelize.sync({ force: true }); // Use only in development!
```

**6. CORS Issues**
```javascript
// In app.js, configure CORS properly:
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend.com'],
  credentials: true
}));
```

## 🌐 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `SERVER_URL` | Full server URL | `http://localhost:5000` |
| `DB_HOST` | Database host | `localhost` or Aiven host |
| `DB_PORT` | Database port | `3306` or `26321` |
| `DB_NAME` | Database name | `movies_db` |
| `DB_USER` | Database username | `root` or `avnadmin` |
| `DB_PASS` | Database password | Your password |
| `AIVEN_CA_PATH` | SSL certificate path (optional) | `./ca.pem` |
| `JWT_SECRET` | JWT signing secret | Random strong string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | From dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary API key | From dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | From dashboard |

## 🚀 Deployment

### Deploy to Render

1. Create account at [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables from `.env`
6. Deploy

### Deploy to Railway

1. Create account at [railway.app](https://railway.app)
2. Create new project from GitHub
3. Add environment variables
4. Deploy automatically

### Deploy to Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create movie-manager-api

# Set environment variables
heroku config:set JWT_SECRET=your_secret
heroku config:set CLOUDINARY_CLOUD_NAME=your_name
# ... set all other env vars

# Deploy
git push heroku main
```

## 🔒 Security Best Practices

✅ **Implemented:**
- Password hashing with bcrypt (salt rounds: 10)
- JWT token authentication
- Environment variables for sensitive data
- Input validation with Joi
- SQL injection prevention (Sequelize ORM)
- CORS configuration

⚠️ **Additional Recommendations:**
- Use HTTPS in production
- Implement rate limiting (express-rate-limit)
- Add request logging (morgan)
- Use helmet.js for security headers
- Implement refresh tokens
- Add API versioning

## 📊 Performance Optimization

- Sequelize connection pooling
- Pagination for large datasets
- Cloudinary CDN for images
- Database indexing on frequently queried fields
- Gzip compression (add compression middleware)

## 🧪 Testing

To add tests, install:
```bash
npm install --save-dev jest supertest
```

Example test structure:
```javascript
// tests/auth.test.js
const request = require('supertest');
const app = require('../app');

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(201);
  });
});
```

## 📚 Additional Resources

- [Express Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [Aiven MySQL Guide](https://aiven.io/docs/products/mysql)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - Santhi Raju

Backend Repository: https://github.com/santhi1213/movies_list_BE.git

Frontend Repository: https://github.com/santhi1213/movies_list_FE.git

## 🙏 Acknowledgments

- [Express.js Team](https://expressjs.com/)
- [Sequelize Team](https://sequelize.org/)
- [Cloudinary](https://cloudinary.com/)
- [Aiven](https://aiven.io/)

---

⭐️ If you find this project helpful, please give it a star!

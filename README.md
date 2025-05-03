# NutriByte 🍎

NutriByte is a full-stack MERN (MongoDB, Express, React, Node.js) web application that helps users log food items, track nutritional goals, generate meal plans, and visualize health analytics. It is designed for users aiming to improve health awareness by monitoring dietary intake.

## 📍 Live Application

🔗 https://nutribyte-project-225-moses-c096f632bd70.herokuapp.com/

## 📦 Project Structure

```
nutribyte/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── App.js
├── .github/
│   └── workflows/
│       └── ci.yml
├── package.json
└── README.md
```

## 🚀 Features

- 🔐 JWT-ready authentication (in progress)
- 🥗 Food logging and nutrition tracking
- 📊 Interactive dashboard with analytics
- 🧠 Meal planner with calorie-based generation
- 🔄 Real-time updates and state persistence
- ☁️ Deployed to Heroku with CI/CD

## 🧪 Use Cases

### 1. Log Food
- **Precondition**: User accesses dashboard
- **Flow**: Enter food name + calories → Click `Add` → Backend logs it
- **Postcondition**: Food added to MongoDB and dashboard updates

### 2. View Summary
- **Precondition**: Food items logged
- **Flow**: Dashboard loads → Summary shows daily totals
- **Postcondition**: UI reflects current intake

### 3. Meal Planner
- **Precondition**: User defines calorie goal
- **Flow**: Select diet + target → Backend returns suggestions
- **Postcondition**: Meal plan displayed and saved

### 4. Set & Track Goals
- **Precondition**: No goal set
- **Flow**: Input desired macronutrients/calories → Save
- **Postcondition**: Stored for future comparisons

### 5. Analytics
- **Precondition**: Logs exist
- **Flow**: View trends, progress bars, graphs
- **Postcondition**: User sees history and improvements

## 🔧 Tech Stack

| Layer       | Technology        |
|-------------|-------------------|
| Frontend    | React, Chart.js   |
| Backend     | Express, Node.js  |
| Database    | MongoDB Atlas     |
| Styling     | CSS, Tailwind     |
| Auth        | JWT (planned)     |
| DevOps      | GitHub Actions    |
| Deployment  | Heroku            |

## 🔄 CI/CD Pipeline

GitHub Actions is used to automate linting, testing, and build on every push/PR to `main`.

### File: `.github/workflows/ci.yml`

```yaml
name: NutriByte CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20.x'

      - name: Install backend dependencies
        run: cd backend && npm ci

      - name: Install frontend dependencies
        run: cd frontend && npm ci

      - name: Run backend tests
        run: cd backend && npm test

      - name: Run frontend tests
        run: cd frontend && npm test -- --watchAll=false --passWithNoTests
```

## 🛡️ Security

- MongoDB credentials and JWT secret stored as Heroku config vars
- `.env` and `build/` are ignored via `.gitignore`
- Secure HTTP headers via Helmet (backend)

## 📜 Setup Instructions

1. **Clone the Repo**
   ```
   git clone https://github.com/Moses225/nutribyte.git
   cd nutribyte
   ```

2. **Install Dependencies**
   ```
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Set up Environment Variables**

   In `backend/.env`:
   ```
   MONGO_URI=mongodb+srv://<your_username>:<password>@cluster.mongodb.net/nutribyte
   JWT_SECRET=***
   ```

4. **Run Locally**
   ```
   # In root
   npm run dev
   ```

## 📈 Future Enhancements

- USDA API integration
- JWT-based full auth
- React Native mobile app
- Barcode food scanner
- AI-based recommendations


## 🙌 Acknowledgments

- USDA Food Data Central
- Heroku Hosting
- GitHub Actions CI/CD

---

Made by Moses Kouassi 

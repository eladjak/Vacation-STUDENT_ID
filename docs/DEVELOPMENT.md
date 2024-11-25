# מדריך למפתח

## סביבת פיתוח 🛠️

### דרישות מקדימות
- Node.js (גרסה 16 ומעלה)
- Docker + Docker Compose
- Git
- MySQL Workbench (מומלץ)
- VS Code (מומלץ)

### תוספי VS Code מומלצים
- ESLint
- Prettier
- Docker
- GitLens
- Hebrew Language Pack
- Thunder Client

## התקנה והגדרה ⚙️

### 1. הגדרת סביבת פיתוח
bash
שכפול המאגר
git clone <repository-url>
cd vacation-project
התקנת תלויות בצד השרת
cd server
npm install
התקנת תלויות בצד הלקוח
cd ../client
npm install


### 2. הגדרת משתני סביבה
- העתק את `.env.example` ל- `.env`
- עדכן את המשתנים הבאים:

env
Server
PORT=3005
NODE_ENV=development
CLIENT_URL=http://localhost:3003
Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=vacation_db
Redis
REDIS_HOST=localhost
REDIS_PORT=6379
JWT
JWT_SECRET=your_jwt_secret


## תהליך פיתוח 🔄

### 1. Git Workflow

bash
יצירת ענף חדש
git checkout -b feature/new-feature
שמירת שינויים
git add .
git commit -m "תיאור השינויים"
דחיפה לשרת
git push origin feature/new-feature
Apply
Copy


### 2. הרצת הפרויקט

bash
הרצה בסביבת פיתוח
docker-compose up --build
הרצה ללא בנייה מחדש
docker-compose up
עצירת השירותים
docker-compose down
Apply
Copy


### 3. בדיקות

bash
הרצת בדיקות
npm test
הרצת בדיקות עם כיסוי
npm run test:coverage
בדיקות end-to-end
npm run test:e2e


## קונבנציות קוד 📝

### 1. סגנון קוד
- שימוש ב-Prettier לפורמט אחיד
- הערות בעברית לתיאור הלוגיקה
- שמות באנגלית למשתנים ופונקציות

### 2. מבנה תיקיות

src/
├── config/ # קבצי קונפיגורציה
├── controllers/ # בקרים
├── middleware/ # middleware
├── models/ # מודלים
├── routes/ # נתיבים
├── services/ # שירותים
├── types/ # טיפוסי TypeScript
└── utils/ # פונקציות עזר


### 3. לוגים
- שימוש ב-Winston
- רמות לוג שונות
- תיעוד שגיאות מפורט

## דיפלוי 🚀

### 1. בדיקות לפני דיפלוי
- [ ] כל הבדיקות עוברות
- [ ] אין שגיאות לינטר
- [ ] נבדקו ביצועים
- [ ] נבדקה תאימות דפדפנים

### 2. תהליך הדיפלוי
bash
בניית גרסת ייצור
npm run build
העלאה לשרת
docker-compose -f docker-compose.prod.yml up -d


## פתרון בעיות נפוצות 🔧

### 1. בעיות חיבור למסד נתונים

bash
בדיקת חיבור
docker-compose logs db
Apply
Copy

### 2. בעיות Redis

bash
בדיקת חיבור
docker-compose logs redis
Apply
Copy


### 3. בעיות בנייה

bash
ניקוי מטמון
npm run clean
npm install


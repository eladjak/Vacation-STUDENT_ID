# תיעוד ה-API

## כללי 📌

- Base URL: `http://localhost:3005/api`
- כל הבקשות צריכות לכלול את ה-header:
  ```
  Content-Type: application/json
  ```
- בקשות מאובטחות צריכות לכלול:
  ```
  Authorization: Bearer <token>
  ```

## נקודות קצה (Endpoints) 🔌

### אותנטיקציה 🔑

#### הרשמה
```http
POST /api/auth/login
```
**גוף הבקשה:**
```json
{
  "username": "string",
  "password": "string"
}
```
**תגובה מוצלחת:**
```json
{
  "token": "string",
  "user": {
    "id": "number",
    "username": "string",
    "role": "string"
  }
}
```

### ניהול חופשות

#### קבלת כל החופשות
```http
GET /api/vacations
```
**פרמטרים אופציונליים:**
- `page`: מספר העמוד
- `limit`: כמות פריטים בעמוד
- `sort`: שדה המיון

#### הוספת חופשה חדשה
```http
POST /api/vacations
```
**גוף הבקשה:**
```json
{
  "destination": "string",
  "description": "string",
  "startDate": "date",
  "endDate": "date",
  "price": "number",
  "image": "file"
}
```

#### עדכון חופשה
```http
PUT /api/vacations/:id
```

#### מחיקת חופשה
```http
DELETE /api/vacations/:id
```

### מעקב אחר חופשות

#### הוספת מעקב
```http
POST /api/vacations/:id/follow
```

#### הסרת מעקב
```http
DELETE /api/vacations/:id/follow
```

## קודי שגיאה 🚫

| קוד | משמעות |
|-----|---------|
| 200 | הצלחה |
| 201 | נוצר בהצלחה |
| 400 | בקשה שגויה |
| 401 | לא מורשה |
| 403 | אין הרשאה |
| 404 | לא נמצא |
| 500 | שגיאת שרת |

## אבטחה 🔒

### אימות
- שימוש ב-JWT
- תוקף Token: 24 שעות
- נדרש בכותרת: `Authorization: Bearer <token>`

### הגבלות
- Rate limiting: 100 בקשות לדקה
- גודל מקסימלי לקובץ: 5MB
- סוגי קבצים מותרים: jpg, png

## דוגמאות שימוש 📝

### התחברות
```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'user',
    password: 'password'
  })
});
```

### הוספת חופשה
```javascript
const formData = new FormData();
formData.append('destination', 'Paris');
formData.append('image', imageFile);

const response = await fetch('/api/vacations', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});

const response = await fetch('http://localhost:3005/api/vacations', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': Bearer ${token}
},
body: JSON.stringify({
destination: 'Paris',
description: 'A beautiful vacation in Paris',
start_date: '2024-01-01',
end_date: '2024-01-07',
price: 1000
})
});
```

## שגיאות נפוצות ⚠️

### 1. אימות
```json
{
  "error": "Invalid credentials",
  "message": "שם משתמש או סיסמה שגויים"
}
```

### 2. הרשאות
```json
{
  "error": "Forbidden",
  "message": "אין לך הרשאה לבצע פעולה זו"
}
```

### 3. תיקוף נתונים
```json
{
  "error": "Validation Error",
  "details": {
    "price": "מחיר חייב להיות מספר חיובי",
    "endDate": "תאריך סיום חייב להיות אחרי תאריך התחלה"
  }
}
```

## מבנה תיקיות הפרויקט 📁

```
docs/
├── ARCHITECTURE.md   # ארכיטקטורת המערכת
├── API.md           # תיעוד ה-API
├── BUILD.md         # הוראות בנייה והפצה
├── DEVELOPMENT.md   # מדריך למפתח
└── USER_GUIDE.md    # מדריך למשתמש

src/
└── ...

README.md            # מסמך ראשי
```

## סביבות עבודה 🌍

### פיתוח
```
BASE_URL: http://localhost:3005
```

### בדיקות
```
BASE_URL: http://test-api.example.com
```

### ייצור
```
BASE_URL: https://api.example.com
``` 
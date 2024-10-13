# Vacation-STUDENT_ID

פרויקט ניהול חופשות.

## התקנה

1. התקן את Node.js ו-npm.
2. התקן את Docker ו-Docker Compose.
3. שכפל את הריפוזיטורי:
   ```
   git clone <URL-של-הריפוזיטורי>
   cd Vacation-STUDENT_ID
   ```
4. הפעל את הפרויקט באמצעות Docker Compose:
   ```
   docker-compose up --build
   ```

## הפעלה

לאחר הפעלת Docker Compose, השירותים הבאים יהיו זמינים:

1. שרת: http://localhost:3001
2. לקוח: http://localhost:3000
3. מסד נתונים MySQL יפעל ברקע

## תכונות

- צפייה ברשימת חופשות
- הוספה, עריכה ומחיקה של חופשות (למנהל)
- מעקב אחר חופשות
- גרף סטטיסטי של מספר העוקבים לכל חופשה

## טכנולוגיות

- צד לקוח: React, Redux Toolkit, Material-UI
- צד שרת: Node.js, Express
- מסד נתונים: MySQL
- תשתית: Docker, Docker Compose

## פיתוח עתידי

ראה [recommendations.md](recommendations.md) לרשימת המלצות לשיפורים עתידיים.

## רישיון

MIT

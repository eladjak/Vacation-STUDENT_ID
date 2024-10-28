# Vacation-STUDENT_ID

פרויקט ניהול חופשות.

## התקנה

1. התקן Node.js ו-npm.
2. התקן Docker ו-Docker Compose.
3. שכפל את המאגר:
   ```
   git clone <repository-URL>
   cd Vacation-STUDENT_ID
   ```
4. העתק את קבצי התמונות לתיקייה `server/public/images/`.
5. וודא שקובץ האתחול של מסד הנתונים נמצא ב-`server/sql/init.sql`.
6. הפעל את הפרויקט באמצעות Docker Compose:
   ```
   docker-compose up --build
   ```

## הפעלה

לאחר הפעלת Docker Compose, השירותים הבאים יהיו זמינים:

1. שרת: http://localhost:3005
2. לקוח: http://localhost:3003
3. מסד נתונים MySQL יפעל ברקע

## התחברות

ניתן להתחבר עם המשתמשים הבאים:

- משתמש רגיל: username: user, password: user123
- מנהל: username: admin, password: admin123

## פרטי התחברות

1. משתמש מנהל:
   - שם משתמש: `admin`
   - סיסמה: `admin123`

2. משתמש רגיל:
   - שם משתמש: `user`
   - סיסמה: `user123`

## תכונות

- התחברות משתמשים
- צפייה ברשימת חופשות
- הוספה, עריכה ומחיקה של חופשות (למנהל)
- מעקב אחר חופשות (למשתמש רגיל)
- גרף סטטיסטי של עוקבים לכל חופשה (למנהל)

## טכנולוגיות

- צד לקוח: React, Redux Toolkit, Material-UI
- צד שרת: Node.js, Express
- מסד נתונים: MySQL
- תשתית: Docker, Docker Compose

## פיתוח עתידי

ראה [recommendations.md](recommendations.md) לרשימת המלצות לשיפורים עתידיים.

## מעקב התקדמות

ראה [progress.md](progress.md) למעקב אחר התקדמות הפרויקט.

## רישיון

MIT

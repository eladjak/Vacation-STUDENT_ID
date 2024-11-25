# מדריך בנייה והפצה

## הכנת הפרויקט לייצור 🏗️

### 1. בניית צד לקוח
```bash
# כניסה לתיקיית הלקוח
cd client

# התקנת תלויות
npm install

# בנייה לייצור
npm run build

# בדיקת הבנייה
npm run serve
```

### 2. בניית צד שרת
```bash
# כניסה לתיקיית השרת
cd server

# התקנת תלויות
npm install

# בנייה לייצור
npm run build

# בדיקת הבנייה
npm run start:prod
```

### 3. הכנת Docker Images
```bash
# בניית Images
docker-compose -f docker-compose.prod.yml build

# בדיקת Images
docker images
```

## תצורות סביבה 🌍

### 1. פיתוח (Development)
```env
NODE_ENV=development
DEBUG=true
API_URL=http://localhost:3005
```

### 2. בדיקות (Testing)
```env
NODE_ENV=testing
DEBUG=true
API_URL=http://test-api.example.com
```

### 3. ייצור (Production)
```env
NODE_ENV=production
DEBUG=false
API_URL=https://api.example.com
```

## תהליך הפצה 🚀

### 1. בדיקות מקדימות
- [ ] בדיקות יחידה עוברות
- [ ] בדיקות אינטגרציה עוברות
- [ ] בדיקות קצה-לקצה עוברות
- [ ] ביצועים נבדקו
- [ ] אבטחה נבדקה

### 2. הכנת שרת
```bash
# התקנת Docker
apt-get update
apt-get install docker.io docker-compose

# הגדרת הרשאות
usermod -aG docker $USER
```

### 3. העלאת המערכת
```bash
# העתקת קבצים לשרת
scp -r ./* user@server:/app

# התחברות לשרת
ssh user@server

# הפעלת המערכת
cd /app
docker-compose -f docker-compose.prod.yml up -d
```

## ניטור ותחזוקה 🔍

### 1. בדיקות בריאות
```bash
# בדיקת שירותים
curl http://localhost:3005/health

# בדיקת לוגים
docker-compose logs -f
```

### 2. גיבויים
```bash
# גיבוי מסד נתונים
docker exec db mysqldump -u root -p vacation_db > backup.sql

# גיבוי תמונות
tar -czf images_backup.tar.gz ./server/public/images
```

### 3. עדכונים
```bash
# עדכון גרסה
git pull
docker-compose -f docker-compose.prod.yml up -d --build
```

## פתרון בעיות נפוצות 🔧

### 1. בעיות חיבור
```bash
# בדיקת רשת Docker
docker network ls
docker network inspect app-network

# בדיקת פורטים
netstat -tulpn
```

### 2. בעיות זיכרון
```bash
# ניקוי מטמונים
docker system prune -af

# בדיקת שימוש במשאבים
docker stats
```

### 3. בעיות הרשאות
```bash
# תיקון הרשאות קבצים
chmod -R 755 ./server/public
chown -R node:node ./server/public
```

## רשימת תיוג להפצה ✅

### 1. הכנה
- [ ] גרסה מתויגת ב-Git
- [ ] משתני סביבה מעודכנים
- [ ] תלויות מעודכנות
- [ ] בדיקות עוברות

### 2. הפצה
- [ ] גיבוי נוצר
- [ ] קבצים הועתקו
- [ ] שירותים הופעלו
- [ ] בדיקות בריאות תקינות

### 3. אימות
- [ ] גישה למערכת תקינה
- [ ] לוגים תקינים
- [ ] ביצועים תקינים
- [ ] אבטחה תקינה 
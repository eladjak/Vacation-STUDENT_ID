# ארכיטקטורת המערכת

## סקירה כללית 🏗️

המערכת בנויה בארכיטקטורת Microservices המורכבת מ-4 שירותים עיקריים:

### 1. שירותי Frontend (React)
- Single Page Application
- Material-UI לעיצוב
- Redux Toolkit לניהול מצב
- TypeScript לטיפוסים חזקים
- RTL Support לתמיכה בעברית

### 2. שירותי Backend (Node.js)
- Express.js כ-Web Framework
- TypeScript לטיפוסים חזקים
- Passport.js לאותנטיקציה
- Rate Limiting להגנה
- Winston ללוגים

### 3. מסד נתונים (MySQL)
- שמירת נתוני משתמשים
- שמירת נתוני חופשות
- מעקב אחר חופשות
- אינדקסים לביצועים

### 4. Cache (Redis)
- ניהול Sessions
- Rate Limiting
- Cache לשיפור ביצועים

## תרשים ארכיטקטורה 📊

</file>
mermaid
graph TD
Client[React Client] -->|HTTP/HTTPS| LoadBalancer[Load Balancer]
LoadBalancer --> Server1[Node.js Server 1]
LoadBalancer --> Server2[Node.js Server 2]
Server1 --> Redis[(Redis Cache)]
Server2 --> Redis
Server1 --> MySQL[(MySQL Database)]
Server2 --> MySQL

## אבטחה 🔒

1. **אותנטיקציה**
   - Passport.js
   - Sessions מבוססי Redis
   - Rate Limiting

2. **הצפנה**
   - HTTPS בייצור
   - הצפנת סיסמאות
   - JWT לאימות

3. **הרשאות**
   - RBAC (Role-Based Access Control)
   - Middleware לאימות
   - Validation לקלט

## ניטור וביצועים 📈

1. **לוגים**
   - Winston Logger
   - רמות לוג שונות
   - Rotation ללוגים

2. **ניטור**
   - Health Checks
   - מדדי ביצועים
   - התראות

3. **Cache**
   - Redis לשיפור ביצועים
   - Cache invalidation
   - Session management
# אסטרטגיית בדיקות

## סוגי בדיקות 🧪

### 1. בדיקות יחידה (Unit Tests) 
typescript
// דוגמה לבדיקת פונקציית אימות
describe('Auth Utils', () => {
test('should validate password correctly', async () => {
const password = 'Test123!';
const hash = await hashPassword(password);
const isValid = await comparePasswords(password, hash);
expect(isValid).toBe(true);
});
});

### 2. בדיקות אינטגרציה (Integration Tests)

typescript
// דוגמה לבדיקת נתיב התחברות
describe('Auth Routes', () => {
test('should login user with valid credentials', async () => {
const res = await request(app)
.post('/api/auth/login')
.send({
username: 'testuser',
password: 'password123'
});
expect(res.status).toBe(200);
expect(res.body).toHaveProperty('token');
});
});

### 3. בדיקות קצה-לקצה (E2E Tests)

typescript
// דוגמה לבדיקת תהליך מלא
describe('Vacation Management', () => {
test('admin should be able to create and edit vacation', async () => {
// התחברות כמנהל
// יצירת חופשה
// עריכת חופשה
// וידוא שינויים
});
});


## כלי בדיקה 🛠️

### Jest
- מסגרת הבדיקות העיקרית
- כיסוי קוד
- מוקים וספיות

### Supertest
- בדיקות API
- בדיקות אינטגרציה
- דימוי בקשות HTTP

### React Testing Library
- בדיקות ממשק משתמש
- בדיקות התנהגות
- נגישות

## הרצת בדיקות 🏃‍♂️

### בדיקות יחידה

bash
הרצת כל הבדיקות
npm test
הרצה במצב צפייה
npm test -- --watch
בדיקת כיסוי
npm test -- --coverage


### בדיקות אינטגרציה

bash
הרצת בדיקות אינטגרציה
npm run test:integration
הרצה עם דיווח מפורט
npm run test:integration -- --verbose


### בדיקות E2E

bash
הרצת בדיקות E2E
npm run test:e2e
הרצה בסביבת פיתוח
npm run test:e2e:dev


## כיסוי קוד 📊

### יעדי כיסוי
- קוד עסקי: 90%
- שירותים: 85%
- ממשק משתמש: 75%

### דוח כיסוי

bash
יצירת דוח כיסוי מפורט
npm run test:coverage


## בדיקות אוטומטיות 🤖

### CI/CD Pipeline

yaml
דוגמה ל-GitHub Actions
name: Tests
on: [push, pull_request]
jobs:
test:
runs-on: ubuntu-latest
steps:
uses: actions/checkout@v2
name: Install dependencies
run: npm install
name: Run tests
run: npm test
Apply
Copy


## תבניות לבדיקות 📝

### בדיקת שירות

typescript
describe('VacationService', () => {
beforeEach(() => {
// הגדרת מצב התחלתי
});
test('should create vacation', async () => {
// בדיקת יצירת חופשה
});
afterEach(() => {
// ניקוי
});
});


### בדיקת קומפוננטה

typescript
describe('VacationCard', () => {
test('should render vacation details', () => {
// בדיקת הצגת פרטי חופשה
});
test('should handle follow click', () => {
// בדיקת לחיצה על כפתור מעקב
});
});


## מוקים וספיות 🎭

### מוקים לשירותים חיצוניים

typescript
jest.mock('../services/redis', () => ({
get: jest.fn(),
set: jest.fn()
}));


### ספיות לפונקציות

typescript
const logSpy = jest.spyOn(console, 'log');
expect(logSpy).toHaveBeenCalled();




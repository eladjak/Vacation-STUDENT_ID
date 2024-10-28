# שלב הבנייה
FROM node:16-alpine as build

WORKDIR /app

# העתקת קבצי package.json ו-package-lock.json (אם קיים)
COPY package*.json ./

# התקנת תלויות
RUN npm install

# העתקת שאר קבצי המקור
COPY . .

# בניית האפליקציה
RUN npm run build

# שלב הייצור
FROM nginx:alpine

# העתקת קבצי הבנייה לתיקיית ה-nginx
COPY --from=build /app/build /usr/share/nginx/html

# העתקת ה-favicon
COPY --from=build /app/public/favicon.svg /usr/share/nginx/html/favicon.svg

# העתקת קובץ קונפיגורציה מותאם של nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# חשיפת פורט 80
EXPOSE 80

# הפעלת nginx
CMD ["nginx", "-g", "daemon off;"]

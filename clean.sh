#!/bin/bash

# עצירת כל הקונטיינרים
docker-compose down

# מחיקת כל הווליומים
docker volume rm $(docker volume ls -q)

# מחיקת כל התמונות
docker rmi $(docker images -q)

# ניקוי מטמון
docker system prune -af

# הפעלה מחדש
docker-compose up --build

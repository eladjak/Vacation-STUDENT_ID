import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      he: {
        translation: {
          "LOGIN": "התחברות",
          "Username": "שם משתמש",
          "Password": "סיסמה",
          "Login failed": "ההתחברות נכשלה",
          "Please check your username and password": "אנא בדוק את שם המשתמש והסיסמה",
          "Vacations": "חופשות",
          "Add Vacation": "הוסף חופשה",
          "Edit": "ערוך",
          "Delete": "מחק",
          "Follow": "עקוב",
          "Unfollow": "הפסק לעקוב",
          "Destination": "יעד",
          "Description": "תיאור",
          "Start Date": "תאריך התחלה",
          "End Date": "תאריך סיום",
          "Price": "מחיר",
          "Image URL": "כתובת תמונה",
          "Save": "שמור",
          "Cancel": "בטל",
          "Are you sure you want to delete this vacation?": "האם אתה בטוח שברצונך למחוק חופשה זו?",
          "Yes": "כן",
          "No": "לא",
          "Logout": "התנתק",
          "Admin Dashboard": "לוח בקרה למנהל",
          "User Dashboard": "לוח בקרה למשתמש",
          "Followers": "עוקבים",
          "Download Report": "הורד דוח",
          "Error": "שגיאה",
          "Success": "הצלחה",
          "Vacation added successfully": "החופשה נוספה בהצלחה",
          "Vacation updated successfully": "החופשה עודכנה בהצלחה",
          "Vacation deleted successfully": "החופשה נמחקה בהצלחה",
          "Failed to add vacation": "הוספת החופשה נכשלה",
          "Failed to update vacation": "עדכון החופשה נכשל",
          "Failed to delete vacation": "מחיקת החופשה נכשלה",
          "Failed to fetch vacations": "טעינת החופשות נכשלה",
          "Loading...": "טוען...",
          "No vacations found": "לא נמצאו חופשות",
          "Vacation App": "אפליקציית חופשות"
        }
      }
    },
    lng: "he",
    fallbackLng: "he",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

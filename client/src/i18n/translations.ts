export const translations = {
  he: {
    common: {
      appName: 'מערכת חופשות',
      save: 'שמור',
      cancel: 'ביטול',
      delete: 'מחק',
      edit: 'ערוך',
      add: 'הוסף',
      loading: 'טוען...',
      error: 'שגיאה',
      success: 'הצלחה',
      yes: 'כן',
      no: 'לא',
      submit: 'שלח',
      togglePasswordVisibility: 'הצג/הסתר סיסמה'
    },
    header: {
      home: 'דף הבית',
      admin: 'ניהול',
      login: 'התחברות',
      register: 'הרשמה',
      logout: 'התנתק'
    },
    auth: {
      login: 'התחברות',
      register: 'הרשמה',
      username: 'שם משתמש',
      password: 'סיסמה',
      confirmPassword: 'אימות סיסמה',
      submit: 'שלח',
      registerLink: 'הרשם עכשיו',
      haveAccount: 'כבר יש לך חשבון? התחבר',
      loginError: 'שגיאה בהתחברות',
      registrationError: 'שגיאה בהרשמה',
      noAccount: 'עדיין אין לך חשבון?',
      registerNow: 'הירשם עכשיו',
      passwordMismatch: 'הסיסמאות אינן תואמות',
      togglePasswordVisibility: 'הצג/הסתר סיסמה'
    },
    form: {
      required: 'שדה חובה',
      priceMin: 'המחיר חייב להיות גדול מ-0',
      endDateError: 'תאריך סיום חייב להיות אחרי תאריך התחלה'
    },
    vacation: {
      list: 'רשימת חופשות',
      management: 'ניהול חופשות',
      addVacation: 'הוסף חופשה',
      editVacation: 'ערוך חופשה',
      deleteVacation: 'מחק חופשה',
      confirmDelete: 'האם אתה בטוח שברצונך למחוק חופשה זו?',
      deleteMessage: 'פעולה זו לא ניתנת לביטול',
      noVacations: 'אין חופשות להצגה',
      followers: 'עוקבים',
      stats: 'סטטיסטיקות חופשות',
      showFollowedOnly: 'הצג רק חופשות במעקב',
      destination: 'יעד',
      description: 'תיאור',
      price: 'מחיר',
      imageUrl: 'קישור לתמונה',
      startDate: 'תאריך התחלה',
      endDate: 'תאריך סיום',
      initializeSamples: 'אתחל דוגמאות'
    },
    error: {
      loadData: 'שגיאה בטעינת הנתונים',
      fetchVacations: 'שגיאה בטעינת החופשות',
      followAction: 'שגיאה בפעולת המעקב',
      general: 'שגיאה כללית'
    },
    errorBoundary: {
      title: 'אופס! משהו השתבש',
      message: 'אירעה שגיאה בלתי צפויה',
      retry: 'נסה שוב'
    }
  }
} as const;

// נייצא את הטיפוס של האובייקט
export type TranslationsType = typeof translations.he;

export type TranslationKey = 
  | keyof TranslationsType
  | `common.${keyof TranslationsType['common']}`
  | `auth.${keyof TranslationsType['auth']}`
  | `header.${keyof TranslationsType['header']}`
  | `form.${keyof TranslationsType['form']}`
  | `vacation.${keyof TranslationsType['vacation']}`
  | `error.${keyof TranslationsType['error']}`
  | `errorBoundary.${keyof TranslationsType['errorBoundary']}`; 
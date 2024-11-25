export const translations = {
  he: {
    common: {
      save: 'שמור',
      cancel: 'ביטול',
      delete: 'מחק',
      edit: 'ערוך',
      add: 'הוסף',
      loading: 'טוען...',
      error: 'שגיאה',
      success: 'הצלחה',
      yes: 'כן',
      no: 'לא'
    },
    form: {
      required: 'שדה חובה',
      priceMin: 'המחיר חייב להיות גדול מ-0',
      endDateError: 'תאריך סיום חייב להיות אחרי תאריך התחלה'
    },
    register: {
      title: 'הרשמה',
      username: 'שם משתמש',
      password: 'סיסמה',
      confirmPassword: 'אימות סיסמה',
      submit: 'הרשמה',
      loginLink: 'כבר רשום? התחבר כאן',
      error: 'שגיאה בהרשמה',
      passwordMismatch: 'הסיסמאות אינן תואמות'
    },
    vacation: {
      list: 'רשימת חופשות',
      management: 'ניהול חופשות',
      addVacation: 'הוסף חופשה',
      editVacation: 'ערוך חופשה',
      deleteVacation: 'מחק חופשה',
      confirmDelete: 'האם אתה בטוח שברצונך למחוק?',
      deleteMessage: 'פעולה זו לא ניתנת לביטול',
      noVacations: 'אין חופשות להצגה',
      showFollowedOnly: 'הצג רק חופשות במעקב',
      stats: 'סטטיסטיקות חופשות',
      destination: 'יעד',
      description: 'תיאור',
      price: 'מחיר',
      image_url: 'קישור לתמונה',
      start_date: 'תאריך התחלה',
      end_date: 'תאריך סיום',
      followers: 'עוקבים',
      follow: 'עקוב',
      unfollow: 'הפסק לעקוב'
    },
    error: {
      loadData: 'שגיאה בטעינת הנתונים',
      followAction: 'שגיאה בפעולת המעקב',
      general: 'אירעה שגיאה'
    },
    errorBoundary: {
      title: 'אופס! משהו השתבש',
      message: 'אירעה שגיאה בלתי צפויה',
      retry: 'נסה שוב'
    },
    header: {
      home: 'דף הבית',
      admin: 'ניהול',
      login: 'התחברות',
      register: 'הרשמה',
      logout: 'התנתק'
    }
  }
} as const;

// טיפוס עבור מפתחות התרגום
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & (string | number)];

export type TranslationKey = RecursiveKeyOf<typeof translations.he>; 
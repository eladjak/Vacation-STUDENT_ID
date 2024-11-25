export const he = {
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
    showFollowedOnly: 'הצג רק חופשות במעקב'
  },
  error: {
    loadData: 'שגיאה בטעינת הנתונים',
    fetchVacations: 'שגיאה בטעינת החופשות',
    followAction: 'שגיאה בפעולת המעקב'
  },
  errorBoundary: {
    title: 'אופס! משהו השתבש',
    message: 'אירעה שגיאה בלתי צפויה',
    retry: 'נסה שוב'
  }
} as const;

export type TranslationKeys = typeof he; 
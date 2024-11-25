export interface Translations {
  common: {
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
  };
  header: {
    login: string;
    register: string;
    home: string;
    admin: string;
    logout: string;
  };
  auth: {
    login: string;
    register: string;
    username: string;
    password: string;
    confirmPassword: string;
    passwordMismatch: string;
    registrationError: string;
    loginError: string;
    submit: string;
    registerLink: string;
    loginLink: string;
    haveAccount: string;
  };
  vacation: {
    destination: string;
    description: string;
    start_date: string;
    end_date: string;
    price: string;
    image_url: string;
    management: string;
    addVacation: string;
    editVacation: string;
    confirmDelete: string;
    deleteMessage: string;
    list: string;
    noVacations: string;
    followers: string;
    stats: string;
    showFollowedOnly: string;
  };
  form: {
    required: string;
    priceMin: string;
    endDateError: string;
  };
  error: {
    loadData: string;
    required: string;
    followAction: string;
  };
}

export type TranslationKey = {
  [K in keyof Translations]: {
    [P in keyof Translations[K]]: `${K}.${string & P}`;
  }[keyof Translations[K]];
}[keyof Translations]; 
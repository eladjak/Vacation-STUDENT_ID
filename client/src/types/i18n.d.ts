import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: {
        auth: {
          register: string;
          login: string;
          username: string;
          password: string;
          confirmPassword: string;
          passwordMismatch: string;
          registrationError: string;
          loginError: string;
          submit: string;
          haveAccount: string;
          title: string;
          error: string;
        };
        form: {
          required: string;
          priceMin: string;
          endDateError: string;
        };
        error: {
          loadData: string;
          followAction: string;
        };
        vacation: {
          list: string;
          management: string;
          addVacation: string;
          editVacation: string;
          confirmDelete: string;
          deleteMessage: string;
          noVacations: string;
          followers: string;
          stats: string;
          showFollowedOnly: string;
          price: string;
          image_url: string;
          start_date: string;
          end_date: string;
        };
      };
    };
  }
} 
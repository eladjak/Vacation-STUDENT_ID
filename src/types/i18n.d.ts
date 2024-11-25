import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: {
        common: {
          loading: string;
          save: string;
          cancel: string;
          delete: string;
          edit: string;
        };
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
        };
        header: {
          login: string;
        };
        vacation: {
          destination: string;
          description: string;
          price: string;
          image_url: string;
          start_date: string;
          end_date: string;
          editVacation: string;
          confirmDelete: string;
          deleteMessage: string;
        };
        error: {
          loadData: string;
        };
        register: {
          username: string;
          password: string;
          confirmPassword: string;
          submit: string;
          loginLink: string;
        };
      };
    };
  }
} 
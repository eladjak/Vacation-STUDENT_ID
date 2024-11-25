declare module 'stylis-plugin-rtl' {
  import { Plugin } from 'stylis';
  const rtlPlugin: Plugin;
  export default rtlPlugin;
}

declare module 'stylis' {
  export const prefixer: any;
} 
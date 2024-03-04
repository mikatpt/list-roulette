import { ListStore } from '../src/types';

declare global {
  interface Window {
    electron: {
      store: {
        get(key: string): ListStore | null;
        set(property: string, val: ListStore): void;
        delete(property: string): void;
      };
    };
  }
}

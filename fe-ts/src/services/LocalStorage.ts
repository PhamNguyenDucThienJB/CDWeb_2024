const localStorageApp = {
    setItemStorage: (key: string, value: string): void => {
      sessionStorage.setItem(key, value);
    },
    getItemStorage: (key: string): string | undefined => {
      const item = sessionStorage.getItem(key);
      return item !== null ? item : undefined;
    },
  };
  
  export default localStorageApp;
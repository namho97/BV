export class SessionStorageHelper {
    private static RememberMeKey = 'RememberMeKey'
  
    static getRememberMe<T>(): T {
      return this.getItem<T>(this.RememberMeKey);
    }
  
    static setRememberMe(item: any) {
      this.setItem(this.RememberMeKey, item)
    }
  
    static removeRememberMe() {
      this.removeItem(this.RememberMeKey)
    }
  
    static getItem<T>(key: string): T {
      if (sessionStorage[key] && sessionStorage[key]!="undefined") {      
        return <T>JSON.parse(sessionStorage[key]);
      }
      return null;
    }
  
    static setItem(key: string, item: any) {
      sessionStorage[key] = JSON.stringify(item);
    }
  
    static removeItem(key: string) {
      sessionStorage.removeItem(key);
    }
  
  }
  
import { SessionStorageHelper } from "./session-storage.helper";

export class LocalStorageHelper {
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
    if (localStorage[key] && localStorage[key]!="undefined") {      
      return <T>JSON.parse(localStorage[key]);
    }
    return null;
  }

  static setItem(key: string, item: any) {
    localStorage[key] = JSON.stringify(item);
    SessionStorageHelper.setItem(key,item);
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
    SessionStorageHelper.removeItem(key);
  }

}

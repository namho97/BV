import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "src/app/shared/components/snackbar/snackbar.component";
import { environment } from "src/environments/environment";
import { saveFile } from "./file-download.helper";

declare var jQuery: any;

export class CommonService {
  static removeVietnamese(alias) {
    var str = alias.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // str = str.toLowerCase();
    // str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    // str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    // str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    // str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    // str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    // str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str = str.replace(/đ/g, "d");
    // str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    // str = str.replace(/ + /g," ");
    // str = str.trim();
    return str;
  }
  static tranferTextKhongDau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/  +/g, ' ');
    return str;
  }
  /**
   * @param {int} The month number, 0 based
   * @param {int} The year, not zero based, required to account for leap years
   * @return {Date[]} List with date objects for each day of the month
   */
  static getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
  static makeRandom(lengthOfCode: number) {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  static format(str: string, obj: string[]) {
    return str.replace(/\{\s*([^}\s]+)\s*\}/g, function (m, p1, offset, string) {
      console.log(m, offset, string);
      return obj[p1];
    });
  }

  static isEmail(email: string): boolean {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  static isNullOrEmpty(str: string): boolean {
    if (str == undefined || str == null || str == "") {
      return true;
    }
    return false;
  }

  static getNowDateOnly(): Date {
    var now = new Date();
    return new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0);
  }
  static addDate(datetime: any, num: number): Date {
    var d = new Date(datetime);
    d.setDate(d.getDate() + num);
    return d;
  }
  static addSecond(datetime: any, num: number): Date {
    var d = new Date(datetime);
    d.setSeconds(d.getSeconds() + num);
    return d;
  }
  static formatTime(datetime: Date): string {
    var minute = datetime.getMinutes();
    var hours = datetime.getHours();
    var minutes: number = minute % 60;
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var hoursstr: string = hours < 10 ? '0' + hours.toString() : hours.toString();
    var minutesstr: string = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    var strTime = hoursstr + ':' + minutesstr + ' ' + ampm;
    return strTime;
  }
  static formatDayOfWeek(date: Date): string {
    var dayNames = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    return dayNames[date.getDay()];
  }
  static formatDate(datetime: Date, format: string = "mm/dd/yyyy"): string {
    var date = datetime.getDate();
    var month = (datetime.getMonth() + 1);
    var datestr = date < 10 ? '0' + date : date;
    var monthstr = month < 10 ? '0' + month : month;
    switch (format) {
      case "mm/dd/yyyy":
        return monthstr + "/" + datestr + "/" + datetime.getFullYear();
      case "dd/mm/yyyy":
        return datestr + "/" + monthstr + "/" + datetime.getFullYear();
      default:
        return monthstr + "/" + datestr + "/" + datetime.getFullYear();
    }
  }
  static formatDateTime(datetime: Date, format: string = "mm/dd/yyyy"): string {
    if (datetime != undefined && typeof datetime.getDate === 'function') {
      var date = datetime.getDate();
      var month = (datetime.getMonth() + 1);
      var datestr = date < 10 ? '0' + date : date;
      var monthstr = month < 10 ? '0' + month : month;

      var minute = datetime.getMinutes();
      var hours = datetime.getHours();
      var minutes: number = minute % 60;
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      var hoursstr: string = hours < 10 ? '0' + hours.toString() : hours.toString();
      var minutesstr: string = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
      var strTime = hoursstr + ':' + minutesstr + ' ' + ampm;
      switch (format) {
        case "mm/dd/yyyy":
          return monthstr + "/" + datestr + "/" + datetime.getFullYear() + " " + strTime;
        case "dd/mm/yyyy":
          return datestr + "/" + monthstr + "/" + datetime.getFullYear() + " " + strTime;
        default:
          return monthstr + "/" + datestr + "/" + datetime.getFullYear() + " " + strTime;
      }
    }
    return null;
  }

  static formatDateTimeSACH(datetime: Date, format: string = "mm/dd/yyyy"): string {
    var date = datetime.getDate();
    var month = (datetime.getMonth() + 1);
    var datestr = date < 10 ? '0' + date : date;
    var monthstr = month < 10 ? '0' + month : month;

    var minute = datetime.getMinutes();
    var hours = datetime.getHours();
    var minutes: number = minute % 60;
    var ampm = hours >= 12 ? 'CH' : 'SA';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var hoursstr: string = hours < 10 ? '0' + hours.toString() : hours.toString();
    var minutesstr: string = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    var strTime = hoursstr + ':' + minutesstr + ' ' + ampm;
    switch (format) {
      case "mm/dd/yyyy":
        return monthstr + "/" + datestr + "/" + datetime.getFullYear() + " " + strTime;
      case "dd/mm/yyyy":
        return datestr + "/" + monthstr + "/" + datetime.getFullYear() + " " + strTime;
      default:
        return monthstr + "/" + datestr + "/" + datetime.getFullYear() + " " + strTime;
    }
  }

  static isValidTime(time: any): boolean {
    var dateReg = /^(1[012]|0[1-9]):[0-5][0-9](\\s)? (AM|PM)+$/;
    if (!dateReg.test(time.toString())) {
      return false;
    }
    return true;
  }
  static isValidDate(str: Date): boolean {
    var comp = this.formatDate(str).split('/');
    var m = parseInt(comp[0], 10);
    var d = parseInt(comp[1], 10);
    var y = parseInt(comp[2], 10);
    var date = new Date(y, m - 1, d);
    if (m > 0 && d > 0 && y > 1900 && date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
      return true;
    }
    return false;
  }
  static isDateVietNam(str: string): boolean {
    if (this.isDateTimeVietNam(str) == false) {
      var arr = str.split('/');
      if (arr != null && arr.length == 3 && parseInt(arr[0]) > 0 && parseInt(arr[0]) < 32 && parseInt(arr[1]) > 0 &&
        parseInt(arr[1]) < 13 && parseInt(arr[2]) > 1970) {
        return true;
      }
    }
    return false;
  }
  static isDateTimeVietNam(str: string): boolean {
    var arr = str.split(' ');
    if (arr != null && arr.length == 3) {
      var arrDate = arr[0].split('/');
      var arrTime = arr[1].split(':');
      if (arrDate != null && arrDate.length == 3 &&
        parseInt(arrDate[0]) > 0 && parseInt(arrDate[0]) < 32 &&
        parseInt(arrDate[1]) > 0 && parseInt(arrDate[1]) < 13 && parseInt(arrDate[2]) > 1990 && arrTime != null && arrTime.length == 2 &&
        parseInt(arrTime[0]) >= 0 && parseInt(arrTime[0]) < 13 && parseInt(arrTime[1]) >= 0 && parseInt(arrTime[1]) < 60 &&
        (arr[2] == "SA" || arr[2] == "CH")) {
        return true;
      }
    }
    return false;
  }
  static findObjectByKey(array: any, key: any, value: any): any {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }

  static findObjectByKeyOnRecursive(array: any, key: any, value: any, keyRecursive: string) {
    var result = null;
    if (array != undefined) {
      for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
          result = array[i];
        }
        else {
          if (array[i][keyRecursive] != undefined && array[i][keyRecursive].length > 0) {
            let objectClone = JSON.parse(JSON.stringify(array[i][keyRecursive]));
            result = this.findObjectByKeyOnRecursive(objectClone, key, value, keyRecursive);
          }
        }
        if (result)
          return result;
      }
    }
    return result;
  }

  static findObjectByMultiKey(array: any, keys: any[], values: any[]): any {
    for (var i = 0; i < array.length; i++) {
      var c = 0;
      for (var j = 0; j < keys.length; j++) {
        if (array[i][keys[j]] === values[j]) {
          c++;
        }
      }
      if (c == keys.length) {
        return array[i];
      }
    }
    return null;
  }
  static countObjectByKey(array: any, key: any, value: any): any {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        count++;
      }
    }
    return count;
  }
  static compareDate(startDate: any, endDate: any): boolean {
    //Note: 00 is month i.e. January
    var dateOne = new Date(this.formatDate(new Date(startDate.toString()))); //Year, Month, Date
    var dateTwo = new Date(this.formatDate(new Date(endDate.toString()))); //Year, Month, Date
    if (dateOne >= dateTwo) {
      return false;
    } else {
      return true;
    }

  }
  static compareTime(startTime: any, endTime: any): boolean {
    //Note: 00 is month i.e. January
    var timeOne = new Date(this.formatDate(new Date()) + " " + this.formatTime(new Date(startTime.toString()))); //Year, Month, Date
    var timeTwo = new Date(this.formatDate(new Date()) + " " + this.formatTime(new Date(endTime.toString()))); //Year, Month, Date
    if (timeOne > timeTwo) {
      return false;
    } else {
      return true;
    }

  }
  static subtract(startTime: any, endTime: any, typeexport: any) {
    const diffTime = Math.abs(endTime.getTime() - startTime.getTime());
    switch (typeexport) {
      case "day":
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      case "hour":
        return Math.ceil(diffTime / (1000 * 60 * 60));
      case "minute":
        return Math.ceil(diffTime / (1000 * 60));
      case "second":
        return Math.ceil(diffTime / (1000));
      default:
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }
  static isValidPhone(phone: any): boolean {
    // /^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/
    // /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})|([0-9]{4})[-. ]?([0-9]{4})$/
    var patt = new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}|\d{5}$/);
    return patt.test(phone);
  }

  static convertStringDDMMYYYHHMMTTToDate(dateString: string) {
    var arr = dateString.split(' ');
    if (arr.length == 3) {
      var arr1 = arr[0].split('/');//Date
      var arr2 = arr[1].split(':');//Time
      var day = 0;
      var month = 0;
      var year = 0;
      var hour = 0;
      var minute = 0;

      if (arr1.length == 3) {
        day = parseInt(arr1[0]);
        month = parseInt(arr1[1]);
        year = parseInt(arr1[2]);
      }
      if (arr2.length == 2) {
        hour = arr[2] == "AM" ? parseInt(arr2[0]) : parseInt(arr2[0]) + 12;
        minute = parseInt(arr2[1]);
      }
      if (day != 0 && month != 0 && year != 0) {
        return new Date(month + "/" + day + "/" + year + " " + hour + ":" + minute);
      }
    }
    return null;
  }

  static convertStringDDMMYYYToDate(dateString: string) {
    var arr = dateString.split('/');
    if (arr.length == 3) {
      var day = 0;
      var month = 0;
      var year = 0;

      day = parseInt(arr[0]);
      month = parseInt(arr[1]);
      year = parseInt(arr[2]);

      if (day != 0 && month != 0 && year != 0) {
        return new Date(month + "/" + day + "/" + year);
      }
    }
    return null;
  }
  static convertUtcToLocalDateTimeString(serverdate: any) {
    var date = new Date();
    var offsetms = date.getTimezoneOffset();
    var serverDate = new Date(serverdate);
    return this.formatDateTime(this.convertUTCDateToLocalDate(serverDate, offsetms));
  }
  static convertUTCDateToLocalDate(date: any, offset: number) {
    var d = new Date(date);
    var newDate = new Date(date);
    newDate.setMinutes(d.getMinutes() - offset);
    return newDate;
  }
  static getErrorFromObject(error: any, propertyName: string) {
    var mess = "";
    if (error != null) {
      error.forEach(element => {
        if (element.PropertyName === propertyName) {
          mess = element.ErrorMessage;
        }
      });
    }
    return mess;
  }
  static clearValidateErrorOtherCallback(self: any, event: any) {
    if (self.error != null && self.error != undefined && self.error.length > 0) {
      for (var i = 0; i < self.error.length; i++) {
        if (self.error[i].ErrorMessage === event) {
          self.error.splice(i, 1);
        }
      }
    }
  }
  static getWidthWindow(width: number) {
    if (width < jQuery(window).width() - 30)
      return width;
    else
      return jQuery(window).width() - 30;
  }
  static getHeightWindow(height: number) {
    if (height < jQuery(window).height() - 30)
      return height;
    else
      return jQuery(window).height() - 30;
  }
  static getTopWindow(height: number) {
    var heightCustom = CommonService.getHeightWindow(height);
    return (jQuery(window).height() - heightCustom) / 2;
  }
  static getLeftWindow(width: number) {
    var widthCustom = CommonService.getWidthWindow(width);
    return (jQuery(window).width() - widthCustom) / 2;
  }

  static sec2time(totalSeconds: number, hasAMPM: boolean = false, hasSecond: boolean = true) {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
    var hoursStr = hours.toString();
    var minutesStr = minutes.toString();
    var secondsStr = seconds.toString();
    if (hours < 10) { hoursStr = "0" + hours; }
    if (minutes < 10) { minutesStr = "0" + minutes; }
    if (seconds < 10) { secondsStr = "0" + seconds; }
    if (hasAMPM) {
      var amPM = hours > 12 ? "PM" : "AM";
      if (hours > 12) { hoursStr = (hours - 12).toString(); }
    }
    return hoursStr + ':' + minutesStr + (hasSecond ? ':' + secondsStr : '') + (hasAMPM ? ' ' + amPM : '');
  }
  static time2sec(datetime: Date) {
    if (datetime != null) {
      var hours = datetime.getHours();
      var minutes = datetime.getMinutes();
      var seconds = datetime.getSeconds();
      return (hours * 3600) + (minutes * 60) + seconds;
    }
    return null;
  }

  static convertTimeSACH(value: string) {
    if (value != null && value != "") {
      var hourEnd = value.indexOf(":");
      var H = +value.substr(0, hourEnd);
      var h = H % 12 || 12;
      var sach = (H < 12 || H === 24) ? "SA" : "CH";
      value = h + value.substr(hourEnd, 3) + " " + sach;
      return value;
    }
    return null;
  }

  static secToHourAndMinute(totalSeconds: number) {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var hoursStr = hours.toString();
    var minutesStr = minutes.toString();
    if (hours < 10) { hoursStr = "0" + hours; }
    if (minutes < 10) { minutesStr = "0" + minutes; }
    return hoursStr + ':' + minutesStr;
  }

  static replaceDateToStringBeforeStringify(body: Object) {
    if (body != null) {
      Object.keys(body).map(key => {
        if (toString.call(body[key]) == "[object Date]") {
          body[key] = CommonService.formatDateTime(body[key]);
        }
      });
    }
    return body;
  }

  static convertSpecialXML(body: string) {
    body = body.replace(/&/g, "&#38;");
    body = body.replace(/</g, "&lt;");
    body = body.replace(/>/g, "&gt;");
    body = body.replace(/'/g, "&#39;");
    body = body.replace(/''/g, "&#34;");
    return body;
  }

  static FormatStringFractionToFloat(Text: string) {
    if (Text != null) {
      if (Text.indexOf("/") > -1) {
        let split = Text.split('/');
        let result = parseFloat((parseFloat(split[0]) / parseFloat(split[1])).toFixed(3))
        return result;
      }
      else {
        let result = parseFloat(parseFloat(Text).toFixed(3))
        return result;
      }
    }
    return null;
  }

  static FormatDateStringToDate(datetime: String): Date {
    if (datetime != null) {
      var dateFormat = datetime.split("/");
      return new Date(+dateFormat[2], +dateFormat[1] - 1, +dateFormat[0]);
    }
  }
  static FormatDateStringToDateTime(datetime: String): Date {
    if (datetime != null) {
      var arr = datetime.split(' ');
      if (arr != null && arr.length == 3) {
        var arrDate = arr[0].split('/');
        var arrTime = arr[1].split(':');
        if (arrDate != null && arrDate.length == 3 &&
          parseInt(arrDate[0]) > 0 && parseInt(arrDate[0]) < 32 &&
          parseInt(arrDate[1]) > 0 && parseInt(arrDate[1]) < 13 && parseInt(arrDate[2]) > 1990 && arrTime != null && arrTime.length == 2 &&
          parseInt(arrTime[0]) >= 0 && parseInt(arrTime[0]) < 13 && parseInt(arrTime[1]) >= 0 && parseInt(arrTime[1]) < 60 &&
          (arr[2] == "SA" || arr[2] == "CH")) {
          var hour = +arrTime[0];
          if (arr[2] == "CH") {
            hour = hour + 12;
          }
          return new Date(+arrDate[2], +arrDate[1] - 1, +arrDate[0], hour, +arrTime[1], 0);
        }
      }
    }
  }

  static RemoveAccents(Text: string) {
    if (Text != null) {
      let result = Text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
      return result;
    }
    return "";
  }

  static b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  static async getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }
  static async openSnackBar(snackBar: MatSnackBar, message: string, panelClass: string = "success", action: string = "Tắt", duration: number = 3000) {

    snackBar.openFromComponent(SnackbarComponent, {
      data: {
        html: message,
        class: panelClass,
        action: action
      },
      duration: duration,
      panelClass: [panelClass]
    });
    //   snackBar.open(message, action,{
    //       duration: duration,
    //       panelClass: [panelClass]
    //   });
  }
  static downLoadFile(data: any, type: string, fileName: string) {
    let blob = new Blob([data], { type: type });
    saveFile(blob, fileName);
    //let url = window.URL.createObjectURL(blob);
    //let pwa = window.open(url);
    // if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
    //     alert('Please disable your Pop-up blocker and try again.');
    // }
  }
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static fullScreenDialog(isFullscreen: boolean, Height: any, Width: any, heightHeaderFooter: number) {
    if (isFullscreen) {
      jQuery(".cdk-overlay-pane").css({ "height": (Height != null ? Height : "auto"), "width": Width, "max-width": Width });
      jQuery(".mat-dialog-content").css({ "height": Height - (heightHeaderFooter != null ? heightHeaderFooter : 0), "max-height": Height - (heightHeaderFooter != null ? heightHeaderFooter : 0) });
    }
    else {
      jQuery(".cdk-overlay-pane").css({ "height": "97%", "width": "100%", "max-width": "97%" });
      jQuery(".mat-dialog-content").css({ "height": (jQuery(window).height() - (heightHeaderFooter != null ? heightHeaderFooter : 150)), "max-height": jQuery(window).height() - (heightHeaderFooter != null ? heightHeaderFooter : 150) });
    }
  }

  static convertEnumToArray(enumName: any) {
    var keys = Object.keys(enumName);
    return keys.slice(keys.length / 2, keys.length - 1);
  }

  static compareObjectChange(objOrigin: any, objNew: any) {
    if (objOrigin instanceof Array) {
      for(var index=0;index<objOrigin.length;index++)
      {
        if (objOrigin[index] instanceof Array || objOrigin[index] instanceof Object) {
          if(this.compareObjectChange(objOrigin[index], objNew[index]))
          {
            return true;
          }
        }
        else {
          for (var key of Object.keys(objOrigin[index])) {
            if (objOrigin[index][key] instanceof Array || objOrigin[index][key] instanceof Object) {
              if(this.compareObjectChange(objOrigin[index][key], objNew[index][key]))
              {
                return true;
              }
            }
            else {
              if (objOrigin[index][key] != objNew[index][key]) {
                return true;
              }
            }
          }
        }
      }
    }
    else {
      for (var key of Object.keys(objOrigin)) {
        if (objOrigin[key] instanceof Array || objOrigin[key] instanceof Object) {
          if(this.compareObjectChange(objOrigin[key], objNew[key]))
          {
            return true;
          }
        }
        else {
          if (objOrigin[key] != objNew[key]) {
            return true;
          }
        }
      }
    }
    return false;
  }
  static copyObject(data:any){
    var dataCopy=Object.assign({}, data);
    return JSON.parse(JSON.stringify(CommonService.replaceDateToStringBeforeStringify(dataCopy)));
  }
  static downloadSetSrcForImage(arr:any,http:any){
    if(arr!=null && arr.length>0)
    {
      arr.forEach(element => {
        if(element.Src==undefined)
        {
          http.post(
            `${environment.api_url}/Common/DownloadFile`,
            {url:element.URL},
            {responseType: 'blob'}
          ).subscribe((resultData:any)=>{
            if (resultData !== undefined && resultData != null) {
              const downloadedFile = new Blob([resultData]);
              element.Src=URL.createObjectURL(downloadedFile);
            }
          },(err:any) => {
            console.log(err);
          });
        }
      });
    }
  }
  static formatMoney(str:any){
    return Number(str).toLocaleString('de-DE');;
  }
  static genString0(num:number)
  {
    var str="";
    for(var i=0;i<num;i++)
    {
      str+="0";
    } 
    return str;
  }
  
}

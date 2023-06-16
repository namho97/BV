import { UserType } from "src/app/shared/enum/document-type.enum";

export class Login {
    userName: string=null;
    password: string=null;
    rememberMe: boolean=true;
    fcmToken: String;
    captchaToken: string|undefined;
    CaptchaId: string = "";
    UserType: UserType = UserType.PhongKhamDaKhoa;//1:Bác sĩ gia đình,2:Phòng khám đa khoa
  }
  
import { UserType } from './../enum/document-type.enum';
import { AccessToken } from './access-token.model';

export interface AccessUser {
  AccessToken: AccessToken;
  UserName: string;
  FullName: string;
  Logo: string;
  TenPhongKham: string;
  DienThoaiPhongKham: string;
  DiaChiPhongKham: string;
  GioKhamPhongKham:string;
  LinkDangKyKham:string;
  BarCodeLinkDangKyKham:string;
  Id: number;
  MenuInfo: {};
  Permissions: [];
  DangNhapLanDau:boolean;
  UserType:UserType;
}

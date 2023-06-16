import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { SystemMessage } from 'src/app/shared/configdata/system-message';

@Component({
  selector: 'app-nguoi-benh-dang-kham-kham-benh',
  templateUrl: './nguoi-benh-dang-kham-kham-benh.component.html',
  styleUrls: ['./nguoi-benh-dang-kham-kham-benh.component.scss']
})
export class NguoiBenhDangKhamKhamBenhComponent implements OnInit {

  validationErrors:any;
  @Input() data:any;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.getThongTinKhamBenh();
  }
  getThongTinKhamBenh(){
    this.data.KhamBenh= {
      LyDoVaoVien:"Đau bụng",
      KhamKhacs:[{Id:0,BoPhan:"",MoTa:""}],
      TienSuBenhs:[],
      DiUngs:[],
      ChiSoSinhTons:[{Id:0}]
    };
  }
  themKhamChiTietCacBoPhan(){
    this.data.KhamBenh.KhamKhacs.push({IdTemp:CommonService.makeRandom(5)});
  }
  themTienSuBenh(){
    this.data.KhamBenh.TienSuBenhs.push({IdTemp:CommonService.makeRandom(5)});
  }
  themDiUng(){
    this.data.KhamBenh.DiUngs.push({IdTemp:CommonService.makeRandom(5)});
  }
  themChiSoSinhTon(){
    this.data.KhamBenh.ChiSoSinhTons.push({IdTemp:CommonService.makeRandom(5)});
  }
  xoaKhamChiTietCacBoPhan(item:any){
    this.dialog.open(ConfirmComponent, {
      disableClose: false,
      width: '400px',
      data: { message: CommonService.format(SystemMessage.MessConfirm, ['xóa']),yesColor:"warn"  }
    }).afterClosed().subscribe(result => {/* result is a boolean:true,false,null*/
        if (result) {
          this.data.KhamBenh.KhamKhacs.forEach((value,index)=>{
            if(value.Id==item.Id || value.IdTemp==item.IdTemp) this.data.KhamBenh.KhamKhacs.splice(index,1);
          });
        }
    });
  }
  xoaTienSuBenh(item:any){
    this.dialog.open(ConfirmComponent, {
      disableClose: false,
      width: '400px',
      data: { message: CommonService.format(SystemMessage.MessConfirm, ['xóa']),yesColor:"warn"  }
    }).afterClosed().subscribe(result => {/* result is a boolean:true,false,null*/
        if (result) {
          this.data.KhamBenh.TienSuBenhs.forEach((value,index)=>{
            if(value.Id==item.Id || value.IdTemp==item.IdTemp) this.data.KhamBenh.TienSuBenhs.splice(index,1);
          });
        }
    });
  }
  
  xoaDiUng(item:any){
    this.dialog.open(ConfirmComponent, {
      disableClose: false,
      width: '400px',
      data: { message: CommonService.format(SystemMessage.MessConfirm, ['xóa']),yesColor:"warn"  }
    }).afterClosed().subscribe(result => {/* result is a boolean:true,false,null*/
        if (result) {
          this.data.KhamBenh.DiUngs.forEach((value,index)=>{
            if(value.Id==item.Id || value.IdTemp==item.IdTemp) this.data.KhamBenh.DiUngs.splice(index,1);
          });    
        }
    });
  }
  
  xoaChiSoSinhTon(item:any){
    this.dialog.open(ConfirmComponent, {
      disableClose: false,
      width: '400px',
      data: { message: CommonService.format(SystemMessage.MessConfirm, ['xóa']),yesColor:"warn"  }
    }).afterClosed().subscribe(result => {/* result is a boolean:true,false,null*/
        if (result) {
          this.data.KhamBenh.ChiSoSinhTons.forEach((value,index)=>{
            if(value.Id==item.Id || value.IdTemp==item.IdTemp) this.data.KhamBenh.ChiSoSinhTons.splice(index,1);
          });  
        }
    });  
  }
  modelObjectChangeLoaiBenh(event:any){
    this.data.KhamBenh.NoiDungBenh=event.Description;
  }
  modelObjectChangeIcd(event:any){
    this.data.KhamBenh.ChanDoan=event.Description;
  }
}

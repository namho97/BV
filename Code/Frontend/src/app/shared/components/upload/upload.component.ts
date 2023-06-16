import { Component, EventEmitter, Input, OnInit, Output,  ViewEncapsulation, ChangeDetectorRef, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { SystemMessage } from 'src/app/shared/configdata/system-message';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { MatDialog } from '@angular/material/dialog';
declare var $: any;
export class UploadInfo {
  Id: any;
  UploadUrl: any;
  TenGuid: any;
  Ten: any;
  DuongDan: any;
  DuongDanTmp: any;
  KichThuoc: any;
  LoaiTapTin: any;
  IsExistingFile:boolean;
  Uid: any;
  MoTa: string;
}
export class URLs {
  url: any;
  name: any;
}
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit, OnDestroy {
  events: string[] = [];
  isFirstLoad: boolean = true;
  allMultiFiles:UploadInfo[]=[];
  files:any[]=[];
  uploading:boolean=false;

  @Input() id: string;
  @Input() label: string;
  @Input() required: boolean = false;
  @Input() moreClass: string;
  @Input() model: any;
  @Input() disabled: boolean = false;
  @Input() allowedExtensions: string[] = ['.jpg', '.jpeg', '.png', '.pdf', '.mp3','.mp4'];
  @Input() maxFileSize: number = 20;
  @Input() minFileSize: number = 0;
  @Input() multiple: boolean = true;
  @Input() uploadSaveUrl: string = "Common/SaveFileUpload";
  @Input() validationerror: string = "";
  @Input() title: string = "";
  @Input() showThumbImageOnly: boolean = false;
  @Input() widthThumb: string = "25%";
  @Input() invalidFilesMess: string = CommonService.format(SystemMessage.InvalidFiles, []);
  @Input() invalidFileExtensionMess: string = CommonService.format(SystemMessage.InvalidFileExtension, [this.allowedExtensions.toString()]);
  @Input() invalidMaxFileSizeMess: string = CommonService.format(SystemMessage.InvalidMaxFileSize, [this.maxFileSize.toString()]);
  @Input() invalidMinFileSizeMess: string = CommonService.format(SystemMessage.InvalidMinFileSize, [this.minFileSize.toString()]);

  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private apiService: ApiService, private cd: ChangeDetectorRef,private http: HttpClient,private dialog:MatDialog) {
  }
  ngOnInit() {     
    if(this.model!=null && this.model.length>0)
    {
      this.model.forEach((file,index)=>{
        var self=this;
        setTimeout(function () {         
          if(file.DuongDan!=null && file.DuongDan!="" && self.showThumbImageOnly)
          {
            self.downloadFile(file);
          }
          self.files.push(file);
        }, index * 100);
      })
    }
  }
  
  ngOnChanges(changes: SimpleChanges) {
     // You can also use model.previousValue and
    // model.firstChange for comparing old and new values
    if (changes.model != undefined && changes.model.currentValue != null) {
      if (this.multiple == false) {
        if (this.model.Id > 0) {
          this.files.push(changes.model.currentValue);
        }
      }
      else {
        if (this.model!=null && this.model.length > 0) {
          changes.model.previousValue = changes.model.currentValue;
          this.model.forEach((item: any,index:number) => {
            var self=this;
            setTimeout(function () {
              if (item.Id > 0) {
                if(item.DuongDan!=null && item.DuongDan!="" && self.showThumbImageOnly)
                {
                  self.downloadFile(item);
                }
                self.files.push(item);  
              }
            }, index * 100);
          });
        }
        else{
          this.files=[];
        }
      }
      this.isFirstLoad = false;
    }
  }
  ngOnDestroy() {
    this.cd.detach();

  }
  
  downloadFile(file: any){
    this.http.post(
      `${environment.api_url}/Common/DownloadFile`,
      {url:file.DuongDan},
      {responseType: 'blob'}
    ).subscribe((resultData:any)=>{
      if (resultData !== undefined && resultData != null) {
        if(this.showThumbImageOnly)
        {
          const downloadedFile = new Blob([resultData]);
          file.Src=URL.createObjectURL(downloadedFile);
        }
        else{

          CommonService.downLoadFile(resultData,null,file.URL);
        }
      }
    },(_err:any) => {
      file.Src="assets/img/image-not-found.png";
    });
  }
  async inputChange(fileInputEvent: any) {
    var arrNewFiles=fileInputEvent.target.files;

    console.log("arrNewFiles",arrNewFiles)

    for(var i=0;i<arrNewFiles.length;i++)
    {
      var objFile={
        Id:0,
        Ten:arrNewFiles[i].name,
        KichThuoc:arrNewFiles[i].size,
        LoaiTapTin:arrNewFiles[i].type,
        TenGuid:null,
        DuongDan:null,
        Uploaded:false,
        Error:null,
        Src:null,
        Base64: null
      };
      objFile.Src = URL.createObjectURL(arrNewFiles[i]);
      if(!this.multiple)
      {
        this.files=[];
      }
      this.files.push(objFile);
      
      let size = arrNewFiles[i].size / 1024 / 1024;
      let type = (
        arrNewFiles[i].name.match(
          /[^\\\/]\.([^.\\\/]+)$/
        ) || [null]
      ).pop();
      if (this.allowedExtensions.indexOf("."+type.toLowerCase())<0) {
        objFile.Error="Bạn chỉ được phép tải file có định dạng: "+this.allowedExtensions.toString();
        objFile.Uploaded=true;
      }
      if (size > this.maxFileSize || size < this.minFileSize) {
        objFile.Error="File không được lớn hơn: "+size+"MB";
        objFile.Uploaded=true;
      }
      if(objFile.Error==null)
      {
        const formData = new FormData();
        formData.append('file', arrNewFiles[i]);
        
        const response:any =await this.apiService
          .putFormData(this.uploadSaveUrl, formData, false)
          .toPromise()
          .catch((error) => {
            objFile.Error="Có lỗi xảy ra trong quá trình lưu dữ liệu. Bạn hãy thử lại. Cảm ơn.";
            console.log(error);
          });
        if(response)
        {
          objFile.TenGuid=response.NameGUID;
          objFile.DuongDan=response.URL;
          objFile.Uploaded=true;
          //Chỉ lấy những file upload thành công
          if(!this.multiple)
          {
            this.model=objFile;
          }
          else{
            if(this.model==null)
            {
              this.model=[];
            }
            this.model.push(objFile);
          }
          console.log(this.model);
        }
        else{
          objFile.Error="Có lỗi xảy ra trong quá trình lưu dữ liệu. Bạn hãy thử lại. Cảm ơn.";
        }
      }

    }
    this.modelChange.emit(this.model);
  }
  remove(file){
    const index: number = this.files.indexOf(file);
    if (index !== -1) {
      this.files.splice(index, 1);
    }   
    const indexModel: number = this.model.indexOf(file);
    if (indexModel !== -1) {
      this.model.splice(indexModel, 1);
    }   
    this.modelChange.emit(this.model);
    this.removeEvent.emit(file);
    console.log(this.model);
  }
  viewImage(src:any){    
    this.dialog.open(ImageViewerComponent,{data:{src:src}});
  }
}

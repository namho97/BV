import { EditorTableCreatePopupComponent } from './editor-table-create-popup/editor-table-create-popup.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
declare let $: any;


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  
editorConfig: AngularEditorConfig;
  @Input() id:string;
  @Input() label:string;
  @Input() model:any;
  @Input() placeHolder:string="";
  @Input() type:string="text";
  @Input() disabled:boolean=false;
  @Input() upperCase:boolean=false;
  @Input() required:boolean=false;
  @Input() sizeHeight:boolean=false;
  @Input() minHeight:number=20;
  @Input() validationerror:string="";
  @Input() maxlength:number;
  @Input() toolbarHiddenButtons:any=[['fontName'],['insertVideo']];
  @Input() showToolbar:boolean=true;
  @Output() modelChange:EventEmitter<any> = new EventEmitter<any>();
  @Output() blurChange:EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog:MatDialog) { }

  ngOnInit() {
    this.editorConfig={
      editable: true,
        spellcheck: true,
        height: 'auto',
        minHeight: this.sizeHeight == true ? this.minHeight + "" :'0',
        maxHeight: this.sizeHeight == true ? '38.5rem' :'0',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Nhập nội dung ở đây...',
        defaultParagraphSeparator: '',
        defaultFontName: 'Times New Roman',
        defaultFontSize: '',
        fonts: [
          {class: 'arial', name: 'Arial'},
          {class: 'times-new-roman', name: 'Times New Roman'},
          {class: 'calibri', name: 'Calibri'},
          {class: 'comic-sans-ms', name: 'Comic Sans MS'}
        ],
        customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
      uploadUrl: '',
      //upload: (file: File) => { return console.log(file);},
      uploadWithCredentials: false,
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons:this.toolbarHiddenButtons
    };
    var self=this;
    setTimeout(function(){
      self.showHideToolbar(self.showToolbar);
    });
  }

  emit(event: any) {
    this.validationerror = "";
    if (this.upperCase == true && event != null) {
      event = event.toString().toUpperCase();
    }
    this.modelChange.emit(event);
  }
  blur() {
    this.blurChange.emit(true);
  }
  executeCommand(executeCommandFn:any){
    this.dialog.open(EditorTableCreatePopupComponent, {
      disableClose: false,
      width: '250px',
      data: {  }
    }).afterClosed().subscribe(result => {/* result is a boolean:true,false,null*/
        if (result) {      
          var str="<table class='table-border in-editor'>";   
          for(var i=0;i<result.SoDong;i++)
          {
            str+="<tr>"; 
            for(var j=0;j<result.SoCot;j++)
            {
              str+="<td>&nbsp;</td>";
            }
            str+="</tr>"; 
          }
          str+="</table>";   
          executeCommandFn('insertHtml',str);
        }
    });

  }
  showHideToolbar(type:boolean){
    this.showToolbar=type;
    if(type)
    {
      $("#"+this.id+" .angular-editor-toolbar").show();
    }
    else{
      $("#"+this.id+" .angular-editor-toolbar").hide();
    }
  }
}

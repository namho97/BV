import { ChangeDetectorRef, Component, ElementRef,  Input, OnInit,  Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-print-button',
  templateUrl: './print-button.component.html',
  styleUrls: ['./print-button.component.scss']
})
export class PrintButtonComponent implements OnInit {

  windowTimeout:any;
  // @Input() serialId: number = 123456789;
  // PrintSerials : any
  @Input() typeSize: string = "A4";
  // type: portrait, landscape
  @Input() typeLayout: string = "portrait";
  @Input() copies : number = 1;
  @Input() event : any = 0;
  @Input() htmlContent: string=null;
  @Input() disabled: boolean = false;
  @Input() label: string = "In";
  @Input() icon: string = null;
  @Input() color: string = null;
  @Input() buttonType: any = null;
  @ViewChild('iframe',{ static: true }) iframe: ElementRef;
  element: HTMLElement;

  constructor(private ref: ChangeDetectorRef,private renderer : Renderer2) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.ref.detach();
  }
  onPrint() {
    var self = this;
    if(this.windowTimeout!=null)
    {
      clearTimeout(this.windowTimeout);
    }
    this.windowTimeout= setTimeout(function(){
        var WindowPrt = window.open('', '', 'toolbar=0,scrollbars=0,status=0');
        if(WindowPrt!=null && WindowPrt!=undefined)
        {
          WindowPrt.focus();
          WindowPrt.close(); 
          WindowPrt.document.write(self.htmlContent);
          WindowPrt.document.close();
      
          var contents = WindowPrt.document.documentElement.innerHTML;
          if(self.copies>1)
          {
            for(var i=2;i<=self.copies;i++)
            {
              contents+="<p class='pagebreak'></p>"+WindowPrt.document.documentElement.innerHTML;
            }
          }
          var frame1 = self.renderer.createElement('iframe');
          frame1.name = "frame1";
          frame1.style.position = "absolute";
          frame1.style.top = "-1000000px";
          document.body.appendChild(frame1);
          var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
          frameDoc.document.open();        
          frameDoc.document.write('<html><head><title>DIV Contents</title><style>*{ box-sizing: border-box;} @media print { @page{size:' + self.typeSize + ' '+ self.typeLayout + ' ;} .pagebreak {clear: both;page-break-after: always;}}@font-face {font-family: "Libre Barcode 39";font-style: normal;font-weight: 400;src: url(/assets/-nFnOHM08vwC6h8Li1eQnP_AHzI2G_Bx0g.woff2) format("woff2");unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}</style>');          
          frameDoc.document.write('</head><body>');
          frameDoc.document.write(contents);
          frameDoc.document.write('</body></html>');
          frameDoc.document.close();
          setTimeout(function () {
              window.frames["frame1"].focus(); 
              window.frames["frame1"].print();             
              document.body.removeChild(frame1);
          }, 500);
        }
        return false;
    },500);
  }






// Clien setting direct printing using browser
//   Chrome
// 	1/ open chrome => chrome://flags 
// 	2/ Search > Enable New Print Preview UI Layout> Disable
// 	3/ Right click ShortCut chrome > properties > "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --kiosk-printing
// 	Note: Khi chuyển qua máy in thì dùng(nhớ phải tắt hết trình duyệt và mở lại để chọn máy in): Right click ShortCut chrome > properties > "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"

// FireFox
// 	1/ open FireFox => about:config
// 	2/ Right click on the white space > select NEW > BOOLEAN
// 	3/ input text > print.always_print_silent > click OK and then select true
}

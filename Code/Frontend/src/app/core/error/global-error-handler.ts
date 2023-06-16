import { CommonService } from 'src/app/core/utilities/common.helper';
import { Injectable, Injector, ErrorHandler } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorService } from "./error.service";
import { LoggingService } from "./logging.service";
import { ApiError } from "src/app/shared/models/api-error.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector,private snackBar: MatSnackBar) { }

  handleError(error: Error | HttpErrorResponse) {
    if (error.message!=undefined && error.message.indexOf("Loading chunk")>=0) {
      window.location.reload();
    }
    else
    {
      console.log(error);
      const errorService = this.injector.get(ErrorService);
      const logger = this.injector.get(LoggingService);
      let message;
      let stackTrace;
      if (error instanceof ApiError) {
        // Server error
         CommonService.openSnackBar(this.snackBar,error.Message,"error"); 
        message = error.Message;
        stackTrace = error.Detail;
      } else {
        // Client Error
        //console.log(error);
        if(message!=undefined && message.indexOf("firebase SDK")<0)
        {
          message = errorService.getClientErrorMessage(error);
          CommonService.openSnackBar(this.snackBar,message,"error"); 
        }
      }
      // Always log errors
      logger.logError(message, stackTrace);
    }
  }
}

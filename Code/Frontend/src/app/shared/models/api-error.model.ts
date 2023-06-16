export class ApiError {
    constructor(
      public Message: string,
      public Status: number = 0,
      public Detail: string = '',
      public ValidationErrors: ValidationError[] = []) {
    }
  }
  export class ValidationError {
    Field: string;
    Message: string;
  }
  
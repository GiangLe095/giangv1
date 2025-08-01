export class AuthError extends Error {
    status: number;
  
    constructor(message: string = "Phiên đăng nhập đã hết hạn", status: number = 401) {
      super(message);
      this.status = status;
      this.name = "AuthError";
    }
  }
  
  export class PermissionError extends Error {
    status: number;
  
    constructor(message: string = "Bạn không có quyền truy cập trang này", status: number = 403) {
      super(message);
      this.status = status;
      this.name = "PermissionError";
    }
  }
  
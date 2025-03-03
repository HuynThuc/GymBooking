export interface RegisterUserDTO {
    username: string;
    email: string;
    password: string;
    roleId: number; // Thêm roleId vào DTO
}


// dto/google-auth.dto.ts
export interface GoogleUserDTO {
    googleId: string;
    email: string;
    username: string;
    
}


export interface UpdatePasswordDTO {
    id: number; // ID của user
    oldPassword: string;
    newPassword:string; // Email mới
  }
  

export interface UserService {
  loginUser(output: {
    username: string;
    password: string;
  }): Promise<{ username: string }>;
  getUserByEmail(email: string): Promise<any>;
  saveUser(output: {
    email: string;
    hashed: string;
  }): Promise<void>;
}

export interface UserService {
  loginUser(output: { username: string; password: string }): Promise<{ username: string }>
  getUserByEmail(email: string): Promise<any>
  saveUser(output: {
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: number
    hashed: string,
    is_admin: boolean
  }): Promise<void>
}
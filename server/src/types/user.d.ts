export type UserID = `${string}-${string}-${string}-${string}-${string}`;
type UserRole = "client" | "manager" | "admin";
type UserEmail = `${string}@${string}.${string}`;

export interface UserSchema {
  id: UserID;
  firstname: string;
  lastname: string;
  email: UserEmail;
  password: string;
  role: UserRole;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

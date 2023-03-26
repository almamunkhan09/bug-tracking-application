export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface UpdateData {
  name?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
}

import { FormControl } from '@angular/forms';

interface User {
  id: string,
  name: string,
  login: string,
}

interface Signup {
  name: string,
  login: string,
  password: string,
}

interface Signin {
  login: string,
  password: string,
}

interface Jwt {
  iat: number
  login: string
  userId: string
}

interface Form {
  name: FormControl<string | null>,
  login: FormControl<string | null>,
  password: FormControl<string | null>,
}

interface FormLogin {
  login: FormControl<string | null>,
  password: FormControl<string | null>,
}

interface Board {
  id?: string,
  title: string,
  description: string,
}

interface Column {
  id?: string,
  title: string,
  order?: number,
}

interface File {
  filename: string,
  fileSize: number,
}

interface Tasks {
  id?: string,
  title: string,
  description: string,
  userId: string,
  order?: number,
  boardId?: string,
  columnId?: string,
  files?: File[]
}

export {
  User,
  Signup,
  Signin,
  Form,
  FormLogin,
  Jwt,
  Board,
  Tasks,
  Column
}
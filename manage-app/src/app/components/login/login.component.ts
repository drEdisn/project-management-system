import { StorageService } from './../../services/storage.service';
import { LoaderService } from './../../services/loader.service';
import { ModalComponent } from './../modal/modal.component';
import { ModalService } from './../../services/modal.service';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Auth } from 'src/app/modules/enums';
import { Form, FormLogin, Signin, Signup, User } from 'src/app/modules/interfacies';
import { InputComponent } from '../input/input.component';
import { Token } from 'src/app/modules/types';
import jwtParce from 'src/app/modules/jwtParse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InputComponent,
    ModalComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup<Form> = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    login: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')
    ]),
  });

  public formLogin: FormGroup<FormLogin> = new FormGroup({
    login: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')
    ]),
  });

  public signin = false;
  public inputs: string[] = ['name', 'login', 'password'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public loaderService: LoaderService,
    public modalService: ModalService,
    public storageService: StorageService
  ) { }

  ngOnInit() {
    const url = this.route.snapshot.routeConfig?.path;
    if (url === Auth.singin) this.signin = true;
  }

  getInput(form: any, input: string) {
    return form.controls[input];
  }

  setUserData(token: string) {
    this.storageService.setToken(token);
    this.storageService.serPassword(this.storageService.password as string);
    this.apiService.getUser(jwtParce(token).userId)
      .subscribe((user: Partial<User>) => {
        this.storageService.setUser(user as User);
      });
    this.router.navigate(['/boards']);
  }

  createUser() {
    this.apiService.createUser(this.form.value as Signup)
      .subscribe(
        () => {
          this.modalService.open('User is creared', true);
        },
        () => {
          console.error('User with this email already exists');
          this.modalService.open('User with this email already exists');
        }
      );
  }

  loginUser() {
    this.apiService.loginUser(this.formLogin.value as Signin)
      .subscribe(
        (observ: Partial<Token>) => {
          this.setUserData(observ.token as string);
        },
        () => {
          console.error('User is not found');
          this.modalService.open('User if not found');
        }
      );
  }
}

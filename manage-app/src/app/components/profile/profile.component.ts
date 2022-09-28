import { PartString } from 'src/app/modules/types';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorsComponent } from './../errors/errors.component';
import { ConfirmModal, WarnString } from 'src/app/modules/enums';
import { ModalWarnComponent } from './../modal-warn/modal-warn.component';
import { ModalWarnService } from './../../services/modal-warn.service';
import { PasswordPipe } from './../../pipes/password.pipe';
import { LoaderService } from './../../services/loader.service';
import { ModalService } from './../../services/modal.service';
import { ModalComponent } from './../modal/modal.component';
import { InputComponent } from './../input/input.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Signup, Translate, User } from 'src/app/modules/interfacies';
import { ApiService } from './../../services/api.service';
import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ModalComponent,
    MatProgressSpinnerModule,
    PasswordPipe,
    ModalWarnComponent,
    ErrorsComponent,
    TranslateModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private id = this.storageService.user?.id as string;
  public name = this.storageService.user?.name;
  public login = this.storageService.user?.login;
  public isChange = false;
  public changeValue: Translate = {
    title: '',
    path: '',
  };
  public form!: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuild: FormBuilder,
    public loaderService: LoaderService,
    public modalService: ModalService,
    public storageService: StorageService,
    public modalWarnService: ModalWarnService,
  ) {}

  ngOnInit(): void {
  }

  initForm(value: PartString) {
    if (value === 'name') {
      this.form = this.formBuild.group({
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(3)
        ])
      });
    } else if (value === 'password') {
      this.form = this.formBuild.group({
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')
        ])
      });
    } else {
      this.form = this.formBuild.group({
        login: new FormControl(null, [
          Validators.required,
          Validators.email
        ])
      });
    }
  }
  
  getInput(form: any, input: string | null) {
    return form.controls[input as string];
  }

  onChange(value?: PartString) {
    this.changeValue = {
      title: value as string,
      path: `login.${value}`
    };
    this.isChange = !this.isChange;
    this.initForm(value);
  }

  changeUser() {
    const formValue = this.form.value;
    const name = (formValue.name || this.storageService.user?.name) as string;
    const password = (formValue.password || this.storageService.password) as string;
    const login = (formValue.login || this.storageService.user?.login) as string
    const body: Signup = {
      name,
      login,
      password,
    }
    this.apiService.changeUser(this.id, body).subscribe(
      (observ: Partial<User>) => {
        this.storageService.setUser(observ as User);
        this.modalService.open(ConfirmModal.userChange, true);
      },
      () => {
        console.error('User didn\'t change')
        this.modalService.open(ConfirmModal.noUserChange);
      }
    );
  }

  removeAccount() {
    this.modalWarnService.open(WarnString.userWarn, {userId: this.id});
  }
}

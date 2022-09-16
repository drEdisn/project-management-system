import { ModalService } from './../../services/modal.service';
import { ModalComponent } from './../modal/modal.component';
import { InputComponent } from './../input/input.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Signup, User } from 'src/app/modules/interfacies';
import { ApiService } from './../../services/api.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeValue } from 'src/app/modules/types';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ModalComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  private id = this.storageService.user?.id as string;
  public name = this.storageService.user?.name;
  public login = this.storageService.user?.login;
  public isChange = false;
  public changeValue: ChangeValue = null;

  public form!: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuild: FormBuilder,
    public modalService: ModalService,
    public storageService: StorageService
  ) {}

  initForm(value: ChangeValue) {
    if (value === 'name') {
      this.form = this.formBuild.group({
        name: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(3)
        ])
      })
    } else {
      this.form = this.formBuild.group({
        password: new FormControl<string>('', [
          Validators.required,
          Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')
        ]),
      })
    }
  }
  
  getInput(form: any, input: string | null) {
    return form.controls[input as string];
  }

  onChange(value: ChangeValue) {
    this.changeValue = value;
    this.isChange = !this.isChange;
    this.initForm(value);
  }

  getImage(e: Event) {
    const target = e.target as HTMLInputElement;
    console.log(target.files)
  }

  changeUser() {
    const formValue = this.form.value;
    const name = (formValue.name || this.name) as string;
    const password = (formValue.password || this.storageService.password) as string;
    const body: Signup = {
      name,
      login: this.login as string,
      password,
    }
    this.apiService.changeUser(this.id, body).subscribe(
      (observ: Partial<User>) => {
        this.storageService.setUser(observ as User);
        this.modalService.open('User was changed', true);
      },
      () => {
        console.error('User didn\'t change')
        this.modalService.open('User didn\'t change');
      }
    );
  }
  removeAccount() {
    this.apiService.removeUser(this.id);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  form: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required, Validators.email
    ]),
    password: new FormControl('', [
      Validators.required, Validators.minLength(8)
    ]),
  });
  ngOnInit(): void {
    this.form.reset()
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
  submit() {
    if (this.form.valid) {
      this.login(this.form.value['username'], this.form.value['password'])
    }
  }
  login(username: string, password: string): boolean {
    let email: string = 'user@example.com'
    let passkey: string = '12345678'
    if (username == email && password == passkey) {
      this.router.navigate(['/'])
      return true;
    } return false
  }
  error: string | null = null;

}

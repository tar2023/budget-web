import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent {

  router = inject(Router)
  route = inject(ActivatedRoute)
  fb = inject(NonNullableFormBuilder)

  authService = inject(AuthService)

  email = this.fb.control('admin2@test.com')
  password = this.fb.control('bestPassw0rd')

  fg = this.fb.group({
    email: this.email,
    password: this.password
  })

  errorMessage = '';

  //ถ้ามีการกด login แล้ว fun login ทำเสร็จแล้ว ให้เอาค่าที่ได้ LoggedInUser จะถูก setLoggedInUser
  onLogin(): void {
    this.authService.login(this.fg.getRawValue()).subscribe({
      next: (v) => {
        this.authService.setLoggedInUser(v);
        this.router.navigate(['/']);
      },
      error: (e) => {
        console.log('e', e)
        this.errorMessage = e.error;
      },
    });
  }
}

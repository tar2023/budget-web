import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const loggedInInterceptor: HttpInterceptorFn = (req, next) => {

//if user is logged-in then attach token to http-req
// Authorization:Bearer [accessToken]
const loggedInUser = inject(AuthService).getLoggedInUser();

//ถ้ามีlogin ขึ้นมาให้สร้่าง req ใหม่จาก req เดิม 
if(loggedInUser){
  req = req.clone({
    setHeaders:{Authorization:`Bearer ${loggedInUser.accessToken}`}
  })
}

  return next(req);
};

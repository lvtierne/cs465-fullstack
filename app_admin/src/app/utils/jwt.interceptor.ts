import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private apiBaseUrl = 'http://localhost:3000/api/';

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isAuthAPI: boolean;

    // Determine if the request is for the login or register API
    if (request.url.startsWith(`${this.apiBaseUrl}login`) || request.url.startsWith(`${this.apiBaseUrl}register`)) {
      isAuthAPI = true;
    } else {
      isAuthAPI = false;
    }

    // If the user is logged in and the request is not to the auth API
    if (this.authenticationService.isLoggedIn() && !isAuthAPI) {
      let token = this.authenticationService.getToken();
      console.log('Token in interceptor:', token); 
      
      // Clone the request and add the Authorization header
    if (!token) {
      console.error('No token found'); // Debug missing token
    } else {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      // Handle the cloned request
      return next.handle(authReq);
    }
  }

    // Handle the original request
  return next.handle(request);
  }
}

// Export the provider configuration
export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};
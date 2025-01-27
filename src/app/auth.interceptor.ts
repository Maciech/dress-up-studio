import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get the token from localStorage (or sessionStorage if that's what you're using)
  const token = localStorage.getItem('authToken');

  if (token) {
    // Clone the request and attach the Authorization header
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest); // Pass the cloned request with the token
  }

  // If no token, pass the original request
  return next(req);
};
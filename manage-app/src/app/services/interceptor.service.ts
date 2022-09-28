import { StorageService } from './storage.service';
import { LoaderService } from './loader.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    public loaderService: LoaderService,
    public storageService: StorageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);

    if (this.storageService.hasToken()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.storageService.token}`
        }
      })
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false)
      })
    )
  }
}

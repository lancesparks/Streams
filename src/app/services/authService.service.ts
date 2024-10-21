import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { CredentialService } from "./credential.service";

export function authInterceptor( //the camera endpoint needs the auth token as a bearer not appended to the url, handle that here
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const authToken = inject(CredentialService).getUserToken();
  // Clone the request to add the authentication header.
  const newReq = request.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return next(newReq);
}

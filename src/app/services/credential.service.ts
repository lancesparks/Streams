import { Injectable } from "@angular/core";
import { credentials } from "../../environment";
import { HttpClient } from "@angular/common/http";
import { User, UserResponse } from "../interfaces";
import { BehaviorSubject, take } from "rxjs";
const defaultUser = credentials;

@Injectable({
  providedIn: "root",
})
export class CredentialService {
  constructor(private http: HttpClient) {}

  newSession$ = new BehaviorSubject<string | null>(null);

  getUserLogin(user: User = defaultUser) {
    //retrieve the user token from the api
    this.http
      .post<UserResponse>(
        `https://orchid.ipconfigure.com/service/sessions/user`,
        user
      )
      .pipe(take(1))
      .subscribe((data: UserResponse) => {
        const sessionId = data.id;
        let expiration = new Date(new Date().getTime() + 60000 * 60);

        this.setSession(sessionId, expiration);
      });
  }

  //basic checking if the login is valid, if not logs back in, did this to emulate token expirations and to avoid logging in if the user just wanted
  //to see the taylor expansion challenge
  startNewSession(user: User = defaultUser) {
    let session = sessionStorage.getItem("session");
    if (session !== null) {
      let sessionObj = JSON.parse(session);
      let expiredAt = new Date(sessionObj.expiration);
      if (expiredAt > new Date()) {
        // Validate expiry date.
        return sessionObj;
      } else {
        sessionStorage.removeItem("session");
        this.getUserLogin(user);
      }
    } else {
      this.getUserLogin(user);
    }
  }

  //Get the user token from the session storage. If the session storage does not contain the session item, return null.
  getUserToken() {
    let session = sessionStorage.getItem("session");

    if (session) {
      let sessionObj = JSON.parse(session);
      return sessionObj.sessionId;
    }
    return null;
  }

  setSession(sessionId: string, expiration: Date) {
    sessionStorage.setItem(
      "session",
      JSON.stringify({ sessionId, expiration })
    );

    this.newSession$.next(sessionId);
  }
}

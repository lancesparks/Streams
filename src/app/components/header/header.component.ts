import { Component, inject, OnInit } from "@angular/core";
import { LoginComponent } from "../login/login.component";
import { MatDialog } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { CredentialService } from "../../services/credential.service";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, LoginComponent],

  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
  dialog = inject(MatDialog);
  cs = inject(CredentialService);
  router = inject(Router);
  isChallengePage = false;
  isLoggedIn$: Observable<string | null> | null = null;

  ngOnInit(): void {
    this.isLoggedIn$ = this.cs.newSession$;

    this.router.events.subscribe(() => {
      if (this.router.url === "/expansion") {
        this.isChallengePage = true;
      } else {
        this.isChallengePage = false;
      }
    });
  }

  openLogin() {
    //allow user to login if they closed the login
    this.dialog.open(LoginComponent);
  }

  logout() {
    sessionStorage.clear();
    this.cs.newSession$.next(null);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}

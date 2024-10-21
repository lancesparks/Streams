import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from "@angular/material/dialog";
import { CredentialService } from "../../services/credential.service";
@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],

  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  readonly cs = inject(CredentialService);

  login() {
    this.cs.startNewSession(); //login
  }
}

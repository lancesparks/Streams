import { Component, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { CredentialService } from "./services/credential.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  title = "ipConfigureChallenge";
  cs = inject(CredentialService);

  ngOnInit(): void {
    const existingSession = this.cs.getUserToken();
    if (existingSession) {
      this.cs.newSession$.next(existingSession);
    }
  }
}

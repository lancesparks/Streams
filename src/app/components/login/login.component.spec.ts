import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { CredentialService } from "../../services/credential.service";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let cs: CredentialService;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        CredentialService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cs = TestBed.inject(CredentialService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should login", () => {
    const sessionSpy = jest.spyOn(cs, "startNewSession");
    component.login();
    expect(sessionSpy).toHaveBeenCalledTimes(1);
  });
});

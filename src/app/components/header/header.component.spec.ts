import { ComponentFixture, inject, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { CredentialService } from "../../services/credential.service";
import { By } from "@angular/platform-browser";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cs: CredentialService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, MatDialogModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.dialog = TestBed.inject(MatDialog);
    cs = TestBed.inject(CredentialService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should open login dialog", () => {
    const dialogSpy = jest.spyOn(component.dialog, "open");
    component.openLogin();
    expect(dialogSpy).toHaveBeenCalledTimes(1);
  });

  it("should show login text", () => {
    sessionStorage.clear();
    cs.newSession$.next(null);
    fixture.detectChanges();

    const debugElement = fixture.debugElement;
    const loginElement = debugElement.query(By.css(".login"));

    expect(loginElement.nativeElement.textContent).toContain("Login");
  });

  it("should show logout text", () => {
    cs.newSession$.next("123456");
    fixture.detectChanges();

    const debugElement = fixture.debugElement;
    const loginElement = debugElement.query(By.css(".logout"));

    expect(loginElement.nativeElement.textContent).toContain("Logout");
  });
});

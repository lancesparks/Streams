import { TestBed } from "@angular/core/testing";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { CredentialService } from "./credential.service";
import { provideHttpClient } from "@angular/common/http";

describe("CredentialService", () => {
  let service: CredentialService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CredentialService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(CredentialService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get user login", () => {
    const userResponse = { username: "some-id", password: "some-password" };
    const defaultUser = {
      username: "some-id",
      password: "some-password",
    };

    service.getUserLogin(defaultUser);

    const req = httpMock.expectOne(
      "https://orchid.ipconfigure.com/service/sessions/user"
    );
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(defaultUser);
    req.flush(userResponse);
  });

  it("should start new session", () => {
    const userResponse = { id: "some-id" };
    const defaultUser = {
      username: "some-id",
      password: "some-password",
    };

    sessionStorage.removeItem("session");
    service.startNewSession(defaultUser);

    const req = httpMock.expectOne(
      "https://orchid.ipconfigure.com/service/sessions/user"
    );
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(defaultUser);
    req.flush(userResponse);
  });

  it("should set session", () => {
    const sessionId = "some-id";
    const expiration = new Date();
    service.setSession(sessionId, expiration);
    expect(sessionStorage.getItem("session")).toEqual(
      JSON.stringify({ sessionId, expiration })
    );
  });

  it("should retrieve user token", () => {
    const sessionId = "some-id";
    sessionStorage.setItem("session", JSON.stringify({ sessionId }));
    expect(service.getUserToken()).toEqual(sessionId);
  });

  it("should return null if no session", () => {
    sessionStorage.removeItem("session");
    expect(service.getUserToken()).toBeNull();
  });
});

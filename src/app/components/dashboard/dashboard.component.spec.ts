import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from "@angular/core/testing";
import { DashboardComponent } from "./dashboard.component";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";
import { CredentialService } from "../../services/credential.service";
import { VideoService } from "../../services/video.service";
import { of } from "rxjs";
import { provideHttpClient } from "@angular/common/http";
import { By } from "@angular/platform-browser";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let cs: CredentialService;
  let vs: VideoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, MatDialogModule],
      providers: [
        CredentialService,
        VideoService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    cs = TestBed.inject(CredentialService);
    vs = TestBed.inject(VideoService);
    component.dialog = TestBed.inject(MatDialog);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get available streams", () => {
    jest.spyOn(vs, "getAvailableStreams").mockReturnValue(of([1, 2, 3]));
    component.ngOnInit();
    expect(component.availableStreams$).toBeTruthy();
  });

  it("gets all available streams after login", fakeAsync(() => {
    cs.newSession$.next("123");
    const streamSpy = jest
      .spyOn(vs, "getAvailableStreams")
      .mockReturnValue(of([1, 2, 3]));

    component.ngOnInit();

    tick();
    flush();

    component.availableStreams$.subscribe((streams) => {
      expect(streams).toEqual([1, 2, 3]);
    });
    expect(streamSpy).toHaveBeenCalledTimes(1);
  }));

  it("should not have streams after logout", fakeAsync(() => {
    cs.newSession$.next("123");
    jest.spyOn(vs, "getAvailableStreams").mockReturnValue(of([1, 2, 3]));

    component.ngOnInit();

    cs.newSession$.next(null);
    tick();
    flush();
    component.availableStreams$.subscribe((streams) => {
      expect(component.activeStreams.length).toEqual(0);
    });
  }));

  it("should add stream to active streams", () => {
    const streamId = 1;

    component.addStream(streamId);

    expect(component.activeStreams).toContain(streamId);
  });

  it("should remove stream from active streams", () => {
    const streamId = 1;

    component.activeStreams = [streamId];

    component.removeStream(streamId);

    expect(component.activeStreams).not.toContain(streamId);
  });

  it("shows login message if user is not logged in", () => {
    sessionStorage.clear();
    cs.newSession$.next(null);

    fixture.detectChanges();
    const debugElement = fixture.debugElement;

    const loginMessageContainer = debugElement.query(
      By.css(".loginMessage_container")
    );

    expect(loginMessageContainer).toBeTruthy();
  });

  it("does not show login message if user is logged in", () => {
    sessionStorage.clear();
    cs.newSession$.next("123456");
    jest.spyOn(vs, "getAvailableStreams").mockReturnValue(of([1, 2, 3]));
    fixture.detectChanges(); // trigger template rendering

    const debugElement = fixture.debugElement;
    const loginMessageContainer = debugElement.query(
      By.css(".loginMessage_container")
    );

    expect(loginMessageContainer).toBeFalsy();
  });
});

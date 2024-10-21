import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from "@angular/core/testing";

import { StreamComponent } from "./stream.component";
import { VideoService } from "../../services/video.service";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { of, throwError } from "rxjs";

describe("StreamComponent", () => {
  let component: StreamComponent;
  let fixture: ComponentFixture<StreamComponent>;
  let vs: VideoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamComponent],
      providers: [
        VideoService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StreamComponent);
    vs = TestBed.inject(VideoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get video stream", () => {
    const streamId = 123;
    component.streamID = streamId;

    const blobSpy = jest.spyOn(vs, "getVideoStream");
    blobSpy.mockReturnValue(of(new Blob(["blob"], { type: "text/plain" })));

    component.ngOnInit();

    expect(blobSpy).toHaveBeenCalledTimes(1);
  });

  it("should handle video stream error", () => {
    const streamId = 123;
    component.streamID = streamId;

    const blobSpy = jest.spyOn(vs, "getVideoStream");
    blobSpy.mockReturnValue(throwError("error"));

    component.ngOnInit();

    expect(blobSpy).toHaveBeenCalledTimes(1);
  });

  it("should call removeStreamEvent when removeStream is called", () => {
    const streamId = 123;
    component.streamID = streamId;

    const removeStreamEventSpy = jest.spyOn(
      component.removeStreamEvent,
      "emit"
    );

    component.removeStream();

    expect(removeStreamEventSpy).toHaveBeenCalledTimes(1);
    expect(removeStreamEventSpy).toHaveBeenCalledWith(streamId);
  });
});

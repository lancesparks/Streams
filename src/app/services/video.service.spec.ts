import { TestBed } from "@angular/core/testing";
import { VideoService } from "./video.service";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { CredentialService } from "./credential.service";
import { provideHttpClient } from "@angular/common/http";
import { Camera } from "../interfaces";

describe("VideoService", () => {
  let service: VideoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CredentialService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(VideoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get available streams", async () => {
    const response = {
      cameras: [
        { defaultViewStreamId: 1 },
        { defaultViewStreamId: 2 },
        { defaultViewStreamId: 3 },
      ],
    };

    service.getAvailableStreams = jest.fn().mockReturnValue(of(response));

    service.getAvailableStreams().subscribe((data) => {
      expect(data).toEqual([1, 2, 3]);
    });
  });

  it("should get video stream", (done) => {
    const streamId = 1;

    service.getVideoStream = jest.fn().mockReturnValue(of("blob"));

    service.getVideoStream(streamId).subscribe((response) => {
      expect(response).toBeTruthy();
      done();
    });
  });

  it("should get camera ids", () => {
    const cameras: Partial<Camera>[] = [
      { defaultViewStreamId: 1 },
      { defaultViewStreamId: 2 },
      { defaultViewStreamId: 3 },
    ];
    const ids = service.getCameraIds(cameras as Camera[]);
    expect(ids).toEqual([1, 2, 3]);
  });
});

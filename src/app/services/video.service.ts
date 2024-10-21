import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { Camera, CameraResponse } from "../interfaces/camera.interface";
import { CredentialService } from "./credential.service";

@Injectable({
  providedIn: "root",
})
export class VideoService {
  constructor() {}
  readonly http = inject(HttpClient);
  readonly cs = inject(CredentialService);

  getAvailableStreams(): Observable<number[] | null> {
    //get a list of all available cameras to get the streamIDs
    return this.http
      .get<CameraResponse>(`https://orchid.ipconfigure.com/service/cameras`)
      .pipe(
        map(({ cameras }: CameraResponse) => {
          return this.getCameraIds(cameras);
        })
      );
  }
  getVideoStream(streamId: number) {
    // use the streamID to get the frame
    const userToken = this.cs.getUserToken();
    return this.http.get(
      `https://orchid.ipconfigure.com/service/streams/${streamId}/frame?sid=${userToken}`,
      { responseType: "blob" }
    );
  }

  getCameraIds(cameras: Camera[]): number[] {
    return cameras.map((camera: Camera) => {
      return camera.defaultViewStreamId;
    });
  }
}

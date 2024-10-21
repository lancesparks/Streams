import { Component, inject, OnInit } from "@angular/core";
import { VideoService } from "../../services/video.service";
import { CredentialService } from "../../services/credential.service";
import { Observable, of, switchMap, take, tap } from "rxjs";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "../login/login.component";
import { MatButtonModule } from "@angular/material/button";
import { StreamComponent } from "../stream/stream.component";
@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, MatButtonModule, LoginComponent, StreamComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
  constructor() {}

  dialog = inject(MatDialog);
  readonly cs = inject(CredentialService);
  readonly vs = inject(VideoService);

  isImageLoading: boolean = false;
  availableStreams$: Observable<number[] | null> = of(null);
  activeStreams: number[] = [];

  ngOnInit(): void {
    this.availableStreams$ = this.cs.newSession$.pipe(
      //get all available streams
      switchMap((sessionId) => {
        if (sessionId) {
          return this.vs.getAvailableStreams();
        } else {
          this.activeStreams = [];
          return of(null);
        }
      })
    );
  }

  addStream(cameraID: number) {
    // add a stream to the active list
    if (this.activeStreams.includes(cameraID)) {
      this.removeStream(cameraID);
      return;
    }

    this.activeStreams = [...new Set([...this.activeStreams, cameraID])];
  }

  removeStream(cameraId: number) {
    if (!cameraId) {
      return;
    }
    //remove stream from the list
    this.activeStreams = [
      ...this.activeStreams.filter((id: number) => id !== cameraId),
    ];
  }

  checkActiveCamera(cameraID: number): boolean {
    return this.activeStreams.includes(cameraID);
  }
}

import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { VideoService } from "../../services/video.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { loadingIconComponent } from "../loading-icon/loading-icon.component";
import { interval, take } from "rxjs";
@UntilDestroy()
@Component({
  selector: "app-stream",
  standalone: true,
  imports: [loadingIconComponent],
  templateUrl: "./stream.component.html",
  styleUrl: "./stream.component.scss",
})
export class StreamComponent implements OnInit {
  readonly vs = inject(VideoService);
  @Input() streamID: number | null = null; //passed in from dashboard component
  @Output() removeStreamEvent: EventEmitter<number | null> = new EventEmitter<
    number | null
  >(); //emitted to dashboard component to remove a stream

  imageToShow: string | ArrayBuffer | null = null;
  invalidStream: boolean = false;
  loading = true;

  ngOnInit(): void {
    if (this.streamID !== null) {
      // the stream id passed into this component from the parent gets the stream on load
      this.vs
        .getVideoStream(this.streamID!)
        .pipe(take(1))
        .subscribe(
          (data) => {
            this.createImageFromBlob(data);
            this.loading = false;
          },
          (error) => {
            this.invalidStream = true;
            this.loading = false;
          }
        );

      const streamInterval = setInterval(() => {
        if (this.invalidStream) {
          //if its an invalid stream clear the interval, no point in refreshing an invalid stream
          clearInterval(streamInterval);
          return;
        }

        this.vs
          .getVideoStream(this.streamID!)
          .pipe(take(1))
          .subscribe(
            (data) => {
              this.createImageFromBlob(data);
              this.loading = false;
            },
            (error) => {
              this.invalidStream = true;
              this.loading = false;
            }
          );
      }, 5000);
    }
  }

  createImageFromBlob(image: Blob) {
    //handles image creation from the api
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.imageToShow = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  removeStream() {
    this.removeStreamEvent.emit(this.streamID);
  }
}

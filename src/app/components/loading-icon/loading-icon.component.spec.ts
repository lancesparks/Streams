import { ComponentFixture, TestBed } from "@angular/core/testing";

import { loadingIconComponent } from "./loading-icon.component";

describe("loadingIconComponent", () => {
  let component: loadingIconComponent;
  let fixture: ComponentFixture<loadingIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [loadingIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(loadingIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

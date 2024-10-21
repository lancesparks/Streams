import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideAnimations } from "@angular/platform-browser/animations";

import { ExpansionComponent } from "./expansion.component";
import { FormsModule } from "@angular/forms";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { NumbersOnlyDirective } from "../../directives/numbersOnly.directive";

describe("ExpansionComponent", () => {
  let component: ExpansionComponent;
  let fixture: ComponentFixture<ExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ExpansionComponent,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NumbersOnlyDirective,
      ],
      providers: [
        {
          provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
          useValue: {
            subscriptSizing: "dynamic",
          },
        },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should calculate pi estimate", () => {
    const iterations = 100;
    component.calculatePiEstimate(iterations);

    expect(component.expansionResult).toBeCloseTo(Math.PI, 1);
    expect(component.errorResult).toBeCloseTo(0, 1);
  });

  it("should handle zero iterations", () => {
    const iterations = 0;
    component.calculatePiEstimate(iterations);
    component.calculatePiEstimate(iterations);
    expect(component.expansionResult).toBeNull();
  });

  it("should handle negative iterations", () => {
    const iterations = -10;
    component.calculatePiEstimate(iterations);
    expect(component.expansionResult).toBeNull();
  });

  it("clears results", () => {
    const iterations = 100;
    component.calculatePiEstimate(iterations);

    expect(component.expansionResult).toBeCloseTo(Math.PI, 1);
    expect(component.errorResult).toBeCloseTo(0, 1);

    component.calculatePiEstimate(0);

    expect(component.expansionResult).toBeFalsy();
    expect(component.errorResult).toBeFalsy();
  });
});

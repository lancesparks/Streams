import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { NumbersOnlyDirective } from "../../directives/numbersOnly.directive";

@Component({
  selector: "app-expansion",
  standalone: true,
  imports: [
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
  ],
  templateUrl: "./expansion.component.html",
  styleUrl: "./expansion.component.scss",
})
export class ExpansionComponent implements OnInit {
  constructor() {}

  iterations = 20;
  expansionResult: number | null = null;
  errorResult: number | null = null;
  errMsg: string | null = null;

  ngOnInit(): void {}

  calculatePiEstimate(iterations: number) {
    if (iterations < 1) {
      this.expansionResult = null;
      this.errorResult = null;
      this.errMsg = "Iterations must be greater than 0";
      return;
    }
    let piEstimate = 0;
    for (let i = 0; i < iterations; i++) {
      const term = (i % 2 === 0 ? 1 : -1) / (2 * i + 1); // Alternating series term
      piEstimate += term; // Summing the series
    }
    piEstimate *= 4; // Since π/4 = sum, so multiply by 4
    const error = Math.abs(piEstimate - Math.PI); // Calculate the error
    this.expansionResult = piEstimate;
    this.errorResult = error;
    this.errMsg = null;
  }
}

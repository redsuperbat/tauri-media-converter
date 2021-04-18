import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
  declarations: [ButtonComponent, DropdownComponent, ProgressBarComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, DropdownComponent, ProgressBarComponent],
})
export class UiElementsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    ButtonComponent,
    DropdownComponent,
    ProgressBarComponent,
    MessageComponent,
  ],
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    DropdownComponent,
    ProgressBarComponent,
    MessageComponent,
  ],
})
export class UiElementsModule {}

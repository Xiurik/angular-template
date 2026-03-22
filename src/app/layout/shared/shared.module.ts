import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedRoutingModule } from './shared-routing.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedRoutingModule, ComponentsModule],
  exports: []
})
export class LayoutSharedModule {}

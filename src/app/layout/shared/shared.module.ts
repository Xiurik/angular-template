import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from '../components/components.module';

import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  imports: [CommonModule, SharedRoutingModule, ComponentsModule],
  declarations: [],
  exports: [],
})
export class LayoutSharedModule {}

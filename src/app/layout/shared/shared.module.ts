import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedRoutingModule, ComponentsModule],
  exports: []
})
export class LayoutSharedModule {}

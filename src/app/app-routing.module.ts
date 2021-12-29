import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { SuccessMessageComponent } from './customer/success-message/success-message.component';
import { GenerateComponent } from './generate/generate.component';

const routes: Routes = [
  {path:'customer/:id', component:CustomerComponent},
  {path:'success', component: SuccessMessageComponent},
  {path:'generate', component: GenerateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../../../pages/login/login.component';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterModule,CommonModule,LoginComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {

}

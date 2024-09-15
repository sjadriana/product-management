import { Component } from '@angular/core';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [ProductListComponent]
})
export class HomeComponent { }

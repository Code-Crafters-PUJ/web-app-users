import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CarouselModule, ButtonModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent {
  responsiveOptions : any[]=[
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    }
]
  images: string[] = [
    'https://www.primefaces.org/primeng/showcase/assets/showcase/images/demo/galleria/galleria1.jpg',
    'https://www.primefaces.org/primeng/showcase/assets/showcase/images/demo/galleria/galleria2.jpg',
    'https://www.primefaces.org/primeng/showcase/assets/showcase/images/demo/galleria/galleria3.jpg',
    'https://www.primefaces.org/primeng/showcase/assets/showcase/images/demo/galleria/galleria4.jpg',
    'https://www.primefaces.org/primeng/showcase/assets/showcase/images/demo/galleria/galleria5.jpg'
  ];

}

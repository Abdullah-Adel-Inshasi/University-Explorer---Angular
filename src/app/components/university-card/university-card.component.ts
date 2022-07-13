import { Component, Input, OnInit } from '@angular/core';
import University from '../../interfaces/university';
import { WishlistService } from 'src/app/services/wishlist-service/wishlist.service';

@Component({
  selector: 'app-university-card',
  templateUrl: './university-card.component.html',
  styleUrls: ['./university-card.component.css'],
})
export class UniversityCardComponent implements OnInit {
  @Input() public uni!: University;

  goToPage() {
    if (this.uni) {
      window.location.href = this.uni?.web_pages[0];
    }
  }

  inWishlist() {
    console.log(this.wishlistService.isInWishlist(this.uni));
    return this.wishlistService.isInWishlist(this.uni);
  }
  addToWishlist() {
    this.wishlistService.addToWishlist(this.uni);
  }
  constructor(public wishlistService: WishlistService) {}
  ngOnInit(): void {}
}

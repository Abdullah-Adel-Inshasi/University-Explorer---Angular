import { Component, OnInit } from '@angular/core';
import WishListItem from 'src/app/interfaces/wishlist-item';
import { WishlistService } from 'src/app/services/wishlist-service/wishlist.service';
import University from '../../interfaces/university';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlist: WishListItem[] | undefined;

  inWishlist(uni: University) {
    return this.wishlistService.isInWishlist(uni);
  }
  removeFromWishlist(item: WishListItem) {
    this.wishlistService.removeFromWishlist(item);
  }

  toggleCheck(item: WishListItem) {
    this.wishlistService.toggleCheck(item);
    this.wishlist = this.wishlistService.getWishlist();
  }
  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlist = this.wishlistService.getWishlist();
  }
}

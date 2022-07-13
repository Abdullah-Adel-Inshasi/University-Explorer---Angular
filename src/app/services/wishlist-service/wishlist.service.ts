import { Injectable } from '@angular/core';
import University from 'src/app/interfaces/university';
import WishListItem from 'src/app/interfaces/wishlist-item';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlist: WishListItem[] = [];

  addToWishlist(university: University) {
    if (!this.isInWishlist(university)) {
      window.alert(`added ${university.name}`);
      this.wishlist.push({ university, checked: false });
    } else {
      window.alert('You already have this university in your wishlist');
    }
  }
  removeFromWishlist(item: WishListItem) {
    const index = this.wishlist.indexOf(item);
    if (index != undefined) {
      window.alert(`${item.university.name} removed from wishlist`);
      this.wishlist = this.wishlist.splice(index, 1);
    } else {
      window.alert("this isn't in your wishlist");
    }
  }
  getWishlist() {
    return this.wishlist;
  }
  isInWishlist(uni: University): boolean {
    return !!this.wishlist.find((item) => item.university == uni);
  }
  toggleCheck(itemToToggle: WishListItem) {
    const index = this.wishlist.indexOf(itemToToggle);
    this.wishlist[index] = {
      ...this.wishlist[index],
      checked: !this.wishlist[index].checked,
    };
    console.log(this.wishlist[index]);
  }
  constructor() {}
}

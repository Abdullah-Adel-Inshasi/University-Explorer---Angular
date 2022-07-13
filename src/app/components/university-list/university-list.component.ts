import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  Subject,
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  merge,
} from 'rxjs';
import University from '../../interfaces/university';
import { UniversityService } from 'src/app/services/university-service/university.service';
import { WishlistService } from 'src/app/services/wishlist-service/wishlist.service';

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.css'],
})
export class UniversityListComponent implements OnInit {
  universities$: Observable<University[]> | undefined;
  selectedCountry = new Subject<string>();
  term$ = new Subject<string>();
  countries: string[] = [
    'United Kingdom',
    'United States',
    'Canada',
    'Germany',
  ];
  constructor(
    private universityService: UniversityService,
    private router: Router,
    private route: ActivatedRoute,
    private wishlistService: WishlistService
  ) {}

  showCountryUniversities(country: string) {
    this.selectedCountry.next(country);
    this.router.navigate(['universities', { country }]);
  }

  searchByName(name: string) {
    this.term$.next(name);
  }

  addToWishlist(uni: University) {
    this.wishlistService.addToWishlist(uni);
  }

  inWishlist(uni: University): boolean {
    return this.wishlistService.isInWishlist(uni);
  }

  ngOnInit(): void {
    const lastVisitedCountry = this.route.snapshot.params['country'];

    this.universities$ = merge(
      this.term$.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((x) => this.universityService.searchUniversityByName(x))
      ),
      this.selectedCountry.pipe(
        startWith(lastVisitedCountry ?? ''),
        distinctUntilChanged(),
        switchMap((country) =>
          this.universityService.getUniversityByCountry(country)
        )
      )
    );
  }
}

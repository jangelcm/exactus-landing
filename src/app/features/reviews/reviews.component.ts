import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { GoogleReviewsService } from '../../core/services/reviews.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleReviewsResponse } from '../../core/models/review.model';

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class ReviewsComponent implements OnInit {

    private platformId = inject(PLATFORM_ID);

    reviewsResponse: GoogleReviewsResponse | null = null;
    isLoading = false;
    error: string | null = null;

    // Hardcoded for now, replace with dynamic values if needed
    locationName = 'accounts/12220875555032300604/locations/9467389133813481126';
    minRating = 4;
    daysAgo = 365;
    pageSize = 10;

    constructor(private googleReviewsService: GoogleReviewsService) { }

    ngOnInit(): void {
        // this.subscribeToState();
        // this.loadRecentReviews();

        this.loadMockData();
    }

    loadMockData(): void {
        this.reviewsResponse = {
            totalReviewCount: 156,
            averageRating: 4.8,
            reviews: [
                {
                    reviewId: '1',
                    author: 'Ana García',
                    rating: 5,
                    reviewText: '¡Excelente servicio! El personal es muy profesional y amable. Resolvieron mi problema de manera rápida y eficaz. ¡Totalmente recomendado!',
                    reviewTime: new Date('2024-02-25T10:30:00Z'),
                    authorProfilePhotoUrl: 'https://randomuser.me/api/portraits/women/68.jpg'
                },
                {
                    reviewId: '2',
                    author: 'Carlos Rodríguez',
                    rating: 5,
                    reviewText: 'Llevaba tiempo con una molestia y aquí encontraron la solución. El trato es inmejorable y las instalaciones son de primera. Volveré sin duda.',
                    reviewTime: new Date('2024-02-20T15:00:00Z'),
                    authorProfilePhotoUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
                },
                {
                    reviewId: '3',
                    author: 'Lucía Martínez',
                    rating: 4,
                    reviewText: 'Buen servicio en general. Fueron puntuales y el tratamiento fue efectivo. El único detalle es que el lugar es un poco difícil de encontrar.',
                    reviewTime: new Date('2024-02-18T12:45:00Z'),
                    authorProfilePhotoUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
                }
            ]
        };
    }


    // subscribeToState(): void {
    //     this.googleReviewsService.loading$.subscribe(loading => this.isLoading = loading);
    //     this.googleReviewsService.error$.subscribe(error => this.error = error);
    // }

    // loadLocationReviews(): void {
    //     this.googleReviewsService.getLocationReviews(this.locationName, this.pageSize)
    //         .subscribe(data => this.reviewsResponse = data);
    // }

    // loadReviewsByRating(): void {
    //     this.googleReviewsService.getReviewsByRating(this.locationName, this.minRating, this.pageSize)
    //         .subscribe(data => this.reviewsResponse = data);
    // }

    // loadRecentReviews(): void {
    //     this.googleReviewsService.getRecentReviews(this.locationName, this.daysAgo, this.pageSize)
    //         .subscribe(data => this.reviewsResponse = data);
    // }

    getStarRating(rating: number): string[] {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        const stars = [];
        for (let i = 0; i < fullStars; i++) stars.push('full');
        if (halfStar) stars.push('half');
        for (let i = 0; i < emptyStars; i++) stars.push('empty');

        return stars;
    }
}

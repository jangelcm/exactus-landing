// DTOs
export interface GoogleReview {
    reviewId: string;
    author: string;
    rating: number;
    reviewText: string;
    reviewTime: Date;
    authorProfilePhotoUrl?: string;
    updateTime?: Date;
}

export interface GoogleReviewsResponse {
    reviews: GoogleReview[];
    totalReviewCount: number;
    averageRating: number;
}

// Respuesta de error
export interface ApiError {
    statusCode: number;
    message: string;
    error: string;
    timestamp?: string;
}
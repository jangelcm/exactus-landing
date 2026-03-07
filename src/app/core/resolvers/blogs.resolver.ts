import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BlogService } from '../../core/services/blog.service';

export const blogsResolver: ResolveFn<any[]> = () => {
    const blogService = inject(BlogService);
    return blogService.getBlogs();
};
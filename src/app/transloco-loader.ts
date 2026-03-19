import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Translation, TranslocoLoader } from '@jsverse/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    private http = inject(HttpClient);

    getTranslation(lang: string) {
        // During server-side rendering the global `window` is undefined.
        // In that case read the translation JSON directly from the built
        // browser assets folder. In the browser, use HttpClient as before.
        if (typeof window === 'undefined') {
            try {
                // dynamic require to avoid bundling `fs`/`path` in the browser build
                // try a few likely dist paths (project outputPath is `dist/tasklif`)
                const fs = require('fs');
                const path = require('path');
                const base = process.cwd();
                const candidates = [
                    path.join(base, 'dist', 'tasklif', 'browser', 'assets', 'i18n', `${lang}.json`),
                    path.join(base, 'dist', 'browser', 'assets', 'i18n', `${lang}.json`),
                    path.join(base, 'browser', 'assets', 'i18n', `${lang}.json`),
                    path.join(base, 'src', 'assets', 'i18n', `${lang}.json`),
                ];

                for (const p of candidates) {
                    if (fs.existsSync(p)) {
                        const content = fs.readFileSync(p, 'utf-8');
                        return Promise.resolve(JSON.parse(content));
                    }
                }

                // If no file found, fall back to HttpClient (may fail but keeps behavior predictable)
                return this.http.get<Translation>(`/assets/i18n/${lang}.json`).toPromise?.() ?? this.http.get<Translation>(`/assets/i18n/${lang}.json`);
            } catch (e) {
                return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
            }
        }

        return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
    }
}
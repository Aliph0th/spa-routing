import { PAGES } from './constants.js';
import { clearPage } from './render.js';

export function router(url) {
   if (!url) {
      window.location.hash = 'users';
      return;
   }
   const page = PAGES.find(p => p.check(url));
   clearPage();
   page.render(url);
}

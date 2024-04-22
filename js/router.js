import { PAGES } from './variables/constants.js';
import { clearPage } from './utils/render.js';

export function router(url) {
   if (!url) {
      window.location.hash = 'users';
      return;
   }
   const page = PAGES.find(p => p.check(url));
   clearPage();
   page.render(url);
}

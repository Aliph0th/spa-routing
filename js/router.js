import { PAGES_LIST } from './variables/constants.js';
import { clear, renderBreadcrumbs } from './utils/render.js';
import { parseBreadcrumbs } from './utils/helpers.js';
import { listenersPool } from './variables/shared.js';

export function router(url) {
   if (!url) {
      window.location.hash = '#users';
      return;
   }
   while (listenersPool.length) {
      window.removeEventListener('scroll', listenersPool.pop());
   }
   const page = PAGES_LIST.find(p => p.check(url));
   clear();
   renderBreadcrumbs(parseBreadcrumbs(url));
   page.render(url);
}

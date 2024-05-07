import { PAGES_LIST } from './variables/constants.js';
import { clear, renderBreadcrumbs } from './utils/render.js';
import { parseBreadcrumbs } from './utils/helpers.js';
import { scrollListenersPool } from './variables/shared.js';

export function router(url) {
   if (!url) {
      window.location.hash = '#users';
      return;
   }
   while (scrollListenersPool.length) {
      window.removeEventListener('scroll', scrollListenersPool.pop());
   }
   const page = PAGES_LIST.find(p => p.check(url));
   clear();
   page.render(url);
}

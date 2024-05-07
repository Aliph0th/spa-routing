import { PAGES_LIST } from '../variables/constants';
import { scrollListenersPool } from '../variables/shared';
import { clear } from './render';

export function router(url: string) {
   if (!url) {
      window.location.hash = '#users';
      return;
   }
   while (scrollListenersPool.length) {
      window.removeEventListener('scroll', scrollListenersPool.pop()!);
   }
   const page = PAGES_LIST.find(p => p.check(url))!;
   clear();
   page.render(url);
}

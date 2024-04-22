import { NotFound } from './pages/404.js';
import { Home } from './pages/home.js';

export const pageElement = document.getElementById('page');
export const breadcrumbsElement = document.getElementById('breadcrumbs');

export const PAGES = [
   {
      check: url => /^(^$|users)$/.test(url),
      page: Home
   },

   {
      check: () => true,
      page: NotFound
   }
];

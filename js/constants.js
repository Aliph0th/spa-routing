import { NotFound } from './pages/404.js';
import { Home } from './pages/home.js';
import { Album } from './pages/album.js';
import { getID } from './helpers.js';

export const API_URL = 'https://jsonplaceholder.typicode.com';

export const pageElement = document.getElementById('page');
export const breadcrumbsElement = document.getElementById('breadcrumbs');

export const PAGES = [
   {
      check: url => /^(^$|users)$/.test(url),
      render: Home
   },
   {
      check: url => /^users\/\d+\/?$/.test(url),
      render: url => {
         Album(getID(url, 1));
      }
   },

   {
      check: () => true,
      render: NotFound
   }
];

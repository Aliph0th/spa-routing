import { NotFound } from '../pages/404.js';
import { Home } from '../pages/home.js';
import { Album } from '../pages/album.js';
import { Photos } from '../pages/photos.js';
import { getID, parseBreadcrumbs } from '../utils/helpers.js';
import { renderBreadcrumbs } from '../utils/render.js';

export const API_URL = 'https://jsonplaceholder.typicode.com';
export const PHOTOS_PER_PAGE = 15;

export const pageElement = document.getElementById('page');
export const breadcrumbsElement = document.getElementById('breadcrumbs');

export const PAGES_LIST = [
   {
      title: 'Home',
      check: url => /^(^$|users\/?)$/.test(url),
      render: url => {
         renderBreadcrumbs(parseBreadcrumbs(url));
         Home();
      }
   },
   {
      title: 'Albums',
      check: url => /^users\/\d+\/?$/.test(url),
      render: url => {
         renderBreadcrumbs(parseBreadcrumbs(url));
         Album(getID(url, 'users'));
      }
   },
   {
      title: 'Photos',
      check: url => /^users\/\d+\/albums\/\d+\/?$/.test(url),
      render: url => {
         renderBreadcrumbs(parseBreadcrumbs(url));
         Photos(getID(url, 'users'), getID(url, 'albums'));
      }
   },
   {
      title: '404',
      check: url => /^\/404$/.test(url) || true,
      render: () => NotFound()
   }
];

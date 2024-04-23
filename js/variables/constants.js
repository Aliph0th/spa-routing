import { NotFound } from '../pages/404.js';
import { Home } from '../pages/home.js';
import { Album } from '../pages/album.js';
import { Photos } from '../pages/photos.js';
import { getID } from '../utils/helpers.js';

export const API_URL = 'https://jsonplaceholder.typicode.com';
export const PHOTOS_PER_PAGE = 10;

export const pageElement = document.getElementById('page');
export const breadcrumbsElement = document.getElementById('breadcrumbs');

export const PAGES_LIST = [
   {
      title: 'Home',
      check: url => /^(^$|users\/?)$/.test(url),
      render: Home
   },
   {
      title: 'Albums',
      check: url => /^users\/\d+\/?$/.test(url),
      render: url => {
         Album(getID(url, 1));
      }
   },
   {
      title: 'Photos',
      check: url => /^users\/\d+\/\d+\/?$/.test(url),
      render: url => {
         Photos(getID(url, 2));
      }
   },
   {
      title: '404',
      check: () => true,
      render: NotFound
   }
];

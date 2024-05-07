import { NotFound } from '../pages/404';
import { Home } from '../pages/home';
import { Album } from '../pages/album';
import { Photos } from '../pages/photos';
import { getID, parseBreadcrumbs } from '../utils/helpers';
import { renderBreadcrumbs } from '../utils/render';

export const API_URL = 'https://jsonplaceholder.typicode.com';
export const PHOTOS_PER_PAGE = 15;

export const pageElement = document.getElementById('page')!;
export const breadcrumbsElement = document.getElementById('breadcrumbs')!;

export const PAGES_LIST = [
   {
      title: 'Home',
      check: (url: string) => /^(^$|users\/?)$/.test(url),
      render: (url: string) => {
         renderBreadcrumbs(parseBreadcrumbs(url));
         Home();
      }
   },
   {
      title: 'Albums',
      check: (url: string) => /^users\/\d+\/?$/.test(url),
      render: (url: string) => {
         renderBreadcrumbs(parseBreadcrumbs(url));
         Album(getID(url, 'users'));
      }
   },
   {
      title: 'Photos',
      check: (url: string) => /^users\/\d+\/albums\/\d+\/?$/.test(url),
      render: (url: string) => {
         renderBreadcrumbs(parseBreadcrumbs(url));
         Photos(getID(url, 'users'), getID(url, 'albums'));
      }
   },
   {
      title: '404',
      check: (url: string) => /^\/404$/.test(url) || true,
      render: () => NotFound()
   }
];

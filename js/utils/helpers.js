import { API_URL, PAGES_LIST, PHOTOS_PER_PAGE } from '../variables/constants.js';
import { CACHE } from '../variables/shared.js';

export async function fetchData(endpoint, query = {}) {
   const filteredQuery = Object.entries(query).reduce((accum, [key, value]) => {
      if (value) {
         accum[key] = value.toString();
      }
      return accum;
   }, {});
   try {
      const response = await fetch(
         `${API_URL}/${endpoint}?${new URLSearchParams(filteredQuery)}`
      );
      return await response.json();
   } catch (error) {
      console.error(error);
   }
}

export function filterObject(object, ...props) {
   return Object.keys(object)
      .filter(key => props.includes(key))
      .reduce((accum, key) => ((accum[key] = object[key]), accum), {});
}

export async function getUsers() {
   if (!CACHE.users.length) {
      const users = await fetchData('users');
      if (users.length) {
         CACHE.users = users.map(u => filterObject(u, 'id', 'name', 'username', 'email'));
      }
   }
   return CACHE.users;
}
export const getAlbumsById = async userId => {
   if (!CACHE.albums[userId]) {
      const result = await fetchData('albums', { userId });
      if (result.length) {
         CACHE.albums[userId] = result.map(res =>
            filterObject(res, 'id', 'title', 'userId')
         );
      }
   }
   return CACHE.albums[userId];
};
export const getPhotosById = async (albumId, position) => {
   CACHE.photos[albumId] ||= [];
   if (!CACHE.photos[albumId].slice(position, position + PHOTOS_PER_PAGE).length) {
      const result = await fetchData('photos', {
         albumId,
         _start: position,
         _limit: PHOTOS_PER_PAGE
      });
      if (result.length) {
         CACHE.photos[albumId].push(
            ...result.map(res => filterObject(res, 'id', 'title', 'thumbnailUrl'))
         );
      }
   }
   return CACHE.photos[albumId].slice(position, position + PHOTOS_PER_PAGE);
};

export const getID = (url, tag) => {
   const parts = url.split('/');
   return +parts[parts.indexOf(tag) + 1];
};

export function parseBreadcrumbs(url) {
   const parts = url.split('/');
   return parts.reduce((breadcrumbs, _, i) => {
      const url = parts.slice(0, i + 1).join('/');
      const page = PAGES_LIST.find(p => p.check(url));
      if (url && page.title !== '404') {
         breadcrumbs.push({ title: page.title, href: `#${url}` });
      }
      return breadcrumbs;
   }, []);
}

export function createElement({
   type,
   classNames = [],
   innerHTML = '',
   children = [],
   attributes = {}
}) {
   const element = document.createElement(type);
   element.innerHTML = innerHTML;
   if (classNames.length) {
      element.className = classNames.join(' ');
   }
   if (children.length) {
      element.append(...children);
   }
   Object.entries(attributes).forEach(([key, value]) => {
      if (key && value) {
         element.setAttribute(key, value);
      }
   });
   return element;
}

export function redirectTo404() {
   window.location.hash = '#/404';
}

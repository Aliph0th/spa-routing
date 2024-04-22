import { API_URL, PAGES_LIST } from '../variables/constants.js';
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
      //TODO:FIXME:
      console.error(error);
   }
}

export async function memoFetch(data, query, ...filter) {
   const id = Object.values(query)[0];
   if (!CACHE[data][id]) {
      const result = await fetchData(data, query);
      if (result.length) {
         CACHE[data][id] = result.map(res => filterObject(res, ...filter));
      }
   }
   return CACHE[data][id];
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
export const getAlbumsById = async userId =>
   memoFetch('albums', { userId }, 'id', 'userId', 'title');
export const getPhotosById = async albumId =>
   memoFetch('photos', { albumId, _limit: 10 }, 'id', 'title', 'thumbnailUrl');

export const getID = (url, number) => url.split('/')[number];

export function parseBreadcrumbs(url) {
   const parsed = [];
   const parts = url.split('/');
   let urlParts = '';
   for (const i in parts) {
      urlParts += `${i === '0' ? '' : '/'}${parts[i]}`;
      const page = PAGES_LIST.find(p => p.check(urlParts));
      parsed.push({ title: page.title, href: `#${urlParts}` });
   }
   return parsed;
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

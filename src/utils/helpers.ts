import { IAlbum } from '../interfaces/album';
import { IBreadcrumb } from '../interfaces/breadcrumbs';
import { ICreateElementOptions } from '../interfaces/createElement';
import { IPhoto } from '../interfaces/photo';
import { IUser } from '../interfaces/user';
import { API_URL, PAGES_LIST, PHOTOS_PER_PAGE } from '../variables/constants';
import { CACHE } from '../variables/shared';

export async function fetchData<T extends IUser | IPhoto | IAlbum>(
   endpoint: string,
   query: Record<string, string | number> = {}
): Promise<T[]> {
   const filteredQuery = Object.entries(query).reduce((accum, [key, value]) => {
      if (value) {
         accum[key] = value.toString();
      }
      return accum;
   }, {});
   try {
      const response = await fetch(`${API_URL}/${endpoint}?${new URLSearchParams(filteredQuery)}`);
      return (await response.json()) as T[];
   } catch (error) {
      console.error(error);
      return [];
   }
}

export function filterObject<T extends IUser | IPhoto | IAlbum>(
   object: T,
   ...props: Array<keyof T>
) {
   return Object.keys(object)
      .filter(key => props.includes(key as keyof T))
      .reduce((accum, key) => ((accum[key] = object[key]), accum), {});
}

export async function getUsers() {
   if (!CACHE.users.length) {
      const users = await fetchData<IUser>('users');
      if (users.length) {
         CACHE.users = users.map<IUser>(
            u => filterObject<IUser>(u, 'id', 'name', 'username', 'email') as IUser
         );
      }
   }
   return CACHE.users;
}
export const getAlbumsById = async userId => {
   if (!CACHE.albums[userId]) {
      const result = await fetchData<IAlbum>('albums', { userId });
      if (result.length) {
         CACHE.albums[userId] = result.map<IAlbum>(
            res => filterObject<IAlbum>(res, 'id', 'title', 'userId') as IAlbum
         );
      }
   }
   return CACHE.albums[userId];
};
export const getPhotosById = async (albumId, position) => {
   CACHE.photos[albumId] ||= [];
   if (!CACHE.photos[albumId].slice(position, position + PHOTOS_PER_PAGE).length) {
      const result = await fetchData<IPhoto>('photos', {
         albumId,
         _start: position,
         _limit: PHOTOS_PER_PAGE
      });
      if (result.length) {
         CACHE.photos[albumId].push(
            ...result.map<IPhoto>(
               res => filterObject<IPhoto>(res, 'id', 'title', 'thumbnailUrl') as IPhoto
            )
         );
      }
   }
   return CACHE.photos[albumId].slice(position, position + PHOTOS_PER_PAGE);
};

export const getID = (url: string, tag: 'users' | 'albums'): number => {
   const parts = url.split('/');
   return +parts[parts.indexOf(tag) + 1];
};

export function parseBreadcrumbs(url: string): IBreadcrumb[] {
   const parts = url.split('/');
   return parts.reduce((breadcrumbs, _, i) => {
      const url = parts.slice(0, i + 1).join('/');
      const page = PAGES_LIST.find(p => p.check(url))!;
      if (url && page.title !== '404') {
         breadcrumbs.push({ title: page.title, href: `#${url}` });
      }
      return breadcrumbs;
   }, [] as IBreadcrumb[]);
}

export const isUserExists = (userId: number) => !!CACHE.users.find(u => u.id === userId);

export function createElement({
   type,
   classNames = [],
   innerHTML = '',
   children = [],
   attributes = {}
}: ICreateElementOptions) {
   const element: HTMLElement = document.createElement(type);
   element.innerHTML = innerHTML;
   if (classNames.length) {
      element.className = classNames.join(' ');
   }
   if (children.length) {
      element.append(...children);
   }
   Object.entries(attributes).forEach(([key, value]) => {
      if (key && value) {
         element.setAttribute(key, value.toString());
      }
   });
   return element;
}

export function redirectTo404() {
   window.location.hash = '#/404';
}

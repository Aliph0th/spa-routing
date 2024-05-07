import { breadcrumbsElement, pageElement } from '../variables/constants.js';
import { createElement } from './helpers.js';

export function toggleSpinner(enabled) {
   if (enabled) {
      const spinner = createElement({ type: 'div', classNames: ['spinner'] });
      pageElement.appendChild(spinner);
      return;
   }
   pageElement.querySelectorAll('.spinner').forEach(el => el.remove());
}

export function renderBreadcrumbs(breadcrumbs) {
   for (const i in breadcrumbs) {
      breadcrumbsElement.appendChild(
         createElement({
            type: 'a',
            classNames: ['crumb'],
            innerHTML: breadcrumbs[i].title,
            attributes: { href: breadcrumbs[i].href }
         })
      );
      if (i < breadcrumbs.length - 1) {
         breadcrumbsElement.appendChild(
            createElement({
               type: 'span',
               classNames: ['separator'],
               innerHTML: '&#x279c;'
            })
         );
      }
   }
}

export function clear() {
   pageElement.innerHTML = '';
   breadcrumbsElement.innerHTML = '';
}

export function wrapUser(user) {
   return createElement({
      type: 'div',
      classNames: ['card'],
      children: [
         createElement({ type: 'div', classNames: ['name'], innerHTML: user.name }),
         createElement({
            type: 'div',
            classNames: ['tag'],
            innerHTML: `@${user.username}`
         }),
         createElement({ type: 'div', classNames: ['email'], innerHTML: user.email }),
         createElement({
            type: 'a',
            classNames: ['show'],
            innerHTML: 'Go to albums',
            attributes: {
               href: `#users/${user.id}`
            }
         })
      ]
   });
}

export function wrapAlbum(album) {
   return createElement({
      type: 'div',
      classNames: ['card'],
      children: [
         createElement({ type: 'div', classNames: ['name'], innerHTML: album.title }),
         createElement({
            type: 'a',
            classNames: ['show'],
            innerHTML: 'View album',
            attributes: {
               href: `#users/${album.userId}/albums/${album.id}`
            }
         })
      ]
   });
}

export function wrapPhoto(photo) {
   return createElement({
      type: 'div',
      classNames: ['photo'],
      children: [
         createElement({ type: 'div', classNames: ['name'], innerHTML: photo.title }),
         createElement({
            type: 'img',
            classNames: ['image'],
            attributes: { src: photo.thumbnailUrl }
         })
      ]
   });
}

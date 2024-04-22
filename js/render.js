import { pageElement } from './constants.js';
import { createElement } from './helpers.js';

export function toggleSpinner(enabled) {
   if (enabled) {
      const spinner = createElement({ type: 'div', classNames: ['spinner'] });
      pageElement.appendChild(spinner);
      return;
   }
   pageElement.querySelectorAll('.spinner').forEach(el => el.remove());
}

export function clearPage() {
   pageElement.innerHTML = '';
}

export function wrapUser(user) {
   return createElement({
      type: 'div',
      classNames: ['card'],
      children: [
         createElement({ type: 'div', classNames: ['name'], innerText: user.name }),
         createElement({
            type: 'div',
            classNames: ['tag'],
            innerText: `@${user.username}`
         }),
         createElement({ type: 'div', classNames: ['email'], innerText: user.email }),
         createElement({
            type: 'a',
            classNames: ['show'],
            innerText: 'Go to albums',
            attributes: {
               href: `#users/${user.id}`
            }
         })
      ]
   });
}

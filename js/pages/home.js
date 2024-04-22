import { pageElement } from '../constants.js';
import { createElement, fetchData } from '../helpers.js';
import { toggleSpinner, wrapUser } from '../render.js';

export async function Home() {
   toggleSpinner(true);
   const users = await fetchData('users');
   toggleSpinner(false);
   pageElement.appendChild(
      createElement({
         type: 'div',
         classNames: ['userContainer'],
         children: users.map(wrapUser)
      })
   );
}

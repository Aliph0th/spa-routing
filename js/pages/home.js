import { pageElement } from '../constants.js';
import { createElement, getUsers } from '../helpers.js';
import { toggleSpinner, wrapUser } from '../render.js';

export async function Home() {
   toggleSpinner(true);
   const users = await getUsers();
   toggleSpinner(false);
   pageElement.append(
      createElement({ type: 'h1', classNames: ['title'], innerText: 'Users' }),
      createElement({
         type: 'div',
         classNames: ['container'],
         children: users.map(wrapUser)
      })
   );
}

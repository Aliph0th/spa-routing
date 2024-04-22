import { pageElement } from '../variables/constants.js';
import { createElement, getUsers } from '../utils/helpers.js';
import { toggleSpinner, wrapUser } from '../utils/render.js';

export async function Home() {
   toggleSpinner(true);
   const users = await getUsers();
   toggleSpinner(false);
   pageElement.append(
      createElement({ type: 'h1', classNames: ['title'], innerHTML: 'Users' }),
      createElement({
         type: 'div',
         classNames: ['container'],
         children: users.map(wrapUser)
      })
   );
}

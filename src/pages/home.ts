import { pageElement } from '../variables/constants';
import { createElement, getUsers } from '../utils/helpers';
import { toggleSpinner, wrapUser } from '../utils/render';

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

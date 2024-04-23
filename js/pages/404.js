import { pageElement } from '../variables/constants.js';
import { createElement } from '../utils/helpers.js';

export function NotFound() {
   pageElement.append(
      createElement({
         type: 'h1',
         classNames: ['notFound'],
         innerHTML: 'Page not found'
      }),
      createElement({
         type: 'a',
         attributes: { href: '#users' },
         innerHTML: 'Go to home'
      })
   );
}

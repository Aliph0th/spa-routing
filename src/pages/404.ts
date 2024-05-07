import { pageElement } from '../variables/constants';
import { createElement } from '../utils/helpers';

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

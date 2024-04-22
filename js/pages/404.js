import { pageElement } from '../variables/constants.js';
import { createElement } from '../utils/helpers.js';

export function NotFound() {
   pageElement.appendChild(
      createElement({ type: 'h1', classNames: ['notFound'], innerHTML: 'Page not found' })
   );
}

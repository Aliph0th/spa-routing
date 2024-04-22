import { pageElement } from '../constants.js';
import { createElement } from '../helpers.js';

export function NotFound() {
   pageElement.appendChild(createElement({ type: 'h1', innerText: 'Page not found' }));
}

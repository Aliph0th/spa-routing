import { pageElement } from '../constants.js';
import { createElement } from '../utils/helpers.js';

export function NotFound() {
   pageElement.appendChild(createElement({ type: 'h1', innerText: 'Page not found' }));
}

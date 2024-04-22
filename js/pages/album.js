import { pageElement } from '../constants.js';
import { createElement, fetchData } from '../helpers.js';
import { toggleSpinner, wrapAlbum } from '../render.js';
import { NotFound } from './404.js';

export async function Album(userId) {
   toggleSpinner(true);
   const albums = await fetchData(`albums`, { userId });
   toggleSpinner(false);
   if (!albums.length) {
      return NotFound();
   }
   pageElement.appendChild(
      createElement({
         type: 'div',
         classNames: ['container'],
         children: albums.map(wrapAlbum)
      })
   );
}

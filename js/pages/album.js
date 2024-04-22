import { pageElement } from '../constants.js';
import { createElement, getAlbumsById } from '../helpers.js';
import { toggleSpinner, wrapAlbum } from '../render.js';
import { NotFound } from './404.js';

export async function Album(userId) {
   toggleSpinner(true);
   const albums = await getAlbumsById(userId);
   toggleSpinner(false);
   if (!albums.length) {
      return NotFound();
   }
   pageElement.append(
      createElement({
         type: 'h1',
         classNames: ['title'],
         innerText: `Albums #${userId}`
      }),
      createElement({
         type: 'div',
         classNames: ['container'],
         children: albums.map(wrapAlbum)
      })
   );
}

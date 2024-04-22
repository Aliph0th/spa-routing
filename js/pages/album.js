import { pageElement } from '../variables/constants.js';
import { createElement, getAlbumsById } from '../utils/helpers.js';
import { toggleSpinner, wrapAlbum } from '../utils/render.js';
import { NotFound } from './404.js';

export async function Album(userId) {
   toggleSpinner(true);
   const albums = await getAlbumsById(userId);
   toggleSpinner(false);
   if (!albums || !albums.length) {
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

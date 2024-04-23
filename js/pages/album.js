import { pageElement } from '../variables/constants.js';
import { createElement, getAlbumsById, redirectTo404 } from '../utils/helpers.js';
import { toggleSpinner, wrapAlbum } from '../utils/render.js';

export async function Album(userId) {
   toggleSpinner(true);
   const albums = await getAlbumsById(userId);
   toggleSpinner(false);
   if (!albums?.length) {
      return redirectTo404();
   }
   pageElement.append(
      createElement({
         type: 'h1',
         classNames: ['title'],
         innerHTML: `Albums #${userId}`
      }),
      createElement({
         type: 'div',
         classNames: ['container'],
         children: albums.map(wrapAlbum)
      })
   );
}

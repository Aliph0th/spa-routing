import { pageElement } from '../variables/constants';
import { createElement, getAlbumsById, isUserExists, redirectTo404 } from '../utils/helpers';
import { toggleSpinner, wrapAlbum } from '../utils/render';

export async function Album(userId: number) {
   toggleSpinner(true);
   const albums = await getAlbumsById(userId);
   toggleSpinner(false);
   if (!albums?.length || !isUserExists(userId)) {
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

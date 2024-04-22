import { pageElement } from '../constants.js';
import { createElement, getPhotosById } from '../helpers.js';
import { toggleSpinner, wrapPhoto } from '../render.js';

export async function Photos(albumId) {
   toggleSpinner(true);
   const photos = await getPhotosById(albumId);
   toggleSpinner(false);
   if (!photos.length) {
      return NotFound();
   }
   pageElement.append(
      createElement({
         type: 'h1',
         classNames: ['title'],
         innerText: `Photos #${albumId}`
      }),
      createElement({
         type: 'div',
         classNames: ['photoContainer'],
         children: photos.map(wrapPhoto)
      })
   );
}

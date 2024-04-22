import { pageElement } from '../variables/constants.js';
import { createElement, getPhotosById } from '../utils/helpers.js';
import { toggleSpinner, wrapPhoto } from '../utils/render.js';

export async function Photos(albumId) {
   toggleSpinner(true);
   const photos = await getPhotosById(albumId);
   toggleSpinner(false);
   if (!photos || !photos.length) {
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
         children: photos.map(wrapPhoto)
      })
   );
}

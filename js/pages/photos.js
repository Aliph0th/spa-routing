import { pageElement } from '../variables/constants.js';
import { createElement, getPhotosById, redirectTo404 } from '../utils/helpers.js';
import { toggleSpinner, wrapPhoto } from '../utils/render.js';
import { listenersPool } from '../variables/shared.js';

export async function Photos(albumId) {
   let position = 0;
   let isFinished = false;
   let isLoading = false;
   const getData = async (wasScrolled = false) => {
      toggleSpinner(true);
      isLoading = true;
      const photos = await getPhotosById(albumId, position);
      isLoading = false;
      toggleSpinner(false);
      if (!photos?.length && !wasScrolled) {
         return redirectTo404();
      }
      if (!photos?.length && wasScrolled) {
         isFinished = true;
         return [];
      }
      position += photos.length;
      return photos;
   };
   const append = photos => {
      pageElement.appendChild(
         createElement({
            type: 'div',
            children: photos.map(wrapPhoto)
         })
      );
      if (isFinished) {
         pageElement.appendChild(
            createElement({
               type: 'p',
               classNames: ['end'],
               innerHTML: 'End of photos'
            })
         );
      }
   };
   const handleScroll = async () => {
      if (isFinished || isLoading) {
         return;
      }
      if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
         append(await getData(true));
      }
   };
   window.addEventListener('scroll', handleScroll);
   listenersPool.push(handleScroll);
   pageElement.appendChild(
      createElement({
         type: 'h1',
         classNames: ['title'],
         innerHTML: `Photos #${albumId}`
      })
   );
   append(await getData());
}

import { pageElement } from '../variables/constants';
import { createElement, getPhotosById, isUserExists, redirectTo404 } from '../utils/helpers';
import { toggleSpinner, wrapPhoto } from '../utils/render';
import { scrollListenersPool } from '../variables/shared';

export async function Photos(userId: number, albumId: number) {
   let position = 0;
   let isFinished = false;
   let isLoading = false;

   if (!isUserExists(userId)) {
      return redirectTo404();
   }

   const getData = async (wasScrolled = false) => {
      toggleSpinner(true);
      isLoading = true;
      const photos = await getPhotosById(albumId, position);
      isLoading = false;
      toggleSpinner(false);
      if (!photos?.length && !wasScrolled) {
         redirectTo404();
         return [];
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
   scrollListenersPool.push(handleScroll);

   pageElement.appendChild(
      createElement({
         type: 'h1',
         classNames: ['title'],
         innerHTML: `Photos #${albumId}`
      })
   );
   append(await getData());
}

import { router } from './router.js';

router(window.location.hash.replace('#', ''));

window.addEventListener('hashchange', () => {
   router(window.location.hash.replace('#', ''));
});

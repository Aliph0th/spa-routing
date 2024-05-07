import './style.css';
import { router } from './utils/router';

router(window.location.hash.replace('#', ''));
window.addEventListener('hashchange', () => {
   router(window.location.hash.replace('#', ''));
});

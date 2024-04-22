import { API_URL } from './constants.js';

export async function fetchData(endpoint) {
   try {
      const response = await fetch(`${API_URL}/${endpoint}`);
      return await response.json();
   } catch (error) {
      //TODO:FIXME:
      console.error(error);
   }
}

export const getID = (url, number) => url.split('/')[number];

export function createElement({
   type,
   classNames = [],
   innerText = '',
   children = [],
   attributes = {}
}) {
   const element = document.createElement(type);
   element.innerText = innerText;
   if (classNames.length) {
      element.className = classNames.join(' ');
   }
   if (children.length) {
      element.append(...children);
   }
   Object.entries(attributes).forEach(([key, value]) => {
      if (key && value) {
         element.setAttribute(key, value);
      }
   });
   return element;
}

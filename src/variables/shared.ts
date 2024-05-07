import { ICache } from '../interfaces/cache';

export const CACHE: ICache = {
   users: [],
   albums: {},
   photos: {}
};

export const scrollListenersPool: EventListenerOrEventListenerObject[] = [];

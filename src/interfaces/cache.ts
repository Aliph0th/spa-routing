import { IUser } from './user';
import { IPhoto } from './photo';
import { IAlbum } from './album';

export interface ICache {
   users: IUser[];
   albums: Record<string, IAlbum[]>;
   photos: Record<string, IPhoto[]>;
}

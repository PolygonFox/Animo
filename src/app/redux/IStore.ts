import { IWorld } from 'models/world';
import { IWorldMap } from 'models/worldMap';

export interface IStore {
  world: IWorld;
  worldMap: IWorldMap;
};

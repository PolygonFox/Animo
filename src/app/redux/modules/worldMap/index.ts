
// import * as WHS from 'whs/build/whs';
// import * as THREE from 'three';
import { IWorldMap, IWorldMapAction } from 'models/worldMap';

/** Action Types */
export const ADD: string = 'worldMap/ADD';
export const REMOVE: string = 'worldMap/REMOVE';

/** Initial State */
const initialState: IWorldMap = {
  worldMap: null,
};

/** Reducer: WorldReducer */
export function worldMapReducer(state = initialState, action?: IWorldMapAction) {
  switch (action.type) {
    case ADD:
      return {
        worldMap: action.worldMap,
      };

    // case REMOVE:
    //   return {
    //     world: null,
    //   };

    default:
      return state;
  }
}

/** Action Creator: Add world */
export function setWorldMap(worldMap): IWorldMapAction {
  return {
    type: ADD,
    worldMap
  };
}

// /** Action Creator: Remove world  */
// export function remove(): IworldMapAction {
//   return {
//     type: REMOVE,
//   };
// }

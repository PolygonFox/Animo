import { IWorld, IWorldAction } from 'models/world';
import * as WHS from 'whs/build/whs';
import * as THREE from 'three';

/** Action Types */
export const ADD: string = 'world/ADD';
export const REMOVE: string = 'world/REMOVE';

/** Initial State */
const initialState: IWorld = {
  world: null,
};

/** Reducer: WorldReducer */
export function worldReducer(state = initialState, action?: IWorldAction) {
  switch (action.type) {
    case ADD:
      return {
        world: newWorld(),
      };

    case REMOVE:
      return {
        world: null,
      };

    default:
      return state;
  }
}

/** Action Creator: Add world */
export function add(): IWorldAction {
  return {
    type: ADD,
  };
}

/** Action Creator: Remove world  */
export function remove(): IWorldAction {
  return {
    type: REMOVE,
  };
}

function newWorld() {
  const cameraModule = new WHS.CameraModule({
    position: {
      x: 5,
      y: 5,
      z: 5
    },
    far: 200,
    near: 0.1
  });

  const controlsModule = new WHS.OrbitControlsModule();

  const world = new WHS.App([
    new WHS.ElementModule(),
    new WHS.SceneModule(),
    cameraModule,
    new WHS.RenderingModule({
      bgColor: 0xa0dfff,

      renderer: {
        antialias: true,
        shadowmap: {
          type: THREE.PCFSoftShadowMap
        }
      }
    }),
    controlsModule,
    new WHS.ResizeModule()
  ]);

  new WHS.AmbientLight({
    light: {
      color: 0xffffff,
      intensity: 0.3
    }
  }).addTo(world);

  new WHS.DirectionalLight( {
  light: {
    color: 0xffffff,
    intensity: 0.5
  },

  position: [0, 10, 10]
  }).addTo(world);

  world.start();

  return world;
}

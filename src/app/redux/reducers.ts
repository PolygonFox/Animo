import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { worldReducer } from './modules/world';
import { worldMapReducer } from './modules/worldMap';
import { IStore } from './IStore';

const { reducer } = require('redux-connect');

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  routing: routerReducer,
  world: worldReducer,
  worldMap: worldMapReducer,
  reduxAsyncConnect: reducer
});

export default rootReducer;

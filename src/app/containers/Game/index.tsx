import * as React from 'react';

import { add, remove } from 'modules/world/';
import { setWorldMap } from 'modules/worldMap/';
import { IWorld } from 'models/world';
import { IWorldAction } from 'models/world';
import { IWorldMapAction, IWorldMap } from 'models/worldMap';
import { createWorldBuilder } from './WorldMapBuilder';

const { connect } = require('react-redux');

interface IProps {
  world: IWorld;
  worldMap: IWorldMap;
  add: Redux.ActionCreator<IWorldAction>;
  remove: Redux.ActionCreator<IWorldAction>;
  loadWorldMap: Redux.ActionCreator<IWorldMapAction>;
}

@connect(
  (state) => ({ world: state.world, worldMap: state.worldMap }),
  (dispatch) => ({
    add: () => dispatch(add()),
    remove: () => dispatch(remove()),
    loadWorldMap: (worldMap) => dispatch(setWorldMap(worldMap))
  })
)

class Game extends React.Component<IProps, any> {

  public constructor(props) {
    super(props);
    this.state = {
      world: null
    };
  }

  public componentWillMount() {

    // let world = this.state.world;
    const { add, world, worldMap, loadWorldMap } = this.props;

    if (!world.world) {
      add();
    }

    if (!worldMap.worldMap) {
        fetch('assets/data/default_map.json').then((res) => {
          return res.json();
        }).then((data) => {

          loadWorldMap(data);
        });
    }
  }

  public render() {
    const { world, worldMap } = this.props;

    let groundTiles = [];

    if (world.world && worldMap.worldMap) {
      const worldBuilder = createWorldBuilder(worldMap);

      groundTiles = worldBuilder.BuildGroundTileComponents();
    }

    return (
      <div>
        {groundTiles}
      </div>
    );
  }
}

export { Game };

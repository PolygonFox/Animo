import * as React from 'react';
// import { Sphere as wSphere } from 'whs';
import * as THREE from 'three';

import { IWorld } from 'models/world';
import * as WHS from 'whs';

const { connect } = require('react-redux');

interface ITilesWithStoreProps {
  tileData: any;
  world?: IWorld;
}

@connect(
  (state) => ({ world: state.world })
)

class Tile extends React.Component<ITilesWithStoreProps, any> {
  public constructor(props) {
    super(props);
    this.state = {
      world: null,
      object: null,
      material: null
    };
  }

  public componentWillUnmount() {
    const { world } = this.props;
    world.world.remove(this.state.object);
    this.setState({ object: null });
  }

  public componentWillMount() {

    const { tileData } = this.props;

    if (!this.state.object) {

      const modelPath = `assets/models/tiles/tile_${tileData.id}.json`;

      const object = new WHS.Importer({
        url: modelPath,
        shadow: {
          receive: false
        },
        parser(geometry, materials) {

          if (materials !== undefined) {
            if (Array.isArray(materials)) {
              for (const material of materials) {
                material.flatShading = true;
              }
            } else {
              materials.flatShading = true;
            }
          }

          return new THREE.Mesh(geometry, materials);
        },
        position: {
          x: tileData.x,
          y: 0,
          z: tileData.y
        }
      });

      this.setState({ object });
    }
  }

  public render() {
    const { world } = this.props;

    if (world.world) {
      if (this.state.object) {
        world.world.add(this.state.object);
      }
    }

    return (
      null
    );
  }
}

export { Tile }

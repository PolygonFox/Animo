import * as React from 'react';
import * as WHS from 'whs';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
OBJLoader(THREE);

import { add, remove } from 'modules/world/';
import { IWorld } from 'models/world';
import { IWorldAction } from 'models/world';
const { connect } = require('react-redux');

interface IProps {
  world: IWorld;
  add: Redux.ActionCreator<IWorldAction>;
  remove: Redux.ActionCreator<IWorldAction>;
}

@connect(
  (state) => ({ world: state.world }),
  (dispatch) => ({
    add: () => dispatch(add()),
    remove: () => dispatch(remove())
  })
)

class Cube extends React.Component<IProps, any> {

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
    this.setState({object: null});
  }

  public componentWillMount() {

    // let world = this.state.world;
    const { add, world } = this.props;
    if (!world.world) {
      add();
    }

    if (!this.state.object) {

      // const loader = new THREE.JSONLoader();
      // const modelPath = 'assets/models/tiles/roadTile_001.obj';
      // const modelPath = 'assets/tile.json';
      const modelPath = 'assets/bob/bob.json';
      // loader.load(modelPath, (object) => {
      //     // // if you want to add your custom material
      //     // const materialObj = new THREE.MeshBasicMaterial({
      //     //     vertexColors: THREE.FaceColors,
      //     //     overdraw: 0.5
      //     // });
      //     // object.traverse((child) => {
      //     //     if (child instanceof THREE.Mesh) {
      //     //         child.material = materialObj;
      //     //     }
      //     // });

      //     // then directly add the object
      //     this.setState({object});
      // });

      const object = new WHS.Importer({
        url: modelPath,
        shadow: {
          receive: false
        },
        parser(geometry, material) {
          console.log(geometry, material);
          return new THREE.Mesh(geometry, material);
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        }
      });

      this.setState({object});

    }
  }

  public render() {
    const { world } = this.props;
    if (world.world) {
      if (this.state.object) {
        console.log('test + ', this.state.object, world.world);
        this.state.object.addTo(world.world);
      }
    }
    return (
      null
    );
  }
}

export { Cube }

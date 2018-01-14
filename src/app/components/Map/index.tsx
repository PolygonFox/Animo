import * as React from 'react';
import * as WHS from 'whs';
import * as THREE from 'three';

// const { connect } = require('react-redux');

interface IProps {
  parent: THREE.Object3D;
}

// @connect(
//   (state) => ({ world: state.world }),
//   (dispatch) => ({
//     add: () => dispatch(add()),
//     remove: () => dispatch(remove())
//   })
// )

class Map extends React.Component<IProps, any> {

  public constructor(props) {
    super(props);
    this.state = {
      object: null,
      material: null
    };
  }

  public componentWillUnmount() {
    const { parent } = this.props;
    parent.remove(this.state.object);
    this.setState({ object: null });
  }

  public componentWillMount() {

    if (!this.state.object) {

      const modelPath = 'assets/bob/bob.json';

      const object = new WHS.Importer({
        url: modelPath,
        shadow: {
          receive: false
        },
        parser(geometry, material) {
          console.log(geometry);
          return new THREE.Mesh(new THREE.BoxGeometry(1, 2, 0), material);
        },
        position: {
          x: 0,
          y: 10,
          z: 0,
        }
      });

      this.setState({ object });

    }
  }

  public render() {
    const { parent } = this.props;

    if (parent) {
      if (this.state.object) {
        parent.add(this.state.object.build());
      }
    }
    return (
      null
    );
  }
}

export { Map }

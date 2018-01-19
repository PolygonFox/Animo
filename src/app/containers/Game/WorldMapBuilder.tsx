import * as React from 'react';

import { IWorldMap } from 'models/worldMap';
import { Tile } from 'containers';

export interface IWorldBuilder {
    BuildGroundTileComponents(worldMapData: any);
}

class WorldBuilder implements IWorldBuilder {
    public worldMap: IWorldMap;

    constructor(worldMap: IWorldMap) {
        this.worldMap = worldMap;
    }
    public BuildGroundTileComponents(): any {
        let groundTiles = [];
        // add the custom ground tiles found in the worldmap data
        groundTiles = this.worldMap.worldMap.data.ground_tiles.map((tile, i) => (
            <Tile
                key={i}
                tileData={tile}
            />
        ));

        return groundTiles;
    }
}

export { WorldBuilder }

export function createWorldBuilder(worldMap: IWorldMap): WorldBuilder {
    return new WorldBuilder(worldMap);
}

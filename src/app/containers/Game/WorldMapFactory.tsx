import * as React from 'react';

import { IWorldMap } from 'models/worldMap';
import { Tile } from 'containers';

export interface IWorldMapFactory {
    obtainGroundTiles(worldMapData: any);
}

class WorldMapFactory implements IWorldMapFactory {
    public worldMap: IWorldMap;

    constructor(worldMap: IWorldMap) {
        this.worldMap = worldMap;
    }
    public obtainGroundTiles(): any {
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

export { WorldMapFactory }

export function createWorldMapFactory(worldMap: IWorldMap): WorldMapFactory {
    return new WorldMapFactory(worldMap);
}

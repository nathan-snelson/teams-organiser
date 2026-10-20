'use client'

import { useState } from "react";
import Tile from "./tile/tile";
import TileSkeleton from "./tile/tileSkeleton";
import Controls from "./controls/controls";
import styles from './organiser.module.css';
import { TileData } from "@/types";
import { generateTileId, dispositions } from "@/helper";

export default function Organiser() {
  const [tiles, setTiles] = useState<TileData[]>([
    { id: generateTileId(), disposition: null, factions: [] },
  ]);
  const [playerLimit, setPlayerLimit] = useState(5);
  const playerLimitReached = tiles.length >= playerLimit;
  const [allowDoubling, setAllowDoubling] = useState(false);

  const setTileDisposition = (tileId: number, name: string) => {
    const disposition = dispositions.find(
      (disposition) => disposition.name === name
    );

    if (!disposition) return;

    setTiles((currentTiles) =>
      currentTiles.map((tile) =>
        tile.id === tileId
          ? { ...tile, disposition }
          : tile
      )
    );
  };

  const addNewTile = () => {
    setTiles((currentTiles) => {
      return [
        ...currentTiles,
        { id: generateTileId(), disposition: null, factions: [] }
      ]
    })
  }

  const removeTile = (id: number) => {
    setTiles((currentTiles) => {
      return currentTiles.filter(currentTile => currentTile.id !== id)
    });
  }

  const updatePlayerLimit = (limit: number) => {
    const doubling = limit > 5;
    setAllowDoubling(doubling);
    setPlayerLimit(limit);
  }

  const addFaction = (tileId: number, newFaction: string) => {
      setTiles((currentTiles) =>
        currentTiles.map((tile) =>
          tile.id === tileId
            ? {
              ...tile,
              factions: [...tile.factions, newFaction]
            }
          : tile
      )
    );
  }

  const removeFaction = (tileId: number, oldFaction: string) => {
    setTiles((currentTiles) =>
      currentTiles.map((tile) =>
        tile.id === tileId
          ? {
            ...tile,
              factions: tile.factions.filter(
              (currentFaction) => currentFaction !== oldFaction
            ),
          }
        : tile
      )
    )
  }

  return (
    <>
      <div className={styles.organiser}>
        <div className={styles.content}>
          {tiles.map((tile) => (
            <Tile
              key={tile.id}
              tileId={tile.id}
              selectedDisposition={tile.disposition}
              factions={tile.factions}
              dispositionChangedAction={(name) =>
                setTileDisposition(tile.id, name)
              }
              removeTileAction={(id) =>
                removeTile(id)
              }
              addFactionAction={(tileId, newFaction) => addFaction(tileId, newFaction)}
              removeFactionAction={(tileId, oldFaction) => removeFaction(tileId, oldFaction)}
            />
          ))}

          {!playerLimitReached && (
            <TileSkeleton addNewTileAction={addNewTile}/>
          )}
        </div>

        <Controls
          tiles={tiles}
          allowDoubling={allowDoubling}
          setPlayerLimitAction={updatePlayerLimit}
        />
      </div>
    </>
    );
}

'use client'

import { useState } from "react";
import Tile from "./tile/tile";
import TileSkeleton from "./tile/tileSkeleton";
import styles from './monitor.module.css';
import { Disposition, TileData } from "@/types";
import { generateTileId } from "@/helper";

export default function Monitor() {
  const dispositions: Disposition[] = [
    { name: 'Priority Assets', colour: 'darkgoldenrod', tag: 'priority' },
    { name: 'Reconnaissance', colour: 'teal', tag: 'recon' },
    { name: 'Take and Hold', colour: 'green', tag: 'take' },
    { name: 'Purge the Foe', colour: 'red', tag: 'purge' },
    { name: 'Disruption', colour: 'blue', tag: 'disrupt' }
  ];

  const [tiles, setTiles] = useState<TileData[]>([
    { id: generateTileId(), disposition: null },
  ]);
  const [playerLimit, setPlayerLimit] = useState(5);
  const [playerLimitReached, setPlayerLimitReached] = useState(false);

  const setTileDisposition = (tileId: number, tag: string) => {
    const disposition = dispositions.find(
      (disposition) => disposition.tag === tag
    );

    if (!disposition) return;

    setTiles((currentTiles) =>
      currentTiles.map(tile =>
        tile.id === tileId
          ? { ...tile, disposition }
          : tile
      )
    );
  };

  const addNewTile = () => {
      setTiles((currentTiles) => {
      const limitReached = currentTiles.length + 1 >= playerLimit;
      if (limitReached) setPlayerLimitReached(!playerLimitReached);
      return [
        ...currentTiles,
        { id: generateTileId(), disposition: null }
      ]
    })
  }

  const removeTile = (id: number) => {
      setTiles((currentTiles) => {
          const limitReached = currentTiles.length - 1 >= playerLimit;
          if (!limitReached) setPlayerLimitReached(!playerLimitReached);
          return currentTiles.filter(currentTile => currentTile.id !== id)
      });
  }

  const remainingDispositions = dispositions.filter(
    (disposition) =>
      !tiles.some(
        (tile) => tile.disposition?.tag === disposition.tag
      )
  );

  return (
      <div className={styles.monitor}>
        <div className={styles.header}>
          <ul id="disposition-list" className={styles.dispositionlist}>
            {remainingDispositions.map((disposition) => (
              <li
                key={disposition.tag}
                style={{ backgroundColor: disposition.colour, color: disposition.colour }}
              >
                {disposition.name}
              </li>
            ))}
          </ul>

          <div className={styles.playercount}>
            <label htmlFor="team-size">Enter the maximum number of players</label>
            <input id="team-size" type="numeric" onChange={(e) => setPlayerLimit(Number(e.target.value))} />
          </div>
        </div>

        <div className={styles.content}>
          {tiles.map((tile) => (
            <Tile
              key={tile.id}
              tileId={tile.id}
              dispositions={dispositions}
              selectedDisposition={tile.disposition}
              dispositionChangedAction={(tag) =>
                setTileDisposition(tile.id, tag)
              }
              removeTileAction={(id) =>
                removeTile(id)
              }
            />
          ))}

          {!playerLimitReached && (
            <TileSkeleton addNewTileAction={addNewTile}/>
          )}
        </div>
      </div>
    );
}

'use client'

import { useState } from "react";
import Tile from "./tile/tile";
import TileSkeleton from "./tile/tileSkeleton";
import styles from './controls.module.css';
import { Disposition, TileData } from "@/types";
import { generateTileId } from "@/helper";

export default function Controls() {
  const dispositions: Disposition[] = [
    { name: 'Select Disposition', className: '', exclude: true, count: 0 },
    { name: 'Priority Assets', className: 'priority', count: 0 },
    { name: 'Reconnaissance', className: 'recon', count: 0 },
    { name: 'Take and Hold', className: 'take-and-hold', count: 0 },
    { name: 'Purge the Foe', className: 'purge', count: 0 },
    { name: 'Disruption', className: 'disruption', count: 0 }
  ];

  const [tiles, setTiles] = useState<TileData[]>([
    { id: generateTileId(), disposition: null },
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
        { id: generateTileId(), disposition: null }
      ]
    })
  }

  const removeTile = (id: number) => {
    setTiles((currentTiles) => {
      return currentTiles.filter(currentTile => currentTile.id !== id)
    });
  }

  const maxDispositionCount = allowDoubling ? 2 : 1;
  const dispositionsWithCounts = dispositions.map((disposition) => ({
    ...disposition,
    count: tiles.filter(
      (tile) => tile.disposition?.name === disposition.name
    ).length,
  }));

  const remainingDispositions = dispositionsWithCounts.filter(
    (disposition) =>
      !disposition.exclude &&
      disposition.count < maxDispositionCount
  );

  const updatePlayerLimit = (limit: number) => {
    const doubling = limit > 5;
    setAllowDoubling(doubling);
    setPlayerLimit(limit);
  }

  return (
      <div className={styles.controls}>
        <div className={styles.header}>
          <div className={styles['player-count']}>
            <label htmlFor="team-size">Maximum number of players</label>
            <input id="team-size" type="numeric" placeholder={playerLimit.toString()} onChange={(e) => updatePlayerLimit(Number(e.target.value))} />
          </div>

          <div className={styles['list-title']}>
            <span>Key</span>
            <ul id="disposition-key" className={styles['disposition-list']}>
              {dispositions.map((disposition) => (
                !disposition.exclude && (
                  <li
                    key={disposition.name}
                  >
                    <div
                        className={`${styles['disposition-indicator']} ${styles[disposition.className]}`}
                    />
                    <span>{disposition.name}</span>
                  </li>
                )
              ))}
            </ul>
          </div>

          <div className={styles['list-title']}>
            <span>Remaining Dispositions</span>
            <ul id="remaining-disposition-list" className={styles['disposition-list']}>
            {remainingDispositions.map((disposition) => (
              !disposition.exclude && (
                <li
                  key={'remaining-' + disposition.name}
                >
                  <div
                      className={`${styles['disposition-indicator']} ${styles[disposition.className]}`}
                  />
                  <span>{disposition.name}</span>
                  {
                    allowDoubling && (
                      <span>({ disposition.count } / 2)</span>
                    )
                  }
                </li>
              )
            ))}
            </ul>
          </div>
        </div>

        <div className={styles.content}>
          {tiles.map((tile) => (
            <Tile
              key={tile.id}
              tileId={tile.id}
              dispositions={dispositions}
              selectedDisposition={tile.disposition}
              dispositionChangedAction={(name) =>
                setTileDisposition(tile.id, name)
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

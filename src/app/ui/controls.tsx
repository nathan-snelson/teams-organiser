'use client'

import { useState } from "react";
import Tile from "./tile/tile";
import TileSkeleton from "./tile/tileSkeleton";
import styles from './controls.module.css';
import { Disposition, TileData } from "@/types";
import { generateTileId } from "@/helper";

export default function Controls() {
  const dispositions: Disposition[] = [
    { name: 'Select Disposition', colour: '', tag: '', exclude: true, count: 0 },
    { name: 'Priority Assets', colour: 'darkgoldenrod', tag: 'priority', count: 0 },
    { name: 'Reconnaissance', colour: 'teal', tag: 'recon', count: 0 },
    { name: 'Take and Hold', colour: 'green', tag: 'take', count: 0 },
    { name: 'Purge the Foe', colour: 'red', tag: 'purge', count: 0 },
    { name: 'Disruption', colour: 'blue', tag: 'disrupt', count: 0 }
  ];

  const [tiles, setTiles] = useState<TileData[]>([
    { id: generateTileId(), disposition: null },
  ]);
  const [playerLimit, setPlayerLimit] = useState(5);
  const playerLimitReached = tiles.length >= playerLimit;
  const [allowDoubling, setAllowDoubling] = useState(false);

  const setTileDisposition = (tileId: number, tag: string) => {
    const disposition = dispositions.find(
      (disposition) => disposition.tag === tag
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
      (tile) => tile.disposition?.tag === disposition.tag
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
          <div className={styles.playercount}>
            <label htmlFor="team-size">Maximum number of players</label>
            <input id="team-size" type="numeric" placeholder={playerLimit.toString()} onChange={(e) => updatePlayerLimit(Number(e.target.value))} />
          </div>

          <div className={styles.listtitle}>
            <span>Key</span>
            <ul id="disposition-key" className={styles.dispositionlist}>
              {dispositions.map((disposition) => (
                !disposition.exclude && (
                  <li
                    key={disposition.tag}
                  >
                    <div className={styles.dispositionindicator} style={{ backgroundColor: disposition.colour }}></div>
                    <span>{disposition.name}</span>
                  </li>
                )
              ))}
            </ul>
          </div>

          <div className={styles.listtitle}>
            <span>Remaining Dispositions</span>
            <ul id="remaining-disposition-list" className={styles.dispositionlist}>
            {remainingDispositions.map((disposition) => (
              !disposition.exclude && (
                <li
                  key={'remaining-' + disposition.tag}
                >
                  <div className={styles.dispositionindicator} style={{ backgroundColor: disposition.colour }}></div>
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

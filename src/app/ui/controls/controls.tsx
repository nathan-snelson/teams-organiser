'use client'

import TopBar from "../topBar/topBar";
import styles from './controls.module.css';
import { TileData } from "@/types";
import { dispositions } from "@/helper";

type ControlsProps = {
  tiles: TileData[];
  setPlayerLimitAction: (limit: number) => void;
  allowDoubling: boolean
}

export default function Controls({ tiles, setPlayerLimitAction, allowDoubling }: ControlsProps) {
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

  return (
    <>
      <div className={styles.controls}>
        <div className={styles['control-bar']}>
          <TopBar></TopBar>
        </div>

        <div className={styles.header}>
          <div className={styles['player-count']}>
            <label htmlFor="team-size">Maximum number of players</label>
            <input id="team-size" type="numeric" placeholder="5" onChange={(e) => setPlayerLimitAction(Number(e.target.value))} />
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
      </div>
    </>
    );
}

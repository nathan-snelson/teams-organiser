'use client'

import { useState } from "react";
import { Disposition } from "@/types";
import styles from './tile.module.css';
import { dispositions } from "@/helper";

type TileProps = {
  dispositionChangedAction: (disposition: string) => void;
  selectedDisposition: Disposition | null;
  removeTileAction: (id: number) => void;
  tileId: number;
  factions: string[];
  addFactionAction: (tileId: number, faction: string) => void;
  removeFactionAction: (tileId: number, faction: string) => void;
};

export default function Tile({ dispositionChangedAction, selectedDisposition, removeTileAction, tileId, factions, addFactionAction, removeFactionAction }: TileProps) {
  const [newFaction, setNewFaction] = useState("");
  const [show, setIsShow] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState("Players name");
  const allowNewFaction = factions.length <= 2
  const id = tileId;

  const toggleShow = () => {
    setIsShow(!show);
  }

  const toggleSetEditTitle = () => {
    setEditTitle(!editTitle);
  }

  return (
    <div className={styles.tile}>
      {
        selectedDisposition && (
          <div
            className={`${styles['indicator']} ${styles[selectedDisposition.className]}`}
          />
        )
      }

      <div className={styles.title} onPointerLeave={() => setEditTitle(false)}>
        {
          editTitle ? (
            <>
              <input
                id="player-name-input"
                className={styles['header-input']}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <button className={styles['save-button']} onClick={toggleSetEditTitle}>Save</button>
            </>
          ) : (
            <>
              <h2 onClick={toggleSetEditTitle}> { title } </h2>

              <button className={styles['close-button']} onClick={() => removeTileAction(id)}>X</button>
            </>
          )
        }
      </div>

      <div className={styles.content}>
        <ul id="faction-list">
          {factions.map((faction) => (
            <li key={faction}>
              {faction}
              <button className={styles['faction-remove-button']} onClick={() => removeFactionAction(id, faction)}>X</button>
            </li>
          ))}
          <li style={{ display: allowNewFaction ? 'flex' : 'none' }} onPointerLeave={() => setIsShow(false)}>
            {
              show ? (
                <input
                  className={styles['faction-input']}
                  placeholder="Faction.."
                  onChange={(e) => setNewFaction(e.target.value)}
                />
              ) : (
                  allowNewFaction && (
                    <span onClick={toggleShow} style={{ width: '75%' }}>Click to add a faction</span>
                  )
              )
            }

            <button className={styles['faction-button']} style={{ display: show ? 'block' : 'none'}} onClick={() => addFactionAction(id, newFaction)}>+</button>
          </li>
        </ul>

        <hr />

        <div>
          <select
            className={styles['disposition-select']}
            id="disposition-select"
            value={selectedDisposition?.name ?? ""}
            onChange={(e) => dispositionChangedAction(e.target.value)}
          >
            {dispositions.map((disposition) => (
              <option
                key={disposition.name}
                value={disposition.name}
              >
                {disposition.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

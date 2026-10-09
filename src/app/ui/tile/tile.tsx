'use client'

import { useState } from "react";
import { Disposition } from "@/types";
import styles from './tile.module.css';

type TileProps = {
  dispositionChangedAction: (disposition: string) => void;
  dispositions: Disposition[];
  selectedDisposition: Disposition | null;
  removeTileAction: (id: number) => void;
  tileId: number;
};

export default function Tile({ dispositionChangedAction, dispositions, selectedDisposition, removeTileAction, tileId }: TileProps) {
  const [factions, setFactions] = useState<string[]>([]);
  const [newFaction, setNewFaction] = useState("");
  const [show, setIsShow] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState("Players name");
  const [allowNewFaction, setAllowNewFaction] = useState(true);
  const id = tileId;

  const addFaction = () => {
    setFactions((currentFactions) => [
      ...currentFactions,
      newFaction,
    ]);
    setIsShow(false);
    setNewFaction('');

    const limitReached = factions.length >= 2;
    if (limitReached) {
      setAllowNewFaction(false);
    };
  }

  const toggleShow = () => {
    setIsShow(!show);
  }

  const toggleSetEditTitle = () => {
    setEditTitle(!editTitle);
  }

  const removeFaction = (faction: string) => {
    setFactions((currentFactions) => {
      const filteredList = currentFactions.filter(currentFaction => currentFaction !== faction);
      const underLimit = filteredList.length < 3;
      if (underLimit) {
        setAllowNewFaction(true);
      }

      return filteredList;
    })
  };

  return (
    <div className={styles.tile}>
      <div className={styles.indicator} style={{ backgroundColor: selectedDisposition?.colour }}></div>

      <div className={styles.title}>
        {
          editTitle ? (
            <>
              <input
                id="player-name-input"
                className={styles.headerinput}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <button className={styles.savebutton} onClick={toggleSetEditTitle}>Save</button>
            </>
          ) : (
            <>
              <h2 onClick={toggleSetEditTitle}> { title } </h2>

              <button className={styles.closebutton} onClick={() => removeTileAction(id)}>X</button>
            </>
          )
        }

      </div>

      <div className={styles.content}>
        <ul id="faction-list">
          {factions.map((faction) => (
            <li key={faction}>
              {faction}
              <button className={styles.factionremovebutton} onClick={() => removeFaction(faction)}>X</button>
            </li>
          ))}
          <li style={{ display: allowNewFaction ? 'flex' : 'none' }}>
            {
              show ? (
                <input
                  className={styles.factioninput}
                  placeholder="Faction.."
                  value={newFaction}
                  onChange={(e) => setNewFaction(e.target.value)}
                />
              ) : (
                  allowNewFaction && (
                    <span style={{ width: '75%' }}>Please add a faction</span>
                  )
              )
            }

            <button className={styles.factionbutton} onClick={ show ? addFaction : toggleShow }>Add</button>
          </li>
        </ul>

        <hr />

        <div>
          <select
            className={styles.dispositionselect}
            id="disposition-select"
            value={selectedDisposition?.tag ?? ""}
            onChange={(e) => dispositionChangedAction(e.target.value)}
          >
            {dispositions.map((disposition) => (
              <option
                key={disposition.tag}
                value={disposition.tag}
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

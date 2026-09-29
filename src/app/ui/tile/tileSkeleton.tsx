import styles from './tileSkeleton.module.css';

type TileSkeletonProps = {
  addNewTileAction: () => void;
}

export default function TileSkeleton({ addNewTileAction }: TileSkeletonProps) {
  return (
    <div onClick={addNewTileAction} className={styles.skeletonTile}>
      <div className={styles.skeletonTitle}></div>

      <div className={styles.content}>
        <ul>
          <li>
            <div className={styles.skeletonLine}></div>
          </li>

          <li>
            <div className={styles.skeletonLine}></div>
          </li>

          <li>
            <div className={styles.skeletonLine}></div>
          </li>
        </ul>

        <hr />

        <div>
          <div className={styles.skeletonSelect}></div>
        </div>
      </div>
    </div>
  )
}

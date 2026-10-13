import styles from './tileSkeleton.module.css';

type TileSkeletonProps = {
  addNewTileAction: () => void;
}

export default function TileSkeleton({ addNewTileAction }: TileSkeletonProps) {
  return (
    <div onClick={addNewTileAction} className={styles['skeleton-tile']}>
      <div className={styles['skeleton-title']}></div>

      <div className={styles.content}>
        <ul>
          <li>
            <div className={styles['skeleton-line']}></div>
          </li>

          <li>
            <div className={styles['skeleton-line']}></div>
          </li>

          <li>
            <div className={styles['skeleton-line']}></div>
          </li>
        </ul>

        <hr />

        <div>
          <div className={styles['skeleton-select']}></div>
        </div>
      </div>
    </div>
  )
}

import styles from './tileSkeleton.module.css';

type TileSkeletonProps = {
  addNewTileAction: () => void;
}

export default function TileSkeleton({ addNewTileAction }: TileSkeletonProps) {
  return (
    <div onClick={addNewTileAction} className={styles['skeleton-tile']}>
      <span>Click to add another player</span>
    </div>
  )
}

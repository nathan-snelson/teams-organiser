export type Disposition = {
  name: string;
  className: string;
  exclude?: boolean;
  count: number;
}

export type TileData = {
  id: number;
  disposition: Disposition | null;
  factions: string[]
}

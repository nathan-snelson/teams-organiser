export type Disposition = {
  name: string;
  colour: string;
  tag: string;
  exclude?: boolean;
  count: number;
}

export type TileData = {
  id: number;
  disposition: Disposition | null;
}

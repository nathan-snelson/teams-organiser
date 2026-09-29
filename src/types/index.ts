export type Disposition = {
  name: string;
  colour: string;
  tag: string;
}

export type TileData = {
  id: number;
  disposition: Disposition | null;
}

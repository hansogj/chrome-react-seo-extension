export interface Artist {
  anv: string;
  id: number;
  join: string;
  name: string;
  resource_url: string;
  role: string;
  tracks: string;
}

export interface Format {
  name: string;
  qty: string;
  descriptions: string[];
}

export interface Tracklist {
  duration: string;
  position: string;
  type_: string;
  title: string;
  extraartists?: Artist[];
}

export interface Image {
  height: number;
  resource_url: string;
  type: string;
  uri: string;
  uri150: string;
  width: number;
}

export interface Tracklist {
  duration: string;
  position: string;
  title: string;
  type_: string;
}

export interface Video {
  description: string;
  duration: number;
  embed: boolean;
  title: string;
  uri: string;
}

export type TrackData = {
	id: number;
	title: string;
	duration: number;
};

export type Track = TrackData & {
	preview: string;
	position: number;
	artist: Artist;
	album: Album;
	contributors: Artist[];
};

export type Artist = {
	id: number;
	name: string;
	picture_medium: string;
};

export type ArtistDetails = Artist & {
	nb_album: number;
	nb_fan: number;
};

export type Album = {
	id: number;
	title: string;
	cover_medium: string;
	artist: Artist;
	release_date?: string;
	record_type?: string;
	explicit_lyrics?: boolean;
};

export type AlbumDetails = Album & {
	nb_tracks: number;
	duration: number;
	label: string;
	explicit_lyrics: boolean;
	record_type: string;
	tracks: { data: Track[] };
};

export type Chart = {
	tracks: Track[];
	albums: Album[];
	artists: Artist[];
};

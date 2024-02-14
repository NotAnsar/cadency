export type TrackData = {
	id: string;
	title: string;
	duration: number;
};

export type Track = TrackData & {
	preview: string;
	position: number;
	artist: Artist;
	album: Album;
};

export type Artist = {
	id: string;
	name: string;
	picture: string;
	tracklist: string;
};

export type ArtistDetails = Artist & {
	picture_medium: string;
	nb_album: number;
	nb_fan: number;
};

export type Album = {
	id: string;
	title: string;
	cover_medium: string;
	artist: Artist;
	release_date?: string;
	record_type?: string;
};

export type AlbumDetails = Album & {
	nb_tracks: number;
	duration: number;
	label: string;
	explicit_lyrics: boolean;
	tracks: { data: Track[] };
};

export type Chart = {
	tracks: Track[];
	albums: Album[];
	artists: Artist[];
};

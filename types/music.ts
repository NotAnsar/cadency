export type Track = {
	id: string;
	title: string;
	duration: number;
	preview: string;
	position: number;
	artist: Artist;
	album: Album;
};

export type Artist = {
	id: string;
	name: string;
	picture: 'https://api.deezer.com/artist/14235001/image';
	tracklist: 'https://api.deezer.com/artist/14235001/top?limit=50';
	position: 1;
};

export type Album = {
	id: string;
	title: string;
	cover_medium: string;
	tracklist: string;
	artist: Artist;
};

export type Chart = {
	tracks: Track[];
	albums: Album[];
	artists: Artist[];
};

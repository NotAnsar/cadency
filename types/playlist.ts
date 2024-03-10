export type TracksDB = {
	id: string;
	playlistId: string;
	trackId: string;
	createdAt: Date;
	updatedAt: Date;
};

type UserDB = {
	id: string;
	email: string;
	name: string | null;
	image: string | null;
	created_at: Date;
	updated_at: Date | null;
};

export type Playlist = {
	id: string;
	userId: string;
	name: string;
	description: string | null;
	image: string | null;
	createdAt: Date;
	updatedAt: Date;
	tracks: TracksDB[];
	user: UserDB;
	_count: { tracks: number; user?: number };
};

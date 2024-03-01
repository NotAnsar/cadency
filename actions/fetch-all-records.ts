import { url } from '@/lib/db';
import axios from 'axios';

export async function getArtistRecords(
	id: string,
	page: number = 1,
	limit: number = 10
): Promise<RecordResponse | null> {
	try {
		const index = (page - 1) * limit;
		const response = await axios.get(
			`${url}/artist/${id}/albums?limit=${limit}&index=${index}`
		);

		const data = response.data;

		if (data.error) throw new Error(data.error);

		return data;
	} catch (error) {
		console.error(error);

		return null;
	}
}

export type Record = {
	id: number;
	title: string;
	cover_medium: string;
	release_date: string;
	record_type: string;
	explicit_lyrics: false;
};

export type RecordResponse = {
	data: Record[];
	total: number;
	prev?: string;
	next?: string;
};

import { url } from '@/lib/api/url';
import { RecordResponse } from '@/types/music';
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

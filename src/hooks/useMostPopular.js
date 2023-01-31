import { useQuery } from 'react-query';
import axios from 'axios';
import { MOST_POPULAR } from '../API/constants';

const staleOneDay = 24 * 60 * 60 * 1000;

export const getMostPopular = async () => {
	const url = MOST_POPULAR;
	const response = await axios.get(url);

	if (typeof response.data === 'string') {
		throw new Error('Error in getCharacter');
	}

	return response.data;
};

export default function useMostPopular() {
	return useQuery(['popular'], () => getMostPopular(), {
		staleTime: staleOneDay
	});
}

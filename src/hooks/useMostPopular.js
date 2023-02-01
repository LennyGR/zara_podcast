import { useQuery } from 'react-query';
import axios from 'axios';
import { MOST_POPULAR, staleOneDay } from '../API/constants';

export const getMostPopular = async () => {
	const url = MOST_POPULAR;
	const response = await axios.get(url);

	if (typeof response.data === 'string') {
		throw new Error('Error in getMostPopular');
	}

	return response.data;
};

export default function useMostPopular() {
	return useQuery(['popular'], () => getMostPopular(), {
		staleTime: staleOneDay
	});
}

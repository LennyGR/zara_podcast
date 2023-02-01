import { useQuery } from 'react-query';
import axios from 'axios';
import { DETAIL, staleOneDay } from '../API/constants';

export const getDetail = async (id) => {
	const url = `${DETAIL}${id}`;
	const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
	const response = await axios.get(proxy);

	if (typeof response.data === 'string') {
		throw new Error('Error in getDetail');
	}

	return response.data;
};

export default function useDetail(id) {
	return useQuery(['detail', id], () => getDetail(id), {
		staleTime: staleOneDay
	});
}

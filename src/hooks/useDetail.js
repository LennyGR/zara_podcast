import { useQuery } from 'react-query';
import axios from 'axios';
import { DETAIL, staleOneDay } from '../API/constants';
import { wrapProxy } from '../API/utils';

export const getDetail = async (id) => {
	const url = `${DETAIL}${id}&entity=podcast`;
	const proxy = wrapProxy(url);
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

import { useQuery } from 'react-query';
import axios from 'axios';
import { staleOneDay } from '../API/constants';
import { parseStringPromise } from 'xml2js';
// import { xml2json } from 'xml-js';

export const getUrl = async (url) => {
	const response = await axios.get(url);

	const headersContentType = response.headers?.['content-type'];
	const isString = typeof response.data === 'string';

	if (headersContentType?.includes('json') && isString) {
		throw new Error('Error in getFeed');
	}

	if (headersContentType?.includes('xml') && isString) {
		return await parseStringPromise(response.data);
	}

	return response.data;
};

export default function useFeed({ data, isLoading, isError }) {
	let feedUrl = null;
	if (data && !isLoading && !isError) {
		const contents = JSON.parse(data?.contents);
		feedUrl = contents?.results[0]?.feedUrl;
	}

	return useQuery(['feed', feedUrl], () => getUrl(feedUrl), {
		staleTime: staleOneDay,
		enabled: feedUrl !== null
	});
}

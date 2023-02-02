import { useQuery } from 'react-query';
import axios from 'axios';
import { rssBase64, staleOneDay } from '../API/constants';
import { parseStringPromise } from 'xml2js';
import { b64ToUtf8, wrapProxy } from '../API/utils';

export const getRss = async (url) => {
	let response = null;
	// PERFORMANCE: we only use proxy if it's necessary, because implies a long delay
	try {
		response = await axios.get(url);
	} catch (e) {
		if (e.code === 'ERR_NETWORK') {
			response = await axios.get(wrapProxy(url));
		}
	}

	const headersContentType = response.headers?.['content-type'];
	const isString = typeof response.data === 'string';
	const data = response?.data?.contents || response?.data;

	if (headersContentType?.includes('json') && isString) {
		throw new Error('Error in getFeed');
	}

	if (data?.includes(rssBase64)) {
		const base64Encoded = data.replace(rssBase64, '');
		const base64Decoded = b64ToUtf8(base64Encoded);
		return await parseStringPromise(base64Decoded);
	}

	return await parseStringPromise(data);
};

export default function useFeed({ data, isLoading, isError }) {
	let feedUrl = null;
	if (data && !isLoading && !isError) {
		const contents = JSON.parse(data?.contents);
		feedUrl = contents?.results[0]?.feedUrl;
	}

	return useQuery(['feed', feedUrl], () => getRss(feedUrl), {
		staleTime: staleOneDay,
		enabled: feedUrl !== null
	});
}

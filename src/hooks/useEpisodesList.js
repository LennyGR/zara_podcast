import { useMemo } from 'react';

const useEpisodesList = (list) => {
	const data = useMemo(() => {
		const formatDate = (stringDate) => {
			if (stringDate) {
				const _date = new Date(stringDate);
				return `${_date.getDate()}/${
					_date.getMonth() + 1
				}/${_date.getFullYear()}`;
			}

			return '';
		};

		const formatDuration = (secondsString) => {
			if (!isNaN(secondsString)) {
				const minutes = Math.trunc(+secondsString / 60);
				const seconds = +secondsString % 60;
				return `${minutes}:${seconds.toString().padStart(2, '0')}`;
			}

			return secondsString;
		};

		return list?.rss?.channel?.[0]?.item?.map((item) => ({
			title: item?.title[0],
			date: formatDate(item?.pubDate[0]),
			duration: formatDuration(item?.['itunes:duration']?.[0])
		}));
	}, []);

	const columns = useMemo(
		() => [
			{
				Header: 'Title',
				accessor: 'title'
			},
			{
				Header: 'Date',
				accessor: 'date'
			},
			{
				Header: 'Duration',
				accessor: 'duration'
			}
		],
		[]
	);

	return { data, columns };
};

export default useEpisodesList;

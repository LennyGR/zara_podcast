import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EpisodeDetail from '../../components/EpisodeDetail';
import Info from '../../components/Info';
import useDetail from '../../hooks/useDetail';
import useFeed from '../../hooks/useFeed';
import { getPodcast } from '../../redux/selectors/podcastSelector';

const Episode = () => {
	const { podcastId, episodeId } = useParams();
	const podcast = useSelector((state) => getPodcast(state, podcastId));

	const {
		data: dataDetail,
		isLoading: isLoadingDetail,
		isError: isErrorDetail
	} = useDetail(podcastId);

	const {
		data: dataFeed,
		isLoading: isLoadingFeed,
		isError: isErrorFeed
	} = useFeed({
		data: dataDetail,
		isError: isErrorDetail,
		isLoading: isLoadingDetail
	});

	if (dataFeed && !isLoadingFeed && !isErrorFeed) {
		// console.log({ dataFeed });
		const episode = dataFeed?.rss?.channel?.[0]?.item[episodeId];
		return (
			<div className='podcast__Container'>
				<div className='aside'>{podcast && <Info podcast={podcast} />}</div>
				<div className='main'>
					<EpisodeDetail data={episode} />
				</div>
			</div>
		);
	}

	return null;
};

export default Episode;

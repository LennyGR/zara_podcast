import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EpisodesList from '../../components/EpisodesList';
import Info from '../../components/Info';
import useDetail from '../../hooks/useDetail';
import useFeed from '../../hooks/useFeed';
import { getPodcast } from '../../redux/selectors/podcastSelector';

const Podcast = () => {
	const { podcastId } = useParams();
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
		console.log({ dataFeed });
	}

	return (
		<div className='podcast__Container'>
			<div className='aside'>{podcast && <Info podcast={podcast} />}</div>
			<div className='main'>
				{dataFeed && <EpisodesList list={dataFeed} podcastId={podcastId} />}
			</div>
		</div>
	);
};

export default Podcast;

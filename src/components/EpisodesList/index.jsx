// import { useMemo } from 'react';
import PropTypes from 'prop-types';
import Table from '../Table';
import { useNavigate } from 'react-router-dom';
import useEpisodesList from '../../hooks/useEpisodesList';

const EpisodesList = ({ list, podcastId }) => {
	const { data, columns } = useEpisodesList(list);
	const navigate = useNavigate();

	const navigateToEpisode = (episodeId) => {
		navigate(`/podcast/${podcastId}/episode/${episodeId}`);
	};

	const renderCell = (cell) => {
		if (cell?.column?.id === 'title') {
			return (
				<span
					className='episodes link'
					onClick={() => {
						navigateToEpisode(cell?.row?.index);
					}}
				>
					{cell.render('Cell')}
				</span>
			);
		}

		return cell.render('Cell');
	};

	if (data) {
		return (
			<div className='episodes'>
				<div className='episodes__header'>{`Episodes: ${data.length}`}</div>
				<div className='episodes__main'>
					<Table columns={columns} data={data} overrideCell={renderCell} />
				</div>
			</div>
		);
	}

	return null;
};

EpisodesList.propTypes = {
	list: PropTypes.any.isRequired,
	podcastId: PropTypes.string
};

export default EpisodesList;

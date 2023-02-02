import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const EpisodeDetail = ({ data }) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [src, setSrc] = useState('');
	const [type, setType] = useState('');

	useEffect(() => {
		const _title = data?.title?.[0];
		setTitle(_title);
		const paragraph = data?.['content:encoded']?.[0];
		setContent(paragraph);
		const _src = data?.enclosure?.[0]?.$?.url;
		setSrc(_src);
		const _type = data?.enclosure?.[0]?.$?.type;
		setType(_type);
	}, []);

	return (
		<div className='episodes__main'>
			<span className='title'>{title}</span>
			<div
				className='description'
				dangerouslySetInnerHTML={{ __html: content }}
			/>
			<audio controls='controls' crossOrigin='anonymous' src={src}>
				<source src={src} type={type} />
				<a href={src}>{src}</a>
			</audio>
		</div>
	);
};

EpisodeDetail.propTypes = {
	data: PropTypes.any.isRequired
};

export default EpisodeDetail;

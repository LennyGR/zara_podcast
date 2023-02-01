export const STORE_POPULAR = 'STORE_POPULAR';

export const setPopular = (podcasts) => ({
	type: STORE_POPULAR,
	payload: podcasts
});

export const storePopular = (data) => {
	return async (dispatch) => {
		// clean data before storing
		const popular = data?.feed?.entry?.map((item) => {
			Object.keys(item).forEach((prop) => {
				if (prop.includes('im:')) {
					const newProp = prop.replace('im:', '');
					item[newProp] = prop === 'im:image' ? item[prop][2] : item[prop];
					delete item[prop];
				}
			});
			// concat name+artist <- performance improvement in search
			item.searchText = `${item?.artist?.label} ${item?.name?.label}`;
			// id
			item.cleanId = item?.id?.attributes?.['im:id'];
			return item;
		});
		dispatch(setPopular(popular));
	};
};

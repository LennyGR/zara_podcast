export const STORE_POPULAR = 'STORE_POPULAR';

export const setPopular = (podcasts) => ({ type: STORE_POPULAR, payload: podcasts});
 
export const storePopular = data => {
    return async(dispatch) => {
        //clean data before storing
        const popular = data?.feed?.entry?.map((item) => {
            Object.keys(item).forEach(prop => {
                if (prop.includes('im:')) {
                    const newProp = prop.replace('im:','');
                    item[newProp] = (prop === 'im:image')? item[prop][2] : item[prop];
                    delete item[prop];
                }
            });
            //concat name+artist
            item['searchText'] = `${item['artist'].label} ${item['name'].label}`;  
            return item;
        });
        dispatch(setPopular(popular))
    }
}
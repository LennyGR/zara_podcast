import { createSelector } from 'reselect';
import { getSearchText } from './searchSelector';

export const getAllPopulars = (state) => state?.podcasts?.popular;

export const getFilteredPopulars = createSelector(
    [getAllPopulars, getSearchText],
    (populars, searchText) => populars?.filter(pod => 
        pod?.searchText?.toUpperCase().includes(searchText.toUpperCase()))
);
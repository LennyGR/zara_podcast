import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../redux/actions/search";
import { getFilteredPopulars } from "../../redux/selectors/podcastSelector";
import { getSearchText } from "../../redux/selectors/searchSelector";

const Searcher = () => {
    const dispatch = useDispatch();
    const searchText = useSelector(getSearchText);
    const results = useSelector(getFilteredPopulars);
    const textRef = useRef(null);
    let timer = 0;

    useEffect(() => {
        textRef.current.value = searchText;
    
        return () => {
          clearTimeout(timer);
        };
    }, []);

    const onSearchTextChanged = (value) => {
        dispatch(setSearchText(value));
    };
    
    const debounceSearchTextChanged = useCallback((event) => {
        clearTimeout(timer);
        const value = event.target.value;
        timer = setTimeout(() => {
          onSearchTextChanged(value);
        }, 250);
    }, []);

    return (<div className="search__Container--inner">
        <div className="search__badge">{results.length}</div>
        <input 
            placeholder={'Filter podcasts...'}
            onChange={debounceSearchTextChanged}
            ref={textRef}
        />
    </div>);
}

export default Searcher;
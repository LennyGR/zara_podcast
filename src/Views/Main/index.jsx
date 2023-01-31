import { useSelector } from "react-redux";
import PreviewCard from "../../components/PreviewCard";
import Searcher from "../../components/Searcher";
import { getPopulars } from "../../redux/selectors/podcastSelector";

const Main = () => {
    const populars = useSelector(getPopulars)
    return (<>
        <div className="search__Container--main">
            <Searcher/>
        </div>
        <div className="grid--main">
        {
            populars?.map((podcast,index) => {
                return (<PreviewCard podcast={podcast} key={`pcard_${index}`}></PreviewCard>)
            })
        }
        </div>
    </>);
}

export default Main;
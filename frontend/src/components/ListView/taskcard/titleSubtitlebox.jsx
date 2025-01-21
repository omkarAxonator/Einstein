import Title from "./title";
import Subtitle from "./subTitle";
import { toTitleCase } from "../../../helper/helper";
function TitleSubtitlebox({title,subtitle}) {
    return (
        <div className="ps-2">
        <Title title={toTitleCase(title)}/>
        <Subtitle subtitle={subtitle}/>
        </div>
    );
}

export default TitleSubtitlebox
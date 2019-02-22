import React from "react";
import { leveler } from "../../../utils/scrapers/sorting";
import { competativeScraper } from "../../../utils/scrapers/hashtagArray";

const CompetitionLevel = ({ data, isFecthing, activeTab }) => {
  const string = competativeScraper(data);
  const competation = string
    ? string[0].replace(`"edge_hashtag_to_media":{"count":`, "")
    : 0;

  return (competation === 0 || (isFecthing || activeTab === "builder")) ? null : (
    <div className="result">
      <h3>Posts: {competation}</h3>
      <h4>{leveler(Number(competation))}</h4>
    </div>
  );
};

export default CompetitionLevel;

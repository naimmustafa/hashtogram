import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiPlusCircle } from "react-icons/fi";
import { commonSorted } from "../../../utils/scrapers/sorting";

const MostCommonHashtags = ({
  data,
  builder,
  activeTab,
  isFecthing,
  addRemoveTagstoBuilder
}) => {
  const sorted = commonSorted(data);
  return sorted.map((item, index) => {
    if (
      data.length > 0 &&
      item.length === 30 &&
      activeTab === "mostused" &&
      !isFecthing
    ) {
      return (
        <div key={index} className="result">
          <h3>Most Used</h3>
          {item.map((tag, index) =>
            tag !== "undefined" ? (
              <button
                className="builder-buttons"
                key={index}
                style={
                  builder.includes(tag)
                    ? { backgroundColor: "rgba(72, 244, 66, 0.5)" }
                    : {}
                }
                onClick={() => {
                  addRemoveTagstoBuilder(tag)
                }}
              >
                {tag} <FiPlusCircle />
              </button>
            ) : null
          )}
          <div>
            <CopyToClipboard text={item.join().replace(/[ ]*,[ ]*|[ ]+/g, " ")}>
              <button className="copy">Copy Tags</button>
            </CopyToClipboard>
          </div>
        </div>
      );
    } else {
      return null;
    }
  });
};

export default MostCommonHashtags;

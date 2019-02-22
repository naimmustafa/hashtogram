import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiMinusCircle } from "react-icons/fi";

const Builders = ({ builder, removeTag, clearTags, activeTab }) => {
  const tags = builder;
  return activeTab !== "builder" ? null : builder.length > 0 ? (
    <div className="result">
      <h3>Builder {builder.length}</h3>
      {builder.map((tag, index) =>
        tag !== "undefined" ? (
          <button
            className="builder-buttons"
            key={index}
            onClick={() => {
              let index = tags.indexOf(tag);
              tags.splice(index, 1);
              removeTag(tags);
            }}
          >
            {tag} <FiMinusCircle />
          </button>
        ) : null
      )}
      <div>
        <CopyToClipboard text={builder.join().replace(/[ ]*,[ ]*|[ ]+/g, " ")}>
          <button className="copy">Copy Tags</button>
        </CopyToClipboard>
        <button className="copy" onClick={() => clearTags()}>
          Clear All
        </button>
      </div>
    </div>
  ) : (
    <div className="result">
      <h3>Builder</h3>
      <p>Added tags will be displayed here</p>
    </div>
  );
};

export default Builders;

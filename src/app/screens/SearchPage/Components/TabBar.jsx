import React from "react";

const TabBar = ({ activeTab, builder, changeTab, data }) => {
  return data.length > 0 ? (
    <div className="tab">
      <button
        className="tablinks"
        style={activeTab === "popular" ? { backgroundColor: "#ddd" } : {}}
        onClick={() => changeTab("popular")}
      >
        Popular Tags
      </button>
      <button
        className="tablinks"
        style={activeTab === "mostused" ? { backgroundColor: "#ddd" } : {}}
        onClick={() => changeTab("mostused")}
      >
        Most Used Tags
      </button>
      <button
        className="tablinks"
        style={activeTab === "builder" ? { backgroundColor: "#ddd" } : {}}
        onClick={() => changeTab("builder")}
      >
        Builder {builder.length > 0 ? builder.length : null}
      </button>
    </div>
  ) : null
};

export default TabBar;

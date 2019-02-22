import React from "react";

const Photos = ({ data, isFecthing, activeTab }) => {
  const width = window.innerWidth;
  const re = new RegExp(
    "(http(s?):)([/_=?|.|\\w||\\s|-])*\\640x640([/_=?|.|\\w||\\s|-])*\\.(?:jpg|gif|png)([/_=?|.|\\w||\\s|-])*\\.(?:com)",
    "g"
  );
  if (data.length > 0 && !isFecthing && activeTab !== "builder") {
    const links = data.match(re);
    const unique = [...new Set(links)];
    return unique.map((image, index) => (
      <a href={image} key={index} target={image}>
        <img
          className="instagram-images"
          style={
            width < 600
              ? {
                  width: 50,
                  height: 50,
                  marginLeft: 5,
                  marginRight: 5,
                  marginBottom: 5
                }
              : { width: 150, height: 150 }
          }
          src={image}
          alt=""
        />
      </a>
    ));
  }
  return null;
};

export default Photos;

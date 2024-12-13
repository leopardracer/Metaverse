import React, { useState } from "react";
import "./mainNews.scss";

import useWindowSize from "../../hooks/useWindowSize";

const MainNewsCard = ({
  newsImage,
  title,
  date,
  onShowModalClick,
  newsId,
  content,
}) => {
  const [bannerShadow, setBannerShadow] = useState(false);
  var options = { year: "numeric", month: "short", day: "numeric" };

  const windowSize = useWindowSize();

  return (
    <div
      className={`main-news-wrapper`}
      style={{background: 'none', border: 'none'}}
      onClick={(e) => {
        // e.preventDefault();
        onShowModalClick();
      }}
    >
      <div className="main-news-inner">

        <div
          className="position-relative overflow-hidden"
          onMouseEnter={() => setBannerShadow(true)}
          onMouseLeave={() => setBannerShadow(false)}
          style={{borderRadius: 8}}
        >  <h2 className="mainNews-title update-title font-organetto m-0 w-100">
            {title}
          </h2>
          {" "}
          <img
            src={"https://cdn.worldofdypians.com/wod/featuredNewsShadow.png"}
            alt=""
            className={`position-absolute featured-shadow w-100 ${
              bannerShadow && "featured-shadow-hover"
            }`}
          />
          {/* <div
            className={`position-absolute featured-shadow w-100 ${
              bannerShadow && "featured-shadow-hover"
            }`}
          ></div> */}
          <img
            src={newsImage}
            alt="Image not found"
            className={`mainNews-image ${
              bannerShadow && "mainNews-image-hover"
            }`}
          />
        </div>
        <span
          className="announcement-side-content font-poppins gap-1 mb-0"
          dangerouslySetInnerHTML={{
            __html: content.slice(0, windowSize.width > 786 ? 430 : 215),
          }}
        ></span>
        <span className="mainNews-date" style={{ alignSelf: "flex-end" }}>
          <img src={"https://cdn.worldofdypians.com/wod/calendarIcon.svg"} alt="calendar" />{" "}
          {date.toLocaleDateString("en-US", options)}
        </span>
      </div>
    </div>
  );
};

export default MainNewsCard;

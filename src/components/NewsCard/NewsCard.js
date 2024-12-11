import React, { useEffect, useState } from "react";


const NewsCard = ({
  newsId,
  image,
  title,
  content,
  date,
  onNewsClick,
  cardType,
  releaseId,
}) => {
  const [showContent, setShowContent] = useState(false);
  const [dots, setDots] = useState("...");

  var options = { year: "numeric", month: "short", day: "numeric" };

  return (
    <div
      className="news-card-wrapper"
      style={{ cursor: "pointer" }}
      onMouseEnter={() => setShowContent(true)}
      onMouseLeave={() => setShowContent(false)}
      onClick={() => {
        onNewsClick(newsId);
      }}
    >
      <div
        className={`singlenews-card p-3 d-flex flex-column gap-3 ${
          cardType === "release" && releaseId === newsId
            ? "news-card-active"
            : cardType === "announcement" && showContent === true
            ? "active-announcement"
            : null
        } ${cardType === "release" && "release-card"}`}
        style={{minHeight: cardType === "release" && '300px', maxHeight: cardType === "release" && '300px'}}
      >
        <div className="d-flex flex-column align-items-start justify-content-between gap-3">
          <div className="d-flex align-items-start w-100">
            <div className="w-100 news-image-wrapper">
              <img src={image} alt="news image" className="news-image" />
            </div>
          </div>
          <div className="d-flex flex-column gap-3 w-100">
          <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <img src={"https://cdn.worldofdypians.com/wod/calendarIcon.svg"} alt="calendar" />
            <span className="news-date font-poppins">
              {date?.toLocaleDateString("en-US", options)}
            </span>
          </div>
          {cardType === "release" ? (
            newsId === releaseId ? (
              <span
                className="news-content font-poppins"
                style={{ fontSize: "32px", color: "#d9fa86" }}
              >
                -
              </span>
            ) : (
              <span
                className="news-content font-poppins"
                style={{ fontSize: "32px", color: "#d9fa86" }}
              >
                +
              </span>
            )
          ) : null}
        </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="text-white font-organetto m-0" style={{fontSize: 14}}>
                {cardType === "release" ? title : title?.slice(0, 42)}
                {cardType !== "release" && title.length > 42 ? dots : ""}
              </div>
            </div>
          </div>
        </div>
        {cardType !== "release" && (
          <p
            className="news-content font-poppins d-flex flex-column justify-content-center"
            dangerouslySetInnerHTML={{
              __html: content?.slice(0, 140) + dots,
            }}
          ></p>
        )}
      
      </div>
    </div>
  );
};

export default NewsCard;

import React, { useState, useEffect } from "react";

const ScrollTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return function cleanup() {
      window.removeEventListener("scroll", checkScrollTop);
    };
  });

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400 && window.pageYOffset < 3000) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container-lg">
    <img src={"https://cdn.worldofdypians.com/wod/scrollToTop.svg"} className={`scroll-to-top ${showScroll ? 'd-flex' : 'd-none'}`} onClick={scrollTop} alt="" />
    </div>
  );
};

export default ScrollTop;

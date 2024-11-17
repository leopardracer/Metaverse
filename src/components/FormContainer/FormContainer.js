import React from "react";
import plus from "./assets/plus.svg";
import minus from "./assets/minus.svg";

import supportInquiry from "./assets/build.jpg";
import supportBusiness from "./assets/business.jpg";

const FormContainer = ({
  onClick,
  accordionState,
  children,
  title,
  desc,
  collapse,
  email,
  emailLink,
  image,
}) => {
  return (
    <div className="col-12 col-lg-4" style={{ cursor: "pointer" }}>
      <div className="partner-form-wrapper position-relative gap-3 d-flex flex-column justify-content-between">
        <div
          onClick={onClick}
          data-bs-toggle="collapse"
          data-bs-target={`#${collapse}`}
          aria-expanded="true"
          aria-controls={collapse}
          className={"px-4"}
          style={{
            padding: accordionState ? "3rem 1.5rem 0 1.5rem" : "3rem 1.5rem",
          }}
        >
          {image && (
            <img
              src={image === "business" ? supportBusiness : supportInquiry}
              alt=""
              className={`${image} position-absolute phone-image `}
            />
          )}
          <div className="d-flex gap-3 justify-content-between align-items-end align-items-lg-start mb-4 pb-2 pb-lg-0 ms-0 mb-lg-0">
            <h6 className="partner-form-title font-organetto">{title}</h6>{" "}
            <button
              onClick={onClick}
              className={`btn ${
                accordionState ? "pink-filled-btn px-3" : "purple-btn px-3"
              } d-flex align-items-center gap-2 form-button`}
              data-bs-toggle="collapse"
              data-bs-target={`#${collapse}`}
              aria-expanded="true"
              aria-controls={collapse}
              style={{ width: "fit-content", clipPath: "none" }}
            >
              <img
                src={accordionState ? minus : plus}
                alt=""
                style={{ scale: "1.2" }}
              />
            </button>
          </div>
          <div className="row w-100 position-relative justify-content-between align-items-center">
            <div className="col-12">
              <p className="text-white mb-0 form-container-desc">{desc}</p>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FormContainer;

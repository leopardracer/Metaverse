import React from "react"; 

const TeamCard = ({ name, position, id, content, photo, link }) => {
  const rotate = (memberId) => {
    const teamAccordion = document.querySelector(`.${memberId}`);
    if (teamAccordion.classList.contains("rotate")) {
      teamAccordion.classList.remove("rotate");
    } else {
      teamAccordion.classList.add("rotate");
    }
  };

  return (
    <div className="accordion" id="accordionExample">
      <div className="team-card d-flex flex-column justify-content-center gap-3 align-items-center">
        {link !== "" ? (
          <a href={link} target="_blank" rel="noreferrer">
            <img src={photo} alt="profile" className="profile-pic" />
          </a>
        ) : (
          <img src={photo} alt="profile" className="profile-pic" />
        )}
        <div
          className="d-flex justify-content-between title-container"
          style={{ width: "270px" }}
        >
          <div className={`d-flex flex-column `}>
            <h4 className={` team-name ${id === "daniel" && "mb-0"}`}>
              {name}
            </h4>
            <p
              className={`text-position fw-light ${
                id === "daniel" || id === "toni" ? "mb-0" : ""
              }`}
              style={{
                fontSize: id === "daniel" || id === "toni" ? "12px" : "14px",
              }}
            >
              {position}
            </p>
          </div>
          <img
            onClick={() => rotate(`accordion-${id}`)}
            className={`accordion-${id} accordion-toggler`}
            src={'https://cdn.worldofdypians.com/wod/profileDropdown.svg'}
            style={{
              cursor: "pointer",
            }}
            data-bs-toggle="collapse"
            data-bs-target={`#${id}`}
            data-bs-parent={`accordionExample${id}`}
            aria-expanded="true"
            aria-controls={id}
            alt=""
          />
        </div>
      </div>
      <div
        id={id}
        className="accordion-collapse collapse position-relative"
        aria-labelledby="headingOne"
        data-bs-parent={`accordionExample${id}`}
        style={{  zIndex: 1 }}
      >
        <div className="accordion-body team-info d-flex align-items-end">
          <p className="text-secondary">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;

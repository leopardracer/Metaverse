import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const IslandDropdown = ({ switches, setSwitches }) => {

  return (
    <div className="d-flex px-3 flex-column gap-2">
    <div
      className="d-flex py-1 w-100 align-items-center"
      style={{ borderBottom: "1px solid #828FBB" }}
    >
      <h6 className="sidebar-section-title mb-0">Island Zero</h6>
    </div>
    <div
      className={`section-switch-btn ${
        switches.craftingTables && "section-switch-btn-active"
      } d-flex align-items-center gap-2 p-2 w-100`}
      onClick={() =>
        setSwitches((prev) => ({
          ...prev,
          craftingTables: !switches.craftingTables,
        }))
      }
    >
      <img src={"https://cdn.worldofdypians.com/wod/craftIcon.svg"} alt="" />
      <span>Crafting Table</span>
    </div>
    <div
      className={`section-switch-btn ${
        switches.mines && "section-switch-btn-active"
      } d-flex align-items-center gap-2 p-2 w-100`}
      onClick={() =>
        setSwitches((prev) => ({
          ...prev,
          mines: !switches.mines,
        }))
      }
    >
      <img src={"https://cdn.worldofdypians.com/wod/minesIcon.svg"} alt="" />
      <span>Mines</span>
    </div>

    <Accordion >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        aria-controls={`areas-content`}
        id={`areas-header`}
        sx={{
          background: "rgba(73, 71, 115, 0.70)",
          border: "1px solid #828FBB",
          borderRadius: "10px",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
        }}
      >
       <div className="d-flex align-items-center gap-2">
        <img src={"https://cdn.worldofdypians.com/wod/animalsIcon.svg"} alt="" />
         <span className="accordion-side-text">Animals</span>
       </div>
      </AccordionSummary>
      <AccordionDetails sx={{padding: 0, marginTop: "12px"}}>
        <div className="animals-dropdown-grid">
        <div
      className={`section-switch-btn ${
        switches.bear && "section-switch-btn-active"
      } d-flex align-items-center gap-2 p-2 w-100`}
      onClick={() =>
        setSwitches((prev) => ({
          ...prev,
          bear: !switches.bear,
        }))
      }
    >
      <img src={"https://cdn.worldofdypians.com/wod/bearIcon.svg"} width={24} height={24} alt="" />
      <span>Bears</span>
    </div>
    <div
      className={`section-switch-btn ${
        switches.deer && "section-switch-btn-active"
      } d-flex align-items-center gap-2 p-2 w-100`}
      onClick={() =>
        setSwitches((prev) => ({
          ...prev,
          deer: !switches.deer,
        }))
      }
    >
      <img src={"https://cdn.worldofdypians.com/wod/deerIcon.svg"} width={24} height={24} alt="" />
      <span>Deer</span>
    </div>
    <div
      className={`section-switch-btn ${
        switches.boar && "section-switch-btn-active"
      } d-flex align-items-center gap-2 p-2 w-100`}
      onClick={() =>
        setSwitches((prev) => ({
          ...prev,
          boar: !switches.boar,
        }))
      }
    >
      <img src={"https://cdn.worldofdypians.com/wod/boarIcon.svg"} width={24} height={24} alt="" />
      <span>Boars</span>
    </div>
        </div>
      </AccordionDetails>
    </Accordion>
  </div>
  );
};

export default IslandDropdown;

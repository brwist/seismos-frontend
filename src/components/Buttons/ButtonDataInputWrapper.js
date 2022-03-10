import React from "react";
import { Card } from "antd";
import clsx from "clsx";

export const ButtonDataInputWrapper = ({ cardGrid, handleAction, section, cardGridIndex }) => {
  let classss = "di-card-success";

  return (
    <Card.Grid
      style={{ width: "25%", textAlign: "center" }}
      className={clsx("di-card-grid", cardGrid.className, cardGridIndex % 2 === 0 && classss)}
      onClick={(e) => handleAction(cardGrid.action, cardGridIndex, section)}
    >
      {cardGrid.action === "upload" ? cardGrid.label : cardGrid.label}
    </Card.Grid>
  );
};

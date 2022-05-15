import { Card } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router";

// components
export default function Project() {
  let history = useHistory();

  const [newProjectFocus, setNewProjectFocus] = useState(false);
  const [existingProjectFocus, setExistingProjectFocus] = useState(false);

  const handleExistingProject = () => {
    history.push("/admin/project-select");
  };

  const handleNewProject = () => {
    history.push("/admin/project-new");
  };

  const gridStyle = {
    width: "100%",
    textAlign: "center",
  };
  return (
    <>
      <div style={{ minHeight: "80vh" }} className="flex items-center justify-center bg-white">
        <div>
          <Card
            title="Create a new project or choose an existing one"
            className="text-center"
            style={{ width: "500px" }}
          >
            <Card.Grid
              style={gridStyle}
              onMouseEnter={(e) => setNewProjectFocus(true)}
              onMouseLeave={(e) => setNewProjectFocus(false)}
              onClick={(e) => handleNewProject()}
              className={newProjectFocus ? "card-bg-primary text-white cursor-pointer" : ""}
            >
              Create new project
            </Card.Grid>
            <Card.Grid
              style={gridStyle}
              onMouseEnter={(e) => setExistingProjectFocus(true)}
              onMouseLeave={(e) => setExistingProjectFocus(false)}
              onClick={(e) => handleExistingProject()}
              className={existingProjectFocus ? "card-bg-primary text-white cursor-pointer" : ""}
            >
              Select existing project
            </Card.Grid>
          </Card>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { Button } from "antd";
import TableHeadersUtil from "util/TableHeaderUtil";
import Grid from "components/Grid/Grid";
import SelectEditor from "components/Grid/DataEditor/SelectEditor";
import _ from "lodash";
import APP_CONSTANTS from "constants/appConstants";
import ENUMS from "constants/appEnums";
import { MinusCircleOutlined } from "@ant-design/icons";
import ConfirmationModal from "components/Modal/ConfirmationModal";
import SelectShiftEditor from "components/Grid/DataEditor/SelectShiftEditor";

export default function CrewInfo(props) {
  const [crewInfoGrid, setCrewInfoGrid] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState();
  const [modalData, setModalData] = useState();

  const remove = (rowIdx, grid) => {
    setShowConfirmationModal(true);
    setModalData({
      rowIdx,
      grid,
    });
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
    setModalData(null);
  };

  const handleRemoveConfirmed = (data) => {
    data.grid.splice(data.rowIdx, 1);
    setCrewInfoGrid(
      data.grid.map((x, index) => {
        return x.map((y) => {
          const componentData = y.field === ENUMS.FORM_FIELDS.CREW_INFO.ACTION ? component(index, data.grid) : null;
          return {
            ...y,
            component: componentData,
            forceComponent: y.field === ENUMS.FORM_FIELDS.CREW_INFO.ACTION ? true : false,
          };
        });
      }),
    );
    setShowConfirmationModal(false);
    setModalData(null);
  };

  const component = (rowIdx, grid) => {
    return <MinusCircleOutlined onClick={(event) => remove(rowIdx, grid)} />;
  };

  const FillViewer = (props) => {
    const { value } = props;
    const foundOption = APP_CONSTANTS.ROLE_OPTIONS.find((op) => op.value === value);
    return <div className="cell-text-view">{foundOption ? foundOption.label : ""}</div>;
  };

  const FillViewerShift = (props) => {
    const { value } = props;
    const foundOption = APP_CONSTANTS.SHIFT_OPTIONS.find((op) => op.value === value);
    return <div className="cell-text-view">{foundOption ? foundOption.label : ""}</div>;
  };

  const getCrewInfoGridRow = (t) => {
    return t.rows.map((row) => {
      const columns = [];
      TableHeadersUtil.crewInfoFormTableData.columns.map((column) => {
        let col = {};
        if (column.field === "role") {
          col = {
            value: row.label,
            field: column.field,
            required: column.required,
            dataEditor: SelectEditor,
            valueViewer: FillViewer,
            className: "select-cell",
          };
        } else if (column.field === "shift") {
          col = {
            value: row.label,
            field: column.field,
            required: column.required,
            dataEditor: SelectShiftEditor,
            valueViewer: FillViewerShift,
            className: "select-cell",
          };
        } else {
          col = {
            value: "",
            field: column.field,
            required: column.required,
            className: column.className,
          };
        }
        columns.push(col);
        return column;
      });
      return columns;
    });
  };

  const populateCrewInfoGrid = () => {
    const grid = TableHeadersUtil.crewInfoFormTableData.grid.reduce((rows, t, rowIdx) => {
      return rows.concat(getCrewInfoGridRow(t));
    }, []);
    setCrewInfoGrid(
      grid.map((x, index) => {
        return x.map((y) => {
          const componentData = y.field === ENUMS.FORM_FIELDS.CREW_INFO.ACTION ? component(index, grid) : null;
          return {
            ...y,
            component: componentData,
            forceComponent: y.field === ENUMS.FORM_FIELDS.CREW_INFO.ACTION ? true : false,
          };
        });
      }),
    );
  };

  const addNewCrewInfo = (e) => {
    e.preventDefault();
    const columns = [];
    TableHeadersUtil.crewInfoFormTableData.columns.map((column) => {
      let col = {};
      if (column.field === "role") {
        col = {
          value: "",
          field: column.field,
          dataEditor: SelectEditor,
          valueViewer: FillViewer,
          className: "select-cell",
        };
      } else {
        col = {
          value: "",
          field: column.field,
          required: column.required,
          className: column.className,
        };
      }
      columns.push(col);
      return column;
    });
    const newCrewInfoGrid = [...crewInfoGrid, columns];
    setCrewInfoGrid(
      newCrewInfoGrid.map((x, index) => {
        return x.map((y) => {
          const componentData =
            y.field === ENUMS.FORM_FIELDS.CREW_INFO.ACTION ? component(index, newCrewInfoGrid) : null;
          return {
            ...y,
            component: componentData,
            forceComponent: y.field === ENUMS.FORM_FIELDS.CREW_INFO.ACTION ? true : false,
          };
        });
      }),
    );
  };

  // const addNewCrew = (e) => {
  //     e.preventDefault();
  //     const newCrewInfoGrid = [
  //         ...crewInfoGrid,
  //         [
  //             { value: "Field engineer", readOnly: true},
  //             { value: "" },
  //             { value: "" }
  //         ]
  //     ];
  //     setCrewInfoGrid(newCrewInfoGrid);
  // }

  const handleCrewInfoGridChanged = (updatedGridData) => {
    props.setFormValue(updatedGridData);
    setCrewInfoGrid(
      updatedGridData.map((x, index) => {
        return x.map((y) => {
          const componentData =
            y.field === ENUMS.FORM_FIELDS.CREW_INFO.ACTION ? component(index, updatedGridData) : null;
          return {
            ...y,
            component: componentData,
            forceComponent: y.field === ENUMS.FORM_FIELDS.CREW_INFO.ACTION ? true : false,
          };
        });
      }),
    );
  };

  const gotoNextStep = () => {
    let isCrewInfoValid = true;
    const validatedCrewGrid = _.cloneDeep(crewInfoGrid);
    validatedCrewGrid.map((row) => {
      row.map((cell) => {
        if (cell.required && !cell.value) {
          isCrewInfoValid = false;
          cell.className = "cell-error";
        }
        return cell;
      });
      return row;
    });

    if (!isCrewInfoValid) {
      handleCrewInfoGridChanged(validatedCrewGrid);
    } else {
      props.next();
    }
  };

  useState(() => {
    if (props.formValues != null) {
      props.formValues &&
        setCrewInfoGrid(
          props.formValues.map((x, index) => {
            return x.map((y) => {
              const componentData =
                y.field === ENUMS.FORM_FIELDS.CREW_INFO.ACTION ? component(index, props.formValues) : null;
              return {
                ...y,
                component: componentData,
                forceComponent: y.field === ENUMS.FORM_FIELDS.CREW_INFO.ACTION ? true : false,
              };
            });
          }),
        );
    } else {
      populateCrewInfoGrid();
    }
  }, props);

  return (
    <>
      <div className="mb-8" style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}>
        <Grid
          columns={TableHeadersUtil.crewInfoFormTableData.columns}
          grid={crewInfoGrid}
          gridValueChanged={handleCrewInfoGridChanged}
        ></Grid>
        <div className="inline-block mt-2 cursor-pointer text-lightBlue-600" onClick={(e) => addNewCrewInfo(e)}>
          + Add a new crew member
        </div>
      </div>

      <div className="text-right">
        <Button
          type="primary"
          onClick={(e) => {
            gotoNextStep();
          }}
        >
          Next
        </Button>
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
          isModalVisible={showConfirmationModal}
          handleCancel={handleCancel}
          handleOk={handleRemoveConfirmed}
          modalTitle={"Delete Row"}
          modalText={"Are you sure you want to delete this row?"}
          footerButtons={{ cancel_text: "Cancel", confirm_text: "Yes" }}
          data={modalData}
        ></ConfirmationModal>
      )}
    </>
  );
}

import React, { useState } from "react";
import { Button } from "antd";
import TableHeadersUtil from "util/TableHeaderUtil";
import Grid from "components/Grid/Grid";
import _ from "lodash";
import NumberInput from "components/Grid/DataEditor/NumberInput";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Equipment(props) {
  const [equipmentGrid, setEquipmentGrid] = useState([]);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const getEquipmentGridRow = (t) => {
    return t.rows.map((row) => {
      return [
        { value: row.label, readOnly: true, disableEvents: true },
        {
          value: "",
          field: row.field,
          dataEditor: NumberInput,
          required: row.required,
          datatype: row.datatype,
        },
      ];
    });
  };

  const populateEquipmentGrid = () => {
    setEquipmentGrid(
      TableHeadersUtil.equipmentFormTableData.grid.reduce((rows, t, rowIdx) => {
        return rows.concat(getEquipmentGridRow(t));
      }, [])
    );
  };

  const handleEquipmentGridChanged = (updatedGridData) => {
    props.setFormValue(updatedGridData);
    setEquipmentGrid(updatedGridData);
  };

  const createProject = () => {
    let isEquipmentInfoValid = true;
    const validatedEquipmentGrid = _.cloneDeep(equipmentGrid);
    validatedEquipmentGrid.map((row) => {
      row.map((cell) => {
        if (cell.required && cell.value === "") {
          isEquipmentInfoValid = false;
          cell.className = "cell-error";
        }
        return cell;
      });
      return row;
    });
    if (!isEquipmentInfoValid) {
      handleEquipmentGridChanged(validatedEquipmentGrid);
    } else {
      props.createProjectSubmit();
    }
  };

  useState(() => {
    if (props.formValues != null) {
      props.formValues && setEquipmentGrid(props.formValues);
    } else {
      populateEquipmentGrid();
    }
  }, props);

  return (
    <>
      <div
        className="mb-8"
        style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}
      >
        <Grid
          columns={TableHeadersUtil.equipmentFormTableData.columns}
          grid={equipmentGrid}
          gridValueChanged={handleEquipmentGridChanged}
        ></Grid>
      </div>
      <div className="text-right">
        {props.isFormSubmitting ? (
          <Button type="primary">
            <span>
              <Spin indicator={antIcon} /> Creating Project
            </span>
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={(e) => {
              createProject();
            }}
          >
            Create Project
          </Button>
        )}
      </div>
    </>
  );
}

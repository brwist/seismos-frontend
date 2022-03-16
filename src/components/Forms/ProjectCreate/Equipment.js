import { LoadingOutlined } from "@ant-design/icons";
import _ from "lodash";
import React, { useState } from "react";
import { Button, Collapse, Spin, Tooltip } from "antd";
import Grid from "components/Grid/Grid";
import NumberInput from "components/Grid/DataEditor/NumberInput";
import TableHeadersUtil from "util/TableHeaderUtil";

export default function Equipment(props) {
  const [equipmentGrids, setEquipmentGrids] = useState([]);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { Panel } = Collapse;

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
    const newEquipmentGrid = TableHeadersUtil.equipmentFormTableData.grid.reduce((rows, t) => {
      return rows.concat(getEquipmentGridRow(t));
    }, []);
    return newEquipmentGrid;
  };

  const handleEquipmentGridChanged = (updatedGridData, idx) => {
    const newEquipmentGrids = _.cloneDeep(equipmentGrids);
    newEquipmentGrids[idx] = updatedGridData;
    props.setFormValue(newEquipmentGrids);
    setEquipmentGrids(newEquipmentGrids);
  };

  const createProject = () => {
    let isEquipmentInfoValid = true;
    const validatedEquipmentGrids = _.cloneDeep(equipmentGrids);
    validatedEquipmentGrids.forEach((grid) => {
      grid.forEach((row) => {
        row.forEach((cell) => {
          if (cell.required && cell.value === "") {
            isEquipmentInfoValid = false;
            cell.className = "cell-error";
          }
        });
      });
    });
    if (!isEquipmentInfoValid) {
      props.setFormValue(validatedEquipmentGrids);
      setEquipmentGrids(validatedEquipmentGrids);
    } else {
      props.createProjectSubmit();
    }
  };

  useState(() => {
    if (props.wellInfoValues) {
      let equipmentGrids = [];
      props.wellInfoValues.forEach((_, idx) => {
        if (props.formValues != null && props.formValues[idx]) {
          equipmentGrids.push(props.formValues[idx]);
        } else {
          equipmentGrids.push(populateEquipmentGrid(idx));
        }
      });
      setEquipmentGrids(equipmentGrids);
    }
  }, [props]);

  return (
    <>
      <Collapse defaultActiveKey={["1"]}>
        {props.wellInfoValues &&
          props.wellInfoValues.map((well, idx) => {
            return (
              <Panel
                header={well[0].value}
                key={idx + 1}
                extra={
                  equipmentGrids[idx] &&
                  equipmentGrids[idx].find((row) => (row.find((cell) => cell.error) ? true : false)) ? (
                    <Tooltip title="Please fill all the fields">
                      <i className="text-red-500 fas fa-exclamation-circle"></i>
                    </Tooltip>
                  ) : (
                    ""
                  )
                }
              >
                <div style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
                  <Grid
                    columns={TableHeadersUtil.equipmentFormTableData.columns}
                    grid={equipmentGrids[idx]}
                    gridValueChanged={handleEquipmentGridChanged}
                    index={idx}
                  />
                </div>
              </Panel>
            );
          })}
      </Collapse>
      <div className="mt-8 text-right">
        {props.isFormSubmitting ? (
          <Button type="primary">
            <span>
              <Spin indicator={antIcon} /> Creating Project
            </span>
          </Button>
        ) : (
          <Button type="primary" onClick={createProject}>
            Create Project
          </Button>
        )}
      </div>
    </>
  );
}

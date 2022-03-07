import React, { useState } from "react";
import { Button } from "antd";
import TableHeadersUtil from "util/TableHeaderUtil";
import Grid from "components/Grid/Grid";
import _ from "lodash";
import { Collapse } from "antd";
import { Tooltip } from "antd";
import NumberInput from "components/Grid/DataEditor/NumberInput";
import ENUMS from "constants/appEnums";

export default function WellVolume(props) {
  const { Panel } = Collapse;
  const [wellVolumeGrids, setWellVolumeGrids] = useState([]);
  const [wellVolumeEstimationsGrids, setWellVolumeEstimationsGrids] = useState(
    []
  );

  const getWellVolumeGridRow = (t) => {
    return t.rows.map((label) => {
      const columns = [];
      TableHeadersUtil.wellVolumeFormTableData.columns.map((column) => {
        const defaultVal = column.field === "type" ? label : "";
        let col = null;
        if (column.field === "type") {
          col = {
            value: defaultVal,
            field: column.field,
            readOnly: true,
            disableEvents: true,
          };
        } else {
          col = {
            value: defaultVal,
            field: column.field,
            required: column.required,
            dataEditor: NumberInput,
            datatype: column.datatype,
          };
        }
        columns.push(col);
        return column;
      });
      return columns;
    });
  };

  const callback = (key) => {};

  const getWellVolumeEstimationsGridRow = (t) => {
    return t.rows.map((row) => {
      return [
        {
          value: "",
          field: row.field,
          datatype: row.datatype,
          dataEditor: NumberInput,
          readOnly:
            row.field === ENUMS.FORM_FIELDS.WELL_VOLUME_ESTIMATIONS.SURFACE_VOL
              ? false
              : true,
        },
        { value: row.label, readOnly: true, disableEvents: true },
      ];
    });
  };

  const populateWellVolumeGrid = (index) => {
    const newWellVolGrid = TableHeadersUtil.wellVolumeFormTableData.grid.reduce(
      (rows, t, rowIdx) => {
        return rows.concat(getWellVolumeGridRow(t));
      },
      []
    );
    return newWellVolGrid;
  };

  const populateWellVolumeEstimationsGrid = (index) => {
    const newWellVolEstimationsGrid =
      TableHeadersUtil.wellVolumeEstimationsFormTableData.grid.reduce(
        (rows, t, rowIdx) => {
          return rows.concat(getWellVolumeEstimationsGridRow(t));
        },
        []
      );
    return newWellVolEstimationsGrid;
  };

  const formatNumber = (numString) => {
    if (typeof numString === "string") {
      return parseFloat(numString.replace(/,/g, ""));
    } else {
      return numString;
    }
  };

  const calculateHValue = (gridDetail, index) => {
    const depthThisRow =
      gridDetail[index].find((g) => g.field === "depth_md").value || 0;
    const tolThisRow =
      gridDetail[index].find((g) => g.field === "tol").value || 0;
    const idThisRow =
      gridDetail[index].find((g) => g.field === "id").value || 0;
    if (depthThisRow) {
      if (index === 2) {
        const tolPreviousRow =
          gridDetail[index - 1].find((g) => g.field === "tol").value || 0;
        const diff = formatNumber(depthThisRow) - formatNumber(tolPreviousRow);
        return formatNumber(idThisRow) ** 2 * 0.0009714 * diff;
      } else {
        const tolNextRow =
          gridDetail[index + 1].find((g) => g.field === "tol").value || 0;
        if (tolNextRow) {
          return (
            formatNumber(idThisRow) ** 2 *
            0.0009714 *
            (index === 0
              ? formatNumber(tolNextRow)
              : formatNumber(tolNextRow) - formatNumber(tolThisRow))
          );
        } else {
          return (
            formatNumber(idThisRow) ** 2 *
            0.0009714 *
            (index === 0
              ? formatNumber(depthThisRow)
              : formatNumber(depthThisRow) - formatNumber(tolThisRow))
          );
        }
      }
    }
  };

  const calculateWellVolumeEstimations = (
    wellVolGridData,
    wellVolEstGridData,
    index
  ) => {
    const hvalueCasing = calculateHValue(wellVolGridData, 0);
    const hvalueLinear1 = calculateHValue(wellVolGridData, 1);
    const hvalueLinear2 = calculateHValue(wellVolGridData, 2);
    const totalHValue =
      (hvalueCasing || 0) + (hvalueLinear1 || 0) + (hvalueLinear2 || 0);
    const newWellVolEstimationsGrid = _.cloneDeep(
      wellVolEstGridData ? wellVolEstGridData : wellVolumeEstimationsGrids
    );
    const surfaveVol =
      newWellVolEstimationsGrid[index][0].find(
        (wvG) => wvG.field === "surface_vol"
      ).value || 0;
    const bbls = formatNumber(totalHValue) + formatNumber(surfaveVol);
    const gallons = bbls * 42;
    newWellVolEstimationsGrid[index][1].find((k) => k.field === "bbls").value =
      bbls.toFixed();
    newWellVolEstimationsGrid[index][2].find(
      (k) => k.field === "gallons"
    ).value = gallons.toFixed();
    props.setWellVolumeEstimationsFormValue(newWellVolEstimationsGrid);
    setWellVolumeEstimationsGrids(newWellVolEstimationsGrid);
  };

  const handleWellVolumeGridChanged = (updatedGridData, index) => {
    const newWellVolGrid = _.cloneDeep(wellVolumeGrids);
    calculateWellVolumeEstimations(updatedGridData, null, index);
    newWellVolGrid[index] = updatedGridData;
    props.setWellVolumeFormValue(newWellVolGrid);
    setWellVolumeGrids(newWellVolGrid);
  };

  const handleWellVolumeEstimationsGridChanged = (updatedGridData, index) => {
    const newWellVolEstimationsGrid = _.cloneDeep(wellVolumeEstimationsGrids);
    newWellVolEstimationsGrid[index] = updatedGridData;
    calculateWellVolumeEstimations(
      wellVolumeGrids[index],
      newWellVolEstimationsGrid,
      index
    );
  };

  const gotoNextStep = () => {
    let formValid = true;
    const checkWellVolumeGrids = _.cloneDeep(wellVolumeGrids);
    let validatedWellVolumeGrids = [];
    checkWellVolumeGrids.map((grid, index) => {
      let isWellVolumeValid = true;
      const validatedGrid = grid.map((row) => {
        const validatedRow = row.map((cell) => {
          if (cell.required && cell.value === "") {
            isWellVolumeValid = false;
            formValid = false;
            cell.className = "cell-error";
            cell.error = true;
          }
          return cell;
        });
        return validatedRow;
      });

      if (!isWellVolumeValid) {
        validatedWellVolumeGrids.push({ grid: validatedGrid, index: index });
      }

      return grid;
    });

    if (formValid) {
      props.next();
    } else {
      const newWellVolGrid = _.cloneDeep(wellVolumeGrids);
      validatedWellVolumeGrids.map((gridData) => {
        newWellVolGrid[gridData.index] = gridData.grid;
        return gridData;
      });
      props.setWellVolumeFormValue(newWellVolGrid);
      setWellVolumeGrids(newWellVolGrid);
    }
  };

  useState(() => {
    if (props.wellInfoValues) {
      let wellVolumeGridData = [];
      let wellVolumeEstimationsGridData = [];
      props.wellInfoValues.map((wellInfoValue, index) => {
        if (
          props.wellVolumeFormValues != null &&
          props.wellVolumeFormValues[index]
        ) {
          wellVolumeGridData.push(props.wellVolumeFormValues[index]);
        } else {
          wellVolumeGridData.push(populateWellVolumeGrid(index));
        }
        if (
          props.wellVolumeEstimationsFormValues != null &&
          props.wellVolumeEstimationsFormValues[index]
        ) {
          wellVolumeEstimationsGridData.push(
            props.wellVolumeEstimationsFormValues[index]
          );
        } else {
          wellVolumeEstimationsGridData.push(
            populateWellVolumeEstimationsGrid(index)
          );
        }
        return wellInfoValue;
      });
      setWellVolumeGrids(wellVolumeGridData);
      setWellVolumeEstimationsGrids(wellVolumeEstimationsGridData);
    }
  }, props);

  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={callback}>
        {props.wellInfoValues &&
          props.wellInfoValues.map((well, index) => {
            return (
              <Panel
                header={well[0].value}
                key={index + 1}
                extra={
                  wellVolumeGrids[index] &&
                  wellVolumeGrids[index].find((row) =>
                    row.find((cell) => cell.error) ? true : false
                  ) ? (
                    <Tooltip title="Please fill all the fields">
                      <i className="text-red-500 fas fa-exclamation-circle"></i>
                    </Tooltip>
                  ) : (
                    ""
                  )
                }
              >
                <div className="flex" key={index}>
                  <div className="well-volume-grid">
                    <Grid
                      columns={TableHeadersUtil.wellVolumeFormTableData.columns}
                      grid={wellVolumeGrids[index]}
                      gridValueChanged={handleWellVolumeGridChanged}
                      index={index}
                    ></Grid>
                  </div>
                  <div className="p-4"></div>
                  <div className="well-volume-estimation-grid">
                    <Grid
                      columns={TableHeadersUtil.wellVolumeEstimationsFormTableData.columns(
                        well[0].value
                      )}
                      grid={wellVolumeEstimationsGrids[index]}
                      gridValueChanged={handleWellVolumeEstimationsGridChanged}
                      index={index}
                    ></Grid>
                  </div>
                </div>
              </Panel>
            );
          })}
      </Collapse>
      <div className="mt-8 text-right">
        <Button
          type="primary"
          onClick={(e) => {
            gotoNextStep();
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
}

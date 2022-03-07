import React, { useState } from "react";
import { Button, DatePicker, Space } from "antd";
import TableHeadersUtil from "util/TableHeaderUtil";
import Grid from "components/Grid/Grid";
import _ from "lodash";
import ENUMS from "constants/appEnums";
import moment from "moment";
import NumberInput from "components/Grid/DataEditor/NumberInput";

export default function JobInfo(props) {
  const [jobInfoGrid, setJobInfoGrid] = useState([]);
  const [padInfoGrid, setPadInfoGrid] = useState([]);

  const onDateChange = (date, dateString, grid, index, field) => {
    let newDate = null;
    if (date) {
      newDate = date.format("x");
    }
    const newJobInfoGrid = _.cloneDeep(grid);
    newJobInfoGrid[index].find((r) => r.field === field).value =
      Number(newDate);
    handleJobInfoGridChanged(newJobInfoGrid);
  };

  const getRow = (t) => {
    return t.rows.map((row, index) => {
      return [
        { value: row.label, readOnly: true, disableEvents: true },
        {
          value: "",
          field: row.field,
          required: row.required,
          datatype: row.datatype,
          dataEditor:
            row.field === ENUMS.FORM_FIELDS.PAD_INFO.REP_CONTACT_NUMBER ||
            row.field === ENUMS.FORM_FIELDS.JOB_INFO.AFE_ID ||
            row.field === ENUMS.FORM_FIELDS.JOB_INFO.JOB_ID
              ? NumberInput
              : null,
        },
      ];
    });
  };

  const startDatecomponent = (rowIdx, grid) => {
    const currentVal = grid[rowIdx].find(
      (r) => r.field === ENUMS.FORM_FIELDS.JOB_INFO.JOB_START_DATE
    ).value;
    const momentDate = currentVal ? moment(Number(currentVal)) : null;
    return (
      <DatePicker
        className="w-100"
        value={momentDate}
        onChange={(date, dateString) =>
          onDateChange(
            date,
            dateString,
            grid,
            rowIdx,
            ENUMS.FORM_FIELDS.JOB_INFO.JOB_START_DATE
          )
        }
      />
    );
  };

  const endDatecomponent = (rowIdx, grid) => {
    const currentVal = grid[rowIdx].find(
      (r) => r.field === ENUMS.FORM_FIELDS.JOB_INFO.JOB_END_DATE
    ).value;
    const momentDate = currentVal ? moment(Number(currentVal)) : null;
    return (
      <DatePicker
        className="w-100"
        value={momentDate}
        onChange={(date, dateString) =>
          onDateChange(
            date,
            dateString,
            grid,
            rowIdx,
            ENUMS.FORM_FIELDS.JOB_INFO.JOB_END_DATE
          )
        }
      />
    );
  };

  const populateJobInfoGrid = () => {
    const jobgrid = TableHeadersUtil.jobInfoFormTableData.grid.reduce(
      (rows, t, rowIdx) => {
        const row = getRow(t);
        return rows.concat(row);
      },
      []
    );
    setJobInfoGrid(
      jobgrid.map((x, index) => {
        return x.map((y) => {
          const componentData =
            y.field === ENUMS.FORM_FIELDS.JOB_INFO.JOB_START_DATE
              ? startDatecomponent(index, jobgrid)
              : y.field === ENUMS.FORM_FIELDS.JOB_INFO.JOB_END_DATE
              ? endDatecomponent(index, jobgrid)
              : null;
          return {
            ...y,
            component: componentData,
            forceComponent:
              y.field === ENUMS.FORM_FIELDS.JOB_INFO.JOB_START_DATE ||
              y.field === ENUMS.FORM_FIELDS.JOB_INFO.JOB_END_DATE
                ? true
                : false,
          };
        });
      })
    );
  };

  const populatePadInfoGrid = () => {
    setPadInfoGrid(
      TableHeadersUtil.padInfoFormTableData.grid.reduce((rows, t, rowIdx) => {
        const row = getRow(t);
        return rows.concat(row);
      }, [])
    );
  };

  const handleJobInfoGridChanged = (updatedGridData) => {
    const newGrid = updatedGridData.map((x, index) => {
      return x.map((y) => {
        const componentData =
          y.field === ENUMS.FORM_FIELDS.JOB_INFO.JOB_START_DATE
            ? startDatecomponent(index, updatedGridData)
            : y.field === ENUMS.FORM_FIELDS.JOB_INFO.JOB_END_DATE
            ? endDatecomponent(index, updatedGridData)
            : null;
        return {
          ...y,
          component: componentData,
          forceComponent:
            y.field === ENUMS.FORM_FIELDS.JOB_INFO.JOB_START_DATE ||
            y.field === ENUMS.FORM_FIELDS.JOB_INFO.JOB_END_DATE
              ? true
              : false,
        };
      });
    });
    props.setJobInfoFormValue(newGrid);
    setJobInfoGrid(newGrid);
  };

  const handlePadInfoGridChanged = (updatedGridData) => {
    props.setPadInfoFormValue(updatedGridData);
    setPadInfoGrid(updatedGridData);
  };

  const gotoNextStep = () => {
    let isJobInfoValid = true;
    let isPadInfoValid = true;
    const validatedJobGrid = _.cloneDeep(jobInfoGrid);
    validatedJobGrid.map((row) => {
      row.map((cell) => {
        if (cell.required && cell.value === "") {
          isJobInfoValid = false;
          cell.className = "cell-error";
        }
        return cell;
      });
      return row;
    });
    const validatedPadGrid = _.cloneDeep(padInfoGrid);
    validatedPadGrid.map((row) => {
      row.map((cell) => {
        if (cell.required && cell.value === "") {
          isPadInfoValid = false;
          cell.className = "cell-error";
        }
        return cell;
      });
      return row;
    });
    if (!isJobInfoValid || !isPadInfoValid) {
      handleJobInfoGridChanged(validatedJobGrid);
      handlePadInfoGridChanged(validatedPadGrid);
    } else {
      props.next();
    }
  };

  useState(() => {
    if (props.jobInfoFormValues != null) {
      console.log(_.cloneDeep(props.jobInfoFormValues));
      props.jobInfoFormValues &&
        setJobInfoGrid(
          props.jobInfoFormValues.map((x, index) => {
            return x.map((y) => {
              const componentData =
                y.field === ENUMS.FORM_FIELDS.JOB_INFO.JOB_START_DATE
                  ? startDatecomponent(index, props.jobInfoFormValues)
                  : y.field === ENUMS.FORM_FIELDS.JOB_INFO.JOB_END_DATE
                  ? endDatecomponent(index, props.jobInfoFormValues)
                  : null;
              return {
                ...y,
                component: componentData,
                forceComponent:
                  y.field === ENUMS.FORM_FIELDS.JOB_INFO.JOB_START_DATE ||
                  y.field === ENUMS.FORM_FIELDS.JOB_INFO.JOB_END_DATE
                    ? true
                    : false,
              };
            });
          })
        );
    } else {
      populateJobInfoGrid();
    }
    if (props.padInfoFormValues != null) {
      props.padInfoFormValues && setPadInfoGrid(props.padInfoFormValues);
    } else {
      populatePadInfoGrid();
    }
  }, props);

  return (
    <>
      <div
        className="flex"
        style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
      >
        <Space size="large">
          <Grid
            columns={TableHeadersUtil.jobInfoFormTableData.columns}
            grid={jobInfoGrid}
            className="mb-8 no-header-grid"
            gridValueChanged={handleJobInfoGridChanged}
          ></Grid>
          <Grid
            columns={TableHeadersUtil.padInfoFormTableData.columns}
            grid={padInfoGrid}
            className="mb-8 no-header-grid"
            gridValueChanged={handlePadInfoGridChanged}
          ></Grid>
        </Space>
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
    </>
  );
}

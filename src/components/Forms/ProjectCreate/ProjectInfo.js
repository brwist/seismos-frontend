import React, { useState } from "react";
import { Button } from 'antd';
import TableHeadersUtil from "util/TableHeaderUtil";
import Grid from "components/Grid/Grid";
import _ from "lodash";

export default function ProjectInfo(props) {
    
    const [projectInfoGrid, setProjectInfoGrid] = useState([]);

    const getProjectInfoGridRow = (t) => {
        return t.rows.map(row => {
            console.log(row.field)
            return [
                { value: row.label, readOnly: true, disableEvents: true},
                { value: "", field: row.field, required: row.required },
            ]
        })
    }

    const populateProjectInfoGrid = () => {
        setProjectInfoGrid(TableHeadersUtil.projectInfoFormTableData.grid.reduce((rows, t, rowIdx) => {
            return rows.concat(getProjectInfoGridRow(t));
        }, []));
    }

    const handleProjectInfoGridChanged = (updatedGridData) => {
        console.log(updatedGridData)
        props.setFormValue(updatedGridData);
        setProjectInfoGrid(updatedGridData)
    }

    const gotoNextStep = () => {
        let isProjectInfoValid = true;
        const validatedProjectInfoGrid = _.cloneDeep(projectInfoGrid);
        validatedProjectInfoGrid.map(row => {
            row.map(cell => {
                if(cell.required && cell.value === "") {
                    isProjectInfoValid = false;
                    cell.className = 'cell-error';
                }
                return cell;
            });
            return row;
        })
        if(!isProjectInfoValid) {
            handleProjectInfoGridChanged(validatedProjectInfoGrid)
        } else {
            props.next();
        }
    }

    useState(() => {
        if(props.formValues != null) {
            props.formValues && setProjectInfoGrid(props.formValues);
        } else {
            populateProjectInfoGrid();
        }
    }, props);

    return (
        <>
            <div className="mb-8" style={{width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Grid 
                    columns={TableHeadersUtil.projectInfoFormTableData.columns}
                    grid={projectInfoGrid}
                    gridValueChanged={handleProjectInfoGridChanged}
                    className="no-header-grid mb-8"
                ></Grid>
            </div>
            <div className="text-right">
                <Button type="primary" onClick={(e) => {gotoNextStep()}}>
                    Next
                </Button>
            </div>
        </>
    );
}

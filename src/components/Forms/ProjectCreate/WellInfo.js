import React, { useState } from "react";
import { Button } from 'antd';
import TableHeadersUtil from "util/TableHeaderUtil";
import Grid from "components/Grid/Grid";
import _ from "lodash";
import { MinusCircleOutlined } from "@ant-design/icons";
import ConfirmationModal from "components/Modal/ConfirmationModal";
import ENUMS from "constants/appEnums";
import NumberInput from "components/Grid/DataEditor/NumberInput";

export default function WellInfo(props) {

    const [wellInfoGrid, setWellInfoGrid] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState();
    const [modalData, setModalData] = useState();

    const remove = (rowIdx, grid) => {
        setShowConfirmationModal(true);
        setModalData({
            rowIdx,
            grid
        })
    }

    const handleCancel = () => {
        setShowConfirmationModal(false);
        setModalData(null);
    }

    const handleRemoveConfirmed = (data) => {
        data.grid.splice(data.rowIdx, 1);
        setWellInfoGrid(data.grid.map((x, index) => {
            return x.map(y => {
                const componentData = y.field === "action" ? component(index, data.grid) : null
                return {
                    ...y,
                    component: componentData
                }
            })
        }));
        setShowConfirmationModal(false);
        setModalData(null);
    }

    const component = (rowIdx, grid) => {
        return <MinusCircleOutlined onClick={(event) => remove(rowIdx, grid)} />;
    }

    const isForcedComponent = (column) => {
        return column.actionColumn;
    }

    const populateWillInfoGrid = () => {
        const grid = TableHeadersUtil.wellInfoFormTableData.grid.reduce((rows, t, rowIdx) => {
            const columns = [];
            TableHeadersUtil.wellInfoFormTableData.columns.map(column => {
                const className = column.actionColumn ? "noborder" : "";
                columns.push({
                    value: column.defaultValue,
                    field: column.field,
                    required: column.required,
                    component: null,
                    forceComponent: isForcedComponent(column),
                    className: className,
                    datatype: column.datatype,
                    dataEditor: (
                        column.field === ENUMS.FORM_FIELDS.WELL_INFO.NO_OF_STAGES
                        || column.field === ENUMS.FORM_FIELDS.WELL_INFO.LAT
                        || column.field === ENUMS.FORM_FIELDS.WELL_INFO.LONG
                    ) ? NumberInput : null
                });
                return column;
            })
            return rows.concat([columns]);
        }, []);
        setWellInfoGrid(grid.map((x, index) => {
            return x.map(y => {
                const componentData = y.field === "action" ? component(index, grid) : null
                return {
                    ...y,
                    component: componentData
                }
            })
        }));
    }

    const addNewWell = (e) => {
        e.preventDefault();
        const columns = [];
        TableHeadersUtil.wellInfoFormTableData.columns.map(column => {
            const className = column.actionColumn ? "noborder" : "";
            columns.push({
                value: column.defaultValue,
                field: column.field,
                required: column.required,
                component: null,
                forceComponent: isForcedComponent(column),
                className: className,
                datatype: column.datatype,
                dataEditor: (
                    column.field === ENUMS.FORM_FIELDS.WELL_INFO.NO_OF_STAGES
                    || column.field === ENUMS.FORM_FIELDS.WELL_INFO.LAT
                    || column.field === ENUMS.FORM_FIELDS.WELL_INFO.LONG
                ) ? NumberInput : null
            });
            return column;
        });
        const newWellInfoGrid = [
            ...wellInfoGrid,
            columns
        ];
        setWellInfoGrid(newWellInfoGrid.map((x, index) => {
            return x.map(y => {
                const componentData = y.field === "action" ? component(index, newWellInfoGrid) : null
                return {
                    ...y,
                    component: componentData
                }
            })
        }));
    }

    const handleWellInfoGridChanged = (updatedGridData) => {
        props.setFormValue(updatedGridData);
        setWellInfoGrid(updatedGridData.map((x, index) => {
            return x.map(y => {
                const componentData = y.field === "action" ? component(index, updatedGridData) : null
                return {
                    ...y,
                    component: componentData
                }
            })
        }));
    }

    const gotoNextStep = () => {
        let isWellInfoValid = true;
        const validatedWellGrid = _.cloneDeep(wellInfoGrid);
        validatedWellGrid.map(row => {
            row.map(cell => {
                if (cell.required && cell.value === "") {
                    isWellInfoValid = false;
                    cell.className = 'cell-error';
                }
                return cell;
            })
            return row;
        })

        if (!isWellInfoValid) {
            handleWellInfoGridChanged(validatedWellGrid)
        } else {
            props.next();
        }
    }

    useState(() => {
        if (props.formValues != null) {
            props.formValues && setWellInfoGrid(props.formValues.map((x, index) => {
                return x.map(y => {
                    const componentData = y.field === "action" ? component(index, props.formValues) : null
                    return {
                        ...y,
                        component: componentData
                    }
                })
            }));
        } else {
            populateWillInfoGrid();
        }
    }, props);

    return (
        <>
            <div className="mb-8">
                <Grid
                    columns={TableHeadersUtil.wellInfoFormTableData.columns}
                    grid={wellInfoGrid}
                    gridValueChanged={handleWellInfoGridChanged}
                ></Grid>
                <div className="text-lightBlue-600 mt-2 cursor-pointer inline-block" onClick={(e) => addNewWell(e)}>+ Add a new well</div>
            </div>
            <div className="text-right">
                <Button type="primary" onClick={(e) => { gotoNextStep() }}>
                    Next
                </Button>
            </div>
            {
                showConfirmationModal && <ConfirmationModal
                    isModalVisible={showConfirmationModal}
                    handleCancel={handleCancel}
                    handleOk={handleRemoveConfirmed}
                    modalTitle={"Delete Row"}
                    modalText={"Are you sure you want to delete this row?"}
                    footerButtons={{ cancel_text: 'Cancel', confirm_text: 'Yes' }}
                    data={modalData}
                >
                </ConfirmationModal>
            }
        </>
    );
}


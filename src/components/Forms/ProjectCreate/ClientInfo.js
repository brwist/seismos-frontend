import React, { useState } from "react";
import { Button } from "antd";
import TableHeadersUtil from "util/TableHeaderUtil";
import Grid from "components/Grid/Grid";
import PasswordInput from "components/Grid/DataEditor/PasswordInput";
import _ from "lodash";
import ENUMS from "constants/appEnums";
import { MinusCircleOutlined } from "@ant-design/icons";
import ConfirmationModal from "components/Modal/ConfirmationModal";

export default function ClientInfo(props) {
  const [clientInfoGrid, setClientInfoGrid] = useState([]);
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
    setClientInfoGrid(
      data.grid.map((x, index) => {
        return x.map((y) => {
          const componentData =
            y.field === ENUMS.FORM_FIELDS.CLIENT_INFO.ACTION
              ? component(index, data.grid)
              : null;
          return {
            ...y,
            component: componentData,
            forceComponent:
              y.field === ENUMS.FORM_FIELDS.CLIENT_INFO.ACTION ? true : false,
          };
        });
      })
    );
    setShowConfirmationModal(false);
    setModalData(null);
  };

  const component = (rowIdx, grid) => {
    return <MinusCircleOutlined onClick={(event) => remove(rowIdx, grid)} />;
  };

  const getClientInfoGridRow = (t) => {
    return t.rows.map((label) => {
      const columns = [];
      TableHeadersUtil.clientInfoFormTableData.columns.map((column) => {
        columns.push({
          value: "",
          field: column.field,
          required: column.required,
          dataEditor:
            column.field === ENUMS.FORM_FIELDS.CLIENT_INFO.PASSWORD
              ? PasswordInput
              : null,
          className:
            column.field === ENUMS.FORM_FIELDS.CLIENT_INFO.PASSWORD
              ? "password-cell"
              : column.className,
        });
        return column;
      });
      return columns;
    });
  };

  const populateClientInfoGrid = () => {
    const grid = TableHeadersUtil.clientInfoFormTableData.grid.reduce(
      (rows, t, rowIdx) => {
        return rows.concat(getClientInfoGridRow(t));
      },
      []
    );
    setClientInfoGrid(
      grid.map((x, index) => {
        return x.map((y) => {
          const componentData =
            y.field === ENUMS.FORM_FIELDS.CLIENT_INFO.ACTION
              ? component(index, grid)
              : null;
          return {
            ...y,
            component: componentData,
            forceComponent:
              y.field === ENUMS.FORM_FIELDS.CLIENT_INFO.ACTION ? true : false,
          };
        });
      })
    );
  };

  const addNewClient = (e) => {
    e.preventDefault();
    const columns = [];
    TableHeadersUtil.clientInfoFormTableData.columns.map((column) => {
      columns.push({
        value: "",
        field: column.field,
        required: column.required,
        dataEditor:
          column.field === ENUMS.FORM_FIELDS.CLIENT_INFO.PASSWORD
            ? PasswordInput
            : null,
        className:
          column.field === ENUMS.FORM_FIELDS.CLIENT_INFO.PASSWORD
            ? "password-cell"
            : column.className,
      });
      return column;
    });
    const newClientInfoGrid = [...clientInfoGrid, columns];
    setClientInfoGrid(
      newClientInfoGrid.map((x, index) => {
        return x.map((y) => {
          const componentData =
            y.field === ENUMS.FORM_FIELDS.CLIENT_INFO.ACTION
              ? component(index, newClientInfoGrid)
              : null;
          return {
            ...y,
            component: componentData,
            forceComponent:
              y.field === ENUMS.FORM_FIELDS.CLIENT_INFO.ACTION ? true : false,
          };
        });
      })
    );
  };

  const handleClientInfoGridChanged = (updatedGridData) => {
    props.setFormValue(updatedGridData);
    setClientInfoGrid(
      updatedGridData.map((x, index) => {
        return x.map((y) => {
          const componentData =
            y.field === ENUMS.FORM_FIELDS.CLIENT_INFO.ACTION
              ? component(index, updatedGridData)
              : null;
          return {
            ...y,
            component: componentData,
            forceComponent:
              y.field === ENUMS.FORM_FIELDS.CLIENT_INFO.ACTION ? true : false,
          };
        });
      })
    );
  };

  const gotoNextStep = () => {
    let isClientInfoValid = true;
    const validatedClientGrid = _.cloneDeep(clientInfoGrid);
    validatedClientGrid.map((row) => {
      row.map((cell) => {
        if (cell.required && cell.value === "") {
          isClientInfoValid = false;
          cell.className = "cell-error";
        }
        return cell;
      });
      return row;
    });

    if (!isClientInfoValid) {
      handleClientInfoGridChanged(validatedClientGrid);
    } else {
      props.next();
    }
  };

  useState(() => {
    if (props.formValues != null) {
      props.formValues &&
        setClientInfoGrid(
          props.formValues.map((x, index) => {
            return x.map((y) => {
              const componentData =
                y.field === ENUMS.FORM_FIELDS.CLIENT_INFO.ACTION
                  ? component(index, props.formValues)
                  : null;
              return {
                ...y,
                component: componentData,
                forceComponent:
                  y.field === ENUMS.FORM_FIELDS.CLIENT_INFO.ACTION
                    ? true
                    : false,
              };
            });
          })
        );
    } else {
      populateClientInfoGrid();
    }
  }, props);

  return (
    <>
      <div
        className="mb-8"
        style={{ width: "60%", marginLeft: "auto", marginRight: "auto" }}
      >
        <Grid
          columns={TableHeadersUtil.clientInfoFormTableData.columns}
          grid={clientInfoGrid}
          gridValueChanged={handleClientInfoGridChanged}
        ></Grid>
        <div
          className="inline-block mt-2 cursor-pointer text-lightBlue-600"
          onClick={(e) => addNewClient(e)}
        >
          + Add a new client
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

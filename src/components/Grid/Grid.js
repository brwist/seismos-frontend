import React, { useEffect, useState } from "react";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import "./Grid.css";

const SheetRenderer = props => {
    const { className, columns } = props;
    return (
        <table className={className + " seismos-spreadsheet-grid"}>
            <thead>
                <tr>
                {columns.map((col, index) => (
                    <th
                        key={index}
                        className={`cell ${className} ${col.className}`}
                        style={{
                            width: col.width,
                            background: "#f9f9f9",
                            padding: "10px 20px",
                        }}
                        colSpan={col.colSpan ? col.colSpan : 1}
                    >
                        {col.label}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>{props.children}</tbody>
        </table>
    );
};

// TODO: REMOVE
// const CellRenderer = props => {
//     const { children } = props;

//     return (
//         <td className="cell" style={{ textAlign: "center" }}>
//             {children}
//         </td>
//     );
// };

export default function Grid(props) {

    const [columns, setColumns] = useState();
    const [grid, setGrid] = useState();

    const renderSheet = (sheetProps) => {
        return <SheetRenderer columns={columns} {...sheetProps} />;
    }

    // TODO: REMOVE
    // const renderRow = (rowProps) => {
    //     const { row, cells, ...rest } = rowProps;
    //     return <CellRenderer rowIndex={row} {...rest} />;
    // }

    useEffect(() => {
        setColumns(props.columns);
        setGrid(props.grid);
    }, [props]);

    return (
        <div style={{ width: props.width ? props.width : "100%" }}>
            {grid && <ReactDataSheet
                data={grid}
                valueRenderer={cell => cell.value}
                sheetRenderer={renderSheet}
                className={props.className}
                isCellNavigable={(cell, row, col) => {return !cell.disableEvents ? true : false}}
                // cellRenderer={renderRow}
                onCellsChanged={changes => {
                    const gridData = grid.map(row => [...row]);
                    changes.forEach(({ cell, row, col, value }) => {
                        let error = false;
                        let className = cell.className;
                        if(gridData[row][col]['required'] && value === "") {
                            error = true;
                            className = className + 'cell-error';
                        } else {
                            className = className ? className.replace("cell-error","") : 'null';
                        }
                        gridData[row][col] = { ...gridData[row][col], value, error: error, className };
                    });
                    setGrid(gridData);
                    props.hasOwnProperty('gridValueChanged') && props.gridValueChanged(gridData, props.index);
                }}
            />}
        </div>
    );
}

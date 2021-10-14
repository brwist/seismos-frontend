import { extend } from "underscore";

const getNewValue = (values, prevValue, fieldIndex, index, counter) => {
    if(index >= fieldIndex) {
        return values[counter] ? values[counter] : prevValue;
    } else {
        return prevValue;
    }
}

const setClipboardValues = (fields, values, fieldIndex) => {
    let newFieldValues = {};
    let counter = -1;
    Object.keys(fields).map((field_key, index) => {
        newFieldValues = {
            ...newFieldValues,
            [field_key]: (index >= fieldIndex) ? getNewValue(values, fields[field_key], fieldIndex, index, ++counter) : fields[field_key],
        }
        return field_key;
    });
    return newFieldValues;
}

const getNumberValue = (val) => {
    if (val) {
        return parseFloat(val.replace(/,/g, ''))
    } else {
        return 0;
    }
}

const formatFormValuesFromRowGridData = (gridValues) => {
    let fieldVlaues = {};
    if (!gridValues)
        return fieldVlaues;
    gridValues.map(gridRow => {
        const obj = gridRow.find(val => val.field);
        const fieldValuePair = {[obj.field]: obj.datatype === 'integer' ? getNumberValue(obj.value) : obj.value};
        if(obj.field !== "action") {
            fieldVlaues = extend(fieldVlaues, fieldValuePair);
        }
        return fieldValuePair;
    });

    return fieldVlaues;
}

const formatFormValuesFromColumnGridData = (gridValues) => {
    if (!gridValues)
        return [];
    const newValues = gridValues.map(row => {
        let fieldValues = {};
        row.map(col => {
            if(col.field !== "action") {
                fieldValues = extend(fieldValues, {[col.field]: col.datatype === 'integer' ? getNumberValue(col.value) : col.value})
            }
            return col;
        })
        return fieldValues;
    });

    return newValues;
}

const ProjectUtil = {
    setClipboardValues,
    formatFormValuesFromRowGridData,
    formatFormValuesFromColumnGridData
}

export default ProjectUtil;
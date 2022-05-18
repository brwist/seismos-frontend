import FileSaver from "file-saver";

const onSave = (fileData, fileName) => FileSaver.saveAs(fileData, fileName);

export default onSave;

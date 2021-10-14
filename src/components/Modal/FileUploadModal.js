import React from 'react';
import { Upload, Modal, message} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export default function FileUploadModal(props) {
    const { Dragger } = Upload;
    const draggerModalProps = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info, info.file, info.fileList);
            }
            if (status === 'done') {
                props.handleOk(info, props.section);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Modal centered title="Upload file" visible={props.isModalVisible} onOk={props.handleOk} onCancel={props.handleCancel} footer={null}>
            <Dragger {...draggerModalProps}>
                <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    
                </p>
            </Dragger>
        </Modal>
    );
}
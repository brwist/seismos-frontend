import React, { useState } from "react";
import { Card } from 'antd';
import APP_CONSTANTS from "constants/appConstants";
import { RedoOutlined } from "@ant-design/icons"
// component
import FileUploadModal from "components/Modal/FileUploadModal";
import "./DataInput.css";
import { ButtonDataInputWrapper } from "components/Buttons/ButtonDataInputWrapper";

export default function DataInput() {
    const cards = APP_CONSTANTS.DATA_INPUT_CARDS;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [section, setSection] = useState(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = (uploadedFile, selectedSection) => {
        cards.find(card => card.section === selectedSection).grid[2].label = <div
            className="flex items-center justify-center"
        >
            <span className="mr-2 reupload-text">{'Uploaded'}</span>
            <span className="reupload-text-container mr-2"></span>
            <RedoOutlined className="reupload-button" />
        </div>;
        cards.find(card => card.section === selectedSection).grid[2].className = 'di-card-success';
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAction = (action, index, selectedSection) => {
        switch (action) {
            case 'upload':
                cards.find(card => card.section === selectedSection).grid[index].label = 'Upload File';
                cards.find(card => card.section === selectedSection).grid[2].className = '';
                setSection(selectedSection);
                showModal();
                break
            case "comport":
                console.log("Comport");
                break
            case "ethernet":
                console.log("Ethernet");
                break
            case "view":
                console.log("View");
                break
            default:
                return
        }
    }

    return (
        <>
            {
                cards.map((card, cardIndex) => {
                    return <Card key={cardIndex} title={card.title} bordered={false} style={{ width: '100%', marginBottom: '1.5rem' }} className="datainput-cards mb-6">
                        {
                            card.grid.map((cardGrid, cardGridIndex) => {
                                const options = { cardGrid, cardGridIndex, handleAction, section: card.section }
                                return <ButtonDataInputWrapper key={cardGridIndex} {...options} />
                            })
                        }
                        {/* <Row gutter={16}>
                            {
                                card.grid.map((cardGrid, cardGridIndex) => {
                                    return <Col className="gutter-row" span={6}>
                                        <Button size={"large"} shape="round" className={"w-full " + cardGrid.color}>{cardGrid.label}</Button>
                                    </Col>
                                })
                            }
                        </Row>
                         */}
                    </Card>
                })
            }
            <FileUploadModal isModalVisible={isModalVisible} section={section} handleOk={handleOk} handleCancel={handleCancel}
            ></FileUploadModal>
        </>
    );
}

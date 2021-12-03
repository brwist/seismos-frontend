import React, { useEffect, useState } from "react";
import { Card, Input, Button, Form, Divider, Tooltip, Row, Col, Select, InputNumber } from 'antd';
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tabs } from 'antd';
import ConfirmationModal from "components/Modal/ConfirmationModal";
import ENUMS from "constants/appEnums";
import { useHistory, useLocation } from "react-router";
import { useToasts } from "react-toast-notifications";
import FormInitialValues from "constants/formInitialValues";
import { projectApi } from "./../../api/projectApi"

const { Option } = Select;
const { TabPane } = Tabs;

export default function DefaultValues() {
    let location = useLocation();
    const { addToast } = useToasts();
    const history = useHistory();

    const [modalData, setModalData] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [defaultValues, setDefaultValues] = useState([]);
    const [projectId, setProjectId] = useState();
    const [wellId, setWellId] = useState();

    const handleCancel = () => {
        setShowConfirmationModal(false);
        setModalData(null);
    }

    const handleChangeConfirmed = async (data) => {
        try {
            await projectApi.putDefaultValue(wellId, data)
            setShowConfirmationModal(false);
            setModalData(null);
            addToast("Default values updated successfully!", { appearance: 'success', autoDismiss: true });
        } catch (error) {
            if (error.message.includes("Incorrect")) addToast("Incorrect username or password!", { appearance: 'error', autoDismiss: true });
            console.error(error.message)
        }
    }

    const onFinish = (values) => {
        const newvalue = {
            ...FormInitialValues.defaultValueForm,
            ...values
        }
        setModalData(newvalue);
        setShowConfirmationModal(true);
    };

    const callback = (key) => {
        console.log(key);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const fetchDefaultValues = async (well_id) => {
        try {
            const data = await projectApi.getDefaultValue(well_id)
            console.log("fetchDefaultValues data", data)
        } catch (error) {
            console.log(error)
        }
    }

    const setParams = (locationData) => {
        if (locationData.state && locationData.state.projectId) {
            setProjectId(locationData.state.projectId);
            setWellId(locationData.state.wellId);
            fetchDefaultValues(locationData.state.wellId);
        }
        else if (locationData.search) {
            const params = new URLSearchParams(locationData.search);
            const projectIdSearch = params.get('projectId');
            const wellIdSearch = params.get('wellId');
            setProjectId(projectIdSearch);
            setWellId(wellIdSearch);
            fetchDefaultValues(wellIdSearch);
        }
    }

    useEffect(() => {
        setParams(location);
    }, [])

    useEffect(() => {
        return history.listen((locationData) => {
            if (location.pathname === (ENUMS.ROUTES.ADMIN + ENUMS.ROUTES.DEFAULT_VALUES)) {
                setParams(locationData);
            }
        })
    }, [history])

    return (
        <>
            <Card bordered={false} style={{ width: '100%', marginBottom: '5px' }}>
                <div className="max-w-580-px mx-auto">
                    <div>
                        On the template page fill any information that may be relevant across all stages,
                        such information is found in completion procedures etc. Common information that can be
                        normally filled out in the template is the following:
                    </div>
                </div>
            </Card>
            <Card bordered={false} style={{ width: '100%', marginBottom: '1.5rem' }}>
                <Form
                    labelAlign="left"
                    name="basic"
                    initialValues={FormInitialValues.defaultValueForm}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="default-values-form"
                >
                    <Tabs onChange={callback} type="card">
                        <TabPane tab="Parameter bounds" key="1">
                            <Divider orientation="left" plain><strong>Parameter bounds</strong></Divider>
                            <Row gutter={24}>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                C1 Min
                                                <Tooltip title="Velocity m/s">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="c1_min"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                C1 Max
                                                <Tooltip title="Velocity m/s">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="c1_max"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                C2 Min
                                                <Tooltip title="Velocity m/s">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="c2_min"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                C2 Max
                                                <Tooltip title="Velocity m/s">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="c2_max"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                C3 Min
                                                <Tooltip title="Velocity m/s">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="c3_min"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                C3 Max
                                                <Tooltip title="Velocity m/s">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="c3_max"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Q1 Min
                                                <Tooltip title="Wellbore Quality/Energy, no unit">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="q_min"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Q1 Max
                                                <Tooltip title="Wellbore Quality/Energy, no unit">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="q_max"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                K min
                                                <Tooltip title="Permeability, Darcy mD">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="k_min"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                K max
                                                <Tooltip title="Permeability, Darcy mD">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="k_max"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item className="text-right">
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </TabPane>
                        <TabPane tab="Model Params" key="2">
                            <Divider orientation="left" plain><strong>Model Params</strong></Divider>
                            <Row gutter={24}>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Model
                                                <Tooltip title="-">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="model"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <Select>
                                            <Option value="assymetric">Assymetric</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Response
                                                <Tooltip title="-">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="response"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <Select>
                                            <Option value="full">Full</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Source
                                                <Tooltip title="-">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="source"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <Select>
                                            <Option value="reflection">Reflection</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Layer
                                                <Tooltip title="-">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="layer"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item className="text-right">
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </TabPane>
                        <TabPane tab="Fluid properties" key="3">
                            <Divider orientation="left" plain><strong>Fluid properties</strong></Divider>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Viscosity
                                                <Tooltip title="">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="viscosity"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Density
                                                <Tooltip title="">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="density"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Compressibility
                                                <Tooltip title="">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="compressibility"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item className="text-right">
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </TabPane>
                        <TabPane tab="Filtering" key="4">
                            <Divider orientation="left" plain><strong>Filtering</strong></Divider>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                F Low (Hz)
                                                <Tooltip title="">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="f_low_hz"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                F High (Hz)
                                                <Tooltip title="">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="f_high_hz"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                New Sample Rate
                                                <Tooltip title="">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="new_sample_rate"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Data Sample Rate
                                                <Tooltip title="">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="data_sample_rate"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item className="text-right">
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </TabPane>
                        <TabPane tab="Inversion" key="5">
                            <Divider orientation="left" plain><strong>Inversion</strong></Divider>
                            <Row>

                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Algorithm
                                                <Tooltip title="">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="algorithm"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <Select>
                                            <Option value="DiffEvolv">DiffEvolv</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Grid density
                                                <Tooltip title="">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="grid_density"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Weighting
                                                <Tooltip title="">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="weighting"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <Select>
                                            <Option value="No">No</Option>
                                            <Option value="Yes">Yes</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                wlevexp
                                                <Tooltip title="">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="wlevexp"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Loop
                                                <Tooltip title="subdirectory with this name must exist">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="loop"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <Select>
                                            <Option value="No">No</Option>
                                            <Option value="Yes">Yes</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Method
                                                <Tooltip title="subdirectory with this name must exist">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="method"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <Select>
                                            <Option value="fix_w">Fix w</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Total Width
                                                <Tooltip title="subdirectory with this name must exist">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="total_width"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Tolerance
                                                <Tooltip title="subdirectory with this name must exist">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="tolerence"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Iterations
                                                <Tooltip title="subdirectory with this name must exist">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="iterations"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>

                            </Row>

                            <Form.Item className="text-right">
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </TabPane>
                        <TabPane tab="Special defaults" key="7">
                            <Divider orientation="left" plain><strong>Special defaults</strong>  (do not change unless the consequences are understood)</Divider>
                            {/* <strong>Warning: If well has sliding sleeve in the closed position at the begining of stage 1, the oppening pressure has no relation to the reservoir pressure. At the begining ot stage 1 ask the code to choose the reservoir pressure. </strong> */}
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Pres
                                                <Tooltip title="This is reservoir pressure gradient at the surface, unit is psi/ft, Taken from the well openning pressure at stage 1 ">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="pres"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Young
                                                {/* <Tooltip title="?">
                                                    <QuestionCircleOutlined className="icon-form-info"/>
                                                </Tooltip> */}
                                            </span>
                                        }
                                        name="young"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Overburden
                                                {/* <Tooltip title="?">
                                                    <QuestionCircleOutlined className="icon-form-info"/>
                                                </Tooltip> */}
                                            </span>
                                        }
                                        name="overburden"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Poisson
                                                <Tooltip title="Usually between 0.2-0.3, can never be greater than 0.5">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="poisson"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Eta cp
                                                <Tooltip title="Usually between 10-25 for HVFR+SLW and HVFR+SLW+Gel, Between 20-30 for  Gel+XLink, Between 40-100 for Xlink">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="eta_cp"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Flui dT
                                                <Tooltip title="Use 1 for SLW, Use 1 SLW+GEL, Use 2 SLW+XL, Use 2 gel+Xlink, Use 3 for Xlink">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="fluid_t"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Tect
                                                <Tooltip title="?">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="tect"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Fluid density
                                                <Tooltip title="unit ppg, this is density of the wellbore fluid at the start of the job, 8.33 ppg for fresh water">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="fluid_density"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Divider orientation="left" plain><strong>Do not change</strong></Divider>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Diverter time
                                                <Tooltip title="If they apply Diverter what is the percentage of the injection time prior to applying the diverter (here 70%)">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="diverter_time"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Met res
                                                <Tooltip title="Use 1 to use Ibrahim's method in calculating the reservoir pressure and 2 to use Dan's method">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="met_res"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                FFKw Correction
                                                <Tooltip title="?">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="ffkw_correction"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                K MPa
                                                <Tooltip title="?">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="k_mpa"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Nu lim
                                                <Tooltip title="What is the allowable pecentage change of Poissson Ratio per stage">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="nu_lim"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Per Red
                                                <Tooltip title="?">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="perRed"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Start1
                                                <Tooltip title="Starting time for fitting, unit is seconds.">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="start1"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Beta ss
                                                <Tooltip title="Use 0.83 for all formations other than Haynesville or formations with very high Temp. for Hayneville and very high Temp formations use use 0.8">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="beta_ss"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                St lim
                                                <Tooltip title="The limit for the starting time, (unit psi/sec)">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="st_lim"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Biot
                                                <Tooltip title="?">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="biot"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Shadow
                                                <Tooltip title="?">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="shadow"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Divider orientation="left" plain><strong>Do not change the following</strong></Divider>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                FitEndPoint
                                                <Tooltip title="0 means do not cut and all the data is useful (will use from the begining till max_end_point">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="fit_end_point"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Strat2
                                                <Tooltip title="?">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="strat2"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                NG
                                                <Tooltip title="Badstage">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="NG"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Stage Ques
                                                <Tooltip title="add the stages that are questionable and strange things happen after the shut-in">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="stage_ques"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Breaker
                                                <Tooltip title="Put 'N' if no Diverter, put 'Y' if all stages have Diverter and put 'V' if some has and some not">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="breaker_YN"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <Select>
                                            <Option value="N">N</Option>
                                            <Option value="Y">Y</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Poisson Var
                                                <Tooltip title="?">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="poisson_var_YN"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <Select>
                                            <Option value="N">N</Option>
                                            <Option value="Y">Y</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Poisson Method
                                                <Tooltip title="Put 1 to vary poisson ratio around a mean value and put 2 to vary around the previous value">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="passion_method"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Stress Shadow
                                                <Tooltip title="Use when clusters are very close and we see extreme changes in minimum stress, COP, Ageron, ...">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="stress_shadow_YN"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <Select>
                                            <Option value="N">N</Option>
                                            <Option value="Y">Y</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Plotraw
                                                <Tooltip title="Put 'Y' to plot the raw data of the pressure and 'N' for smoothend data.">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="plotraw_YN"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <Select>
                                            <Option value="N">N</Option>
                                            <Option value="Y">Y</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Skip Losses
                                                <Tooltip title="Skip fitting of friction losses? 'Y' or 'N'">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="skip_losses_YN"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <Select>
                                            <Option value="N">N</Option>
                                            <Option value="Y">Y</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Use Wns
                                                <Tooltip title="Use wns cutoff value from the field? 'Y' or 'N'">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="use_wns_YN"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <Select>
                                            <Option value="N">N</Option>
                                            <Option value="Y">Y</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Use Wncuts
                                                <Tooltip title="Use the cuts of wns for  bad stages (stages that have wns below 3600)">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="use_wncuts_YN"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <Select>
                                            <Option value="N">N</Option>
                                            <Option value="Y">Y</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        label={
                                            <span>
                                                Fit Iteration
                                                <Tooltip title="Number of time to iterate the curve fitting algorithm">
                                                    <QuestionCircleOutlined className="icon-form-info" />
                                                </Tooltip>
                                            </span>
                                        }
                                        name="fit_iteration"
                                        style={{ marginLeft: '5rem' }}
                                    >
                                        <InputNumber className="w-100" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item className="text-right">
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </TabPane>
                    </Tabs>
                </Form>
            </Card>
            {
                showConfirmationModal &&
                <ConfirmationModal
                    isModalVisible={showConfirmationModal}
                    handleCancel={handleCancel}
                    handleOk={handleChangeConfirmed}
                    modalTitle={"Save Defaults"}
                    modalText={"Are you sure you want change default values ?"}
                    footerButtons={{ cancel_text: 'Cancel', confirm_text: 'Yes' }}
                    data={modalData}
                >
                </ConfirmationModal>
            }
        </>
    );
}

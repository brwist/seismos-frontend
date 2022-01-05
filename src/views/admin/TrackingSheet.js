import React, { useEffect, useState } from "react";
import { Select, Divider, Collapse, Form, Button, Row, Col, Card, Input, DatePicker, InputNumber } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";
import ConfirmationModal from "components/Modal/ConfirmationModal";
import ENUMS from "constants/appEnums";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import FormInitialValues from "constants/formInitialValues";
import FormDataSerializer from "util/FormDataSerializer";
import { projectApi } from "./../../api/projectApi"
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import allActions from "redux/actions";

export default function TrackingSheet(props) {
    const { Option } = Select;
    const { Panel } = Collapse;
    const { TextArea } = Input;
    const history = useHistory();
    const locationData = useLocation();
    const { addToast } = useToasts();
    const [dynamicFormNestItemForm] = Form.useForm();
    const [perforationIntervalInformationForm] = Form.useForm();
    const [stageDataForm] = Form.useForm();
    const [fluidFormForm] = Form.useForm();
    const [propantFormForm] = Form.useForm();
    const [activeDataFormForm] = Form.useForm();
    const [notesDataFormForm] = Form.useForm();

    const [isLoadingFormData, setIsLoadingFormData] = useState(true);

    const dispatch = useDispatch();
    const project = useSelector(state => state.authReducer.project);

    const [wellId, setWellId] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const [items, setItems] = useState([{ value: 1, label: 'Stage 1' }]);
    const [stageSheetList, setStageSheetList] = useState([]);
    const [selectedStage, setSelectedStage] = useState(1);
    const [showConfirmationModal, setShowConfirmationModal] = useState();
    const [modalData, setModalData] = useState();

    const [isUpdating, setIsUpdating] = useState(false);
    const [resetDynamicFormNestItemValues, setResetDynamicFormNestItemValues] = useState(false);
    const [resetPerforationIntervalInformationValues, setResetPerforationIntervalInformationValues] = useState(false);
    const [resetStageDataValues, setResetStageDataValues] = useState(false);
    const [resetPropantFormValues, setResetPropantFormValues] = useState(false);
    const [resetFluidFormValues, setResetFluidFormValues] = useState(false);
    const [resetActiveDataFormValues, setResetActiveDataFormValues] = useState(false);
    const [resetNotesFataFormValues, setResetNotesFataFormValues] = useState(false);
    const [dynamicFormNestItemValues, setDynamicFormNestItemValues] = useState({
        bottomhole_bht: null,
        bottomhole_bhp: null,
        did_an_event_occur: null,
        frac_design: null,
        plug_seat_technique: null,
        plug_type: null,
        seismos_data_collection: null,
    })

    const [perforationIntervalInformationValues, setPerforationIntervalInformationValues] = useState({
        acid: null,
        bottom_measured_depth: null,
        n_clusters: null,
        displacement_vol_bottom: null,
        displacement_vol_plug: null,
        displacement_vol_top: null,
        diverter_type: null,
        perf_daiameter: null,
        perf_gun_description: null,
        plug_depth: null,
        pumped_diverter: null,
        spf: null,
        top_measured_depth: null
    })

    const [stageDataValues, setStageDataValues] = useState({
        stage_start_time: null,
        stage_end_time: null,
        opening_well: null,
        // isip: null,
        base_fluid_type: null,
        base_fluid_density: null,
        max_conc_density: null,
        max_prop_conc_ppa_design: null,
        max_prop_conc_ppa_actual: null,
        total_pad_volume_bbls_design: null,
        total_pad_volume_bbls_actual: null,
        total_clean_fluid_volume_bbls_design: null,
        total_clean_fluid_volume_bbls_actual: null,
        total_proppant_lbs_design: null,
        total_proppant_lbs_actual: null,
        acid_volume_gals_design: null,
        acid_volume_gals_actual: null,
        flush_volume_bbls_design: null,
        flush_volume_bbls_actual: null,
        slurry_volume_bbls_design: null,
        slurry_volume_bbls_actual: null,
    })

    const [propantFormValues, setPropantFormValues] = useState({
        proppantData: [
            {
                bulk_density: null,
                description: null,
                specific_gravity: null,
                amount_pumped: null
            }
        ]
    })

    const [fluidFormValues, setFluidFormValues] = useState({
        fluidData: [
            {
                description: null,
                bbls: null,
                ppg: null
            }
        ]
    })

    const [activeDataFormValues, setActiveDataFormValues] = useState({
        wave_type: null,
        amplitude: null,
        frequency: null,
        pre_frac_num_pulse: null,
        post_frac_num_pulse: null,
        offset: null,
        period: null,
        post_frac_end_time: null,
        post_frac_start_time: null,
        pre_frac_end_time: null,
        pre_frac_start_time: null,
    })

    const [notesDataFormValues, setNotesFataFormValues] = useState({
        additional_note: null,
        pre_frac_pulse_note: null,
        post_frac_pulse_note: null
    })


    const handeSelectStage = (e) => {
        setSelectedStage(e);
        if (e) {
            const sheetData = stageSheetList.find(l => l.stage_n === Number(e));
            if (sheetData) {
                fetchTrackingSheet(sheetData.uuid);
            } else {
                resetForm();
                setIsUpdating(false);
            }
        }
    }

    const addItem = () => {
        setItems([...items, { value: (items.length + 1), label: `Stage ${items.length + 1} (Added)` }])
    };

    const handleCancel = () => {
        setShowConfirmationModal(false);
        setModalData(null);
    }

    const addStage = () => {
        setShowConfirmationModal(true);
    }

    const handleAddStageConfirmed = (data) => {
        addItem();
        setShowConfirmationModal(false);
        setModalData(null);
    }

    const dynamicFormNestItemChange = (changedValue, newFormValues) => {
        setDynamicFormNestItemValues(newFormValues);
    }

    const perforationIntervalInformationChange = (changedValue, newFormValues) => {
        setPerforationIntervalInformationValues(newFormValues);
    }

    const stageDataChange = (changedValue, newFormValues) => {
        setStageDataValues(newFormValues);
    }

    const propantFormChange = (changedValue, newFormValues) => {
        setPropantFormValues(newFormValues);
    }

    const fluidFormChange = (changedValue, newFormValues) => {
        setFluidFormValues(newFormValues);
    }

    const activeDataFormChange = (changedValue, newFormValues) => {
        setActiveDataFormValues(newFormValues);
    }

    const notesDataFormChange = (changedValue, newFormValues) => {
        setNotesFataFormValues(newFormValues);
    }


    const onDateChange = (date, dateString) => {
        console.log(date, dateString);
    }

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    const handleTrackingSheetSubmit = async () => {
        const trackingSheet = FormDataSerializer.trackingSheetSubmitSerializer(
            selectedStage,
            dynamicFormNestItemValues,
            perforationIntervalInformationValues,
            stageDataValues,
            propantFormValues,
            fluidFormValues,
            activeDataFormValues,
            notesDataFormValues
        );

        try {
            if (isUpdating) {
                const stageTrackingPresent = stageSheetList.find(s => (s.stage_n) === Number(selectedStage));
                const updatedTrackingSheet = {
                    ...trackingSheet,
                    remove: {
                        fluids_injected_into_formation_ids: [],
                        proppant_data_ids: []
                    },
                    add: {
                        fluids_injected_into_formation: [],
                        proppant: []
                    },
                }
                await projectApi.putUpdateTrackingSheet(stageTrackingPresent.uuid, updatedTrackingSheet)
                
                addToast("Tracking sheet data updated successfully.", {
                    appearance: 'success',
                    autoDismiss: true
                });
            } else {
                await projectApi.postCreateTrackingSheet(wellId, trackingSheet)
                setIsUpdating(true);
                addToast("Tracking sheet data added successfully.", {
                    appearance: 'success',
                    autoDismiss: true
                });
            }
            const { data } = await projectApi.getProjectById(projectId);
            const projectData = data.project;
            dispatch(allActions.authActions.setCurrentProject(projectData));
            fetchStagesSubmitted(wellId, projectData);
        } catch (error) {
            console.log(error);
            addToast("Something went wrong. Please contact admin.", {
                appearance: 'error',
                autoDismiss: true
            });
        }
    }

    const populateFormData = (trackingSheetData) => {
        const {
            dynamicFormNestItemValuesData,
            perforationIntervalInformationValuesData,
            stageDataValuesData,
            propantFormValuesData,
            fluidFormValuesData,
            activeDataFormValuesData,
            notesDataFormValuesData
        } = FormDataSerializer.trackingSheetPopulateDataSerializer(trackingSheetData)
        dynamicFormNestItemForm.setFieldsValue(dynamicFormNestItemValuesData);
        perforationIntervalInformationForm.setFieldsValue(perforationIntervalInformationValuesData);
        stageDataForm.setFieldsValue(stageDataValuesData);
        fluidFormForm.setFieldsValue(fluidFormValuesData);
        propantFormForm.setFieldsValue(propantFormValuesData);
        activeDataFormForm.setFieldsValue(activeDataFormValuesData);
        notesDataFormForm.setFieldsValue(notesDataFormValuesData);
        setDynamicFormNestItemValues(dynamicFormNestItemValuesData);
        setPerforationIntervalInformationValues(perforationIntervalInformationValuesData);
        setStageDataValues(stageDataValuesData);
        setFluidFormValues(fluidFormValuesData);
        setPropantFormValues(propantFormValuesData);
        setActiveDataFormValues(activeDataFormValuesData);
        setNotesFataFormValues(notesDataFormValuesData);
    }

    const fetchTrackingSheet = async (sheet_id) => {
        setIsLoadingFormData(true);
        setIsUpdating(false);
        try {
            const data = await projectApi.getTrackingSheet(sheet_id);
            populateFormData(data);
            setIsUpdating(true);
            setIsLoadingFormData(false);
        } catch (error) {
            console.log(error);
        }
    }

    const getStages = (numOfStages) => {
        const stages = [];
        for (let step = 1; step <= numOfStages; step++) {
            stages.push({ value: step, label: `Stage ${step}` });
        }
        return stages;
    }

    const fetchStagesSubmitted = async (well_id, projectData) => {
        const stages = getStages(projectData.wells.find(well => well.uuid === well_id).num_stages);
        try {
            const data = await projectApi.getTrackingSheetList(well_id)
            setItems(stages);
            setStageSheetList(data.stages);
            setSelectedStage(selectedStage + "");
            if (data.stages.length > 0) {
                const stageTrackingPresent = data.stages.find(s => (s.stage_n) === stages[Number(selectedStage) - 1].value);
                if (stageTrackingPresent) {
                    fetchTrackingSheet(stageTrackingPresent.uuid);
                } else {
                    setIsUpdating(false);
                }
            } else {
                setIsUpdating(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const resetForm = () => {
        dynamicFormNestItemForm.setFieldsValue(FormInitialValues.dynamicFormNestItemValues);
        perforationIntervalInformationForm.setFieldsValue(FormInitialValues.perforationIntervalInformationValues);
        stageDataForm.setFieldsValue(FormInitialValues.stageDataValues);
        fluidFormForm.setFieldsValue(FormInitialValues.fluidFormValues);
        propantFormForm.setFieldsValue(FormInitialValues.propantFormValues);
        activeDataFormForm.setFieldsValue(FormInitialValues.activeDataFormValues);
        notesDataFormForm.setFieldsValue(FormInitialValues.notesFataFormValues);
    }

    useState(() => {
        if (project && locationData.pathname === (ENUMS.ROUTES.ADMIN + ENUMS.ROUTES.TRACKING_SHEET)) {
            if (locationData.state && locationData.state.wellId) {
                setWellId(locationData.state.wellId);
                setProjectId(locationData.state.projectId);
                resetForm();
                fetchStagesSubmitted(locationData.state.wellId, project);
            }
            else if (locationData.search) {
                const params = new URLSearchParams(locationData.search);
                const wellIdSearch = params.get('wellId');
                const projectIdSearch = params.get('projectId');
                setWellId(wellIdSearch);
                setProjectId(projectIdSearch);
                resetForm();
                fetchStagesSubmitted(wellIdSearch, project);
            }
        }
    }, [project])

    useEffect(() => {
        return history.listen((location) => {
            if (location.pathname === (ENUMS.ROUTES.ADMIN + ENUMS.ROUTES.TRACKING_SHEET)) {
                if (location.state && location.state.wellId) {
                    setWellId(location.state.wellId);
                    setProjectId(location.state.projectId);
                    resetForm();
                    fetchStagesSubmitted(location.state.wellId, project);
                }
                else if (location.search) {
                    const params = new URLSearchParams(location.search);
                    const wellIdSearch = params.get('wellId');
                    const projectIdSearch = params.get('projectId');
                    setWellId(wellIdSearch);
                    setProjectId(projectIdSearch);
                    resetForm();
                    fetchStagesSubmitted(wellIdSearch, project);
                }
            }
        })
    }, [history]);

    return (
        <>
            {
                setIsLoadingFormData &&
                <div>

                </div>
            }

            <Card bordered={false} style={{ width: '100%', marginBottom: '5px' }}>
                <div className="">
                    <Row gutter={24} className="flex items-center">
                        <Col span={20}>
                            <div><strong>Tracking sheet</strong></div>
                        </Col>
                        <Col span={4}>
                            <Select
                                style={{ width: "100%" }}
                                placeholder="Stage"
                                value={selectedStage}
                                onChange={(e) => handeSelectStage(e)}
                                dropdownRender={menu => (
                                    <div>
                                        {menu}
                                        <Divider style={{ margin: '4px 0' }} />
                                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                            <button
                                                className="no-style"
                                                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer', width: '100%' }}
                                                onClick={(e) => addStage()}
                                            >
                                                <PlusOutlined /> Add stage
                                            </button>
                                        </div>
                                    </div>
                                )}
                            >
                                {items.map(item => (
                                    <Option key={item.value}>{item.label}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                </div>
            </Card>
            <Card>
                <Collapse>
                    <Panel header={<strong>Stage Tracking</strong>} >
                        <Card>
                            <Form
                                name="dynamic_form_nest_item"
                                onValuesChange={dynamicFormNestItemChange}
                                autoComplete="off"
                                initialValues={dynamicFormNestItemValues}
                                form={dynamicFormNestItemForm}
                            >
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'plug_type'}
                                            label="Plug type"
                                            labelCol={{ span: 10, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'bottomhole_bht'}
                                            label="BHT [F]"
                                            labelCol={{ span: 7, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'plug_seat_technique'}
                                            label="Plug seat technique"
                                            labelCol={{ span: 10, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'bottomhole_bhp'}
                                            label="BHP"
                                            labelCol={{ span: 7, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'did_an_event_occur'}
                                            label="Did an event occur"
                                            labelCol={{ span: 10, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'frac_design'}
                                            label="Frac design"
                                            labelCol={{ span: 7, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'seismos_data_collection'}
                                            label="Seismos data collection"
                                            labelCol={{ span: 10, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Panel>
                    <Panel header={<strong>Perforation interval information</strong>} >
                        <Card>
                            <Form
                                name="perforation_interval_information"
                                onValuesChange={perforationIntervalInformationChange}
                                autoComplete="off"
                                initialValues={perforationIntervalInformationValues}
                                form={perforationIntervalInformationForm}
                            >
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'top_measured_depth'}
                                            label="Top perf [MD]"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'perf_daiameter'}
                                            label="Perf daiameter [in]"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'bottom_measured_depth'}
                                            label="Bottom perf"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'spf'}
                                            label="SPF"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'plug_depth'}
                                            label="Plug depth [MD]"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'pumped_diverter'}
                                            label="Pumped diverter"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'n_clusters'}
                                            label="# of clusters"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'diverter_type'}
                                            label="Diverter type"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'perf_gun_description'}
                                            label="Perf gun description"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'acid'}
                                            label="Acid"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider orientation="left" plain><strong>Displacement Volume</strong></Divider>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'displacement_vol_top'}
                                            label="Top perf [bbls]"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'displacement_vol_bottom'}
                                            label="Bottom perf [bbls]"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'displacement_vol_plug'}
                                            label="Plug [bbls]"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}></Col>
                                </Row>
                            </Form>
                        </Card>
                    </Panel>
                    <Panel header={<strong>Stage Data</strong>} >
                        <Card>
                            <Form
                                name="stage_data"
                                onValuesChange={stageDataChange}
                                autoComplete="off"
                                initialValues={stageDataValues}
                                form={stageDataForm}
                            >
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'stage_start_time'}
                                            label="Stage start time"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <DatePicker onChange={onChange} className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'stage_end_time'}
                                            label="Stage end time"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <DatePicker onChange={onChange} className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'opening_well'}
                                            label="Opening well"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    {/* <Col span={10}>
                                        <Form.Item
                                            name={'isip'}
                                            label="ISIP [psi]"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full" />
                                        </Form.Item>
                                    </Col> */}
                                </Row>
                                <Divider orientation="left" plain><strong>Fluid Parameters</strong></Divider>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'base_fluid_type'}
                                            label="Base fluid type"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'base_fluid_density'}
                                            label="Base fluid density [ppg]"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'max_conc_density'}
                                            label="Max conc density [ppg]"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}></Col>
                                </Row>
                                <Divider orientation="left" plain><strong>Fluids injected into formation</strong></Divider>
                                <Form
                                    name="fluid_form"
                                    onValuesChange={fluidFormChange}
                                    autoComplete="off"
                                    initialValues={fluidFormValues}
                                    form={fluidFormForm}
                                >
                                    <Form.List name="fluidData">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                                    <Row gutter={24} key={key}>
                                                        <Col span={2}>
                                                            #{index + 1}
                                                        </Col>
                                                        <Col span={7}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'description']}
                                                                fieldKey={[fieldKey, 'description']}
                                                                rules={[{ required: true, message: 'Description' }]}
                                                                label="Description"
                                                                labelCol={{ span: 9, offset: 0 }}
                                                                labelAlign="left"
                                                            >
                                                                <Input className="w-full" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={6}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'bbls']}
                                                                fieldKey={[fieldKey, 'bbls']}
                                                                rules={[{ required: true, message: 'bbls' }]}
                                                                label="bbls"
                                                                labelCol={{ span: 9, offset: 0 }}
                                                                labelAlign="left"
                                                            >
                                                                <InputNumber className="w-full" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={5}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'ppg']}
                                                                fieldKey={[fieldKey, 'ppg']}
                                                                rules={[{ required: true, message: 'ppg' }]}
                                                                label="ppg"
                                                                labelCol={{ span: 9, offset: 0 }}
                                                                labelAlign="left"
                                                            >
                                                                <InputNumber className="w-full" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={2}>
                                                            lb/gal
                                                        </Col>
                                                        <Col span={2}>
                                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                                        </Col>
                                                    </Row>
                                                ))}
                                                <Row gutter={24}>
                                                    <Col span={8}>
                                                        <Form.Item>
                                                            <Button
                                                                type="dashed"
                                                                onClick={() => add()}
                                                                block
                                                                icon={<PlusOutlined />}
                                                            >
                                                                Add fluid
                                                            </Button>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>

                                            </>
                                        )}
                                    </Form.List>
                                </Form>
                                <Divider orientation="left" plain><strong>Proppant data</strong></Divider>
                                <Form
                                    name="propant_form"
                                    onValuesChange={propantFormChange}
                                    autoComplete="off"
                                    initialValues={propantFormValues}
                                    form={propantFormForm}
                                >
                                    <Form.List name="proppantData">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                    <Row gutter={24} key={key}>
                                                        <Col span={6}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'description']}
                                                                fieldKey={[fieldKey, 'description']}
                                                                rules={[{ required: true, message: 'Description' }]}
                                                                label="Description"
                                                                labelCol={{ span: 11, offset: 0 }}
                                                                labelAlign="left"
                                                            >
                                                                <Input className="w-full" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={5}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'specific_gravity']}
                                                                fieldKey={[fieldKey, 'Specific_gravity']}
                                                                rules={[{ required: true, message: 'Specific gravity' }]}
                                                                label="Specific gravity"
                                                                labelCol={{ span: 16, offset: 0 }}
                                                                labelAlign="left"
                                                            >
                                                                <InputNumber className="w-full" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={5}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'bulk_density']}
                                                                fieldKey={[fieldKey, 'bulk_density']}
                                                                rules={[{ required: true, message: 'Bulk density' }]}
                                                                label="Bulk density"
                                                                labelCol={{ span: 14, offset: 0 }}
                                                                labelAlign="left"
                                                            >
                                                                <InputNumber className="w-full" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={6}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'amount_pumped']}
                                                                fieldKey={[fieldKey, 'amount_pumped']}
                                                                rules={[{ required: true, message: 'Amount Pumped' }]}
                                                                label="Amount pumped"
                                                                labelCol={{ span: 16, offset: 0 }}
                                                                labelAlign="left"
                                                            >
                                                                <InputNumber className="w-full" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={2}>
                                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                                        </Col>
                                                    </Row>
                                                ))}
                                                <Row gutter={24}>
                                                    <Col span={8}>
                                                        <Form.Item>
                                                            <Button
                                                                type="dashed"
                                                                onClick={() => add()}
                                                                block
                                                                icon={<PlusOutlined />}
                                                            >
                                                                Add proppant
                                                            </Button>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>

                                            </>
                                        )}
                                    </Form.List>
                                </Form>
                                <Divider orientation="left" plain><strong>Pumping summary</strong></Divider>
                                <Row gutter={24}>
                                    <Col span={5}>
                                        <strong>Description</strong>
                                    </Col>
                                    <Col span={5}>
                                        <strong>Design</strong>
                                    </Col>
                                    <Col span={5}>
                                        <strong>Actual</strong>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={5}>
                                        Max prop Conc[ppa]
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"max_prop_conc_ppa_design"}
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"max_prop_conc_ppa_actual"}
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={5}>
                                        Total pad volume[bbls]
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"total_pad_volume_bbls_design"}
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"total_pad_volume_bbls_actual"}
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={5}>
                                        Total clean fluid volume [bbls]
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"total_clean_fluid_volume_bbls_design"}
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"total_clean_fluid_volume_bbls_actual"}
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {/* <Row gutter={24}>
                                    <Col span={5}>
                                        Total 40/70 [lbs]
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"total_lbs_design"}
                                        >
                                            <InputNumber className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"total_lbs_actual"}
                                        >
                                            <InputNumber className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                </Row> */}
                                <Row gutter={24}>
                                    <Col span={5}>
                                        Total proppant [lbs]
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"total_proppant_lbs_design"}
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"total_proppant_lbs_actual"}
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={5}>
                                        Acid volume [gals]
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"acid_volume_gals_design"}
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"acid_volume_gals_actual"}
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={5}>
                                        Flush volume [bbls]
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"flush_volume_bbls_design"}
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"flush_volume_bbls_actual"}
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={5}>
                                        Slurry volume [bbls]
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"slurry_volume_bbls_design"}
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"slurry_volume_bbls_actual"}
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Panel>
                    <Panel header={<strong>Active Data</strong>} >
                        <Card>
                            <Form
                                name="active_data_form"
                                onValuesChange={activeDataFormChange}
                                autoComplete="off"
                                initialValues={activeDataFormValues}
                                form={activeDataFormForm}
                            >
                                <Divider orientation="left" plain><strong>Pulsing parameters</strong></Divider>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'wave_type'}
                                            label="Wave type"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'period'}
                                            label="Period"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'frequency'}
                                            label="Freq [Hz]"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'offset'}
                                            label="Offset [V]"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'amplitude'}
                                            label="Amplitude"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}></Col>
                                </Row>
                                <Divider orientation="left" plain><strong>Pre-frac pulses</strong></Divider>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'pre_frac_start_time'}
                                            label="Start time"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <DatePicker onChange={onChange} className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'pre_frac_end_time'}
                                            label="End time"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <DatePicker onChange={onChange} className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'pre_frac_num_pulse'}
                                            label="# of pulses"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider orientation="left" plain><strong>Post-frac pulses</strong></Divider>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'post_frac_start_time'}
                                            label="Start time"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <DatePicker onChange={onChange} className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'post_frac_end_time'}
                                            label="End time"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <DatePicker onChange={onChange} className="w-full" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'post_frac_num_pulse'}
                                            label="# of pulses"
                                            labelCol={{ span: 9, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Panel>
                    <Panel header={<strong>Notes</strong>} >
                        <Card>
                            <Form
                                name="notes_data_form"
                                onValuesChange={notesDataFormChange}
                                autoComplete="off"
                                initialValues={notesDataFormValues}
                                form={notesDataFormForm}
                            >

                                <Row gutter={24}>
                                    <Col span={20}>
                                        <Form.Item
                                            name={'pre_frac_pulse_note'}
                                            label="Pre-frac pulse notes"
                                            labelCol={{ span: 5, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <TextArea rows={4} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={20}>
                                        <Form.Item
                                            name={'post_frac_pulse_note'}
                                            label="Post-frac pulse notes"
                                            labelCol={{ span: 5, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <TextArea rows={4} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={20}>
                                        <Form.Item
                                            name={'additional_note'}
                                            label="Other notes"
                                            labelCol={{ span: 5, offset: 0 }}
                                            labelAlign="left"
                                        >
                                            <TextArea rows={4} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Panel>
                </Collapse>
                <div className="mt-4 w-full text-right">
                    {/* <span className="mr-4">Last submitted date: 08/07/2021</span> */}
                    <Button type="primary" onClick={(e) => handleTrackingSheetSubmit()}>{isUpdating ? "Update tracking sheet" : "Submit tracking sheet"}</Button>
                </div>
            </Card>
            {
                showConfirmationModal &&
                <ConfirmationModal
                    isModalVisible={showConfirmationModal}
                    handleCancel={handleCancel}
                    handleOk={handleAddStageConfirmed}
                    modalTitle={"Add stage"}
                    modalText={"Are you sure you want to another stage ?"}
                    footerButtons={{ cancel_text: 'Cancel', confirm_text: 'Yes' }}
                    data={modalData}
                >
                </ConfirmationModal>
            }
        </>
    );
}

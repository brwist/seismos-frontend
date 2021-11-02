import axios from "axiosConfig";
import config from "config";
import React, { useEffect, useState } from "react";
import { Select, Divider, Collapse, Form, Button, Row, Col, Card, Input, DatePicker, InputNumber } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";
import ConfirmationModal from "components/Modal/ConfirmationModal";
import ENUMS from "constants/appEnums";
import HttpUtil from "util/HttpUtil";
import { useToasts } from "react-toast-notifications";
import { useSelector } from "react-redux";
import FormInitialValues from "constants/formInitialValues";
import moment from "moment";
import FormDataSerializer from "util/FormDataSerializer";

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
    const project = useSelector(state => state.authReducer.project);
    const [wellId, setWellId] = useState(null);

    const [items, setItems] = useState([{value: 1, label: 'Stage 1'}]);
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
        bht_f: null,
        bht_psi: null,
        customer: null,
        date: null,
        event_occur: null,
        // field_engineer_days: null,
        // field_engineer_nights: null,
        frac_design: null,
        plug_seat_technique: null,
        plug_type: null,
        seismos_data_collection: null,
        stage: null,
        well: null
    })
    
    const [perforationIntervalInformationValues, setPerforationIntervalInformationValues] = useState({
        acid: null,
        bottom_perf: null,
        clusters_number: null,
        displacement_vol_bottom: null,
        displacement_vol_plug: null,
        displacement_vol_top: null,
        diverter_type: null,
        perf_daiameter: null,
        perf_gun_desc: null,
        plug_depth: null,
        pumped_diverter: null,
        spf: null,
        top_perf: null
    })

    const [stageDataValues, setStageDataValues] = useState({
        stage_start_time: null,
        stage_end_time: null,
        opening_well: null,
        isip: null,
        stage_uuid: null,
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
        pre_number_of_pulses: null,
        post_number_of_pulses: null,
        offset: null,
        period: null,
        post_end_time: null,
        post_start_time: null,
        pre_end_time: null,
        pre_start_time: null,
    })

    const [notesDataFormValues, setNotesFataFormValues] = useState({
        other_notes: null,
        pre_notes: null,
        post_notes: null
    })


    const handleSelectStage = (e) => {
        setSelectedStage(e);
        if (e) {
            const sheetData = stageSheetList.find(l => l.id === Number(e))
            if (sheetData) {
                fetchTrackingSheet(sheetData.id);
            } else {
                setIsUpdating(false);
                resetForm();
            }
        }
    }

    const addItem = () => {
        setItems([...items, {value: (items.length + 1), label: `Stage ${items.length + 1} (Added)`}])
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


    const onDateChange = (date, dateString)  => {
        console.log(date, dateString);
    }

    const onChange = (date, dateString)  => {
        console.log(date, dateString);
    }

    const handleTrackingSheetSubmit = () => {
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
        if(isUpdating) {
            axios.put(config.API_URL + ENUMS.API_ROUTES.TRACKING_SHEET_UPDATE + '/' + wellId,
                {
                    ...trackingSheet
                }, {...HttpUtil.adminHttpHeaders()})
                .then(res => {
                    if (res.status === 200) {
                        addToast("Tracking sheet data updated successfully.", { 
                            appearance: 'success',
                            autoDismiss: true
                        });
                        fetchStagesSubmitted(wellId);
                    }
                })
                .catch(e => {
                    console.log(e)
                });
        } else {
            axios.post(config.API_URL + ENUMS.API_ROUTES.TRACKING_SHEET_CREATE + '/' + wellId,
                {
                    ...trackingSheet
                }, {...HttpUtil.adminHttpHeaders()})
                .then(res => {
                    if (res.status === 201) {
                        addToast("Tracking sheet data added successfully.", { 
                            appearance: 'success',
                            autoDismiss: true
                        });
                        fetchStagesSubmitted(wellId);
                    }
                })
                .catch(e => {
                    console.log(e)
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
    }
    
    const fetchTrackingSheet = (sheet_id) => {
        setIsLoadingFormData(true);
        setIsUpdating(false);
        axios.get(config.API_URL + ENUMS.API_ROUTES.TRACKING_SHEET + '/' + sheet_id,
        {
            ...HttpUtil.adminHttpHeaders(),
        })
        .then(res => {
            if (res.status === 200 && res.data) {
                // populate tracking sheeet
                populateFormData(res.data.stage);
                setIsUpdating(true);
                setIsLoadingFormData(false);
            }
        })
        .catch(e => {
            console.log(e)
        })
    }

    const populateStageDropdown = (numOfStages) => {
        const stages = [];
        for (let step = 1; step <= numOfStages; step++) {
            stages.push({value: step, label: `Stage ${step}`});
        }
        return stages;
    }

    const fetchStagesSubmitted = (well_id) => {
        const stages = populateStageDropdown(project.wells.find(well => well.id === well_id).num_stages);
        axios.get(config.API_URL + ENUMS.API_ROUTES.TRACKING_SHEET_LIST + '/' + well_id,
        {
            ...HttpUtil.adminHttpHeaders(),
        })
        .then(res => {
            if (res.status === 200 && res.data) {
                setItems(stages);
                setStageSheetList(res.data.stages);
                setSelectedStage(selectedStage + "");
                if (res.data.stages.length > 0) {
                    const stageTrackingPresent = res.data.stages.find(s => (s.stage_n) === stages[0].value)
                    if (stageTrackingPresent) {
                        fetchTrackingSheet(stageTrackingPresent.id);
                    } else {
                        setIsUpdating(false);
                    }
                } else {
                    setIsUpdating(false);
                }
            }
        })
        .catch(e => {
            console.log(e)
        })  
    }

    const resetForm = () => {
        dynamicFormNestItemForm.setFieldsValue(FormInitialValues.dynamicFormNestItemValues);
        perforationIntervalInformationForm.setFieldsValue(FormInitialValues.perforationIntervalInformationValues);
        stageDataForm.setFieldsValue(FormInitialValues.stageDataValues);
        fluidFormForm.setFieldsValue(FormInitialValues.propantFormValues);
        propantFormForm.setFieldsValue(FormInitialValues.fluidFormValues);
        activeDataFormForm.setFieldsValue(FormInitialValues.activeDataFormValues);
        notesDataFormForm.setFieldsValue(FormInitialValues.notesFataFormValues);
    }
    
    useState(() => {
        if(project && locationData.pathname === (ENUMS.ROUTES.ADMIN + ENUMS.ROUTES.TRACKING_SHEET)) {
            if (locationData.state && locationData.state.wellId) {
                setWellId(locationData.state.wellId);
                resetForm();
                fetchStagesSubmitted(locationData.state.wellId);
            }
            else if (locationData.search) {
                const params = new URLSearchParams(locationData.search);
                const wellIdSearch = params.get('wellId');
                setWellId(wellIdSearch);
                resetForm();
                fetchStagesSubmitted(wellIdSearch);
            }
        }
    }, [project])

    useEffect(() => {
        return history.listen((location) => { 
            if(location.pathname === (ENUMS.ROUTES.ADMIN + ENUMS.ROUTES.TRACKING_SHEET)) {
                if (location.state && location.state.wellId) {
                    console.log(location.state.wellId);
                    setWellId(location.state.wellId);
                    resetForm();
                    fetchStagesSubmitted(location.state.wellId);
                }
                else if (location.search) {
                    const params = new URLSearchParams(location.search);
                    const wellIdSearch = params.get('wellId');
                    setWellId(wellIdSearch);
                    resetForm();
                    fetchStagesSubmitted(wellIdSearch);
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
                                onChange={(e) => handleSelectStage(e)}
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
                                className="tracking-sheet-form"
                                onValuesChange={dynamicFormNestItemChange}
                                autoComplete="off"
                                initialValues={dynamicFormNestItemValues}
                                form={dynamicFormNestItemForm}
                            >
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'date'}
                                            label="Date"
                                            labelCol={{span: 5, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <DatePicker onChange={onDateChange} className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}></Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'customer'}
                                            label="Customer"
                                            labelCol={{span: 7, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'well'}
                                            label="Well"
                                            labelCol={{span: 10, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    
                                </Row>
                                {/* <Row gutter={24}>
                                <Col span={10}>
                                        <Form.Item
                                            name={'field_engineer_days'}
                                            label="Field engineer (Days)"
                                            labelCol={{span: 10, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'field_engineer_nights'}
                                            label="Field engineer (Nights)"
                                            labelCol={{span: 10, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                </Row> */}
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'stage'}
                                            label="Stage"
                                            labelCol={{span: 7, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'plug_type'}
                                            label="Plug type"
                                            labelCol={{span: 10, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    </Row>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'bht_f'}
                                            label="BHT [F]"
                                            labelCol={{span: 7, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'plug_seat_technique'}
                                            label="Plug seat technique"
                                            labelCol={{span: 10, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'bht_psi'}
                                            label="BHT [psi]"
                                            labelCol={{span: 7, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'event_occur'}
                                            label="Did an event occur"
                                            labelCol={{span: 10, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'frac_design'}
                                            label="Frac design"
                                            labelCol={{span: 7, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'seismos_data_collection'}
                                            label="Seismos data collection"
                                            labelCol={{span: 10, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
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
                                className="tracking-sheet-form"
                                onValuesChange={perforationIntervalInformationChange}
                                autoComplete="off"
                                initialValues={perforationIntervalInformationValues}
                                form={perforationIntervalInformationForm}
                            >
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'top_perf'}
                                            label="Top perf [MD]"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'perf_daiameter'}
                                            label="Perf daiameter [in]"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'bottom_perf'}
                                            label="Bottom perf"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'spf'}
                                            label="SPF"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'plug_depth'}
                                            label="Plug depth [MD]"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'pumped_diverter'}
                                            label="Pumped diverter"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'clusters_number'}
                                            label="# of clusters"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'diverter_type'}
                                            label="Diverter type"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'perf_gun_desc'}
                                            label="Perf gun description"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'acid'}
                                            label="Acid"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider orientation="left" plain><strong>Displacement Volume</strong></Divider>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'displacement_vol_top'}
                                            label="Top perf [bbls]"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'displacement_vol_bottom'}
                                            label="Bottom perf [bbls]"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'displacement_vol_plug'}
                                            label="Plug [bbls]"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
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
                                className="tracking-sheet-form"
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
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <DatePicker onChange={onChange} className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'stage_end_time'}
                                            label="Stage end time"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <DatePicker onChange={onChange} className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'opening_well'}
                                            label="Opening well"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'isip'}
                                            label="ISIP [psi]"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'stage_uuid'}
                                            label="Stage uuid"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider orientation="left" plain><strong>Fluid Parameters</strong></Divider>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'base_fluid_type'}
                                            label="Base fluid type"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'base_fluid_density'}
                                            label="Base fluid density [ppg]"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'max_conc_density'}
                                            label="Max conc density [ppg]"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}></Col>
                                </Row>
                                <Divider orientation="left" plain><strong>Fluids injected into formation</strong></Divider>
                                <Form
                                    name="fluid_form"
                                    className="tracking-sheet-form"
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
                                                                labelCol={{span: 9, offset: 0}}
                                                                labelAlign="left"
                                                            >
                                                                <Input className="w-full"/>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={6}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'bbls']}
                                                                fieldKey={[fieldKey, 'bbls']}
                                                                rules={[{ required: true, message: 'bbls' }]}
                                                                label="bbls"
                                                                labelCol={{span: 9, offset: 0}}
                                                                labelAlign="left"
                                                            >
                                                                <InputNumber className="w-full"/>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={5}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'ppg']}
                                                                fieldKey={[fieldKey, 'ppg']}
                                                                rules={[{ required: true, message: 'ppg' }]}
                                                                label="ppg"
                                                                labelCol={{span: 9, offset: 0}}
                                                                labelAlign="left"
                                                            >
                                                                <InputNumber className="w-full"/>
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
                                    className="tracking-sheet-form"
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
                                                                labelCol={{span: 11, offset: 0}}
                                                                labelAlign="left"
                                                            >
                                                                <Input className="w-full"/>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={5}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'specific_gravity']}
                                                                fieldKey={[fieldKey, 'Specific_gravity']}
                                                                rules={[{ required: true, message: 'Specific gravity' }]}
                                                                label="Specific gravity"
                                                                labelCol={{span: 16, offset: 0}}
                                                                labelAlign="left"
                                                            >
                                                                <Input className="w-full"/>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={5}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'bulk_density']}
                                                                fieldKey={[fieldKey, 'bulk_density']}
                                                                rules={[{ required: true, message: 'Bulk density' }]}
                                                                label="Bulk density"
                                                                labelCol={{span: 14, offset: 0}}
                                                                labelAlign="left"
                                                            >
                                                                <Input className="w-full"/>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={6}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'amount_pumped']}
                                                                fieldKey={[fieldKey, 'amount_pumped']}
                                                                rules={[{ required: true, message: 'Amount Pumped' }]}
                                                                label="Amount pumped"
                                                                labelCol={{span: 16, offset: 0}}
                                                                labelAlign="left"
                                                            >
                                                                <InputNumber className="w-full"/>
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
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"max_prop_conc_ppa_actual"}
                                        >
                                            <InputNumber className="w-full w-100"/>
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
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"total_pad_volume_bbls_actual"}
                                        >
                                            <InputNumber className="w-full w-100"/>
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
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"total_clean_fluid_volume_bbls_actual"}
                                        >
                                            <InputNumber className="w-full w-100"/>
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
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"total_lbs_actual"}
                                        >
                                            <InputNumber className="w-full w-100"/>
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
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"total_proppant_lbs_actual"}
                                        >
                                            <InputNumber className="w-full w-100"/>
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
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"acid_volume_gals_actual"}
                                        >
                                            <InputNumber className="w-full w-100"/>
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
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"flush_volume_bbls_actual"}
                                        >
                                            <InputNumber className="w-full w-100"/>
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
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={"slurry_volume_bbls_actual"}
                                        >
                                            <InputNumber className="w-full w-100"/>
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
                                className="tracking-sheet-form"
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
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'period'}
                                            label="Periods"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'frequency'}
                                            label="Freq [Hz]"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'offset'}
                                            label="Offset [V]"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={10}>
                                        <Form.Item
                                            name={'amplitude'}
                                            label="Amplitude"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <Input className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}></Col>
                                </Row>
                                <Divider orientation="left" plain><strong>Pre-frac pulses</strong></Divider>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'pre_start_time'}
                                            label="Start time"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <DatePicker onChange={onChange} className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'pre_end_time'}
                                            label="End time"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <DatePicker onChange={onChange} className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'pre_number_of_pulses'}
                                            label="# of pulses"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full w-100"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider orientation="left" plain><strong>Post-frac pulses</strong></Divider>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'post_start_time'}
                                            label="Start time"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <DatePicker onChange={onChange} className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'post_end_time'}
                                            label="End time"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <DatePicker onChange={onChange} className="w-full"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name={'post_number_of_pulses'}
                                            label="# of pulses"
                                            labelCol={{span: 9, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <InputNumber className="w-full w-100"/>
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
                                className="tracking-sheet-form"
                                onValuesChange={notesDataFormChange}
                                autoComplete="off"
                                initialValues={notesDataFormValues}
                                form={notesDataFormForm}
                            >
                                
                                <Row gutter={24}>
                                    <Col span={20}>
                                        <Form.Item
                                            name={'pre_notes'}
                                            label="Pre-frac pulse notes"
                                            labelCol={{span: 5, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <TextArea rows={4} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={20}>
                                        <Form.Item
                                            name={'post_notes'}
                                            label="Post-frac pulse notes"
                                            labelCol={{span: 5, offset: 0}}
                                            labelAlign="left"
                                        >
                                            <TextArea rows={4} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={20}>
                                        <Form.Item
                                            name={'other_notes'}
                                            label="Other notes"
                                            labelCol={{span: 5, offset: 0}}
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
                    <Button type="primary" onClick={(e) => handleTrackingSheetSubmit()}>
                    {isUpdating ? "Update tracking sheet" : "Submit tracking sheet" }
                    </Button>
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
                    footerButtons={{cancel_text: 'Cancel', confirm_text: 'Yes'}}
                    data={modalData}
                >
                </ConfirmationModal>
            }
        </>
    );
}

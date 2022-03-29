import { Select, Divider, Collapse, Form, Button, Row, Col, Card, Input, DatePicker, InputNumber } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import ConfirmationModal from "components/Modal/ConfirmationModal";
import ENUMS from "constants/appEnums";
import { trackingSheetForm } from "constants/formInitialValues";
import moment from "moment";
import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import allActions from "redux/actions";
import styled from "styled-components";
import { projectApi } from "./../../api/projectApi";

const StyledIconButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledFlexColumn = styled(Col)`
  display: flex;
`;
const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0;
  flex-flow: ${(props) => (props.layout === "vertical" ? "column" : "row wrap")};
  .ant-form-item-control-input-content {
    > div {
      width: ${(props) => (props.layout === "vertical" ? "100%" : "auto")};
    }
  }
`;

export default function TrackingSheet() {
  const { Option } = Select;
  const { Panel } = Collapse;
  const { TextArea } = Input;
  const history = useHistory();
  const locationData = useLocation();
  const { addToast } = useToasts();
  const formRef = useRef(null);
  const [form] = Form.useForm(null);

  const dispatch = useDispatch();
  const project = useSelector((state) => state.authReducer.project);

  const [isLoadingFormData, setIsLoadingFormData] = useState(true);
  const [wellId, setWellId] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [items, setItems] = useState([{ value: 1, label: "Stage 1" }]);
  const [stageSheetList, setStageSheetList] = useState([]);
  const [selectedStage, setSelectedStage] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState();
  const [modalData, setModalData] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState(trackingSheetForm);

  const handleSelectStage = (e) => {
    setSelectedStage(e);
    if (e) {
      const sheetData = stageSheetList.find((l) => l.stage_n === Number(e));
      if (sheetData) {
        fetchTrackingSheet(sheetData.uuid);
      } else {
        resetForm();
        setIsUpdating(false);
      }
    }
  };

  const addItem = () => {
    setItems([...items, { value: items.length + 1, label: `Stage ${items.length + 1} (Added)` }]);
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
    setModalData(null);
  };

  const addStage = () => {
    setShowConfirmationModal(true);
  };

  const handleAddStageConfirmed = () => {
    addItem();
    setShowConfirmationModal(false);
    setModalData(null);
  };

  const handleFormChange = (_, newFormValues) => {
    const { stage_data } = newFormValues;
    if (stage_data) {
      const { proppant_data } = stage_data;
      if (proppant_data) {
        let total_proppant_lbs_actual = 0;
        proppant_data.forEach((row) => {
          if (row?.amount_pumped) {
            total_proppant_lbs_actual += row.amount_pumped;
          }
        });
        formRef.current.setFieldsValue({
          ...newFormValues,
          stage_data: {
            ...stage_data,
            pumping_summary: {
              ...stage_data.pumping_summary,
              total_proppant: {
                ...stage_data.pumping_summary.total_proppant,
                actual: total_proppant_lbs_actual,
              },
            },
          },
        });
      }
    }
  };

  const handleTrackingSheetSubmit = async (values) => {
    setIsSubmitLoading(true);
    const formValues = {
      ...initialFormValues,
      ...values,
      stage: Number(selectedStage),
      stage_data: values.stage_data
        ? {
            ...values.stage_data,
            stage_start_time: values.stage_data.stage_start_time ? values.stage_data.stage_start_time.unix() : null,
            stage_end_time: values.stage_data.stage_end_time ? values.stage_data.stage_end_time.unix() : null,
          }
        : {
            ...initialFormValues.stage_data,
            stage_start_time: initialFormValues.stage_data.stage_start_time
              ? initialFormValues.stage_data.stage_start_time.unix()
              : null,
            stage_end_time: initialFormValues.stage_data.stage_end_time
              ? initialFormValues.stage_data.stage_end_time.unix()
              : null,
          },
      active_data: values.active_data
        ? {
            ...values.active_data,
            pre_frac_pulses: {
              ...values.active_data.pre_frac_pulses,
              pre_frac_start_time: values.active_data.pre_frac_pulses.pre_frac_start_time
                ? values.active_data.pre_frac_pulses.pre_frac_start_time.unix()
                : null,
              pre_frac_end_time: values.active_data.pre_frac_pulses.pre_frac_end_time
                ? values.active_data.pre_frac_pulses.pre_frac_end_time.unix()
                : null,
            },
            post_frac_pulses: {
              ...values.active_data.post_frac_pulses,
              post_frac_start_time: values.active_data.post_frac_pulses.post_frac_start_time
                ? values.active_data.post_frac_pulses.post_frac_start_time.unix()
                : null,
              post_frac_end_time: values.active_data.post_frac_pulses.post_frac_end_time
                ? values.active_data.post_frac_pulses.post_frac_end_time.unix()
                : null,
            },
          }
        : {
            ...initialFormValues.active_data,
            pre_frac_pulses: {
              ...initialFormValues.active_data.pre_frac_pulses,
              pre_frac_start_time: initialFormValues.active_data.pre_frac_pulses.pre_frac_start_time
                ? initialFormValues.active_data.pre_frac_pulses.pre_frac_start_time.unix()
                : null,
              pre_frac_end_time: initialFormValues.active_data.pre_frac_pulses.pre_frac_end_time
                ? initialFormValues.active_data.pre_frac_pulses.pre_frac_end_time.unix()
                : null,
            },
            post_frac_pulses: {
              ...initialFormValues.active_data.post_frac_pulses,
              post_frac_start_time: initialFormValues.active_data.post_frac_pulses.post_frac_start_time
                ? initialFormValues.active_data.post_frac_pulses.post_frac_start_time.unix()
                : null,
              post_frac_end_time: initialFormValues.active_data.post_frac_pulses.post_frac_end_time
                ? initialFormValues.active_data.post_frac_pulses.post_frac_end_time.unix()
                : null,
            },
          },
    };
    try {
      if (isUpdating) {
        const stageTrackingPresent = stageSheetList.find((s) => s.stage_n === Number(selectedStage));
        let proppant_data_ids = [];
        initialFormValues.stage_data.proppant_data.forEach((item) => {
          const isExist = values.stage_data.proppant_data.find((updated) => updated.id === item.id);
          if (!isExist) {
            proppant_data_ids.push(item.id);
          }
        });
        let fluids_injected_into_formation_ids = [];
        initialFormValues.stage_data.fluids_injected_into_formation.forEach((item) => {
          const isExist = values.stage_data.fluids_injected_into_formation.find((updated) => updated.id === item.id);
          if (!isExist) {
            fluids_injected_into_formation_ids.push(item.id);
          }
        });
        const removedFluidsAndProppant = {
          proppant_data_ids,
          fluids_injected_into_formation_ids,
        };

        await projectApi.putUpdateTrackingSheet(stageTrackingPresent.uuid, {
          ...formValues,
          remove: removedFluidsAndProppant,
        });

        addToast("Tracking sheet data updated successfully.", {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        await projectApi.postCreateTrackingSheet(wellId, formValues);
        addToast("Tracking sheet data added successfully.", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      setIsSubmitLoading(false);
      const { data } = await projectApi.getProjectById(projectId);
      const projectData = data.project;
      dispatch(allActions.authActions.setCurrentProject(projectData));
      fetchStagesSubmitted(wellId, projectData);
    } catch (error) {
      console.log(error);
      setIsSubmitLoading(false);
      addToast("Something went wrong. Please contact admin.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const fetchTrackingSheet = useCallback(
    async (sheet_id) => {
      setIsLoadingFormData(true);
      try {
        const data = await projectApi.getTrackingSheet(sheet_id);
        const formValues = {
          ...data,
          stage_data: {
            ...data.stage_data,
            stage_start_time: data.stage_data.stage_start_time ? moment.unix(data.stage_data.stage_start_time) : null,
            stage_end_time: data.stage_data.stage_end_time ? moment.unix(data.stage_data.stage_end_time) : null,
          },
          active_data: {
            ...data.active_data,
            pre_frac_pulses: {
              ...data.active_data.pre_frac_pulses,
              pre_frac_start_time: data.active_data.pre_frac_pulses.pre_frac_start_time
                ? moment.unix(data.active_data.pre_frac_pulses.pre_frac_start_time)
                : null,
              pre_frac_end_time: data.active_data.pre_frac_pulses.pre_frac_end_time
                ? moment.unix(data.active_data.pre_frac_pulses.pre_frac_end_time)
                : null,
            },
            post_frac_pulses: {
              ...data.active_data.post_frac_pulses,
              post_frac_start_time: data.active_data.post_frac_pulses.post_frac_start_time
                ? moment.unix(data.active_data.post_frac_pulses.post_frac_start_time)
                : null,
              post_frac_end_time: data.active_data.post_frac_pulses.post_frac_end_time
                ? moment.unix(data.active_data.post_frac_pulses.post_frac_end_time)
                : null,
            },
          },
        };
        form.setFieldsValue(formValues);
        setInitialFormValues(formValues);
        setIsLoadingFormData(false);
      } catch (error) {
        console.log(error);
      }
    },
    [form],
  );

  const getStages = (numOfStages) => {
    const stages = [];
    for (let step = 1; step <= numOfStages; step++) {
      stages.push({ value: step, label: `Stage ${step}` });
    }
    return stages;
  };

  const fetchStagesSubmitted = useCallback(
    async (well_id, projectData) => {
      const stages = getStages(projectData.wells.find((well) => well.uuid === well_id).num_stages);
      try {
        const data = await projectApi.getTrackingSheetList(well_id);
        setItems(stages);
        setStageSheetList(data.stages);
        setSelectedStage(selectedStage + "");
        if (data.stages.length > 0) {
          const stageTrackingPresent = data.stages.find((s) => s.stage_n === stages[Number(selectedStage) - 1].value);
          if (stageTrackingPresent) {
            setIsUpdating(true);
            fetchTrackingSheet(stageTrackingPresent.uuid);
          } else {
            setIsUpdating(false);
            form.setFieldsValue(trackingSheetForm);
            setInitialFormValues(trackingSheetForm);
          }
        } else {
          setIsUpdating(false);
          form.setFieldsValue(trackingSheetForm);
          setInitialFormValues(trackingSheetForm);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [fetchTrackingSheet, form, selectedStage],
  );

  const resetForm = useCallback(() => {
    form.resetFields();
  }, [form]);

  useState(() => {
    if (project && locationData.pathname === ENUMS.ROUTES.ADMIN + ENUMS.ROUTES.TRACKING_SHEET) {
      if (locationData.state && locationData.state.wellId) {
        setWellId(locationData.state.wellId);
        setProjectId(locationData.state.projectId);
        resetForm();
        fetchStagesSubmitted(locationData.state.wellId, project);
      } else if (locationData.search) {
        const params = new URLSearchParams(locationData.search);
        const wellIdSearch = params.get("wellId");
        const projectIdSearch = params.get("projectId");
        setWellId(wellIdSearch);
        setProjectId(projectIdSearch);
        resetForm();
        fetchStagesSubmitted(wellIdSearch, project);
      }
    }
  }, [project]);

  useEffect(() => {
    return history.listen((location) => {
      if (location.pathname === ENUMS.ROUTES.ADMIN + ENUMS.ROUTES.TRACKING_SHEET) {
        if (location.state && location.state.wellId) {
          setWellId(location.state.wellId);
          setProjectId(location.state.projectId);
          resetForm();
          fetchStagesSubmitted(location.state.wellId, project);
        } else if (location.search) {
          const params = new URLSearchParams(location.search);
          const wellIdSearch = params.get("wellId");
          const projectIdSearch = params.get("projectId");
          setWellId(wellIdSearch);
          setProjectId(projectIdSearch);
          resetForm();
          fetchStagesSubmitted(wellIdSearch, project);
        }
      }
    });
  }, [fetchStagesSubmitted, history, project, resetForm]);

  return (
    <Fragment>
      {isLoadingFormData && <div></div>}
      <Card style={{ marginBottom: "1rem" }}>
        <Row align="middle">
          <Col span={20}>
            <strong>Tracking sheet</strong>
          </Col>
          <Col span={4}>
            <Select
              style={{ width: "100%" }}
              placeholder="Stage"
              value={selectedStage}
              onChange={(e) => handleSelectStage(e)}
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <Divider style={{ margin: "4px 0" }} />
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "nowrap",
                      padding: 8,
                    }}
                  >
                    <button
                      className="no-style"
                      style={{
                        flex: "none",
                        padding: "8px",
                        display: "block",
                        cursor: "pointer",
                        width: "100%",
                      }}
                      onClick={(e) => addStage()}
                    >
                      <PlusOutlined /> Add stage
                    </button>
                  </div>
                </div>
              )}
            >
              {items.map((item) => (
                <Option key={item.value}>{item.label}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Card>
      <Card>
        <Form
          name="tracking-sheet--form"
          onValuesChange={handleFormChange}
          autoComplete="off"
          initialValues={initialFormValues}
          form={form}
          ref={formRef}
          onFinish={handleTrackingSheetSubmit}
        >
          <Collapse>
            <Panel header={<strong>Stage Tracking</strong>}>
              <Card>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item name={["stage_tracking", "plug_type"]} label="Plug type" labelAlign="left">
                      <Input tabindex={1} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 24]}>
                  <Col span={8}>
                    <Form.Item
                      name={["stage_tracking", "bottomhole_bht"]}
                      label="BHT [F]"
                      labelAlign="left"
                      rules={[{ required: true, message: "Required field." }]}
                    >
                      <InputNumber tabindex={2} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={["stage_tracking", "plug_seat_technique"]}
                      label="Plug seat technique"
                      labelAlign="left"
                    >
                      <Input tabindex={5} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name={["stage_tracking", "bottomhole_bhp"]}
                      label="BHP"
                      labelAlign="left"
                      rules={[{ required: true, message: "Required field." }]}
                    >
                      <InputNumber tabindex={3} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={["stage_tracking", "did_an_event_occur"]}
                      label="Did an event occur"
                      labelAlign="left"
                    >
                      <Input tabindex={6} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name={["stage_tracking", "frac_design"]} label="Frac design" labelAlign="left">
                      <Input tabindex={4} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={["stage_tracking", "seismos_data_collection"]}
                      label="Seismos data collection"
                      labelAlign="left"
                    >
                      <Input tabindex={7} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Panel>
            <Panel header={<strong>Perforation interval information</strong>}>
              <Card>
                <Row gutter={[24, 24]}>
                  <Col span={12}>
                    <StyledFormItem
                      name={["perforation_interval_information", "top_measured_depth"]}
                      label="Top perf [MD]"
                      labelAlign="left"
                      rules={[{ required: true, message: "Required field." }]}
                    >
                      <InputNumber tabindex={8} />
                    </StyledFormItem>
                  </Col>
                  <Col span={12}>
                    <StyledFormItem
                      name={["perforation_interval_information", "perf_daiameter"]}
                      label="Perf daiameter [in]"
                      labelAlign="left"
                      rules={[{ required: true, message: "Required field." }]}
                    >
                      <InputNumber tabindex={13} />
                    </StyledFormItem>
                  </Col>
                  <Col span={12}>
                    <StyledFormItem
                      name={["perforation_interval_information", "bottom_measured_depth"]}
                      label="Bottom perf [MD]"
                      labelAlign="left"
                      rules={[{ required: true, message: "Required field." }]}
                    >
                      <InputNumber tabindex={9} />
                    </StyledFormItem>
                  </Col>
                  <Col span={12}>
                    <StyledFormItem
                      name={["perforation_interval_information", "spf"]}
                      label="SPF"
                      labelAlign="left"
                      rules={[{ required: true, message: "Required field." }]}
                    >
                      <InputNumber tabindex={14} />
                    </StyledFormItem>
                  </Col>
                  <Col span={12}>
                    <StyledFormItem
                      name={["perforation_interval_information", "plug_depth"]}
                      label="Plug depth [MD]"
                      labelAlign="left"
                      rules={[{ required: true, message: "Required field." }]}
                    >
                      <InputNumber tabindex={10} />
                    </StyledFormItem>
                  </Col>
                  <Col span={12}>
                    <StyledFormItem
                      name={["perforation_interval_information", "pumped_diverter"]}
                      label="Pumped diverter"
                      labelAlign="left"
                      rules={[{ required: true, message: "Required field." }]}
                    >
                      <Input tabindex={15} />
                    </StyledFormItem>
                  </Col>
                  <Col span={12}>
                    <StyledFormItem
                      name={["perforation_interval_information", "n_clusters"]}
                      label="# of clusters"
                      labelAlign="left"
                      rules={[{ required: true, message: "Required field." }]}
                    >
                      <InputNumber tabindex={11} />
                    </StyledFormItem>
                  </Col>
                  <Col span={12}>
                    <StyledFormItem
                      name={["perforation_interval_information", "diverter_type"]}
                      label="Diverter type"
                      labelAlign="left"
                      rules={[{ required: true, message: "Required field." }]}
                    >
                      <Input tabindex={16} />
                    </StyledFormItem>
                  </Col>
                  <Col span={12}>
                    <StyledFormItem
                      name={["perforation_interval_information", "perf_gun_description"]}
                      label="Perf gun description"
                      labelAlign="left"
                      rules={[{ required: true, message: "Required field." }]}
                    >
                      <Input tabindex={12} />
                    </StyledFormItem>
                  </Col>
                  <Col span={12}>
                    <StyledFormItem
                      name={["perforation_interval_information", "acid"]}
                      label="Acid"
                      labelAlign="left"
                      rules={[{ required: true, message: "Required field." }]}
                    >
                      <Input tabindex={17} />
                    </StyledFormItem>
                  </Col>
                </Row>
                <Divider orientation="left" plain>
                  <strong>Displacement Volume</strong>
                </Divider>
                <Row gutter={[24, 24]}>
                  <Col span={10}>
                    <StyledFormItem
                      name={["perforation_interval_information", "displacement_volume", "top_perf"]}
                      label="Top perf [bbls]"
                      labelAlign="left"
                      rules={[{ required: true, message: "Required field." }]}
                    >
                      <InputNumber tabindex={18} />
                    </StyledFormItem>
                  </Col>
                  <Col span={10}>
                    <StyledFormItem
                      name={["perforation_interval_information", "displacement_volume", "bottom_perf"]}
                      label="Bottom perf [bbls]"
                      labelAlign="left"
                      rules={[{ required: true, message: "Required field." }]}
                    >
                      <InputNumber tabindex={19} />
                    </StyledFormItem>
                  </Col>
                  <Col span={10}>
                    <StyledFormItem
                      name={["perforation_interval_information", "displacement_volume", "plug"]}
                      label="Plug [bbls]"
                      labelAlign="left"
                      rules={[{ required: true, message: "Required field." }]}
                    >
                      <InputNumber tabindex={20} />
                    </StyledFormItem>
                  </Col>
                </Row>
              </Card>
            </Panel>
            <Panel header={<strong>Stage Data</strong>}>
              <Card>
                <Row gutter={24}>
                  <Col span={10}>
                    <Form.Item name={["stage_data", "stage_start_time"]} label="Stage start time" labelAlign="left">
                      <DatePicker showTime />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name={["stage_data", "stage_end_time"]} label="Stage end time" labelAlign="left">
                      <DatePicker showTime />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name={["stage_data", "opening_well"]} label="Opening well" labelAlign="left">
                      <InputNumber tabindex={21} />
                    </Form.Item>
                  </Col>
                  {/* <Col span={10}>
                    <Form.Item
                      name={'isip'}
                      label="ISIP [psi]"
                      labelCol={{ span: 9, offset: 0 }}
                      labelAlign="left"
                    >
                      <Input  />
                    </Form.Item>
                  </Col> */}
                </Row>
                <Divider orientation="left" plain>
                  <strong>Fluid Parameters</strong>
                </Divider>
                <Row gutter={24}>
                  <Col span={10}>
                    <Form.Item
                      name={["stage_data", "fluid_parameters", "base_fluid_type"]}
                      label="Base fluid type"
                      labelAlign="left"
                    >
                      <Input tabindex={22} />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name={["stage_data", "fluid_parameters", "base_fluid_density"]}
                      label="Base fluid density [ppg]"
                      labelAlign="left"
                    >
                      <InputNumber tabindex={23} />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name={["stage_data", "fluid_parameters", "max_conc_density"]}
                      label="Max conc density [ppg]"
                      labelAlign="left"
                    >
                      <InputNumber tabindex={24} />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider orientation="left" plain>
                  <strong>Fluids injected into formation</strong>
                </Divider>
                <Form.List
                  name={["stage_data", "fluids_injected_into_formation"]}
                  rules={[
                    {
                      validator: async (_, value) => {
                        if (!value || value.length < 1) {
                          return Promise.reject(new Error("At least 1 fluids formation"));
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <Row gutter={[16, 24]} align="middle">
                      {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                        <Fragment key={key}>
                          <Col span={1} className="pt-8">
                            #{index + 1}
                          </Col>
                          <Col span={9}>
                            <StyledFormItem
                              {...restField}
                              name={[name, "description"]}
                              fieldKey={[fieldKey, "description"]}
                              rules={[{ required: true, message: "Required field." }]}
                              label="Description"
                              labelAlign="left"
                              layout="vertical"
                            >
                              <Input tabindex={25} />
                            </StyledFormItem>
                          </Col>
                          <Col span={5}>
                            <StyledFormItem
                              {...restField}
                              name={[name, "bbls"]}
                              fieldKey={[fieldKey, "bbls"]}
                              rules={[{ required: true, message: "Required field." }]}
                              label="bbls"
                              labelAlign="left"
                              layout="vertical"
                            >
                              <InputNumber tabindex={25} />
                            </StyledFormItem>
                          </Col>
                          <Col span={5}>
                            <StyledFormItem
                              {...restField}
                              name={[name, "ppg"]}
                              fieldKey={[fieldKey, "ppg"]}
                              rules={[{ required: true, message: "Required field." }]}
                              label="ppg"
                              labelAlign="left"
                              layout="vertical"
                            >
                              <InputNumber tabindex={26} />
                            </StyledFormItem>
                          </Col>
                          <Col span={2} className="pt-8">
                            lb/gal
                          </Col>
                          <StyledFlexColumn span={2} className="pt-8">
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </StyledFlexColumn>
                        </Fragment>
                      ))}
                      <Col span={8}>
                        <StyledFormItem>
                          <StyledIconButton block type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                            Add fluid
                          </StyledIconButton>
                        </StyledFormItem>
                        <Form.ErrorList errors={errors} />
                      </Col>
                    </Row>
                  )}
                </Form.List>
                <Divider orientation="left" plain>
                  <strong>Proppant data</strong>
                </Divider>
                <Form.List
                  name={["stage_data", "proppant_data"]}
                  rules={[
                    {
                      validator: async (_, value) => {
                        if (!value || value.length < 1) {
                          return Promise.reject(new Error("At least 1 proppant data"));
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <Row gutter={[16, 24]} align="middle">
                      {fields.map(({ key, name, fieldKey, ...restField }) => {
                        return (
                          <Fragment key={key}>
                            <Col span={6}>
                              <StyledFormItem
                                {...restField}
                                name={[name, "description"]}
                                fieldKey={[fieldKey, "description"]}
                                rules={[{ required: true, message: "Required field." }]}
                                label="Description"
                                labelAlign="left"
                                layout="vertical"
                              >
                                <Input tabindex={27} />
                              </StyledFormItem>
                            </Col>
                            <Col span={5}>
                              <StyledFormItem
                                {...restField}
                                name={[name, "specific_gravity"]}
                                fieldKey={[fieldKey, "Specific_gravity"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Required field.",
                                  },
                                ]}
                                label="Specific gravity"
                                labelAlign="left"
                                layout="vertical"
                              >
                                <InputNumber tabindex={28} />
                              </StyledFormItem>
                            </Col>
                            <Col span={5}>
                              <StyledFormItem
                                {...restField}
                                name={[name, "bulk_density"]}
                                fieldKey={[fieldKey, "bulk_density"]}
                                rules={[{ required: true, message: "Required field." }]}
                                label="Bulk density"
                                labelAlign="left"
                                layout="vertical"
                              >
                                <InputNumber tabindex={29} />
                              </StyledFormItem>
                            </Col>
                            <Col span={6}>
                              <StyledFormItem
                                {...restField}
                                name={[name, "amount_pumped"]}
                                fieldKey={[fieldKey, "amount_pumped"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Required field.",
                                  },
                                ]}
                                label="Amount pumped"
                                labelAlign="left"
                                layout="vertical"
                              >
                                <InputNumber tabindex={30} />
                              </StyledFormItem>
                            </Col>
                            <StyledFlexColumn span={2} className="mt-8">
                              <MinusCircleOutlined onClick={() => remove(name)} />
                            </StyledFlexColumn>
                          </Fragment>
                        );
                      })}
                      <Col span={8}>
                        <StyledFormItem>
                          <StyledIconButton block type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                            Add proppant
                          </StyledIconButton>
                        </StyledFormItem>
                        <Form.ErrorList errors={errors} />
                      </Col>
                    </Row>
                  )}
                </Form.List>

                <Divider orientation="left" plain>
                  <strong>Pumping summary</strong>
                </Divider>
                <Row gutter={[24, 24]} align="middle">
                  <Col span={8}>
                    <strong>Description</strong>
                  </Col>
                  <Col span={8}>
                    <strong>Design</strong>
                  </Col>
                  <Col span={8}>
                    <strong>Actual</strong>
                  </Col>
                  <Col span={8}>Max prop Conc[ppa]</Col>
                  <Col span={8}>
                    <StyledFormItem name={["stage_data", "pumping_summary", "max_prop_conc", "design"]}>
                      <InputNumber tabindex={31} />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={["stage_data", "pumping_summary", "max_prop_conc", "actual"]}>
                      <InputNumber tabindex={38} />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>Total pad volume[bbls]</Col>
                  <Col span={8}>
                    <StyledFormItem name={["stage_data", "pumping_summary", "total_pad_volume", "design"]}>
                      <InputNumber tabindex={32} />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={["stage_data", "pumping_summary", "total_pad_volume", "actual"]}>
                      <InputNumber tabindex={39} />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>Total clean fluid volume [bbls]</Col>
                  <Col span={8}>
                    <StyledFormItem name={["stage_data", "pumping_summary", "total_clean_fluid_volume", "design"]}>
                      <InputNumber tabindex={33} />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={["stage_data", "pumping_summary", "total_clean_fluid_volume", "actual"]}>
                      <InputNumber tabindex={40} />
                    </StyledFormItem>
                  </Col>
                  {/* <Col span={8}>Total 40/70 [lbs]</Col>
                  <Col span={8}>
                    <StyledFormItem name={"total_lbs_design"}>
                      <InputNumber />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={"total_lbs_actual"}>
                      <InputNumber />
                    </StyledFormItem>
                  </Col> */}
                  <Col span={8}>Total proppant [lbs]</Col>
                  <Col span={8}>
                    <StyledFormItem name={["stage_data", "pumping_summary", "total_proppant", "design"]}>
                      <InputNumber tabindex={34} />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={["stage_data", "pumping_summary", "total_proppant", "actual"]}>
                      <InputNumber disabled />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>Acid volume [gals]</Col>
                  <Col span={8}>
                    <StyledFormItem name={["stage_data", "pumping_summary", "acid_volume", "design"]}>
                      <InputNumber tabindex={35} />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={["stage_data", "pumping_summary", "acid_volume", "actual"]}>
                      <InputNumber tabindex={41} />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>Flush volume [bbls]</Col>
                  <Col span={8}>
                    <StyledFormItem name={["stage_data", "pumping_summary", "flush_volume", "design"]}>
                      <InputNumber tabindex={36} />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={["stage_data", "pumping_summary", "flush_volume", "actual"]}>
                      <InputNumber tabindex={42} />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>Slurry volume [bbls]</Col>
                  <Col span={8}>
                    <StyledFormItem name={["stage_data", "pumping_summary", "slurry_volume", "design"]}>
                      <InputNumber tabindex={37} />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={["stage_data", "pumping_summary", "slurry_volume", "actual"]}>
                      <InputNumber tabindex={43} />
                    </StyledFormItem>
                  </Col>
                </Row>
              </Card>
            </Panel>
            <Panel header={<strong>Active Data</strong>}>
              <Card>
                <Divider orientation="left" plain>
                  <strong>Pulsing parameters</strong>
                </Divider>
                <Row gutter={24}>
                  <Col span={10}>
                    <Form.Item
                      name={["active_data", "pulsing_parameteres", "wave_type"]}
                      label="Wave type"
                      labelAlign="left"
                    >
                      <Input tabindex={44} />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name={["active_data", "pulsing_parameteres", "period"]} label="Period" labelAlign="left">
                      <InputNumber tabindex={45} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name={["active_data", "pulsing_parameteres", "frequency"]}
                      label="Freq [Hz]"
                      labelAlign="left"
                    >
                      <InputNumber tabindex={46} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name={["active_data", "pulsing_parameteres", "offset"]}
                      label="Offset [V]"
                      labelAlign="left"
                    >
                      <InputNumber tabindex={47} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name={["active_data", "pulsing_parameteres", "amplitude"]}
                      label="Amplitude"
                      labelAlign="left"
                    >
                      <InputNumber tabindex={48} />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider orientation="left" plain>
                  <strong>Pre-frac pulses</strong>
                </Divider>
                <Row gutter={24}>
                  <Col span={9}>
                    <Form.Item
                      name={["active_data", "pre_frac_pulses", "pre_frac_start_time"]}
                      label="Start time"
                      labelAlign="left"
                    >
                      <DatePicker showTime />
                    </Form.Item>
                  </Col>
                  <Col span={9}>
                    <Form.Item
                      name={["active_data", "pre_frac_pulses", "pre_frac_end_time"]}
                      label="End time"
                      labelAlign="left"
                    >
                      <DatePicker showTime />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name={["active_data", "pre_frac_pulses", "pre_frac_num_pulse"]}
                      label="# of pulses"
                      labelAlign="left"
                    >
                      <InputNumber tabindex={49} />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider orientation="left" plain>
                  <strong>Post-frac pulses</strong>
                </Divider>
                <Row gutter={24}>
                  <Col span={9}>
                    <Form.Item
                      name={["active_data", "post_frac_pulses", "post_frac_start_time"]}
                      label="Start time"
                      labelAlign="left"
                    >
                      <DatePicker showTime />
                    </Form.Item>
                  </Col>
                  <Col span={9}>
                    <Form.Item
                      name={["active_data", "post_frac_pulses", "post_frac_end_time"]}
                      label="End time"
                      labelAlign="left"
                    >
                      <DatePicker showTime />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name={["active_data", "post_frac_pulses", "post_frac_num_pulse"]}
                      label="# of pulses"
                      labelAlign="left"
                    >
                      <InputNumber tabindex={50} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Panel>
            <Panel header={<strong>Notes</strong>}>
              <Card>
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <StyledFormItem
                      name={["notes", "pre_frac_pulse_note"]}
                      label="Pre-frac pulse notes"
                      labelAlign="left"
                      layout="vertical"
                    >
                      <TextArea rows={4} tabindex={51} />
                    </StyledFormItem>
                  </Col>
                  <Col span={24}>
                    <StyledFormItem
                      name={["notes", "post_frac_pulse_note"]}
                      label="Post-frac pulse notes"
                      labelAlign="left"
                      layout="vertical"
                    >
                      <TextArea rows={4} tabindex={52} />
                    </StyledFormItem>
                  </Col>
                  <Col span={24}>
                    <StyledFormItem
                      name={["notes", "additional_note"]}
                      label="Other notes"
                      labelAlign="left"
                      layout="vertical"
                    >
                      <TextArea rows={4} tabindex={53} />
                    </StyledFormItem>
                  </Col>
                </Row>
              </Card>
            </Panel>
          </Collapse>
          <div className="flex justify-end mt-4">
            {/* <span className="mr-4">Last submitted date: 08/07/2021</span> */}
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isSubmitLoading}>
                {isUpdating ? "Update tracking sheet" : "Submit tracking sheet"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
      {showConfirmationModal && (
        <ConfirmationModal
          isModalVisible={showConfirmationModal}
          handleCancel={handleCancel}
          handleOk={handleAddStageConfirmed}
          modalTitle={"Add stage"}
          modalText={"Are you sure you want to another stage ?"}
          footerButtons={{ cancel_text: "Cancel", confirm_text: "Yes" }}
          data={modalData}
        ></ConfirmationModal>
      )}
    </Fragment>
  );
}

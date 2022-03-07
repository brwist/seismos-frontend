import { Select, Divider, Collapse, Form, Button, Row, Col, Card, Input, DatePicker, InputNumber } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import ConfirmationModal from 'components/Modal/ConfirmationModal'
import ENUMS from 'constants/appEnums'
import FormInitialValues from 'constants/formInitialValues'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { useToasts } from 'react-toast-notifications'
import { useDispatch, useSelector } from 'react-redux'
import allActions from 'redux/actions'
import styled from 'styled-components'
import FormDataSerializer from 'util/FormDataSerializer'
import { projectApi } from './../../api/projectApi'

const StyledIconButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledFlexColumn = styled(Col)`
  display: flex;
`
const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0;
  flex-flow: ${(props) => (props.isVertical ? 'column' : 'row wrap')};
  .ant-form-item-control-input-content {
    > div {
      width: ${(props) => (props.isVertical ? '100%' : 'auto')};
    }
  }
`

export default function TrackingSheet() {
  const { Option } = Select
  const { Panel } = Collapse
  const { TextArea } = Input
  const history = useHistory()
  const locationData = useLocation()
  const { addToast } = useToasts()
  const [dynamicFormNestItemForm] = Form.useForm(null)
  const [perforationIntervalInformationForm] = Form.useForm(null)
  const [stageDataForm] = Form.useForm(null)
  const [fluidFormForm] = Form.useForm(null)
  const [proppantFormForm] = Form.useForm(null)
  const [activeDataFormForm] = Form.useForm(null)
  const [notesDataFormForm] = Form.useForm(null)

  const [isLoadingFormData, setIsLoadingFormData] = useState(true)

  const dispatch = useDispatch()
  const project = useSelector((state) => state.authReducer.project)

  const [wellId, setWellId] = useState(null)
  const [projectId, setProjectId] = useState(null)
  const [items, setItems] = useState([{ value: 1, label: 'Stage 1' }])
  const [stageSheetList, setStageSheetList] = useState([])
  const [selectedStage, setSelectedStage] = useState(1)
  const [showConfirmationModal, setShowConfirmationModal] = useState()
  const [modalData, setModalData] = useState()

  const [isUpdating, setIsUpdating] = useState(false)
  // const [resetDynamicFormNestItemValues, setResetDynamicFormNestItemValues] =
  //   useState(false);
  // const [
  //   resetPerforationIntervalInformationValues,
  //   setResetPerforationIntervalInformationValues,
  // ] = useState(false);
  // const [resetStageDataValues, setResetStageDataValues] = useState(false);
  // const [resetProppantFormValues, setResetProppantFormValues] = useState(false);
  // const [resetFluidFormValues, setResetFluidFormValues] = useState(false);
  // const [resetActiveDataFormValues, setResetActiveDataFormValues] =
  //   useState(false);
  // const [resetNotesFataFormValues, setResetNotesFataFormValues] =
  //   useState(false);
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
    top_measured_depth: null,
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
    // total_proppant_lbs_actual: null,
    acid_volume_gals_design: null,
    acid_volume_gals_actual: null,
    flush_volume_bbls_design: null,
    flush_volume_bbls_actual: null,
    slurry_volume_bbls_design: null,
    slurry_volume_bbls_actual: null,
  })

  const [proppantFormValues, setProppantFormValues] = useState({
    proppantData: [
      {
        bulk_density: null,
        description: null,
        specific_gravity: null,
        amount_pumped: null,
      },
    ],
  })

  const [fluidFormValues, setFluidFormValues] = useState({
    fluidData: [
      {
        description: null,
        bbls: null,
        ppg: null,
      },
    ],
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
    post_frac_pulse_note: null,
  })

  // const [addedFluidsAndProppant, setAddedFluidsAndProppant] = useState({
  //   fluids_injected_into_formation: [],
  //   proppant: [],
  // });
  const [removedFluidsAndProppant, setRemovedFluidsAndProppant] = useState({
    fluids_injected_into_formation_ids: [],
    proppant_data_ids: [],
  })

  const handleSelectStage = (e) => {
    setSelectedStage(e)
    if (e) {
      const sheetData = stageSheetList.find((l) => l.stage_n === Number(e))
      if (sheetData) {
        fetchTrackingSheet(sheetData.uuid)
      } else {
        resetForm()
        setIsUpdating(false)
      }
    }
  }

  const addItem = () => {
    setItems([...items, { value: items.length + 1, label: `Stage ${items.length + 1} (Added)` }])
  }

  const handleCancel = () => {
    setShowConfirmationModal(false)
    setModalData(null)
  }

  const addStage = () => {
    setShowConfirmationModal(true)
  }

  const handleAddStageConfirmed = (data) => {
    addItem()
    setShowConfirmationModal(false)
    setModalData(null)
  }

  const dynamicFormNestItemChange = (changedValue, newFormValues) => {
    setDynamicFormNestItemValues(newFormValues)
  }

  const perforationIntervalInformationChange = (changedValue, newFormValues) => {
    setPerforationIntervalInformationValues(newFormValues)
  }

  const stageDataChange = (changedValue, newFormValues) => {
    setStageDataValues(newFormValues)
  }

  const proppantFormChange = (changedValue, newFormValues) => {
    setProppantFormValues(newFormValues)
  }

  const fluidFormChange = (changedValue, newFormValues) => {
    setFluidFormValues(newFormValues)
  }

  const activeDataFormChange = (changedValue, newFormValues) => {
    setActiveDataFormValues(newFormValues)
  }

  const notesDataFormChange = (changedValue, newFormValues) => {
    setNotesFataFormValues(newFormValues)
  }

  const onChange = (date, dateString) => {
    console.log(date, dateString)
  }

  const handleTrackingSheetSubmit = async () => {
    const trackingSheet = FormDataSerializer.trackingSheetSubmitSerializer(
      selectedStage,
      dynamicFormNestItemValues,
      perforationIntervalInformationValues,
      stageDataValues,
      proppantFormValues,
      fluidFormValues,
      activeDataFormValues,
      notesDataFormValues,
    )

    console.log(trackingSheet)
    try {
      if (isUpdating) {
        const stageTrackingPresent = stageSheetList.find((s) => s.stage_n === Number(selectedStage))
        const addedProppantData = proppantFormValues.proppantData.filter((item) => {
          if (!item) return false
          return !item.id
        })
        const addedFluidData = fluidFormValues.fluidData.filter((item) => {
          if (!item) return false
          return !item.id
        })
        const updatedTrackingSheet = {
          ...trackingSheet,
          remove: removedFluidsAndProppant,
          add: {
            fluids_injected_into_formation: addedFluidData,
            proppant: addedProppantData,
          },
        }
        console.log('updatedTrackingSheet', updatedTrackingSheet)
        await projectApi.putUpdateTrackingSheet(stageTrackingPresent.uuid, updatedTrackingSheet)

        addToast('Tracking sheet data updated successfully.', {
          appearance: 'success',
          autoDismiss: true,
        })
      } else {
        await projectApi.postCreateTrackingSheet(wellId, trackingSheet)
        setIsUpdating(true)
        addToast('Tracking sheet data added successfully.', {
          appearance: 'success',
          autoDismiss: true,
        })
      }
      const { data } = await projectApi.getProjectById(projectId)
      const projectData = data.project
      dispatch(allActions.authActions.setCurrentProject(projectData))
      fetchStagesSubmitted(wellId, projectData)
    } catch (error) {
      console.log(error)
      addToast('Something went wrong. Please contact admin.', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  const populateFormData = useCallback(
    (trackingSheetData) => {
      const {
        dynamicFormNestItemValuesData,
        perforationIntervalInformationValuesData,
        stageDataValuesData,
        proppantFormValuesData,
        fluidFormValuesData,
        activeDataFormValuesData,
        notesDataFormValuesData,
      } = FormDataSerializer.trackingSheetPopulateDataSerializer(trackingSheetData)
      dynamicFormNestItemForm.setFieldsValue(dynamicFormNestItemValuesData)
      perforationIntervalInformationForm.setFieldsValue(perforationIntervalInformationValuesData)
      stageDataForm.setFieldsValue(stageDataValuesData)
      fluidFormForm.setFieldsValue(fluidFormValuesData)
      proppantFormForm.setFieldsValue(proppantFormValuesData)
      activeDataFormForm.setFieldsValue(activeDataFormValuesData)
      notesDataFormForm.setFieldsValue(notesDataFormValuesData)
      setDynamicFormNestItemValues(dynamicFormNestItemValuesData)
      setPerforationIntervalInformationValues(perforationIntervalInformationValuesData)
      setStageDataValues(stageDataValuesData)
      setFluidFormValues(fluidFormValuesData)
      setProppantFormValues(proppantFormValuesData)
      setActiveDataFormValues(activeDataFormValuesData)
      setNotesFataFormValues(notesDataFormValuesData)
    },
    [
      activeDataFormForm,
      dynamicFormNestItemForm,
      fluidFormForm,
      notesDataFormForm,
      perforationIntervalInformationForm,
      proppantFormForm,
      stageDataForm,
    ],
  )

  const fetchTrackingSheet = useCallback(
    async (sheet_id) => {
      setIsLoadingFormData(true)
      setIsUpdating(false)
      try {
        const data = await projectApi.getTrackingSheet(sheet_id)
        console.log('fetchTrackingSheet', data)
        populateFormData(data)
        setIsUpdating(true)
        setIsLoadingFormData(false)
      } catch (error) {
        console.log(error)
      }
    },
    [populateFormData],
  )

  const getStages = (numOfStages) => {
    const stages = []
    for (let step = 1; step <= numOfStages; step++) {
      stages.push({ value: step, label: `Stage ${step}` })
    }
    return stages
  }

  const fetchStagesSubmitted = useCallback(
    async (well_id, projectData) => {
      const stages = getStages(projectData.wells.find((well) => well.uuid === well_id).num_stages)
      try {
        const data = await projectApi.getTrackingSheetList(well_id)
        setItems(stages)
        setStageSheetList(data.stages)
        setSelectedStage(selectedStage + '')
        if (data.stages.length > 0) {
          const stageTrackingPresent = data.stages.find((s) => s.stage_n === stages[Number(selectedStage) - 1].value)
          if (stageTrackingPresent) {
            fetchTrackingSheet(stageTrackingPresent.uuid)
          } else {
            setIsUpdating(false)
          }
        } else {
          setIsUpdating(false)
        }
      } catch (error) {
        console.log(error)
      }
    },
    [fetchTrackingSheet, selectedStage],
  )

  const resetForm = useCallback(() => {
    dynamicFormNestItemForm.setFieldsValue(FormInitialValues.dynamicFormNestItemValues)
    perforationIntervalInformationForm.setFieldsValue(FormInitialValues.perforationIntervalInformationValues)
    stageDataForm.setFieldsValue(FormInitialValues.stageDataValues)
    fluidFormForm.setFieldsValue(FormInitialValues.fluidFormValues)
    proppantFormForm.setFieldsValue(FormInitialValues.proppantFormValues)
    activeDataFormForm.setFieldsValue(FormInitialValues.activeDataFormValues)
    notesDataFormForm.setFieldsValue(FormInitialValues.notesFataFormValues)
  }, [
    activeDataFormForm,
    dynamicFormNestItemForm,
    fluidFormForm,
    notesDataFormForm,
    perforationIntervalInformationForm,
    proppantFormForm,
    stageDataForm,
  ])

  useState(() => {
    if (project && locationData.pathname === ENUMS.ROUTES.ADMIN + ENUMS.ROUTES.TRACKING_SHEET) {
      if (locationData.state && locationData.state.wellId) {
        setWellId(locationData.state.wellId)
        setProjectId(locationData.state.projectId)
        resetForm()
        fetchStagesSubmitted(locationData.state.wellId, project)
      } else if (locationData.search) {
        const params = new URLSearchParams(locationData.search)
        const wellIdSearch = params.get('wellId')
        const projectIdSearch = params.get('projectId')
        setWellId(wellIdSearch)
        setProjectId(projectIdSearch)
        resetForm()
        fetchStagesSubmitted(wellIdSearch, project)
      }
    }
  }, [project])

  useEffect(() => {
    return history.listen((location) => {
      if (location.pathname === ENUMS.ROUTES.ADMIN + ENUMS.ROUTES.TRACKING_SHEET) {
        if (location.state && location.state.wellId) {
          setWellId(location.state.wellId)
          setProjectId(location.state.projectId)
          resetForm()
          fetchStagesSubmitted(location.state.wellId, project)
        } else if (location.search) {
          const params = new URLSearchParams(location.search)
          const wellIdSearch = params.get('wellId')
          const projectIdSearch = params.get('projectId')
          setWellId(wellIdSearch)
          setProjectId(projectIdSearch)
          resetForm()
          fetchStagesSubmitted(wellIdSearch, project)
        }
      }
    })
  }, [fetchStagesSubmitted, history, project, resetForm])

  return (
    <Fragment>
      {isLoadingFormData && <div></div>}
      <Card style={{ marginBottom: '1rem' }}>
        <Row align="middle">
          <Col span={20}>
            <strong>Tracking sheet</strong>
          </Col>
          <Col span={4}>
            <Select
              style={{ width: '100%' }}
              placeholder="Stage"
              value={selectedStage}
              onChange={(e) => handleSelectStage(e)}
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <Divider style={{ margin: '4px 0' }} />
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'nowrap',
                      padding: 8,
                    }}
                  >
                    <button
                      className="no-style"
                      style={{
                        flex: 'none',
                        padding: '8px',
                        display: 'block',
                        cursor: 'pointer',
                        width: '100%',
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
        <Collapse>
          <Panel header={<strong>Stage Tracking</strong>}>
            <Card>
              <Form
                name="dynamic_form_nest_item"
                onValuesChange={dynamicFormNestItemChange}
                autoComplete="off"
                initialValues={dynamicFormNestItemValues}
                form={dynamicFormNestItemForm}
              >
                <Row gutter={24} className="mb-6">
                  <Col span={8}>
                    <StyledFormItem name={'plug_type'} label="Plug type" labelAlign="left">
                      <Input />
                    </StyledFormItem>
                  </Col>
                </Row>
                <Row gutter={[24, 24]}>
                  <Col span={8}>
                    <StyledFormItem name={'bottomhole_bht'} label="BHT [F]" labelAlign="left">
                      <InputNumber />
                    </StyledFormItem>
                  </Col>
                  <Col span={12}>
                    <StyledFormItem name={'plug_seat_technique'} label="Plug seat technique" labelAlign="left">
                      <Input />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={'bottomhole_bhp'} label="BHP" labelAlign="left">
                      <InputNumber />
                    </StyledFormItem>
                  </Col>
                  <Col span={12}>
                    <StyledFormItem name={'did_an_event_occur'} label="Did an event occur" labelAlign="left">
                      <Input />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={'frac_design'} label="Frac design" labelAlign="left">
                      <Input />
                    </StyledFormItem>
                  </Col>
                  <Col span={12}>
                    <StyledFormItem name={'seismos_data_collection'} label="Seismos data collection" labelAlign="left">
                      <Input />
                    </StyledFormItem>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Panel>
          <Panel header={<strong>Perforation interval information</strong>}>
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
                    <Form.Item name={'top_measured_depth'} label="Top perf [MD]" labelAlign="left">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name={'perf_daiameter'} label="Perf daiameter [in]" labelAlign="left">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={10}>
                    <Form.Item name={'bottom_measured_depth'} label="Bottom perf [MD]" labelAlign="left">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name={'spf'} label="SPF" labelAlign="left">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={10}>
                    <Form.Item name={'plug_depth'} label="Plug depth [MD]" labelAlign="left">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name={'pumped_diverter'} label="Pumped diverter" labelAlign="left">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={10}>
                    <Form.Item name={'n_clusters'} label="# of clusters" labelAlign="left">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name={'diverter_type'} label="Diverter type" labelAlign="left">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={10}>
                    <Form.Item name={'perf_gun_description'} label="Perf gun description" labelAlign="left">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name={'acid'} label="Acid" labelAlign="left">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider orientation="left" plain>
                  <strong>Displacement Volume</strong>
                </Divider>
                <Row gutter={24}>
                  <Col span={10}>
                    <Form.Item name={'displacement_vol_top'} label="Top perf [bbls]" labelAlign="left">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name={'displacement_vol_bottom'} label="Bottom perf [bbls]" labelAlign="left">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <StyledFormItem name={'displacement_vol_plug'} label="Plug [bbls]" labelAlign="left">
                      <InputNumber />
                    </StyledFormItem>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Panel>
          <Panel header={<strong>Stage Data</strong>}>
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
                      <DatePicker onChange={onChange} showTime tabIndex={21} />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name={'stage_end_time'}
                      label="Stage end time"
                      labelCol={{ span: 9, offset: 0 }}
                      labelAlign="left"
                    >
                      <DatePicker onChange={onChange} tabIndex={22} showTime />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name={'opening_well'}
                      label="Opening well"
                      labelCol={{ span: 9, offset: 0 }}
                      labelAlign="left"
                    >
                      <InputNumber />
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
                    <Form.Item name={'base_fluid_type'} label="Base fluid type" labelAlign="left">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name={'base_fluid_density'} label="Base fluid density [ppg]" labelAlign="left">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name={'max_conc_density'} label="Max conc density [ppg]" labelAlign="left">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider orientation="left" plain>
                  <strong>Fluids injected into formation</strong>
                </Divider>
                <Form
                  name="fluid_form"
                  onValuesChange={fluidFormChange}
                  autoComplete="off"
                  initialValues={fluidFormValues}
                  form={fluidFormForm}
                >
                  <Form.List name="fluidData">
                    {(fields, { add, remove }) => (
                      <Row gutter={[16, 24]} align="middle">
                        {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                          <Fragment key={key}>
                            <Col span={1}>#{index + 1}</Col>
                            <Col span={9}>
                              <StyledFormItem
                                {...restField}
                                name={[name, 'description']}
                                fieldKey={[fieldKey, 'description']}
                                rules={[{ required: true, message: 'Description' }]}
                                label="Description"
                                labelAlign="left"
                              >
                                <Input />
                              </StyledFormItem>
                            </Col>
                            <Col span={5}>
                              <StyledFormItem
                                {...restField}
                                name={[name, 'bbls']}
                                fieldKey={[fieldKey, 'bbls']}
                                rules={[{ required: true, message: 'bbls' }]}
                                label="bbls"
                                labelAlign="left"
                              >
                                <InputNumber />
                              </StyledFormItem>
                            </Col>
                            <Col span={5}>
                              <StyledFormItem
                                {...restField}
                                name={[name, 'ppg']}
                                fieldKey={[fieldKey, 'ppg']}
                                rules={[{ required: true, message: 'ppg' }]}
                                label="ppg"
                                labelAlign="left"
                              >
                                <InputNumber />
                              </StyledFormItem>
                            </Col>
                            <Col span={2}>lb/gal</Col>
                            <StyledFlexColumn span={2}>
                              <MinusCircleOutlined
                                onClick={() => {
                                  if (fluidFormValues.fluidData[name])
                                    setRemovedFluidsAndProppant((prev) => {
                                      return {
                                        ...prev,
                                        fluids_injected_into_formation_ids: [
                                          ...prev.fluids_injected_into_formation_ids,
                                          fluidFormValues.fluidData[name].id,
                                        ],
                                      }
                                    })
                                  remove(name)
                                }}
                              />
                            </StyledFlexColumn>
                          </Fragment>
                        ))}
                        <Col span={8}>
                          <Form.Item>
                            <StyledIconButton block type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                              Add fluid
                            </StyledIconButton>
                          </Form.Item>
                        </Col>
                      </Row>
                    )}
                  </Form.List>
                </Form>
                <Divider orientation="left" plain>
                  <strong>Proppant data</strong>
                </Divider>
                <Form
                  name="proppant_form"
                  onValuesChange={proppantFormChange}
                  autoComplete="off"
                  initialValues={proppantFormValues}
                  form={proppantFormForm}
                >
                  <Form.List name="proppantData">
                    {(fields, { add, remove }) => (
                      <Row gutter={[16, 24]} align="middle">
                        {fields.map(({ key, name, fieldKey, ...restField }) => {
                          return (
                            <Fragment key={key}>
                              <Col span={6}>
                                <StyledFormItem
                                  {...restField}
                                  name={[name, 'description']}
                                  fieldKey={[fieldKey, 'description']}
                                  rules={[{ required: true, message: 'Description' }]}
                                  label="Description"
                                  labelAlign="left"
                                  isVertical
                                >
                                  <Input />
                                </StyledFormItem>
                              </Col>
                              <Col span={5}>
                                <StyledFormItem
                                  {...restField}
                                  name={[name, 'specific_gravity']}
                                  fieldKey={[fieldKey, 'Specific_gravity']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Specific gravity',
                                    },
                                  ]}
                                  label="Specific gravity"
                                  labelAlign="left"
                                  isVertical
                                >
                                  <InputNumber />
                                </StyledFormItem>
                              </Col>
                              <Col span={5}>
                                <StyledFormItem
                                  {...restField}
                                  name={[name, 'bulk_density']}
                                  fieldKey={[fieldKey, 'bulk_density']}
                                  rules={[{ required: true, message: 'Bulk density' }]}
                                  label="Bulk density"
                                  labelAlign="left"
                                  isVertical
                                >
                                  <InputNumber />
                                </StyledFormItem>
                              </Col>
                              <Col span={6}>
                                <StyledFormItem
                                  {...restField}
                                  name={[name, 'amount_pumped']}
                                  fieldKey={[fieldKey, 'amount_pumped']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Amount Pumped',
                                    },
                                  ]}
                                  label="Amount pumped"
                                  labelAlign="left"
                                  isVertical
                                >
                                  <InputNumber />
                                </StyledFormItem>
                              </Col>
                              <StyledFlexColumn span={2} className="mt-8">
                                <MinusCircleOutlined
                                  onClick={() => {
                                    if (proppantFormValues.proppantData[name])
                                      setRemovedFluidsAndProppant((prev) => {
                                        return {
                                          ...prev,
                                          proppant_data_ids: [
                                            ...prev.proppant_data_ids,
                                            proppantFormValues.proppantData[name].id,
                                          ],
                                        }
                                      })
                                    remove(name)
                                  }}
                                />
                              </StyledFlexColumn>
                            </Fragment>
                          )
                        })}
                        <Col span={8}>
                          <Form.Item>
                            <StyledIconButton
                              block
                              type="dashed"
                              onClick={() => {
                                add()
                              }}
                              icon={<PlusOutlined />}
                            >
                              Add proppant
                            </StyledIconButton>
                          </Form.Item>
                        </Col>
                      </Row>
                    )}
                  </Form.List>
                </Form>
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
                    <StyledFormItem name={'max_prop_conc_ppa_design'}>
                      <InputNumber />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={'max_prop_conc_ppa_actual'}>
                      <InputNumber />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>Total pad volume[bbls]</Col>
                  <Col span={8}>
                    <StyledFormItem name={'total_pad_volume_bbls_design'}>
                      <InputNumber />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={'total_pad_volume_bbls_actual'}>
                      <InputNumber />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>Total clean fluid volume [bbls]</Col>
                  <Col span={8}>
                    <StyledFormItem name={'total_clean_fluid_volume_bbls_design'}>
                      <InputNumber />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={'total_clean_fluid_volume_bbls_actual'}>
                      <InputNumber />
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
                    <StyledFormItem name={'total_proppant_lbs_design'}>
                      <InputNumber />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={'total_proppant_lbs_actual'}>
                      <InputNumber disabled />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>Acid volume [gals]</Col>
                  <Col span={8}>
                    <StyledFormItem name={'acid_volume_gals_design'}>
                      <InputNumber />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={'acid_volume_gals_actual'}>
                      <InputNumber />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>Flush volume [bbls]</Col>
                  <Col span={8}>
                    <StyledFormItem name={'flush_volume_bbls_design'}>
                      <InputNumber />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={'flush_volume_bbls_actual'}>
                      <InputNumber />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>Slurry volume [bbls]</Col>
                  <Col span={8}>
                    <StyledFormItem name={'slurry_volume_bbls_design'}>
                      <InputNumber />
                    </StyledFormItem>
                  </Col>
                  <Col span={8}>
                    <StyledFormItem name={'slurry_volume_bbls_actual'}>
                      <InputNumber />
                    </StyledFormItem>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Panel>
          <Panel header={<strong>Active Data</strong>}>
            <Card>
              <Form
                name="active_data_form"
                onValuesChange={activeDataFormChange}
                autoComplete="off"
                initialValues={activeDataFormValues}
                form={activeDataFormForm}
              >
                <Divider orientation="left" plain>
                  <strong>Pulsing parameters</strong>
                </Divider>
                <Row gutter={24}>
                  <Col span={10}>
                    <Form.Item name={'wave_type'} label="Wave type" labelAlign="left">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name={'period'} label="Period" labelAlign="left">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name={'frequency'} label="Freq [Hz]" labelAlign="left">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name={'offset'} label="Offset [V]" labelAlign="left">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name={'amplitude'} label="Amplitude" labelAlign="left">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider orientation="left" plain>
                  <strong>Pre-frac pulses</strong>
                </Divider>
                <Row gutter={24}>
                  <Col span={9}>
                    <Form.Item name={'pre_frac_start_time'} label="Start time" labelAlign="left">
                      <DatePicker onChange={onChange} showTime />
                    </Form.Item>
                  </Col>
                  <Col span={9}>
                    <Form.Item name={'pre_frac_end_time'} label="End time" labelAlign="left">
                      <DatePicker onChange={onChange} showTime />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name={'pre_frac_num_pulse'} label="# of pulses" labelAlign="left">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider orientation="left" plain>
                  <strong>Post-frac pulses</strong>
                </Divider>
                <Row gutter={24}>
                  <Col span={9}>
                    <Form.Item name={'post_frac_start_time'} label="Start time" labelAlign="left">
                      <DatePicker onChange={onChange} showTime />
                    </Form.Item>
                  </Col>
                  <Col span={9}>
                    <Form.Item name={'post_frac_end_time'} label="End time" labelAlign="left">
                      <DatePicker onChange={onChange} showTime />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name={'post_frac_num_pulse'} label="# of pulses" labelAlign="left">
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Panel>
          <Panel header={<strong>Notes</strong>}>
            <Card>
              <Form
                name="notes_data_form"
                onValuesChange={notesDataFormChange}
                autoComplete="off"
                initialValues={notesDataFormValues}
                form={notesDataFormForm}
              >
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <StyledFormItem
                      name={'pre_frac_pulse_note'}
                      label="Pre-frac pulse notes"
                      labelAlign="left"
                      isVertical
                    >
                      <TextArea rows={4} />
                    </StyledFormItem>
                  </Col>
                  <Col span={24}>
                    <StyledFormItem
                      name={'post_frac_pulse_note'}
                      label="Post-frac pulse notes"
                      labelAlign="left"
                      isVertical
                    >
                      <TextArea rows={4} />
                    </StyledFormItem>
                  </Col>
                  <Col span={24}>
                    <StyledFormItem name={'additional_note'} label="Other notes" labelAlign="left" isVertical>
                      <TextArea rows={4} />
                    </StyledFormItem>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Panel>
        </Collapse>
        <div className="flex justify-end mt-4">
          {/* <span className="mr-4">Last submitted date: 08/07/2021</span> */}
          <Button type="primary" onClick={(e) => handleTrackingSheetSubmit()}>
            {isUpdating ? 'Update tracking sheet' : 'Submit tracking sheet'}
          </Button>
        </div>
      </Card>
      {showConfirmationModal && (
        <ConfirmationModal
          isModalVisible={showConfirmationModal}
          handleCancel={handleCancel}
          handleOk={handleAddStageConfirmed}
          modalTitle={'Add stage'}
          modalText={'Are you sure you want to another stage ?'}
          footerButtons={{ cancel_text: 'Cancel', confirm_text: 'Yes' }}
          data={modalData}
        ></ConfirmationModal>
      )}
    </Fragment>
  )
}

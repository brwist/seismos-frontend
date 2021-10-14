import React, { useEffect, useState } from "react";
import config from "config";
import axios from "axiosConfig";
import { Form, Button, Row, Col, Card, Input, DatePicker, TimePicker, Table } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "./DailyLog.css";
import { useToasts } from "react-toast-notifications";
import ENUMS from "constants/appEnums";
import HttpUtil from "util/HttpUtil";
import { useHistory, useLocation } from "react-router";
import moment from "moment";

export default function DailyLog() {
    let location = useLocation();
    const { addToast } = useToasts();
    const history = useHistory();
    const [form] = Form.useForm();

    const initialFormValues = { dailyLogData: [{ date: null, time: null, description: null }] }

    const [dailyLogs, setDailyLogs] = useState([]);
    const [projectId, setProjectId] = useState();
    const [wellId, setWellId] = useState();
    
    const onChange = (date, dateString)  => {
        // console.log(date, dateString);
    }

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ];
    
    const resetForm = () => {
        form.resetFields();
    }

    const onFinish = values => {
        if (values.dailyLogData.length < 1)
            return;
        const val = values.dailyLogData.map(log => {
            return {
                description: log.description,
                date: Number(moment(log.date).set("hour", moment(log.time).hours()).set("minute", moment(log.time).minutes()).set("seconds", moment(log.time).seconds()).format('x'))
            }
        });
        
        axios.post(config.API_URL + ENUMS.API_ROUTES.DAILY_LOG,
            {
                project_id: Number(projectId),
                well_id: Number(wellId),
                logs: val
            }, {...HttpUtil.adminHttpHeaders()})
            .then(res => {
                if (res.status === 201) {
                    fetchDailyLog(Number(wellId))
                    addToast("Daily logs added successfully.", { 
                        appearance: 'success',
                        autoDismiss: true
                    });
                    resetForm(values);
                }
            })
            .catch(e => {
                console.log(e)
            });
    };

    const fetchDailyLog = (well_id) => {
        axios.get(config.API_URL + ENUMS.API_ROUTES.DAILY_LOG + '/' + well_id,
            {
                ...HttpUtil.adminHttpHeaders(),
            })
            .then(res => {
                if (res.status === 200 && res.data) {
                    let logs = [];
                    if (res.data.logs) {
                        logs = res.data.logs.map((log, index) => {
                            return {
                                key: index,
                                date: moment(log.date).format("YYYY-MM-DD"),
                                time: moment(log.date).format("HH : mm"),
                                description: log.description,
                            }
                        })
                    }
                    setDailyLogs(logs);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    const setParams = (locationData) => {
        if (locationData.state && locationData.state.projectId) {
            setProjectId(locationData.state.projectId);
            setWellId(locationData.state.wellId);
            fetchDailyLog(locationData.state.wellId);
            resetForm();
        }
        else if (locationData.search) {
            const params = new URLSearchParams(locationData.search);
            const projectIdSearch = params.get('projectId');
            const wellIdSearch = params.get('wellId');
            setProjectId(projectIdSearch);
            setWellId(wellIdSearch);
            fetchDailyLog(wellIdSearch);
            resetForm();
        }
    }

    useEffect(() => {
        setParams(location);
    }, [])

    useEffect(() => {
        return history.listen((locationData) => { 
            if(location.pathname === (ENUMS.ROUTES.ADMIN + ENUMS.ROUTES.DAILY_LOG)) {
                setParams(locationData);
            }
        }) 
    }, [history])

      
    return (
        <>
            <Card bordered={false} style={{ width: '100%', marginBottom: '5px' }}>
                <div className="max-w-580-px mx-auto">
                        <strong>Note: </strong>
                         All times entered In tracking sheet are to be in 24 hour time format. The site layout and frac equipment info needs to be notated in the Daily log, with objectives including: 
                        <br></br>
                        <br></br>
                        <ul style={{listStyle: "disc"}}>
                            <li>The distance from the last pump to the well (estimate) pip length </li>
                            <li>Size of iron from pumps </li>
                            <li>Pump types (triplex, quadplex, quinplex) </li>
                            <li>Number of pumps </li>
                            <li>Surface line volume </li>
                            <li>Photographs to be collected of the equipment layout if allowed by client </li>
                        </ul>
                </div>
            </Card>
            <Card>
                {/* <div className="text-right">
                    <Button type="primary" >Submit log</Button>
                </div> */}
                <div className="md:ml-64" style={{width: '650px'}}>
                    <Row gutter={24} className="mb-2">
                        <Col span={6}><strong>Date</strong></Col>
                        <Col span={6}><strong>Time</strong></Col>
                        <Col span={10}><strong>Description</strong></Col>
                    </Row>
                    <Form
                        form={form}
                        name="dynamic_form_nest_item"
                        onFinish={onFinish}
                        autoComplete="off"
                        initialValues={initialFormValues}
                    >
                        <Form.List name="dailyLogData">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                                        <Row gutter={24} key={key}>
                                            <Col span={6}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'date']}
                                                    fieldKey={[fieldKey, 'date']}
                                                    rules={[{ required: true, message: 'Missing date' }]}
                                                >
                                                    <DatePicker onChange={onChange} className="w-full"/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'time']}
                                                    fieldKey={[fieldKey, 'time']}
                                                    rules={[{ required: true, message: 'Missing time' }]}
                                                >
                                                    <TimePicker onChange={onChange} className="w-full"/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={10}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'description']}
                                                    fieldKey={[fieldKey, 'description']}
                                                    rules={[{ required: true, message: 'Missing description' }]}
                                                    className="w-full"
                                                >
                                                    <Input placeholder="Description" className="w-full"/>
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
                                                    Add line
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    
                                </>
                            )}
                        </Form.List>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit log
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
            {
                dailyLogs && 
                <Card>
                    <div className="max-w-580-px mx-auto">
                        <div><h2 className="module-title">All Logs</h2></div>
                        <Table dataSource={dailyLogs} columns={columns} pagination={false} />
                        {/* <Row gutter={24} className="mb-2">
                                    <Col span={5}><strong>Date</strong></Col>
                                    <Col span={5}><strong>Time</strong></Col>
                                    <Col span={14}><strong>Description</strong></Col>
                                </Row>
                        {dailyLogs.map(log => {
                            return <>
                                
                                <Row gutter={24} className="mb-2">
                                    <Col span={5}>{moment(log.date).format("YYYY-MM-DD")}</Col>
                                    <Col span={5}>{moment(log.date).format("hh : mm")}</Col>
                                    <Col span={14}>{log.description}</Col>
                                </Row>
                            </>
                        })} */}
                    </div>
                </Card>
            }
        </>
    );
}
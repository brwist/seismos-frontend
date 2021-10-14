import { Form, Input, Card, Divider, Button, Row, Col, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axiosConfig";
import config from "config";
import allActions from 'redux/actions/index';
import ENUMS from "constants/appEnums";
import HttpUtil from "util/HttpUtil";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from 'react-redux';
import { useAppContext } from 'util/ContextUtil';

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    let history = useHistory();
    let location = useLocation();
    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const { userHasAuthenticated } = useAppContext();

    /**
     * Method to make API call for user login
     */
    const handleRegister = (data) => {
        if(data.confirm_password != data.password) {
            addToast("Password does not match with confirm password!", { appearance: 'error', autoDismiss: true });
        } else {
            setIsLoading(true);
            axios.post(config.API_URL + ENUMS.API_ROUTES.NEW_USER,
                {
                    username: data.username,
                    email: data.email,
                    password: data.password
                }, {...HttpUtil.authHttpHeaders})
                .then(res => {
                    setIsLoading(false);
                    if(res.status = 200 && res.data) {
                        saveUserState(res.data.data);
                    }
                })
                .catch(e => {
                    setIsLoading(false);
                });
        }
    }

    /**
     * Method to save user data in redux store and set local storage with JWT
     * @param {Object} data 
     */
     const saveUserState = (data) => {
        console.log(data)
        localStorage.setItem('JWT', data.access_token);
        userHasAuthenticated(true);
        dispatch(allActions.authActions.setUserState(data.user));
        dispatch(allActions.authActions.setUserProjectIds(data.project_ids));

        if (location && location.state && location.state.from) {
            history.push({
                pathname: location.state.from.pathname,
                search: location.state.from.search,
                state: location.state.from.state
            });
        } else {
            history.push(ENUMS.ROUTES.ADMIN + ENUMS.ROUTES.PROJECT);
        }
    }

    return (
        <>
            <div className="container mx-auto px-4 h-full login-container">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <Card className="text-center login-header-card">
                            <img alt="seismos logo" className="mx-auto" src={require("assets/img/seismos/seismos_logo_animated.gif").default}></img>
                        </Card>
                        <Card>
                            <h6 className="text-blueGray-500 text-sm text-center">
                                Register on Seismos
                            </h6>
                            <Divider></Divider>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={handleRegister}
                                >
                                <Form.Item
                                    name="username"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                    ]}
                                >
                                    <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="confirm_password"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your Password!',
                                    },
                                    ]}
                                >
                                    <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Confirm password"
                                    />
                                </Form.Item>
                                <Row gutter={24} className="mb-6">
                                    <Col span={12}>
                                        {/* <Form.Item name="remember" noStyle>
                                            <Checkbox>Remember me</Checkbox>
                                        </Form.Item> */}
                                    </Col>
                                    
                                </Row>

                                <Form.Item className="text-center">
                                    {
                                        isLoading ? 
                                        <Spin />
                                        : <Button type="primary" htmlType="submit" className="w-full login-form-button">
                                                Create an account
                                        </Button>
                                    }
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

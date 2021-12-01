import ENUMS from "constants/appEnums";
import React, { useState } from "react";
import allActions from 'redux/actions/index';
import { useAppContext } from "util/ContextUtil";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, Card, Divider, Button, Row, Col, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useToasts } from "react-toast-notifications";
import {authApi} from "./../../api/authApi"


export default function Login() {
    let history = useHistory();
    let location = useLocation();
    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const { userHasAuthenticated } = useAppContext();

    //loader
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Method to make API call for user login
     */
    const handleLogin = async (authData) => {
        try{
            setIsLoading(true);
            const {data} = await authApi.login(authData)
            setIsLoading(false);
            saveUserState(data);
        }catch(error){
            setIsLoading(false);
            if (error.message.includes("Incorrect")) addToast(error.message, { appearance: 'error', autoDismiss: true });
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
                                Log in to Seismos
                            </h6>
                            <Divider></Divider>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={handleLogin}
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
                                                Log in
                                        </Button>
                                    }
                                </Form.Item>
                            </Form>
                        </Card>
                        <div className="flex flex-wrap mt-2 relative justify-between">
                            <div className="w-1/2">
                                <a
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    className="text-seismos-primary"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <div className="w-1/2 text-right">
                                <Link to="/auth/register" className="block text-seismos-primary">
                                    Create new account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

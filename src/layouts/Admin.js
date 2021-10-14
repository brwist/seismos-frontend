import routes from "routes/routes.js";
import axios from "axiosConfig";
import config from "config";
import { useSelector } from "react-redux";
import { Layout, Menu, Breadcrumb, Spin } from 'antd';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Redirect, useHistory, useLocation } from "react-router-dom";
import _ from "lodash";

// components
import ENUMS from "constants/appEnums";
import APP_CONSTANTS from "constants/appConstants";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HttpUtil from "util/HttpUtil";
import allActions from "redux/actions";


const { Content, Sider } = Layout;
const { SubMenu } = Menu;

export default function Admin(props) {
    const history = useHistory();
    const location = useLocation();

    const dispatch = useDispatch();

    // const user = useSelector(state => state.authReducer.user);
    const projectIds = useSelector(state => state.authReducer.userProjectIds);
    
    const [noSidebarLayout, setNoSidebarLayout] = useState(false);
    const [sidebarMenu, setSidebarMenu] = useState([]);
    const [defaultSelectedMenuKey, setDefaultSelectedMenuKey] = useState();
    const [defaultOpenMenu, setDefaultOpenMenu] = useState();
    // const [pages, setPages] = useState([]);

    const getRoutes = (routes) => {
        if (!props.isAuthenticated) {
          return <Redirect to={{
              pathname: '/auth/login',
              state: { from: props.location }
            }}
          />
        }
        return routes.map((prop, key) => {
        if (prop.layout === ENUMS.ROUTES.ADMIN) {
            return (
            <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
            />
            );
        } else {
            return null;
        }
        });
    };

    const menuChange = (path, wellId, projectId) => {
        history.push({
            pathname: '/admin' + path,
            search: '?projectId=' + projectId + '&wellId=' + wellId,
            state: { projectId: projectId, wellId: wellId }
        });
    }

    const fetchProjectById = (projectId) => {
        if (projectId) {
            //FETCH PROJECT DETAILS
            axios.get(config.API_URL + ENUMS.API_ROUTES.PROJECT_GET + '/' + projectId,
            {
                ...HttpUtil.adminHttpHeaders(),
            })
            .then(res => {
                if(res.status == 200 && res.data) {
                    setNoSidebarLayout(false);
                    const projectId = res.data.data.project.id;
                    dispatch(allActions.authActions.setCurrentProject(res.data.data.project));
                    const wellInfo = _.sortBy(res.data.data.project.wells, function(w) { return w.id; });
                    const menu = wellInfo.map((well, index) => {
                        return <SubMenu key={"menu"+(well.id)} title={well.well_name}>
                            <Menu.Item key={"data-input/" + well.id} onClick={() => { menuChange(ENUMS.ROUTES.DATA_INPUT, well.id, projectId) }}>Data input</Menu.Item>
                            <Menu.Item key={"daily-log/" + well.id} onClick={() => { menuChange(ENUMS.ROUTES.DAILY_LOG, well.id, projectId) }}>Daily log</Menu.Item>
                            <Menu.Item key={"default-values/" + well.id} onClick={() => { menuChange(ENUMS.ROUTES.DEFAULT_VALUES, well.id, projectId) }}>Default values</Menu.Item>
                            <Menu.Item key={"tracking-sheet/" + well.id} onClick={() => { menuChange(ENUMS.ROUTES.TRACKING_SHEET, well.id, projectId) }}>Tracking sheet</Menu.Item>
                            <Menu.Item key={"qc-report/" + well.id} onClick={() => { menuChange(ENUMS.ROUTES.OC_REPORT, well.id, projectId) }}>QC report</Menu.Item>
                        </SubMenu>
                    });
                    setSidebarMenu(menu);
                }
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                }
            })
        } else {
            const notFoundUrl = ENUMS.ROUTES.AUTH + ENUMS.ROUTES.NOTFOUND;
            history.push(notFoundUrl);
        }
    }

    useEffect(() => {
        if (props.isAuthenticated) {
            console.log('here', projectIds)
            if (APP_CONSTANTS.ROUTES_WITHOUT_SIDEBAR.indexOf(history.location.pathname) > -1) {
                setNoSidebarLayout(true);
                setSidebarMenu([]);
                // setPages(history.location.pathname.split("/admin/")[1].split("/")[0].split("-"));
            } else {
                if (sidebarMenu.length < 1) {
                    if (location.state && location.state.projectId) {
                        fetchProjectById(location.state.projectId);

                        const subMenu = location.pathname.split("/admin/")[1] + '/' + location.state.wellId;
                        const mainMenu = "menu" + location.state.wellId;
                        setDefaultSelectedMenuKey(subMenu); // sub - inside
                        setDefaultOpenMenu(mainMenu); // main
                    }
                    else if (location.search) {
                        const params = new URLSearchParams(location.search);
                        const projectIdSearch = params.get('projectId');
                        const wellIdSearch = params.get('wellId');
                        fetchProjectById(projectIdSearch);
                        
                        const subMenu = location.pathname.split("/admin/")[1] + '/' + wellIdSearch;
                        const mainMenu = "menu" + wellIdSearch;
                        setDefaultSelectedMenuKey(subMenu); // sub - inside
                        setDefaultOpenMenu(mainMenu); // main
                    } else {
                        const notFoundUrl = ENUMS.ROUTES.AUTH + ENUMS.ROUTES.NOTFOUND;
                        history.push(notFoundUrl);
                    }
                }
                // const defaultSelectedSubMenu = history.location.pathname.split("/admin/")[1];
                // const defaultOpenMenu = "menu" + history.location.pathname.split("/admin/")[1].split("/")[1];
                // console.log(defaultSelectedSubMenu)
                // setDefaultSelectedMenuKey(defaultSelectedSubMenu);
                // setDefaultOpenMenu(defaultOpenMenu);
                // console.log(defaultOpenMenu);
                // setNoSidebarLayout(false);
                // if project is selected
                // if(!_.isEmpty(project)) {
                //     const menuChange = (path, id) => {
                //         history.push('/admin' + path + '/'+ id)
                //     }
                    
                //     // const wellInfo = project.wellInfoValues;
                //     console.log(wellInfo);
                //     const menu = wellInfo.map((well, index) => {
                //         return <SubMenu key={"menu"+(well.id)} title={well.well_name}>
                //             <Menu.Item key={"data-input/" + well.id} onClick={() => { menuChange(ENUMS.ROUTES.DATA_INPUT, well.id) }}>Data input</Menu.Item>
                //             <Menu.Item key={"daily-log/" + well.id} onClick={() => { menuChange(ENUMS.ROUTES.DAILY_LOG, well.id) }}>Daily log</Menu.Item>
                //             <Menu.Item key={"default-values/" + well.id} onClick={() => { menuChange(ENUMS.ROUTES.DEFAULT_VALUES, well.id) }}>Default values</Menu.Item>
                //             <Menu.Item key={"tracking-sheet/" + well.id} onClick={() => { menuChange(ENUMS.ROUTES.TRACKING_SHEET, well.id) }}>Tracking sheet</Menu.Item>
                //             <Menu.Item key={"qc-report/" + well.id} onClick={() => { menuChange(ENUMS.ROUTES.OC_REPORT, well.id) }}>QC report</Menu.Item>
                //         </SubMenu>
                //     });
                //     console.log(menu)
                //     setSidebarMenu(menu);
                // };
            }
        } else {
            history.push('/auth/login')
        }
    }, []);

    useEffect(() => {
        return history.listen((location) => {
            if (props.isAuthenticated) {
                if (APP_CONSTANTS.ROUTES_WITHOUT_SIDEBAR.indexOf(history.location.pathname) > -1) {
                    setNoSidebarLayout(true);
                    setSidebarMenu([]);
                    // setPages(history.location.pathname.split("/admin/")[1].split("/")[0].split("-"));
                } else {
                    if (sidebarMenu.length < 1) {
                        if (location.state && location.state.projectId) {
                            fetchProjectById(location.state.projectId);
                        }
                        else if (location.search) {
                            const params = new URLSearchParams(location.search);
                            const projectIdSearch = params.get('projectId');
                            fetchProjectById(projectIdSearch);
                        }
                    }
                }
            } else {
                history.push('/auth/login')
            }
        }) 
    }, [history])

    return (
        <>
            {
                noSidebarLayout
                ? <Layout className="layout">
                    <AdminNavbar withLogo={true} />
                    <Content style={{ padding: '0 50px' }}>
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            {
                                pages.map((page, index) => {
                                    return <Breadcrumb.Item key={index}><span className="capitalize">{page}</span></Breadcrumb.Item>
                                })
                            }
                            
                        </Breadcrumb> */}
                            {/* <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item> */}
                        <div className="site-layout-content mb-12 p-5 bg-white">
                            <Switch>
                                {getRoutes(routes)}
                                <Redirect from="*" to="/admin/dashboard" />
                            </Switch>
                        </div>
                    </Content>
                </Layout>
                : ((sidebarMenu.length > 0)
                    ? <Layout>
                        <Sider
                            style={{
                                overflow: 'auto',
                                height: '100vh',
                                position: 'fixed',
                                left: 0,
                            }}
                            width={250}
                            className="site-layout-background"
                        >
                            <div className="logo"><img alt="seismos logo" src={require("assets/img/seismos/seismos_logo_animated.gif").default}></img></div>
                            <Menu theme="" mode="inline" defaultSelectedKeys={[defaultSelectedMenuKey]} defaultOpenKeys={[defaultOpenMenu]} className="sidebar-margin-top">
                                {sidebarMenu}
                            </Menu>
                        </Sider>
                        <Layout className="site-layout with-sedebar" style={{ marginLeft: 250 }}>
                            <AdminNavbar withLogo={false}/>
                            <Content style={{ margin: '88px 16px 0', overflow: 'initial' }}>
                                <Switch>
                                    {getRoutes(routes)}
                                    <Redirect from="*" to="/admin/dashboard" />
                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                    : (<div className="spin-overlay"><Spin size="large" spinning={true}></Spin></div>))
            }
        </>
    );
}

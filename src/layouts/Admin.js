import routes from "routes/routes.js";
import { useSelector } from "react-redux";
import { Button, Divider, Layout, Menu, Spin } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { Switch, Route, Redirect, useHistory, useLocation } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import { projectApi } from "./../api/projectApi";

// components
import ENUMS from "constants/appEnums";
import APP_CONSTANTS from "constants/appConstants";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import allActions from "redux/actions";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const StyledSidebar = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    .box--sync {
      margin-top: auto;
      padding: 16px;
      button {
        width: 100%;
        border-radius: 0.5rem;
        background: #f0f2f5;
      }
    }
  }
`;

export default function Admin(props) {
  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  // const user = useSelector(state => state.authReducer.user);
  const projectIds = useSelector((state) => state.authReducer.userProjectIds);

  const [noSidebarLayout, setNoSidebarLayout] = useState(false);
  const [sidebarMenu, setSidebarMenu] = useState([]);
  const [defaultSelectedMenuKey, setDefaultSelectedMenuKey] = useState();
  const [defaultOpenMenu, setDefaultOpenMenu] = useState();
  const [isSyncLoading, setIsSyncLoading] = useState(false);
  const [lastSyncDate, setLastSyncDate] = useState(0);
  // const [pages, setPages] = useState([]);

  const getRoutes = (routes) => {
    if (!props.isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: "/auth/login",
            state: { from: props.location },
          }}
        />
      );
    }
    return routes.map((prop, key) => {
      if (prop.layout === ENUMS.ROUTES.ADMIN) {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };

  const menuChange = (path, wellId, projectId) => {
    history.push({
      pathname: "/admin" + path,
      search: "?projectId=" + projectId + "&wellId=" + wellId,
      state: { projectId: projectId, wellId: wellId },
    });
  };

  const fetchProjectById = async (projectId) => {
    if (projectId) {
      //FETCH PROJECT DETAILS
      try {
        const { data } = await projectApi.getProjectById(projectId);
        if (data) {
          setNoSidebarLayout(false);
          setLastSyncDate(data.last_sync_date);
          const project = data.project;
          dispatch(allActions.authActions.setCurrentProject(project));
          const wellInfo = _.sortBy(project.wells, function (w) {
            return w.name;
          });
          const menu = wellInfo.map((well, index) => {
            return (
              <SubMenu key={"menu" + well.uuid} title={well.well_name}>
                <Menu.Item
                  key={"data-input/" + well.uuid}
                  onClick={() => {
                    menuChange(ENUMS.ROUTES.DATA_INPUT, well.uuid, project.uuid);
                  }}
                >
                  Data input
                </Menu.Item>
                <Menu.Item
                  key={"daily-log/" + well.uuid}
                  onClick={() => {
                    menuChange(ENUMS.ROUTES.DAILY_LOG, well.uuid, project.uuid);
                  }}
                >
                  Daily log
                </Menu.Item>
                <Menu.Item
                  key={"default-values/" + well.uuid}
                  onClick={() => {
                    menuChange(ENUMS.ROUTES.DEFAULT_VALUES, well.uuid, project.uuid);
                  }}
                >
                  Default values
                </Menu.Item>
                <Menu.Item
                  key={"tracking-sheet/" + well.uuid}
                  onClick={() => {
                    menuChange(ENUMS.ROUTES.TRACKING_SHEET, well.uuid, project.uuid);
                  }}
                >
                  Tracking sheet
                </Menu.Item>
                <Menu.Item
                  key={"qc-report/" + well.uuid}
                  onClick={() => {
                    menuChange(ENUMS.ROUTES.OC_REPORT, well.uuid, project.uuid);
                  }}
                >
                  QC report
                </Menu.Item>
              </SubMenu>
            );
          });
          setSidebarMenu(menu);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
      }
    } else {
      const notFoundUrl = ENUMS.ROUTES.AUTH + ENUMS.ROUTES.NOTFOUND;
      history.push(notFoundUrl);
    }
  };

  useEffect(() => {
    if (props.isAuthenticated) {
      if (APP_CONSTANTS.ROUTES_WITHOUT_SIDEBAR.indexOf(history.location.pathname) > -1) {
        setNoSidebarLayout(true);
        setSidebarMenu([]);
        // setPages(history.location.pathname.split("/admin/")[1].split("/")[0].split("-"));
      } else {
        if (sidebarMenu.length < 1) {
          if (location.state && location.state.projectId) {
            fetchProjectById(location.state.projectId);

            const subMenu = location.pathname.split("/admin/")[1] + "/" + location.state.wellId;
            const mainMenu = "menu" + location.state.wellId;
            setDefaultSelectedMenuKey(subMenu); // sub - inside
            setDefaultOpenMenu(mainMenu); // main
          } else if (location.search) {
            const params = new URLSearchParams(location.search);
            const projectIdSearch = params.get("projectId");
            const wellIdSearch = params.get("wellId");
            fetchProjectById(projectIdSearch);

            const subMenu = location.pathname.split("/admin/")[1] + "/" + wellIdSearch;
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
      history.push("/auth/login");
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
            } else if (location.search) {
              const params = new URLSearchParams(location.search);
              const projectIdSearch = params.get("projectId");
              fetchProjectById(projectIdSearch);
            }
          }
        }
      } else {
        history.push("/auth/login");
      }
    });
  }, [history]);

  const syncCloud = async () => {
    const { projectId } = history.location.state;
    setIsSyncLoading(true);
    try {
      await projectApi.syncCloud(projectId);
      setIsSyncLoading(false);
      addToast("Project is synced to cloud!", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (e) {
      setIsSyncLoading(false);
      addToast(e.message || "Failed. Internal server error.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <>
      {noSidebarLayout ? (
        <Layout className="layout">
          <AdminNavbar withLogo={true} />
          <Content style={{ padding: "0 50px" }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            {
                                pages.map((page, index) => {
                                    return <Breadcrumb.Item key={index}><span className="capitalize">{page}</span></Breadcrumb.Item>
                                })
                            }
                            
                        </Breadcrumb> */}
            {/* <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item> */}
            <div className="p-5 mb-12 bg-white site-layout-content">
              <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/admin/dashboard" />
              </Switch>
            </div>
          </Content>
        </Layout>
      ) : sidebarMenu.length > 0 ? (
        <Layout>
          <StyledSidebar width={250} className="site-layout-background">
            <div className="logo">
              <img alt="seismos logo" src={require("assets/img/seismos/seismos_logo_animated.gif").default}></img>
            </div>
            <Menu
              theme=""
              mode="inline"
              defaultSelectedKeys={[defaultSelectedMenuKey]}
              defaultOpenKeys={[defaultOpenMenu]}
              className="sidebar-margin-top"
            >
              {sidebarMenu}
            </Menu>
            <div className="box--sync">
              <Divider style={{ borderTop: "2px solid rgba(0, 0, 0, 0.06)" }} />
              <p className="font-bold">Last cloud sync: {moment.unix(lastSyncDate).format("MM/DD/YYYY")}</p>
              <Button
                icon={<CloudUploadOutlined style={{ fontSize: "24px" }} />}
                loading={isSyncLoading}
                onClick={syncCloud}
                size="large"
              >
                Cloud sync
              </Button>
            </div>
          </StyledSidebar>
          <Layout className="site-layout with-sedebar" style={{ marginLeft: 250 }}>
            <AdminNavbar withLogo={false} />
            <Content style={{ margin: "88px 16px 0", overflow: "initial" }}>
              <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/admin/dashboard" />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      ) : (
        <div className="spin-overlay">
          <Spin size="large" spinning={true}></Spin>
        </div>
      )}
    </>
  );
}

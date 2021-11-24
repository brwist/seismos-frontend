import React, { useState } from "react";
import { useHistory } from "react-router";
import ProjectUtil from "util/ProjectUtil";
import { Card, PageHeader, Button, Steps } from 'antd';
import JobInfo from "components/Forms/ProjectCreate/JobInfo";
import WellInfo from "components/Forms/ProjectCreate/WellInfo";
import WellVolume from "components/Forms/ProjectCreate/WellVolume";
import ClientInfo from "components/Forms/ProjectCreate/ClientInfo";
import CrewInfo from "components/Forms/ProjectCreate/CrewInfo";
import Equipment from "components/Forms/ProjectCreate/Equipment";
import ProjectInfo from "components/Forms/ProjectCreate/ProjectInfo";
import _ from "lodash";
import { useToasts } from "react-toast-notifications";
import { projectApi } from "./../../api/projectApi"
import classes from './NewProject.module.css'

// components
const { Step } = Steps;

export default function NewProject() {
    const history = useHistory();
    const { addToast } = useToasts();

    const [current, setCurrent] = useState(0);
    const [projectInfoValues, setProjectInfoValues] = useState(null);
    const [jobInfoValues, setJobInfoValues] = useState(null);
    const [padInfoValues, setPadInfoValues] = useState(null);
    const [wellInfoValues, setWellInfoValues] = useState(null);
    const [wellVolumeValues, setWellVolumeValues] = useState(null);
    const [wellVolumeEstimationsValues, setWellVolumeEstimationsValues] = useState(null);
    const [clientInfoValues, setClientInfoValues] = useState(null);
    const [crewInfoValues, setCrewInfoValues] = useState(null);
    const [equipmentValues, setEquipmentValues] = useState(null);

    const next = () => {
        console.log('next', _.cloneDeep(jobInfoValues));
        setCurrent(current + 1);
    };

    const prev = () => {
        console.log('prev', _.cloneDeep(jobInfoValues));
        setCurrent(current - 1);
    };

    const handleCreateProjectFormSubmit = async () => {
        const wellVolumeData = wellVolumeValues ? wellVolumeValues.map(wellVol => {
            return ProjectUtil.formatFormValuesFromColumnGridData(wellVol);
        }) : [];
        const wellVolumeEstimationsData = wellVolumeEstimationsValues ? wellVolumeEstimationsValues.map(wellVolEst => {
            return ProjectUtil.formatFormValuesFromRowGridData(wellVolEst);
        }) : [];

        const projectData = {
            projectValues: ProjectUtil.formatFormValuesFromRowGridData(projectInfoValues),
            jobInfoValues: ProjectUtil.formatFormValuesFromRowGridData(_.cloneDeep(jobInfoValues)),
            padInfoValues: ProjectUtil.formatFormValuesFromRowGridData(padInfoValues),
            wellInfoValues: ProjectUtil.formatFormValuesFromColumnGridData(wellInfoValues).map((x, index) => { return { ...x } }),
            wellVolumeValues: wellVolumeData,
            wellVolumeEstimationsValues: wellVolumeEstimationsData,
            clientInfoValues: ProjectUtil.formatFormValuesFromColumnGridData(clientInfoValues),
            crewInfoValues: ProjectUtil.formatFormValuesFromColumnGridData(crewInfoValues),
            equipmentValues: ProjectUtil.formatFormValuesFromRowGridData(equipmentValues),
        };

        try {
            const { data } = await projectApi.postCreateProject(projectData)
            const projectId = data.project.id;
            addToast("Project created successfully!", {
                appearance: 'success',
                autoDismiss: true
            });
            history.push({
                pathname: '/admin/dashboard',
                search: '?projectId=' + projectId,
                state: { passedId: projectId }
            });
        } catch (error) {
            console.log(error)
        }
    }

    const steps = [
        {
            title: 'Project Info',
            content: <ProjectInfo
                next={next}
                setFormValue={setProjectInfoValues}
                formValues={projectInfoValues}></ProjectInfo>
        },
        {
            title: 'Job Info',
            content: <JobInfo
                next={next}
                setJobInfoFormValue={setJobInfoValues}
                setPadInfoFormValue={setPadInfoValues}
                jobInfoFormValues={jobInfoValues} padInfoFormValues={padInfoValues}></JobInfo>
        },
        {
            title: 'Well Info',
            content: <WellInfo
                next={next}
                setFormValue={setWellInfoValues}
                formValues={wellInfoValues}></WellInfo>
        },
        {
            title: 'Well Volume',
            content: <WellVolume
                next={next}
                setWellVolumeFormValue={setWellVolumeValues}
                setWellVolumeEstimationsFormValue={setWellVolumeEstimationsValues}
                wellInfoValues={wellInfoValues}
                wellVolumeFormValues={wellVolumeValues} wellVolumeEstimationsFormValues={wellVolumeEstimationsValues}></WellVolume>
        },
        {
            title: 'Client Info',
            content: <ClientInfo
                next={next}
                setFormValue={setClientInfoValues}
                formValues={clientInfoValues}></ClientInfo>
        },
        {
            title: 'Crew Info',
            content: <CrewInfo
                next={next}
                setFormValue={setCrewInfoValues}
                formValues={crewInfoValues}></CrewInfo>
        },
        {
            title: 'Equipment',
            content: <Equipment
                next={next}
                setFormValue={setEquipmentValues}
                formValues={equipmentValues}
                createProjectSubmit={handleCreateProjectFormSubmit}></Equipment>
        }
    ];


    return (
        <>
            <div className={`flex justify-center items-center bg-white ${classes.container}`}>
                <div className={classes.progress_container}>
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title="Fill in the information below to create a new project"
                    >
                    </PageHeader>
                    <Card>
                        <Steps responsive progressDot current={current}>
                            {
                                steps.map(item => (
                                    <Step key={item.title} title={item.title} className="mb-6" />
                                ))
                            }
                        </Steps>
                        <div className="steps-content mb-6">
                            {steps[current].content}
                        </div>
                        <div className="steps-action flex justify-between" style={{ position: 'absolute', bottom: '48px' }}>
                            {
                                <Button style={{ margin: '0 8px' }} disabled={current < 1} onClick={() => prev()}>
                                    Previous
                                </Button>
                            }
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

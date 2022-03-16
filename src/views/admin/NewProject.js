import React, { useState } from "react";
import { useHistory } from "react-router";
import ProjectUtil from "util/ProjectUtil";
import { Card, PageHeader, Button, Steps } from "antd";
import JobInfo from "components/Forms/ProjectCreate/JobInfo";
import WellInfo from "components/Forms/ProjectCreate/WellInfo";
import WellVolume from "components/Forms/ProjectCreate/WellVolume";
import ClientInfo from "components/Forms/ProjectCreate/ClientInfo";
import CrewInfo from "components/Forms/ProjectCreate/CrewInfo";
import Equipment from "components/Forms/ProjectCreate/Equipment";
import ProjectInfo from "components/Forms/ProjectCreate/ProjectInfo";
import _ from "lodash";
import { useToasts } from "react-toast-notifications";
import { projectApi } from "./../../api/projectApi";
import classes from "./NewProject.module.css";

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
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleCreateProjectFormSubmit = async () => {
    setIsFormSubmitting(true);
    const wellVolumeData = wellVolumeValues
      ? wellVolumeValues.map((wellVol) => {
          return ProjectUtil.formatFormValuesFromColumnGridData(wellVol);
        })
      : [];
    const wellVolumeEstimationsData = wellVolumeEstimationsValues
      ? wellVolumeEstimationsValues.map((wellVolEst) => {
          return ProjectUtil.formatFormValuesFromRowGridData(wellVolEst);
        })
      : [];
    const equipmentData = equipmentValues
      ? equipmentValues.map((equipment) => {
          return ProjectUtil.formatFormValuesFromRowGridData(equipment);
        })
      : [];
    const projectData = {
      projectValues: ProjectUtil.formatFormValuesFromRowGridData(projectInfoValues),
      jobInfoValues: ProjectUtil.formatFormValuesFromRowGridData(_.cloneDeep(jobInfoValues)),
      padInfoValues: ProjectUtil.formatFormValuesFromRowGridData(padInfoValues),
      wellInfoValues: ProjectUtil.formatFormValuesFromColumnGridData(wellInfoValues).map((x, index) => {
        return { ...x };
      }),
      wellVolumeValues: wellVolumeData,
      wellVolumeEstimationsValues: wellVolumeEstimationsData,
      clientInfoValues: ProjectUtil.formatFormValuesFromColumnGridData(clientInfoValues),
      crewInfoValues: ProjectUtil.formatFormValuesFromColumnGridData(crewInfoValues),
      equipmentValues: equipmentData,
    };

    try {
      const { data } = await projectApi.postCreateProject(projectData);
      const projectId = data.project.uuid;
      addToast("Project created successfully!", {
        appearance: "success",
        autoDismiss: true,
      });
      setIsFormSubmitting(false);
      history.push({
        pathname: "/admin/dashboard",
        search: "?projectId=" + projectId,
        state: { passedId: projectId },
      });
    } catch (error) {
      console.log(error);
      setIsFormSubmitting(false);
    }
  };

  const steps = [
    {
      title: "Project Info",
      content: <ProjectInfo next={next} setFormValue={setProjectInfoValues} formValues={projectInfoValues} />,
    },
    {
      title: "Job Info",
      content: (
        <JobInfo
          next={next}
          setJobInfoFormValue={setJobInfoValues}
          setPadInfoFormValue={setPadInfoValues}
          jobInfoFormValues={jobInfoValues}
          padInfoFormValues={padInfoValues}
        />
      ),
    },
    {
      title: "Well Info",
      content: <WellInfo next={next} setFormValue={setWellInfoValues} formValues={wellInfoValues} />,
    },
    {
      title: "Well Volume",
      content: (
        <WellVolume
          next={next}
          setWellVolumeFormValue={setWellVolumeValues}
          setWellVolumeEstimationsFormValue={setWellVolumeEstimationsValues}
          wellInfoValues={wellInfoValues}
          wellVolumeFormValues={wellVolumeValues}
          wellVolumeEstimationsFormValues={wellVolumeEstimationsValues}
        />
      ),
    },
    {
      title: "Client Info",
      content: <ClientInfo next={next} setFormValue={setClientInfoValues} formValues={clientInfoValues} />,
    },
    {
      title: "Crew Info",
      content: <CrewInfo next={next} setFormValue={setCrewInfoValues} formValues={crewInfoValues} />,
    },
    {
      title: "Equipment",
      content: (
        <Equipment
          next={next}
          wellInfoValues={wellInfoValues}
          setFormValue={setEquipmentValues}
          formValues={equipmentValues}
          isFormSubmitting={isFormSubmitting}
          createProjectSubmit={handleCreateProjectFormSubmit}
        />
      ),
    },
  ];

  return (
    <>
      <div className={`flex justify-center items-center bg-white ${classes.container}`}>
        <div className={classes.progress_container}>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Fill in the information below to create a new project"
          />
          <Card>
            <Steps responsive progressDot current={current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} className="mb-6" />
              ))}
            </Steps>
            <div className="mb-6 steps-content">{steps[current].content}</div>
            <div className="flex justify-between steps-action" style={{ position: "absolute", bottom: "48px" }}>
              {
                <Button style={{ margin: "0 8px" }} disabled={current < 1} onClick={prev}>
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

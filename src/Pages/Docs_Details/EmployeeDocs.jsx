import React, { useEffect, useState } from "react";
import { Col, Form, Row, message, Input, Button } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeDocs = () => {
  const r_prams = useParams();
  const [form] = Form.useForm();
  const [activeCan, setActiveCan] = useState(false);
  const [previoussalary, setPrevioussalary] = useState("");
  const [previousexperience, setPreviousexperience] = useState("");
  const [previouseducation, setPreviouseducation] = useState("");

  const handleDownload = () => {
    const downloadLink = `${process.env.REACT_APP_API_URL}/images/${previoussalary}`;
    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = previoussalary;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownload1 = () => {
    const downloadLink = `${process.env.REACT_APP_API_URL}/images/${previousexperience}`;
    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = previousexperience;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownload2 = () => {
    const downloadLink = `${process.env.REACT_APP_API_URL}/images/${previouseducation}`;
    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = previouseducation;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    getDocs();
  }, []);

  const getDocs = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/getCandidateDocs", {
        id: r_prams.id,
      })
      .then((res) => {
        res.data.map((x, i) => {
          if (x.name == "salary_slip") {
            setPrevioussalary(x.url);
          }
          if (x.name == "experience") {
            setPreviousexperience(x.url);
          }
          if (x.name == "education") {
            setPreviouseducation(x.url);
          }
          if (x.name == "offerletter") {
            props1.defaultFileList.push({
              uid: x._id,
              name: "Offer letter ",
              status: "done",
              url: `${process.env.REACT_APP_API_URL}/images/${x.url}`,
            });
          }
          if (x.name == "appraisalletter") {
            props2.defaultFileList.push({
              uid: x._id,
              name: "Appraisal letter ",
              status: "done",
              url: `${process.env.REACT_APP_API_URL}/images/${x.url}`,
            });
          }
          if (x.name == "PFForm11") {
            props3.defaultFileList.push({
              uid: x._id,
              name: "PF Form ",
              status: "done",
              url: `${process.env.REACT_APP_API_URL}/images/${x.url}`,
            });
          }
          if (x.name == "EmployeeDetailsheet") {
            props4.defaultFileList.push({
              uid: x._id,
              name: "Employee Detail sheet ",
              status: "done",
              url: `${process.env.REACT_APP_API_URL}/images/${x.url}`,
            });
          }
        });
        setActiveCan(!activeCan);
      })
      .catch((err) => {
        console.log(console.log(err));
      });
  };

  const deleteDoc = (id, url) => {
    const fileName = url.substring(url.lastIndexOf("/") + 1);
    axios
      .post(process.env.REACT_APP_API_URL + "/deleteCandidateDocs", {
        id,
        fileName,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const props1 = {
    name: "image",
    multiple: true,
    action: process.env.REACT_APP_API_URL + "/uploadDocs",
    data: { name: "offerletter", ref_id: r_prams.id },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status == "removed") {
        deleteDoc(info.file.uid, info.file.url);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    defaultFileList: [],
  };

  const props2 = {
    name: "image",
    multiple: true,
    action: process.env.REACT_APP_API_URL + "/uploadDocs",
    data: { name: "appraisalletter", ref_id: r_prams.id },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status == "removed") {
        deleteDoc(info.file.uid, info.file.url);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    defaultFileList: [],
  };

  const props3 = {
    name: "image",
    multiple: true,
    action: process.env.REACT_APP_API_URL + "/uploadDocs",
    data: { name: "PFForm11", ref_id: r_prams.id },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status == "removed") {
        deleteDoc(info.file.uid, info.file.url);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    defaultFileList: [],
  };

  const props4 = {
    name: "image",
    multiple: true,
    action: process.env.REACT_APP_API_URL + "/uploadDocs",
    data: { name: "EmployeeDetailsheet", ref_id: r_prams.id },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status == "removed") {
        deleteDoc(info.file.uid, info.file.url);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    defaultFileList: [],
  };

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <div>
            <span className="pageTitle">Document</span>
          </div>
        </div>
        <div>
          <Form
            form={form}
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row>
              <Col span={24}>
                <Form.Item label="Offer letter" name="offerletter">
                  <Dragger {...props1}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Drag and Drop Files here</p>
                  </Dragger>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Appraisal letter" name="appraisalletter">
                  <Dragger {...props2}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Drag and Drop Files here</p>
                  </Dragger>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="PF/Form 11" name="PFForm11">
                  <Dragger {...props3}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Drag and Drop Files here</p>
                  </Dragger>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Employee Detail sheet"
                  name="EmployeeDetailsheet"
                >
                  <Dragger {...props4}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Drag and Drop Files here</p>
                  </Dragger>
                </Form.Item>
              </Col>
              <Col span={24}>
                {previoussalary && (
                  <Button type="primary" onClick={handleDownload}>
                    <DownloadOutlined style={{ fontSize: "15px" }} />
                    Download Previous Company Salary Slip
                  </Button>
                )}
                {previoussalary && (
                  <Button type="primary" onClick={handleDownload1}>
                    <DownloadOutlined style={{ fontSize: "15px" }} />
                    Download Previous Company Experience Leter
                  </Button>
                )}
                {previoussalary && (
                  <Button type="primary" onClick={handleDownload2}>
                    <DownloadOutlined style={{ fontSize: "15px" }} />
                    Download Previous Company Education Certificate
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDocs;

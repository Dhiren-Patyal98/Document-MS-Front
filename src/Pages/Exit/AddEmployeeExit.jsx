import { useState, useEffect } from "react";
import {
  Button,
  Select,
  Col,
  Form,
  Input,
  Row,
  Typography,
  DatePicker,
  Result,
  Modal,
  notification,
  AutoComplete,
} from "antd";
import axios from "axios";
import { Alert, Space } from "antd";
import moment from "moment";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
const { Title } = Typography;
const { Option } = Select;

const AddEmployeeExit = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {}, []);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [empName, setEmpName] = useState([]);
  const [empId, setEmpId] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message) => {
    if (type === "error") {
      api[type]({
        message: "Server Error",
        description: "",
      });
    } else {
      api[type]({
        message,
        description: "",
      });
    }
  };
  const handleChange = (value, option) => {
    let userId = option.key;
    axios
      .post(process.env.REACT_APP_API_URL + "/getUserData", { userId })
      .then((res) => {
        if (res.data !== "") {
          let data = res.data;
          getcandidateData(data.ref_id);
          var emp_name = data.f_name + " " + data.l_name;
          form.setFieldsValue({
            emp_code: data.emp_code,
            designation: data.job_title,
            department: data.department,
          });
          setEmpName(emp_name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getcandidateData = (id) => {
    axios
      .post(process.env.REACT_APP_API_URL + "/getcandidatedata", { id })
      .then((res) => {
        if (res.data !== "") {
          let data = res.data;
          var emp_name = data.f_name + " " + data.l_name;
          form.setFieldsValue({
            personal_email: data.email,
            joining_date: new Date(data.date_of_joining).toLocaleDateString(),
            experience: `${data.experience} Years`,
            salary: data.salary,
            office_email: data.office_email,
            office_gmail: data.office_gmail,
            office_email_password: data.office_email_password,
            office_gmail_password: data.office_gmail_password,
            employee_office: data.employee_office,
            employee_type: data.employee_type,
          });
          setEmpName(emp_name);
          setEmpId(data._id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlenameSearch = (value) => {
    // Fetch item suggestions based on the user's input
    axios
      .get(`${process.env.REACT_APP_API_URL}/items/searchName?query=${value}`)
      .then((response) => {
        const items = response.data;
        setUserSuggestions(items);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleAddEmployeeExit = (values) => {
    values.emp_name = empName;
    values.emp_id = empId;
    axios
      .post(process.env.REACT_APP_API_URL + "/add_employeeexit", values)
      .then((res) => {
        setLoading(false);
        form.resetFields();
        openNotificationWithIcon("success", "Account Added Successfully");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        openNotificationWithIcon("error", "Failed to add department");
      });
  };

  return (
    <div>
      <div className="mainContainer">
        <Row>
          <Col span={24}>
            <div className="mainTitle">
              <Title level={5} className="Expensecolor">
                Add Employee Exit
              </Title>
            </div>
          </Col>
          <Col span={24}>
            <Form
              form={form}
              name="basic"
              layout="vertical"
              onFinish={handleAddEmployeeExit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    label="Employee Name"
                    name="emp_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input employee name!",
                      },
                    ]}
                    hasFeedback
                  >
                    <AutoComplete
                      placeholder="Select Employee"
                      onSearch={handlenameSearch}
                      onChange={handleChange}
                    >
                      {userSuggestions.map((option) => (
                        <Option
                          key={option._id}
                          value={`${option.f_name} ${option.l_name}`}
                        >
                          {`${option.emp_code} - ${option.f_name} ${option.l_name}`}
                        </Option>
                      ))}
                    </AutoComplete>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Employee Code"
                    name="emp_code"
                    rules={[
                      {
                        required: true,
                        message: "Please input code of Employee!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Employee code.." readOnly />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Employee Type"
                    name="employee_type"
                    rules={[
                      {
                        required: true,
                        message: "Please input type of Employee!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Employee type.." readOnly />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Employee Office"
                    name="employee_office"
                    rules={[
                      {
                        required: true,
                        message: "Please input Office of Employee!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Employee Office.." readOnly />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Job Title"
                    name="designation"
                    rules={[
                      {
                        required: true,
                        message: "Please input employee Job Title!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Job title..." readOnly />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Date Of Joining"
                    name="joining_date"
                    hasFeedback
                  >
                    <Input readOnly />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Experience"
                    name="experience"
                    rules={[
                      {
                        required: true,
                        message: "Please input employee experience!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Employee experience..." readOnly />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Salary"
                    name="salary"
                    rules={[
                      {
                        required: true,
                        message: "Please input employee salary!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Employee salary..." readOnly />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Personal Email"
                    name="personal_email"
                    rules={[
                      {
                        required: true,
                        message: "Please input Personal Email!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Personal Email..." readOnly />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Official Email"
                    name="office_email"
                    rules={[
                      {
                        required: true,
                        message: "Please input Official Email!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Official Email..." readOnly />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Official Email Password"
                    name="office_email_password"
                    rules={[
                      {
                        required: true,
                        message: "Please input Official Email password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      className="myAntIpt2"
                      placeholder="Official Email password..."
                      size="small"
                      iconRender={(visible) =>
                        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                      }
                      readOnly
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Official Gmail"
                    name="office_gmail"
                    rules={[
                      {
                        required: true,
                        message: "Please input Official Gmail!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Official Gmail..." readOnly />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Official Gmail Password"
                    name="office_gmail_password"
                    rules={[
                      {
                        required: true,
                        message: "Please input Official Gmail password!",
                      },
                    ]}
                    hasFeedback
                    readOnly
                  >
                    <Input.Password
                      className="myAntIpt2"
                      placeholder="Official Gmail password..."
                      size="small"
                      iconRender={(visible) =>
                        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                      }
                      hasFeedback
                      readOnly
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Leaving Date"
                    name="leaveing_date"
                    rules={[
                      {
                        required: true,
                        message: "Please input employee leaving Date!",
                      },
                    ]}
                    hasFeedback
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      readOnlyDate={(current) =>
                        current && current < moment().startOf("day")
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Date of Resignation"
                    name="resign_date"
                    rules={[
                      {
                        required: true,
                        message: "Please input employee resignation Date!",
                      },
                    ]}
                    hasFeedback
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Department"
                    name="department"
                    rules={[
                      {
                        required: true,
                        message: "Please input employee department!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Employee department..." readOnly />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="FNF"
                    name="fnf_status"
                    rules={[
                      {
                        required: true,
                        message: "Please select FNF status!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select FNF status"
                      allowClear
                      className="myAntIptSelect2"
                      style={{ marginTop: "-8px" }}
                    >
                      <Option value="Under Process">Under Process</Option>
                      <Option value="Hold">Hold</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddEmployeeExit;

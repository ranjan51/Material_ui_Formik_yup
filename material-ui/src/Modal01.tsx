import React, { useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import {
  Modal,
  Button,
  Typography,
  Checkbox,
  MenuItem,
  Select,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  Container,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";
import Header from "./Header";

interface FormValues {
  name: string;
  email: string;
  fresher: boolean;
  education: string[];
  gender: string;
  dob: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  fresher: boolean;
  education: string[];
  gender: string;
  dob: string;
}

const Modal01 = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const initialValues: FormValues = {
    name: "",
    email: "",
    fresher: false,
    education: [],
    gender: "",
    dob: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    education: yup
      .array()
      .min(1, "Select at least one education")
      .required("Education is required"),
    dob: yup.string().required("Date of Birth is required"),
  });

  const handleAddUser = (values: FormValues) => {
    const newUser: User = {
      id: new Date().getTime(),
      name: values.name,
      email: values.email,
      fresher: values.fresher,
      education: values.education,
      gender: values.gender,
      dob: values.dob,
    };
    setUsers([...users, newUser]);
    handleClose();
  };

  const handleUpdateUser = (values: FormValues) => {
    const updatedUser: User = {
      ...values,
      id: selectedUserId as number,
    };

    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );

    setUsers(updatedUsers);
    setSelectedUserId(null);
    handleClose();
  };

  const handleEdit = (user: User) => {
    setSelectedUserId(user.id);
    handleOpen();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClear = () => {
    setSelectedUserId(null);
    handleClose();
  };

  return (
    <div>
      <Header/>
      <center>
      <Button onClick={handleOpen} variant="contained" id="btn1">
        Add Users
      </Button>
      </center>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="modal"
      >
        <Container>
          <Formik
            initialValues={
              selectedUserId !== null
                ? users.find((user) => user.id === selectedUserId) ||
                  initialValues
                : initialValues
            }
            validationSchema={validationSchema}
            onSubmit={
              selectedUserId !== null ? handleUpdateUser : handleAddUser
            }
          >
            {({ values, setFieldValue }) => (
             
                
              <Form>
                <Typography variant="h4" component="h2">
                  {selectedUserId !== null ? "Edit User" : "Add User"}
                </Typography>
                <Field
                  as={TextField}
                  label="Name"
                  variant="outlined"
                  name="name"
                  fullWidth
                />
                <ErrorMessage name="name" component="div" className="error" />
                <Field
                  as={TextField}
                  label="Email"
                  variant="outlined"
                  name="email"
                  fullWidth
                />
                <ErrorMessage name="email" component="div" className="error" />
                <Field
                  type="checkbox"
                  name="fresher"
                  as={Checkbox}
                  defaultChecked
                />
                Fresher
                <FieldArray name="education">
                  {(arrayHelpers: {
                    push: (value: any) => void;
                    remove: (index: number) => void;
                  }) => (
                    <div>
                      <label>Education</label>
                      <Select
                        name="education"
                        label="Highest Education"
                        fullWidth
                        multiple
                        value={values.education}
                        onChange={(e) => {
                          setFieldValue("education", e.target.value);
                        }}
                      >
                        <MenuItem value="10th">10th</MenuItem>
                        <MenuItem value="12th">12th</MenuItem>
                        <MenuItem value="graduation">Graduation</MenuItem>
                        <MenuItem value="Masters">Masters</MenuItem>
                      </Select>
                      <ErrorMessage
                        name="education"
                        component="div"
                        className="error"
                      />
                    </div>
                  )}
                </FieldArray>
                <label>Gender</label>
               <div style={{display:"flex",flexDirection:"row"}}>
                <Field name="gender" as={RadioGroup} className="gender">
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </Field>
                </div>
              
                <ErrorMessage name="gender" component="div" className="error" />
                {/* <Field
                  as={TextField}
                  label="Date of Birth"
                  variant="outlined"
                  name="dob"
                  type="date"
                  fullWidth
                /> */}

                {/* DATE */}
                
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                              <DatePicker label="Date Of Birth"

                                value={dayjs(values.dob)}

                                onChange={(newDate: any) => setFieldValue("dob", `${newDate.$y}-${newDate.$M}-${newDate.$D}`)}

                              />
                  </LocalizationProvider>

                  
                <ErrorMessage name="dob" component="div" className="error" />
                <Button type="submit" variant="contained">
                  {selectedUserId !== null ? "Update User" : "Add User"}
                </Button>
                <Button type="button" variant="contained" onClick={handleClear}>
                  Clear
                </Button>
              </Form>
             
            )}
          </Formik>
        </Container>
      </Modal>
      <center>
        <div id="users">
          <h2>All Users</h2>
          {users.map((user) => (
            <div key={user.id}>
              <Typography>Name: {user.name}</Typography>
              <Typography>Email: {user.email}</Typography>
              <Typography>Fresher: {user.fresher ? "Yes" : "No"}</Typography>
              <Typography>Education: {user.education.join(",")}</Typography>
              <Typography>Gender: {user.gender}</Typography>
              <Typography>Date of Birth: {user.dob}</Typography>

              <Button variant="contained" onClick={() => handleEdit(user)}>
                Edit
              </Button>
            </div>
          ))}
        </div>
      </center>
    </div>
  );
};
export default Modal01;
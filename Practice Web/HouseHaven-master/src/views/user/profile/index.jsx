import styled, { css } from "styled-components";

import Button from "../../../components/Button";
import React from "react";
import { validateField } from "../../../utils";

const Container = styled.div`
  padding: 20px;

  h4 {
    font-size: 16px;
    margin-bottom: 5px;
  }
`;

const SmallText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(107 114 128);
  /* margin-top: 8px; */
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  margin-top: 20px;
  width: 550px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 0.875rem;
`;

const inputStyles = css`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  outline: none;
  border: 1px solid ${(props) => (props.error ? "red" : "rgb(209 213 219)")};
  border-radius: 4px;
  box-shadow: ${(props) => (props.error ? "0 0 1px red" : "none")};
`;

const Input = styled.input`
  ${inputStyles}
`;

const Select = styled.select`
  ${inputStyles}
`;

const Textarea = styled.textarea`
  ${inputStyles};
  resize: none;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-top: 5px;
`;

const profileFormDetails = [
  {
    id: 1,
    title: "Full Name",
    key: "fullName",
    type: "input",
    required: true,
    errors: [{ id: 1, message: "Full Name is required!" }],
  },
  {
    id: 2,
    title: "Email",
    key: "email",
    type: "input",
    required: true,
    errors: [
      { id: 1, message: "Email is required!" },
      { id: 2, message: "Please enter a valid email address!" },
    ],
  },
  {
    id: 3,
    title: "Phone Number",
    key: "phoneNumber",
    type: "input",
    required: true,
    errors: [{ id: 1, message: "Phone Number is required!" }],
  },
  {
    id: 4,
    title: "Date of Birth",
    key: "dob",
    type: "date",
    required: true,
    errors: [{ id: 1, message: "Date of Birth is required!" }],
  },
  {
    id: 5,
    title: "Address",
    key: "address",
    type: "textarea",
    required: true,
    errors: [{ id: 1, message: "Address is required!" }],
  },
  {
    id: 6,
    title: "Gender",
    key: "gender",
    type: "select",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
    required: true,
    errors: [{ id: 1, message: "Gender is required!" }],
  },
  {
    id: 7,
    title: "WhatsApp Number",
    key: "whatsappNumber",
    type: "input",
    required: true,
    errors: [{ id: 1, message: "WhatsApp Number is required!" }],
  },
  {
    id: 8,
    title: "LinkedIn Profile Link",
    key: "linkedin",
    type: "input",
    required: true,
    errors: [{ id: 1, message: "LinkedIn Profile Link is required!" }],
  },
];

const Profile = () => {
  const [formValues, setFormValues] = React.useState({});
  const [formErrors, setFormErrors] = React.useState({});

  const handleChange = (id, value) => {
    const field = profileFormDetails.find((f) => f.id === id);
    setFormValues({
      ...formValues,
      [field.key]: value,
    });

    const errorMessage = validateField(field, value);

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field.key]: errorMessage,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    profileFormDetails.forEach((field) => {
      const errorMessage = validateField(field, formValues[field.key]);
      if (errorMessage) {
        errors[field.key] = errorMessage;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  };
  return (
    <Container>
      <h4>Profile Information</h4>
      <SmallText>
        Set up your profile so we can provide the best of service to you.
      </SmallText>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          {profileFormDetails.map((field) => (
            <FormGroup key={field.id}>
              <Label>{field.title}</Label>
              {field.type === "input" && (
                <Input
                  type="text"
                  error={!!formErrors[field.key]}
                  value={formValues[field.key] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
              {field.type === "select" && (
                <Select
                  error={!!formErrors[field.key]}
                  value={formValues[field.key] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                >
                  <option value="">Select an option</option>
                  {field.options &&
                    field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </Select>
              )}

              {field.type === "date" && (
                <Input
                  type="date"
                  error={!!formErrors[field.key]}
                  value={formValues[field.key] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={`Enter ${field.title}`}
                />
              )}

              {field.type === "textarea" && (
                <Textarea
                  error={!!formErrors[field.key]}
                  value={formValues[field.key] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
              {formErrors[field.key] && (
                <ErrorMessage>{formErrors[field.key]}</ErrorMessage>
              )}
            </FormGroup>
          ))}
          <Button
            type="submit"
            containerStyles={{
              fontSize: "15px",
            }}
          >
            {"SUBMIT"}
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Profile;

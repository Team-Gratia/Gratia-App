import styled, { css } from "styled-components";

import Button from "../../../components/Button";
import { ImUpload } from "react-icons/im";
import React from "react";
import { validateField } from "../../../utils"; // Make sure to implement this validation function

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

const ImagePicker = styled.div`
  width: 210px;
  padding: 20px;
  border: 2px dashed #e2eef4;
  border-radius: 4px;
  background: #f1f3f6;
  position: relative;
  margin-top: 15px;

  p {
    font-size: 14px;
    color: rgb(107 114 128);
  }
  input {
    opacity: 0;
    height: 100%;
    position: absolute;
    width: 100%;
  }
`;

const supportFormDetails = [
  {
    id: 1,
    title: "Subject",
    key: "subject",
    type: "input",
    required: true,
    errors: [{ id: 1, message: "Subject is required!" }],
  },
  {
    id: 2,
    title: "Category",
    key: "category",
    type: "select",
    options: [
      { label: "Technical Issue", value: "technical" },
      { label: "Billing Inquiry", value: "billing" },
      { label: "General Question", value: "general" },
      { label: "Feedback", value: "feedback" },
    ],
    required: true,
    errors: [{ id: 1, message: "Category is required!" }],
  },
  {
    id: 3,
    title: "Priority",
    key: "priority",
    type: "select",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],
    required: true,
    errors: [{ id: 1, message: "Priority is required!" }],
  },
  {
    id: 4,
    title: "Description",
    key: "description",
    type: "textarea",
    required: true,
    errors: [{ id: 1, message: "Description is required!" }],
  },
  {
    id: 5,
    title: "Attachment",
    key: "attachment",
    type: "file",
    required: false,
    errors: [],
  },
];

const Support = () => {
  const [formValues, setFormValues] = React.useState({});
  const [formErrors, setFormErrors] = React.useState({});

  const handleChange = (id, value) => {
    const field = supportFormDetails.find((f) => f.id === id);
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

    supportFormDetails.forEach((field) => {
      const errorMessage = validateField(field, formValues[field.key]);
      if (errorMessage) {
        errors[field.key] = errorMessage;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Add form submission logic here
    console.log("Form submitted successfully", formValues);
  };

  return (
    <Container>
      <h4>Support</h4>
      <SmallText>Submit your support request or inquiry.</SmallText>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          {supportFormDetails.map((field) => (
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

              {field.type === "file" && (
                <ImagePicker className="flex sm-gap ai-center">
                  <input
                    type="file"
                    onChange={(e) => handleChange(field.id, e.target.files[0])}
                  />
                  <ImUpload size={20} color="#7bb7f2" />
                  <p>Click here to upload</p>
                </ImagePicker>
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
            SUBMIT
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Support;

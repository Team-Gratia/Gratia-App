import React, { useState } from "react";
import styled, { css } from "styled-components";

import Button from "../../../components/Button";
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

const apartmentFormDetails = [
  {
    id: 1,
    title: "Apartment Type",
    type: "select",
    options: [
      { label: "Studio", value: "Studio" },
      { label: "One Bedroom", value: "One Bedroom" },
      { label: "Two Bedroom", value: "Two Bedroom" },
      { label: "Three Bedroom", value: "Three Bedroom" },
      { label: "Penthouse", value: "Penthouse" },
      { label: "Duplex", value: "Duplex" },
    ],
    key: "apartmentType",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 2,
    title: "Preferred Location",
    type: "input",
    key: "preferredLocation",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 3,
    title: "Budget",
    type: "input",
    key: "budget",
    required: true,
    errors: [
      { id: 1, message: "This field is required!" },
      { id: 2, message: "Budget must be a number!" },
    ],
  },
  {
    id: 4,
    title: "Number of Bedrooms",
    type: "select",
    options: [
      { label: "1", value: "1" },
      {
        label: "2",
        value: "2",
      },
      {
        label: "3",
        value: "3",
      },
      {
        label: "4",
        value: "4",
      },
      {
        label: "5+",
        value: "5+",
      },
    ],
    key: "bedrooms",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 5,
    title: "Number of Bathrooms",
    type: "select",
    options: [
      { label: "1", value: "1" },
      {
        label: "2",
        value: "2",
      },
      {
        label: "3",
        value: "3",
      },
      {
        label: "4",
        value: "4",
      },
      {
        label: "5+",
        value: "5+",
      },
    ],
    key: "bathrooms",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 6,
    title: "Furnishing Preference",
    type: "select",
    options: [
      { label: "Furnished", value: "Furnished" },
      { label: "Semi-Furnished", value: "Semi-Furnished" },
      { label: "Unfurnished", value: "Unfurnished" },
    ],
    key: "furnishing",
    required: false,
    errors: [],
  },
  {
    id: 7,
    title: "Move-in Date",
    type: "date",
    key: "moveInDate",
    required: false,
    errors: [{ id: 1, message: "This field is required!" }],
  },

  {
    id: 9,
    title: "Pet Allowed",
    type: "select",
    key: "petAllowed",
    required: true,
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ],
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 10,
    title: "Parking needed",
    type: "select",
    key: "parkingNeeded",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ],
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 11,
    title: "Lease Term",
    type: "select",
    key: "leaseTerm",
    required: true,
    options: [
      { label: "Month-to-month", value: "Month-to-month" },
      { label: "6 months", value: "6 months" },
      { label: "1 year", value: "1 year" },
    ],
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 12,
    title: "Floor Preference",
    type: "select",
    key: "floorPreference",
    required: true,
    options: [
      { label: "Ground floor", value: "Ground floor" },
      { label: "Middle floor", value: "Middle floor" },
      { label: "Top floor", value: "Top floor" },
    ],
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 8,
    title: "Special Requirements",
    key: "specialRequirements",
    type: "textarea",
    required: false,
    errors: [],
  },
];

const ApartmentForm = () => {
  const [formValues, setFormValues] = React.useState({});
  const [formErrors, setFormErrors] = React.useState({});

  const handleChange = (id, value) => {
    const field = apartmentFormDetails.find((f) => f.id === id);
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

    apartmentFormDetails.forEach((field) => {
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
      <h4>What type of apartment do you want to rent?</h4>
      <SmallText>Tell us your kind of residence</SmallText>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          {apartmentFormDetails.map((field) => (
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

export default ApartmentForm;

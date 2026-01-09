import styled, { css } from "styled-components";

import Button from "../../components/Button";
import React from "react";
import { useCreateTenantMutation } from "../../app/api/api";
import { useNavigate } from "react-router-dom";
import { validateField } from "../../utils";

const tenantTypeOptions = [
  { label: "Individual", value: "Individual" },
  { label: "Company", value: "Company" },
];

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const alertOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const claimStatusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const salutationOptions = [
  { id: 1, label: "Mr.", value: "Mr." },
  { id: 2, label: "Mrs.", value: "Mrs." },
  { id: 3, label: "Miss", value: "Miss" },
  { id: 4, label: "Pastor", value: "Pastor" },
  { id: 5, label: "Professor", value: "Professor" },
  { id: 6, label: "Alhaji", value: "Alhaji" },
  { id: 7, label: "Others", value: "Others" },
];

const stateOptions = [
  { id: 1, label: "Lagos", value: "Lagos" },
  { id: 2, label: "Ogun", value: "Ogun" },
  { id: 3, label: "Osun", value: "Osun" },
  { id: 4, label: "Kogi", value: "Kogi" },
];

const countryOptions = [
  { id: 1, label: "Nigeria", value: "Nigeria" },
  { id: 2, label: "Ghana", value: "Ghana" },
  { id: 3, label: "Algeria", value: "Algeria" },
];

const tenantFormDetails = [
  {
    id: 1,
    title: "Tenant Type",
    type: "select",
    options: tenantTypeOptions,
    key: "tenantType",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 2,
    title: "Salutation",
    type: "select",
    options: salutationOptions,
    key: "salutation",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 3,
    title: "Name",
    key: "name",
    type: "input",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 4,
    title: "Email",
    key: "email",
    type: "input",
    required: true,
    errors: [
      { id: 1, message: "This field is required!" },
      { id: 2, message: "Email must be a valid email address!" },
    ],
  },
  {
    id: 5,
    title: "Phone",
    key: "phone",
    type: "input",
    required: true,
    errors: [
      { id: 1, message: "This field is required!" },
      {
        id: 2,
        message: "Phone number should be 11 digits",
      },
      {
        id: 3,
        message: "Only numbers are allowed",
      },
    ],
  },
  {
    id: 6,
    title: "Date of Birth",
    key: "dateOfBirth",
    type: "input",
    inputType: "date",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 7,
    title: "Gender",
    key: "gender",
    type: "select",
    options: genderOptions,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 8,
    title: "Address",
    key: "address",
    type: "input",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 9,
    title: "Correspondence Address",
    key: "caddress",
    type: "input",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 10,
    title: "City",
    key: "city",
    type: "input",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 11,
    title: "State",
    key: "state",
    type: "select",
    options: stateOptions,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 12,
    title: "Country",
    key: "country",
    type: "select",
    options: countryOptions,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 13,
    title: "Nationality",
    key: "nationality",
    type: "select",
    options: countryOptions,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 14,
    title: "Alert",
    key: "alert",
    type: "select",
    options: alertOptions,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 15,
    title: "Claim Status",
    key: "claimStatus",
    type: "select",
    options: claimStatusOptions,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
];

const SmallText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: 0.25rem;
  color: rgb(107 114 128);
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-top: 5px;
`;

const AddTenant = () => {
  const [formValues, setFormValues] = React.useState({});
  const [formErrors, setFormErrors] = React.useState({});

  const navigate = useNavigate();

  const [createTenant, { isLoading }] = useCreateTenantMutation();

  const handleChange = (id, value) => {
    const field = tenantFormDetails.find((f) => f.id === id);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    tenantFormDetails.forEach((field) => {
      const errorMessage = validateField(field, formValues[field.key]);
      if (errorMessage) {
        errors[field.key] = errorMessage;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await createTenant(formValues).unwrap();
      console.log(response);
      navigate("/tenants");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add a Tenant</h2>
      <SmallText>Provide the tenant information below.</SmallText>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          {tenantFormDetails.map((field) => (
            <FormGroup key={field.id}>
              <Label>{field.title}</Label>
              {field.type === "input" && (
                <Input
                  type={field.inputType || "text"}
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
              {formErrors[field.key] && (
                <ErrorMessage>{formErrors[field.key]}</ErrorMessage>
              )}
            </FormGroup>
          ))}
          <Button type="submit">
            {isLoading ? "SUBMITTING..." : "CREATE TENANT"}
          </Button>
        </form>
      </FormContainer>
    </div>
  );
};

export default AddTenant;

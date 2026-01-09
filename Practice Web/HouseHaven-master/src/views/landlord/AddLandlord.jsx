import styled, { css } from "styled-components";

import Button from "../../components/Button";
import { Loader } from "../../components";
import React from "react";
import { useCreateLandLordMutation } from "../../app/api/api";
import { useNavigate } from "react-router-dom";
import { validateField } from "../../utils";

const SmallText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: 0.25rem;
  color: rgb(107 114 128);
`;

const FormContainer = styled.div`
  margin-top: 20px;
  width: 550px;

  user-select: none;
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
  ${inputStyles}/* box-shadow: 0 0 1px #95d2f2; */
`;

const Select = styled.select`
  ${inputStyles}
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-top: 5px;
`;

const states = [
  { id: 1, label: "Lagos" },
  { id: 2, label: "Abuja" },
];

const ownershipTypeOptions = [
  { id: 1, label: "Individual", value: "Individual" },
  { id: 2, label: "Couple", value: "couple" },
  { id: 3, label: "Company", value: "company" },
  { id: 4, label: "Organization", value: "organization" },
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

const countryOptions = [
  { id: 1, label: "Nigeria", value: "Nigeria" },
  { id: 2, label: "Ghana", value: "Ghana" },
  { id: 3, label: "Algeria", value: "Algeria" },
];

const reportScheduleOptions = [
  { id: 1, label: "Monthly", value: "Monthly" },
  { id: 2, label: "Quartely", value: "Quartely" },
  { id: 3, label: "Biannual", value: "Biannual" },
  { id: 4, label: "Annual", value: "Annual" },
];

const alertOptions = [
  {
    id: 1,
    label: "SMS",
    value: "SMS",
  },
  { id: 2, label: "Email", value: "Email" },
];

const formDetails = [
  {
    id: 1,
    title: "Ownership Type",
    type: "select",
    key: "ownershipType",
    required: true,
    options: ownershipTypeOptions,
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
    title: "Full Name",
    type: "input",
    required: true,
    key: "name",
    errors: [{ id: 1, message: "This field is required!" }],
  },

  {
    id: 4,
    title: "Phone",
    type: "input",
    key: "phone",
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
    id: 5,
    title: "WhatsApp Number",
    type: "input",
    key: "whatsapp",
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
    title: "Email Address",
    type: "input",
    key: "email",
    required: true,
    errors: [
      { id: 1, message: "This field is required!" },
      {
        id: 2,
        message: "Email should be a valid email address",
      },
    ],
  },

  {
    id: 7,
    title: "Address",
    type: "input",
    key: "address",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 8,
    title: "City",
    type: "input",
    key: "city",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 9,
    title: "State",
    type: "select",
    key: "state",
    options: states,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },

  {
    id: 10,
    title: "Country",
    type: "select",
    key: "country",
    options: countryOptions,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 11,
    title: "Report Schedule",
    key: "reportSchedule",
    type: "select",
    options: reportScheduleOptions,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 12,
    title: "Alert",
    type: "select",
    key: "alert",
    options: alertOptions,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
];

const AddLandlord = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = React.useState({});
  const [formErrors, setFormErrors] = React.useState({});

  const [createLandlord, { isLoading }] = useCreateLandLordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to handle form submission

    const errors = {};

    formDetails.forEach((field) => {
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
      await createLandlord(formValues).unwrap();
      navigate("/landlord");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (id, value) => {
    const field = formDetails.find((f) => f.id === id);
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

  return (
    <div>
      {isLoading && <Loader />}

      <h2>Landlord Information</h2>
      <SmallText>Provide the landlord information below.</SmallText>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          {formDetails.map((field) => (
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
                      <option key={option.id} value={option.label}>
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
          <Button
            type="submit"
            containerStyles={{
              padding: "15px 10px",
            }}
          >
            {isLoading ? "Submitting..." : "CREATE LANDLORD"}
          </Button>
        </form>
      </FormContainer>
    </div>
  );
};

export default AddLandlord;

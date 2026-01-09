import styled, { css } from "styled-components";
import {
  useCreateUnitMutation,
  useGetPropertyQuery,
} from "../../../app/api/api";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/Button";
import { Loader } from "../../../components";
import React from "react";
import { validateField } from "../../../utils";

const unitTypeOptions = [
  { label: "Studio", value: "Studio" },
  { label: "1 Bedroom", value: "1 Bedroom" },
  { label: "2 Bedrooms", value: "2 Bedrooms" },
  { label: "3 Bedrooms", value: "3 Bedrooms" },
  { label: "Penthouse", value: "Penthouse" },
];

const commissionTypeOptions = [
  { label: "Percentage", value: "Percentage" },
  { label: "Fixed Amount", value: "Fixed Amount" },
];

const unitFormDetails = [
  {
    id: 1,
    title: "Unit Type",
    type: "select",
    options: unitTypeOptions,
    key: "unitType",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 2,
    title: "Unit Number",
    key: "unitNumber",
    type: "input",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 3,
    title: "Rent",
    key: "rent",
    type: "input",
    required: true,
    errors: [
      { id: 1, message: "This field is required!" },
      { id: 2, message: "Rent must be a number!" },
    ],
  },
  {
    id: 4,
    title: "Name",
    key: "name",
    type: "input",
    required: false,
    errors: [],
  },
  {
    id: 5,
    title: "Description",
    key: "description",
    type: "textarea",
    required: false,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 6,
    title: "Bedrooms",
    key: "bedrooms",
    type: "input",
    required: true,
    errors: [
      { id: 1, message: "This field is required!" },
      { id: 2, message: "Bedrooms must be a number!" },
    ],
  },
  {
    id: 7,
    title: "Commission",
    key: "commission",
    type: "input",
    required: true,
    errors: [
      { id: 1, message: "This field is required!" },
      { id: 2, message: "Commission must be a number!" },
    ],
  },
  {
    id: 8,
    title: "Commission Type",
    key: "commissionType",
    type: "select",
    options: commissionTypeOptions,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
];

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
  ${inputStyles}
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-top: 5px;
`;

const Unit = () => {
  const [formValues, setFormValues] = React.useState({});
  const [formErrors, setFormErrors] = React.useState({});

  const [createUnit, { isLoading }] = useCreateUnitMutation();
  const navigate = useNavigate();

  const { id } = useParams();

  const { data } = useGetPropertyQuery({ businessId: 1, propertyId: id });
  const property = data?.property;

  const handleChange = (id, value) => {
    const field = unitFormDetails.find((f) => f.id === id);
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
    unitFormDetails.forEach((field) => {
      const errorMessage = validateField(field, formValues[field.key]);
      if (errorMessage) {
        errors[field.key] = errorMessage;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const response = await createUnit({
      ...formValues,
      PropertyId: id,
    }).unwrap();

    navigate("/property");

    console.log(response);

    // Handle form submission (e.g., send data to server)
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h4 className="mb">{property?.name || "Your"} Unit</h4>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          {unitFormDetails.map((field) => (
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
              marginTop: "20px",
              padding: "15px 10px",
              fontSize: "15px",
            }}
          >
            {isLoading ? "SUBMITTING..." : "CREATE UNIT"}
          </Button>
        </form>
      </FormContainer>
    </div>
  );
};

export default Unit;

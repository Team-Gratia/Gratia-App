/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import styled, { css } from "styled-components";
import {
  useCreatePropertyMutation,
  useGetLandlordsQuery,
  useGetPropertyQuery,
} from "../../../app/api/api";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/Button";
import { Loader } from "../../../components";
import React from "react";
import { validateField } from "../../../utils";

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

const SmallTitle = styled.div`
  color: #868fa1;
  margin: 10px 0;
  font-size: 13px;
`;

const propertyTypeOptions = [
  { label: "Office", value: "Office" },
  { label: "Retail", value: "Retail" },
  { label: "Industrial", value: "Industrial" },
  { label: "Single family home", value: "Single family home" },
  { label: "Multi family", value: "Multi family" },
  { label: "Hotel", value: "Hotel" },
  { label: "Land", value: "Land" },
  { label: "Special Purpose", value: "Special Purpose" },
  { label: "Patio home", value: "Patio home" },
  { label: "Cottage", value: "Cottage" },
  { label: "Cabin", value: "Cabin" },
  { label: "Courtyard Home", value: "Courtyard Home" },
  { label: "Duplex", value: "Duplex" },
  { label: "Triplex", value: "Triplex" },
  { label: "Quadraplex", value: "Quadraplex" },
  { label: "Apartment / Flat", value: "Apartment / Flat" },
  { label: "CarriageHome", value: "CarriageHome" },
  { label: "Leases", value: "Leases" },
];

const furnishTypeOptions = [
  { label: " Unfurnished" },
  { label: " Furnished" },
  { label: " Semi-furnished" },
];

const serviceTypeOptions = [
  { label: " Fully Managed", value: "Fully Managed" },
  { label: " Letting", value: "Letting" },
  { label: " Maintenance Only", value: "Maintenance Only" },
  { label: " Sale", value: "Sale" },
];

const categoryOptions = [
  { label: "Residential", value: "Residential" },
  { label: "Commercial", value: "Commercial" },
];

const countryOptions = [
  { id: 1, label: "Nigeria", value: "Nigeria" },
  { id: 2, label: "Ghana", value: "Ghana" },
  { id: 3, label: "Algeria", value: "Algeria" },
];

const formDetails = [
  {
    id: 1,
    title: "Name",
    type: "input",
    key: "name",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 2,
    title: "Property Type",
    type: "select",
    key: "propertyType",
    options: propertyTypeOptions,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 3,
    title: "Address",
    type: "input",
    key: "address",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 4,
    title: "City",
    type: "input",
    key: "city",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 5,
    title: "State",
    type: "input",
    key: "state",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 6,
    title: "Country",
    type: "select",
    key: "country",
    options: countryOptions,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 7,
    title: "Description",
    type: "textarea",
    required: true,
    key: "description",
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 8,
    title: "Furnish Type",
    type: "select",
    key: "furnishType",
    options: furnishTypeOptions,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 9,
    title: "Service Type",
    type: "select",
    key: "serviceType",
    options: serviceTypeOptions,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 10,
    title: "Rental Cost",
    type: "input",
    key: "rentalCost",
    required: true,
    errors: [
      { id: 1, message: "This field is required!" },
      { id: 2, message: "Rental Cost must be a number!" },
    ],
  },
  {
    id: 11,
    title: "Selling Price",
    type: "input",
    key: "sellingPrice",
    required: true,
    errors: [
      { id: 1, message: "This field is required!" },
      { id: 2, message: "Selling Price must be a number!" },
    ],
  },
  {
    id: 12,
    title: "Category",
    type: "select",
    key: "category",
    options: categoryOptions,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 13,
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
    id: 14,
    title: "Start Date",
    key: "startDate",
    type: "date",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 15,
    title: "End Date",
    key: "endDate",
    type: "date",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
];

const PropertyInformation = ({ setActiveTab }) => {
  //

  const [error, setError] = React.useState(false);

  const { data } = useGetLandlordsQuery();
  const [createProperty, { isLoading: createLoading }] =
    useCreatePropertyMutation();

  const { id } = useParams();

  const details = {
    businessId: 1,
    propertyId: id,
  };

  const { data: propertyData } = useGetPropertyQuery(details);
  const property = propertyData?.property;

  const navigate = useNavigate();

  const [landlordId, setLandlordId] = React.useState(null);
  const [formValues, setFormValues] = React.useState({});
  const [formErrors, setFormErrors] = React.useState({});

  const landLords = data?.items || [];

  React.useEffect(() => {
    if (id && property) {
      const initialFormValues = {};
      formDetails.forEach((field) => {
        if (field.type === "date") {
          initialFormValues[field.key] = property[field.key]
            ? property[field.key].split("T")[0]
            : "";
        } else {
          initialFormValues[field.key] = property[field.key] || "";
        }
      });

      setFormValues(initialFormValues);
    }
  }, [id, property]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    formDetails.forEach((field) => {
      const errorMessage = validateField(field, formValues[field.key]);
      if (errorMessage) {
        errors[field.key] = errorMessage;
      }
    });

    if (!landlordId) {
      setError(true);
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = id
          ? await createProperty({
              ...formValues,
              LandlordId: landlordId || id,
            }).unwrap()
          : await createProperty({
              ...formValues,
              LandlordId: landlordId || id,
            }).unwrap();

        navigate(`/add/property/${response.property.id}`);
        setActiveTab(2);

        // showNotification(response.message, "success");
      } catch (error) {
        console.log(error);
        // showNotification(error.response.data.error, "error");
      }
    }

    // Handle form submission (e.g., send data to server)
  };

  if (landLords.length === 0) {
    return (
      <div>
        <SmallTitle>You don't have any landlord.</SmallTitle>

        <Button
          containerStyles={{
            textTransform: "uppercase",
          }}
          onClick={() => {
            navigate("/add/landlord");
          }}
        >
          Add landlord
        </Button>
      </div>
    );
  }

  return (
    <div>
      {createLoading && <Loader />}

      <FormContainer>
        <form onSubmit={handleSubmit}>
          {!id && (
            <FormGroup>
              <Label>Select landlord</Label>
              <Select
                error={error}
                value={landlordId}
                onChange={(e) => {
                  setLandlordId(e.target.value);
                  setError(false);
                }}
              >
                <option value="">Select an option</option>
                {landLords.map((landlord) => {
                  return (
                    <option key={landlord.id} value={landlord.id}>
                      {landlord.name}
                    </option>
                  );
                })}
              </Select>
              {error && <ErrorMessage>This field is required!</ErrorMessage>}
            </FormGroup>
          )}

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
              {field.type === "date" && (
                <Input
                  type="date"
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
          <Button type="submit">
            {createLoading ? "SUBMITTING..." : "CREATE PROPERTY"}
          </Button>
        </form>
      </FormContainer>
    </div>
  );
};

export default PropertyInformation;

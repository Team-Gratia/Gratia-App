/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import {
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
} from "../../app/api/api";

import Button from "../../components/Button";
import { ImBin } from "react-icons/im";
import { Loader } from "../../components";
import ProfileAvi from "../../components/Profile";
import React from "react";
import { validateField } from "../../utils";

const Text = styled.p`
  color: rgb(17 24 39);
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5rem;
  margin-top: 23px;
`;

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

const ImagePicker = styled.div`
  height: 90px;
  width: 90px;
  border-radius: 50%;
  background: #efefef;
  overflow: hidden;
  input {
    opacity: 0;
    height: 100%;
    width: 100%;
  }
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

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const countries = [
  { id: 1, name: "Nigeria" },
  { id: 2, name: "Mali" },
];

const states = [
  { id: 1, name: "Lagos" },
  { id: 2, name: "Abuja" },
];

const formDetails = [
  {
    id: 1,
    title: "Company Logo",
    key: "logo",
    type: "file",
    required: true,
    errors: [
      { id: 1, message: "This field is required!" },
      {
        id: 2,
        message: "The required formats are JPG, PNG, JPEG",
      },
    ],
  },
  {
    id: 2,
    title: "Corporate Name",
    key: "name",
    type: "input",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 3,
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
    id: 4,
    title: "WhatsApp Number",
    key: "whatsapp",
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
    id: 5,
    title: "Email Address",
    key: "email",
    type: "input",
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
    id: 6,
    title: "Website",
    key: "website",
    type: "input",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 7,
    title: "Address",
    key: "address",
    type: "input",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 8,
    title: "City",
    key: "city",
    type: "input",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 9,
    title: "State",
    key: "state",
    type: "select",
    options: states,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 10,
    title: "Country",
    key: "country",
    type: "select",
    options: countries,
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
  {
    id: 11,
    title: "Describe your company",
    key: "description",
    type: "input",
    required: true,
    errors: [{ id: 1, message: "This field is required!" }],
  },
];

const Profile = ({ business, setActiveTab }) => {
  const empty = Object.keys(business).length === 0;

  const [formValues, setFormValues] = React.useState({});

  const [formErrors, setFormErrors] = React.useState({});

  const [createBusiness, { isLoading }] = useCreateBusinessMutation();
  const [updateBusiness, { isLoading: loading }] = useUpdateBusinessMutation();

  React.useEffect(() => {
    if (!empty) {
      const initialFormValues = {};
      formDetails.forEach((field) => {
        initialFormValues[field.key] = business[field.key] || "";
      });
      setFormValues(initialFormValues);
    }
  }, [empty, business]);

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

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      console.log(key, formValues[key]);
      formData.append(key, formValues[key]);
    });

    try {
      await createBusiness(formData).unwrap();
      setActiveTab(1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditBusiness = async (e) => {
    e.preventDefault();

    const changedValues = {};
    Object.keys(formValues).forEach((key) => {
      if (formValues[key] !== business[key]) {
        changedValues[key] = formValues[key];
      }
    });

    if (Object.keys(changedValues).length === 1 && changedValues?.logo === "") {
      console.log("No changes detected");
      return;
    }

    delete changedValues["logo"];

    // console.log("Changes detected", changedValues);

    // const formData = new FormData();
    // Object.keys(changedValues).forEach((key) => {
    // formData.append(key, changedValues[key]);
    // });

    try {
      await updateBusiness(changedValues).unwrap();
      // const response = await updateBusiness(changedValues).unwrap();
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (field) => {
    // Remove the image from formValues
    const updatedFormValues = { ...formValues };
    delete updatedFormValues[field.key];
    setFormValues(updatedFormValues);
  };

  return (
    <div>
      {(loading || isLoading) && <Loader />}
      <Text>Profile</Text>
      <SmallText>Setup your company information here</SmallText>
      <FormContainer>
        <form onSubmit={!empty ? handleEditBusiness : handleSubmit}>
          {formDetails.map((field) => (
            <FormGroup
              key={field.id}
              className={`${field.id === 1 && "flex ai-center lg-gap"}`}
            >
              <Label>{field.title}</Label>
              {field.type === "input" && (
                <Input
                  type="text"
                  error={!!formErrors[field.key]}
                  value={formValues[field.key] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
              {field.type === "file" && empty && (
                <div className="flex ai-center lg-gap">
                  <ImagePicker className="mr">
                    {formValues[field.key] && (
                      <ImagePreview
                        src={URL.createObjectURL(formValues[field.key])}
                        alt="Preview"
                      />
                    )}
                    <Input
                      type="file"
                      name="logo"
                      error={!!formErrors[field.key]}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFormValues({
                          ...formValues,
                          [field.key]: file,
                        });
                        handleChange(field.id, file);
                      }}
                    />
                  </ImagePicker>
                  {formValues[field.key] && (
                    <ImBin
                      size={25}
                      color="red"
                      className="cursor"
                      onClick={() => handleDelete(field)}
                    />
                  )}
                </div>
              )}

              {field.type === "file" && !empty && (
                <div className="flex ai-center lg-gap">
                  <ProfileAvi big />
                  <ImBin
                    size={25}
                    color="red"
                    className="cursor"
                    onClick={() => handleDelete(field)}
                  />
                </div>
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
                      <option key={option.id} value={option.name}>
                        {option.name}
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
            disabled={isLoading}
            containerStyles={{
              width: "200px",
              padding: "14px 0",
              fontSize: "15px",
            }}
          >
            {!empty
              ? "UPDATE DETAILS"
              : isLoading
              ? "Submitting..."
              : "SAVE DETAILS"}
          </Button>
        </form>
      </FormContainer>
    </div>
  );
};

export default Profile;

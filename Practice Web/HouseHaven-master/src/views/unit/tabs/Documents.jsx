import { MdAdd, MdRemove } from "react-icons/md";
import styled, { css } from "styled-components";
import {
  useGetPropertyDocumentsQuery,
  useGetPropertyQuery,
  useUploadPropertyDocumentsMutation,
} from "../../../app/api/api";

import Button from "../../../components/Button";
import { FaFileAlt } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import { Loader } from "../../../components";
import React from "react";
import { useParams } from "react-router-dom";

const ImagePicker = styled.div`
  width: 210px;
  padding: 20px;
  border: 2px dashed #e2eef4;
  border-radius: 4px;
  background: #f1f3f6;
  position: relative;
  margin-top: 20px;

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

const FormGroup = styled.div`
  margin-top: 10px;
  width: 390px;
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

const Textarea = styled.textarea`
  ${inputStyles}
`;

const Description = styled.p`
  font-size: 0.775rem;
  color: rgb(107 114 128);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 80px;
  margin-left: 5px;
`;

const Documents = () => {
  const [fileInputs, setFileInputs] = React.useState([
    { id: 1, file: null, description: "" },
  ]);
  const { id } = useParams();
  const [uploadPropertyDocuments, { isLoading }] =
    useUploadPropertyDocumentsMutation();

  const { data: propertyData } = useGetPropertyQuery({
    businessId: 1,
    propertyId: id,
  });
  const property = propertyData?.property;

  const { data } = useGetPropertyDocumentsQuery(id);

  const documents = React.useMemo(() => {
    return data?.documents || [];
  }, [data]);

  const handleAddFileInput = () => {
    if (fileInputs.length < 5) {
      const newId = fileInputs.length + 1;
      setFileInputs([
        ...fileInputs,
        { id: newId, file: null, description: "" },
      ]);
    }
  };

  const handleRemoveFileInput = (id) => {
    if (fileInputs.length > 1) {
      const filteredInputs = fileInputs.filter((input) => input.id !== id);
      setFileInputs(filteredInputs);
    }
  };

  const handleFileChange = (event, id) => {
    if (!event.target.files[0]) {
      return;
    }
    const updatedInputs = fileInputs.map((input) =>
      input.id === id ? { ...input, file: event.target.files[0] } : input
    );
    setFileInputs(updatedInputs);
  };

  const handleDescriptionChange = (event, id) => {
    const updatedInputs = fileInputs.map((input) =>
      input.id === id ? { ...input, description: event.target.value } : input
    );
    setFileInputs(updatedInputs);
  };

  const handleUploadDocuments = async () => {
    const selectedDocuments = fileInputs.filter((input) => input.file !== null);
    if (selectedDocuments.length === 0) {
      alert("Please upload at least one document.");
      // setFileInputs([{ id: 1, file: null, description: "" }]);

      return;
    }

    const formData = new FormData();
    selectedDocuments.forEach((input) => {
      formData.append("documents", input.file);
      formData.append("descriptions", input.description);
    });

    await uploadPropertyDocuments({ formData, id }).unwrap();
    setFileInputs([{ id: 1, file: null, description: "" }]);
  };

  return (
    <div>
      {isLoading && <Loader />}

      <h4 className="mb">{property?.name || "Your"} Documents</h4>
      <div key={document.id} className="flex md-gap">
        {documents.map((document) => {
          return (
            <div key={document.id}>
              <div>
                <FaFileAlt size={38} color="#7da4cb" />
              </div>
              <Description>{document.description}</Description>
            </div>
          );
        })}
      </div>
      {fileInputs.map((input, index) => (
        <div key={input.id}>
          <div className="flex ai-center lg-gap">
            <ImagePicker className="flex sm-gap ai-center">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, input.id)}
              />
              <ImUpload size={20} color="#7bb7f2" />
              <p>Click here to upload</p>
            </ImagePicker>
            {input.file && (
              <div className="mt" style={{ minWidth: "100px" }}>
                <div style={{ marginLeft: "-4px" }}>
                  <FaFileAlt size={30} color="#7da4cb" />
                </div>
                <p
                  style={{
                    color: "rgb(107 114 128)",
                    fontSize: "10px",
                    marginTop: "-1px",
                  }}
                >
                  {input.file.name}
                </p>
              </div>
            )}
          </div>
          <FormGroup>
            <Label>Description</Label>
            <Textarea
              value={input.description}
              onChange={(e) => handleDescriptionChange(e, input.id)}
            />
          </FormGroup>
          {index === fileInputs.length - 1 && (
            <div>
              <Button
                sec
                icon
                onClick={() => handleRemoveFileInput(input.id)}
                containerStyles={{
                  marginTop: "10px",
                  background: "",
                  // padding: "10px 15px",
                  color: "",
                }}
              >
                <MdRemove size={17} />
              </Button>
              <Button
                sec
                onClick={handleAddFileInput}
                containerStyles={{
                  marginTop: "10px",
                  // padding: "10px 15px",
                }}
              >
                <MdAdd size={17} />
              </Button>
            </div>
          )}
        </div>
      ))}
      <Button
        onClick={handleUploadDocuments}
        containerStyles={{
          marginTop: "20px",
          padding: "15px 10px",
          fontSize: "15px",
        }}
      >
        UPLOAD DOCUMENTS
      </Button>
    </div>
  );
};

export default Documents;

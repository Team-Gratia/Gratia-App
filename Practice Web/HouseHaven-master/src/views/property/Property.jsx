import Button from "../../components/Button";
import { Card } from "../../components";
import Pagination from "../../components/Pagination";
import React from "react";
import Table from "../../components/Table";
import { useGetPropertiesQuery } from "../../app/api/api";
import { useNavigate } from "react-router-dom";

const Property = () => {
  //

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = React.useState(1);

  const { data } = useGetPropertiesQuery({
    businessId: 1,
    page: currentPage,
    pageSize: 10,
  });

  const tableHeader = [
    { id: 1, name: "Name", key: "name" },
    { id: 2, name: "Rent cost", key: "rentalCost" },
    { id: 3, name: "Property Type", key: "propertyType" },
    { id: 4, name: "Join Date", key: "startDate" },
    { id: 5, name: "City", key: "city" },
    { id: 6, name: "", key: "action" },
  ];

  const tableBody = data?.items || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // refetch();
  };

  return (
    <div>
      <div>
        <Card />
      </div>
      <div>
        <h2>Properties ({data?.totalItems || 0})</h2>

        <Button
          containerStyles={{
            textTransform: "uppercase",
            marginTop: "17px",
          }}
          onClick={() => {
            navigate("/add/property");
          }}
        >
          Add property
        </Button>

        <Table tableKey tableHeader={tableHeader} tableBody={tableBody} />
        {tableBody.length > 0 && (
          <Pagination
            paginationData={data}
            onPageChange={(page) => {
              handlePageChange(page);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Property;

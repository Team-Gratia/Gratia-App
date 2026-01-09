import Button from "../../components/Button";
import { Card } from "../../components";
import Pagination from "../../components/Pagination";
import Profile from "../../components/Profile";
import React from "react";
import Table from "../../components/Table";
import { useGetTenantsQuery } from "../../app/api/api";
import { useNavigate } from "react-router-dom";

const Tenants = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = React.useState(1);

  const { data } = useGetTenantsQuery({
    businessId: 1,
    page: currentPage,
    pageSize: 10,
  });

  const tableHeader = [
    { id: 1, name: "Name", key: "name" },
    { id: 2, name: "Phone", key: "phone" },
    { id: 2, name: "email", key: "email" },
    { id: 3, name: "Salutation", key: "salutation" },
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
        {/* <Cards /> */}
        <Card tenant />
      </div>
      <div>
        <h2> Tenants ({data?.totalItems || 0})</h2>

        <Button
          onClick={() => {
            navigate("/add/tenant");
          }}
          containerStyles={{
            textTransform: "uppercase",
            marginTop: "17px",
          }}
        >
          Add Tenant
        </Button>

        <Table tableHeader={tableHeader} tableBody={tableBody} />
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

export default Tenants;

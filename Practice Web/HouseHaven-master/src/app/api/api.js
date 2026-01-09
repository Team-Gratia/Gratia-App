import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const HouseHaven = createApi({
  reducerPath: "houseHaven",
  tagTypes: ["PropertyImages", "PropertyDocuments"], // Add this line to define tag types
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4005/api/v1" }),
  endpoints: (builder) => {
    return {
      //
      createBusiness: builder.mutation({
        query: (business) => {
          return {
            url: "/create/business",
            method: "POST",
            body: business,
          };
        },
      }),

      getBusiness: builder.query({
        query: () => {
          return {
            url: "/business/1",
            method: "GET",
          };
        },
      }),

      createLandLord: builder.mutation({
        query: (landlord) => {
          return {
            url: "/create/landlord",
            method: "POST",
            body: landlord,
          };
        },
      }),

      getLandlords: builder.query({
        query: () => {
          return {
            url: "/business/1/landlord",
            method: "GET",
          };
        },
      }),

      createProperty: builder.mutation({
        query: (property) => {
          return {
            url: "/create/property",
            method: "POST",
            body: property,
          };
        },
      }),

      getProperties: builder.query({
        query: ({ businessId, page = 1, pageSize = 10, searchTerm = "" }) => {
          return {
            url: `/business/${businessId}/properties?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`,
            method: "GET",
          };
        },
      }),

      getProperty: builder.query({
        query: ({ businessId, propertyId }) => {
          return {
            url: `/business/${businessId}/property/${propertyId}`,
            method: "GET",
          };
        },
      }),

      createTenant: builder.mutation({
        query: (tenant) => {
          return {
            url: "/create/tenant",
            method: "POST",
            body: tenant,
          };
        },
      }),

      getTenants: builder.query({
        query: () => {
          return {
            url: "/business/1/tenants",
            method: "GET",
          };
        },
      }),

      updateBusiness: builder.mutation({
        query: (business) => {
          return {
            url: "/business/1",
            method: "PUT",
            body: business,
          };
        },
      }),

      createUnit: builder.mutation({
        query: (unit) => {
          return {
            url: "/create/unit",
            method: "POST",
            body: unit,
          };
        },
      }),

      uploadPropertyImages: builder.mutation({
        query: ({ formData, id }) => {
          return {
            url: `/upload/${id}/images`,
            method: "POST",
            body: formData,
          };
        },
        invalidatesTags: (result, error, { id }) => [
          { type: "PropertyImages", id },
        ],
      }),

      uploadPropertyDocuments: builder.mutation({
        query: ({ formData, id }) => {
          return {
            url: `/upload/${id}/documents`,
            method: "POST",
            body: formData,
          };
        },
        invalidatesTags: (result, error, { id }) => [
          { type: "PropertyDocuments", id },
        ],
      }),

      getPropertyImages: builder.query({
        query: (id) => {
          return { url: `/property/${id}/images`, method: "GET" };
        },
        providesTags: (result, error, id) => [{ type: "PropertyImages", id }],
      }),

      getPropertyDocuments: builder.query({
        query: (id) => {
          return { url: `/property/${id}/documents`, method: "GET" };
        },
        providesTags: (result, error, id) => [
          { type: "PropertyDocuments", id },
        ],
      }),

      getAllUnits: builder.query({
        query: () => {
          return { url: `/all/units`, method: "GET" };
        },
      }),
    };
  },
});

export const {
  useCreateBusinessMutation,
  useCreateLandLordMutation,
  useGetBusinessQuery,
  useGetPropertyImagesQuery,
  useGetLandlordsQuery,
  useCreatePropertyMutation,
  // useGetBusinessLogoQuery,
  useGetPropertiesQuery,
  useCreateTenantMutation,
  useGetTenantsQuery,
  useUpdateBusinessMutation,
  useCreateUnitMutation,
  useUploadPropertyImagesMutation,
  useUploadPropertyDocumentsMutation,
  useGetPropertyQuery,
  useGetPropertyDocumentsQuery,
  useGetAllUnitsQuery,
} = HouseHaven;

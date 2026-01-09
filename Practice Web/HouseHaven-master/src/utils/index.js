const validateField = (field, value) => {
  if (field.required && !value) {
    return field.errors.find((error) => error.id === 1).message;
  }

  if (field.title === "Phone" || field.title === "WhatsApp Number") {
    if (!/^\d+$/.test(value)) {
      return field.errors.find((error) => error.id === 3).message;
    }
    if (value.length !== 11) {
      return field.errors.find((error) => error.id === 2).message;
    }
  }

  if (
    field.type === "input" &&
    field.title === "Email Address" &&
    !/\S+@\S+\.\S+/.test(value)
  ) {
    return field.errors.find((error) => error.id === 2).message;
  }

  if (
    field.type === "file" &&
    field.title === "Company Logo" &&
    value &&
    !["image/jpeg", "image/png", "image/jpg"].includes(value.type)
  ) {
    console.log(field, value);
    return field.errors.find((error) => error.id === 2).message;
  }

  if (
    field.title === "Rental Cost" ||
    field.title === "Selling Price" ||
    field.title === "Rent" ||
    field.title === "Bedrooms" ||
    field.title === "Commission" ||
    field.key === "budget"
  ) {
    if (isNaN(value)) {
      return field.errors[1].message;
    }
  }

  return null;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const formatNumber = (number) => {
  return Number(number).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export { validateField, formatDate, formatNumber };

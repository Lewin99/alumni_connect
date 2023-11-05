export const saveuserErrorHandler = (error) => {
  console.error("Error in saveuserErrorHandler:", error);

  let errors = { email: "", password: "" };

  if (error.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  if (error.name === "ValidationError") {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }

  return {
    message:
      "Oops! Something went wrong. Please try again later or contact support.",
  };
};

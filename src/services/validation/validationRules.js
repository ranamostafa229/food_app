export const getRequiredMessage = (filedName) => `${filedName} is required`;

export const getValidationRules = (watch = null, selectedCategory = "") => {
  return {
    userName: {
      required: getRequiredMessage("Username"),
      pattern: {
        value: /^[a-zA-Z]+[0-9]+$/i,
        message:
          "The userName must contain characters and end with numbers without spaces.",
      },
    },
    email: {
      required: getRequiredMessage("Email"),
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
        message: "Email is not valid",
      },
    },
    phoneNumber: {
      required: getRequiredMessage("Phone Number"),
      pattern: {
        value: /^0\d{10}$/,
        message: "Phone number is not valid",
      },
    },
    password: {
      required: getRequiredMessage("Password"),
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/i,
        message:
          "Password must include one lowercase letter, one uppercase letter, one digit, and one special character",
      },
    },
    confirmPassword: {
      required: getRequiredMessage("Confirm Password"),
      validate: (value) =>
        value === watch("password") || "The passwords do not match ",
    },
    country: {
      required: getRequiredMessage("Country"),
      pattern: {
        value: /^[a-zA-Z\s]+$/i,
        message: "Country must contain only letters and spaces.",
      },
    },
    category: {
      required: getRequiredMessage("Name"),
      validate: (value) => value !== selectedCategory || "No changes detected",
    },
  };
};

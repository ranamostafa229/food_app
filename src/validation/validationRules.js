export const getValidationRules = (watch) => {
  return {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
        message: "Email is not valid",
      },
    },
    password: {
      required: "Password is required",
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
      required: "Confirm Password is required",
      validate: (value) =>
        value === watch("password") || "The passwords do not match ",
    },
  };
};

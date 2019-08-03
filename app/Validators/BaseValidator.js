class BaseValidator {
  get validateAll() {
    return false;
  }

  get formatter() {
    return MyFormatter;
  }
  async fails(errorMessages) {
    return this.ctx.response.status(400).json(errorMessages);
  }
  get messages() {
    return {
      required: "The {{field}} field is required.",
      unique: "The {{field}} has already been taken.",
      max: "The {{field}} may not be greater than {{argument.0}}.",
      boolean: "The {{field}} field must be true or false.",
      in: "The selected {{field}} is invalid.",
      integer: "The {{field}} must be an integer.",
      number: "The {{field}} must be a number.",
      exists: "The {{field}} is not exists in the {{argument.0}} table.",
      phone: "The {{field}} is not valid {{argument.0}} phone number."
    };
  }
}

class MyFormatter {
  constructor() {
    this.errors = [];
  }

  addError(error, field, validation, args) {
    let message = error;

    if (error instanceof Error) {
      validation = "ENGINE_EXCEPTION";
      message = error.message;
    }

    this.errors.push({
      [field]: message
    });
  }

  // return null if no errors are present,
  // otherwise validate will be rejected with an empty
  // error
  toJSON() {
    return this.errors.length ? this.errors : null;
  }
}

module.exports = BaseValidator;

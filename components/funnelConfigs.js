export const funnelConfigs = {
  "roofing-v1pvcs": {
    heading: "Free Roofing Quotes",
    steps: [
      {
        key: "service",
        title: "What type of roofing service do you need?",
        type: "options",
        options: ["Install", "Replace", "Repair"],
      },
      {
        key: "homeowner",
        title: "Are you a Homeowner?",
        type: "options",
        options: ["Yes", "No"],
      },
      {
        key: "material",
        title: "What is your Roof Type?",
        type: "options",
        options: ["Asphalt", "Wood", "Tile/Clay", "Slate", "Metal", "Not Sure"],
      },
      commonZipStep(),
      commonAddressStep("roof"),
      commonEmailStep(),
      commonFirstNameStep(),
      commonLastNameStep(),
      commonPhoneStep(),
      commonVerificationStep(),
    ],
  },

  "windows-v1pvcs": {
    heading: "Free Window Quotes",
    steps: [
      {
        key: "service",
        title: "What type of window service do you need?",
        type: "options",
        options: ["Install", "Replace", "Repair"],
      },
      {
        key: "windowCount",
        title: "How many windows are involved?",
        type: "options",
        options: ["1-2", "3-5", "6-10", "10+"],
      },
      {
        key: "homeowner",
        title: "Are you a Homeowner?",
        type: "options",
        options: ["Yes", "No"],
      },
      commonZipStep(),
      commonAddressStep("windows"),
      commonEmailStep(),
      commonFirstNameStep(),
      commonLastNameStep(),
      commonPhoneStep(),
      commonVerificationStep(),
    ],
  },

  "solar-v1pvcs": {
    heading: "Free Solar Quotes",
    steps: [
      {
        key: "propertyType",
        title: "What type of property is this for?",
        type: "options",
        options: ["Single Family", "Townhome", "Condo", "Other"],
      },
      {
        key: "electricBill",
        title: "What is your average monthly electric bill?",
        type: "options",
        options: ["Under $100", "$100-$200", "$200-$300", "$300+"],
      },
      {
        key: "homeowner",
        title: "Are you a Homeowner?",
        type: "options",
        options: ["Yes", "No"],
      },
      commonZipStep(),
      commonAddressStep("solar panels"),
      commonEmailStep(),
      commonFirstNameStep(),
      commonLastNameStep(),
      commonPhoneStep(),
      commonVerificationStep(),
    ],
  },

  "bathroom-v1pvcs": {
    heading: "Free Bathroom Quotes",
    steps: [
      {
        key: "service",
        title: "What type of bathroom project do you need?",
        type: "options",
        options: ["Remodel", "Tub Replacement", "Shower Replacement", "Other"],
      },
      {
        key: "timeline",
        title: "How soon would you like to start?",
        type: "options",
        options: ["ASAP", "1-3 Months", "3-6 Months", "Just Researching"],
      },
      {
        key: "homeowner",
        title: "Are you a Homeowner?",
        type: "options",
        options: ["Yes", "No"],
      },
      commonZipStep(),
      commonAddressStep("bathroom project"),
      commonEmailStep(),
      commonFirstNameStep(),
      commonLastNameStep(),
      commonPhoneStep(),
      commonVerificationStep(),
    ],
  },

  "gutters-v1pvcs": {
    heading: "Free Gutter Quotes",
    steps: [
      {
        key: "service",
        title: "What type of gutter service do you need?",
        type: "options",
        options: ["Install", "Replace", "Repair"],
      },
      {
        key: "gutterType",
        title: "What type of gutters are you interested in?",
        type: "options",
        options: ["Seamless", "Sectional", "Guards", "Not Sure"],
      },
      {
        key: "homeowner",
        title: "Are you a Homeowner?",
        type: "options",
        options: ["Yes", "No"],
      },
      commonZipStep(),
      commonAddressStep("gutters"),
      commonEmailStep(),
      commonFirstNameStep(),
      commonLastNameStep(),
      commonPhoneStep(),
      commonVerificationStep(),
    ],
  },

  "hvac-v1pvcs": {
    heading: "Free HVAC Quotes",
    steps: [
      {
        key: "service",
        title: "What HVAC service do you need?",
        type: "options",
        options: ["Install", "Replace", "Repair"],
      },
      {
        key: "systemType",
        title: "What type of system is this for?",
        type: "options",
        options: ["Air Conditioner", "Furnace", "Heat Pump", "Not Sure"],
      },
      {
        key: "homeowner",
        title: "Are you a Homeowner?",
        type: "options",
        options: ["Yes", "No"],
      },
      commonZipStep(),
      commonAddressStep("HVAC work"),
      commonEmailStep(),
      commonFirstNameStep(),
      commonLastNameStep(),
      commonPhoneStep(),
      commonVerificationStep(),
    ],
  },

  "painting-v1pvcs": {
    heading: "Free Painting Quotes",
    steps: [
      {
        key: "service",
        title: "What type of painting project do you need?",
        type: "options",
        options: ["Interior", "Exterior", "Both"],
      },
      {
        key: "projectSize",
        title: "How large is the project?",
        type: "options",
        options: ["Small", "Medium", "Large", "Not Sure"],
      },
      {
        key: "homeowner",
        title: "Are you a Homeowner?",
        type: "options",
        options: ["Yes", "No"],
      },
      commonZipStep(),
      commonAddressStep("painting project"),
      commonEmailStep(),
      commonFirstNameStep(),
      commonLastNameStep(),
      commonPhoneStep(),
      commonVerificationStep(),
    ],
  },

  "siding-v1pvcs": {
    heading: "Free Siding Quotes",
    steps: [
      {
        key: "service",
        title: "What type of siding service do you need?",
        type: "options",
        options: ["Install", "Replace", "Repair"],
      },
      {
        key: "sidingType",
        title: "What siding type are you interested in?",
        type: "options",
        options: ["Vinyl", "Fiber Cement", "Wood", "Not Sure"],
      },
      {
        key: "homeowner",
        title: "Are you a Homeowner?",
        type: "options",
        options: ["Yes", "No"],
      },
      commonZipStep(),
      commonAddressStep("siding work"),
      commonEmailStep(),
      commonFirstNameStep(),
      commonLastNameStep(),
      commonPhoneStep(),
      commonVerificationStep(),
    ],
  },

  "walk-in-tubs-v1pvcs": {
    heading: "Free Walk-In Tub Quotes",
    steps: [
      {
        key: "service",
        title: "What type of project do you need?",
        type: "options",
        options: ["New Walk-In Tub", "Replacement", "Need Advice"],
      },
      {
        key: "mobilityNeed",
        title: "Is improved accessibility a priority?",
        type: "options",
        options: ["Yes", "No"],
      },
      {
        key: "homeowner",
        title: "Are you a Homeowner?",
        type: "options",
        options: ["Yes", "No"],
      },
      commonZipStep(),
      commonAddressStep("walk-in tub installation"),
      commonEmailStep(),
      commonFirstNameStep(),
      commonLastNameStep(),
      commonPhoneStep(),
      commonVerificationStep(),
    ],
  },
};

function commonZipStep() {
  return {
    key: "zip",
    title: "What is your zip code?",
    type: "input",
    placeholder: "Enter your zip code",
  };
}

function commonAddressStep(target) {
  return {
    key: "address",
    title: `Type below the home address where you want the ${target} to be installed`,
    type: "input",
    placeholder: "123 Main St, Springfield, IL 62701",
  };
}

function commonEmailStep() {
  return {
    key: "email",
    title: "What email address can our contractors reach you at?",
    type: "input",
    placeholder: "name@example.com",
  };
}

function commonFirstNameStep() {
  return {
    key: "firstName",
    title: "What’s your first name?",
    type: "input",
    placeholder: "John",
  };
}

function commonLastNameStep() {
  return {
    key: "lastName",
    title: "What’s your last name?",
    type: "input",
    placeholder: "Doe",
  };
}

function commonPhoneStep() {
  return {
    key: "phone",
    title: "What phone number should contractors call?",
    type: "input",
    placeholder: "(555) 555-5555",
  };
}

function commonVerificationStep() {
  return {
    key: "verificationCode",
    title: "Enter the Verification code that we have sent to your phone",
    type: "input",
    placeholder: "------",
  };
}
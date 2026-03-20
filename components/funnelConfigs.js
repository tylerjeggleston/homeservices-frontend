const SHARED_TCPA_CONSENT = `By clicking Submit, I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of use</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">privacy policy</a> and authorize up to <a href="/marketing-partners" target="_blank" rel="noopener noreferrer">4 home improvement companies, their contractors and partners</a> to contact me with offers about home improvement products or services by telephone calls, emails, artificial voice, and pre-recorded/text messages, using an automated telephone technology, to the number and email I provided above, even if my number is a mobile number or is currently listed on any state, federal or corporate Do Not Call list. I understand that my consent here is not a condition of purchase of any goods or services. Message and data rates may apply. <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">California Residents</a>. (or <a href="/do-not-sell-my-personal-information" target="_blank" rel="noopener noreferrer">Do Not Contact</a>).`;

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
        disqualifyOn: {
          values: ["No"],
          title: "Thank You!",
          message: "Our Roofing program is currently for homeowners only.",
        },
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
    heading: "Free Windows Quotes",
    steps: [
      {
        key: "service",
        title: "What type of window service do you need?",
        type: "options",
        options: ["Install", "Replace", "Repair"],
      },
      {
        key: "homeowner",
        title: "Are you a Homeowner?",
        type: "options",
        layout: "stack",
        options: ["Yes", "No"],
      },
      {
        key: "windowCount",
        title: "How many windows?",
        type: "options",
        layout: "stack",
        options: ["1-2", "3-5", "6-9", "10+"],
      },
      commonZipStep(),
      {
        key: "address",
        title: "Type below the home address where you want the window to be Installed",
        type: "input",
        placeholder: "Complete Address",
      },
      {
        key: "email",
        title: "What email address can our contractors reach you at?",
        type: "input",
        placeholder: "Enter email address",
      },
      {
        key: "firstName",
        title: "What's your first name?",
        type: "input",
        placeholder: "John",
      },
      {
        key: "lastName",
        title: "What's your last name?",
        type: "input",
        placeholder: "Doe",
      },
      {
        ...commonPhoneStep(),
        title: "What phone number can our contractors call you for a free quote?",
        placeholder: "e.g 7021234567",
      },
      commonVerificationStep(),
    ],
  },

  "solar-v1pvcs": {
  heading: "Free Solar Estimate",
  steps: [
    {
      key: "homeowner",
      title: "Are you a Homeowner?",
      type: "options",
      options: ["Yes", "No"],
      disqualifyOn: {
        values: ["No"],
        title: "Thank You!",
        message: "Our solar program is currently for homeowners only.",
      },
    },
    {
      key: "existingSolar",
      title: "Do you already have Solar Panels on the Roof of your Home?",
      type: "options",
      options: ["No", "Yes"],
    },
    {
      key: "roofSun",
      title: "How sunny is your roof area?",
      type: "options",
      layout: "stack",
      options: ["Full Sun", "Partial Shade", "Full Shade", "Not Sure"],
    },
    {
      key: "electricBill",
      title: "How much is your average monthly electric bill?",
      type: "range",
      min: 0,
      max: 1000,
      step: 5,
      defaultValue: 435,
      prefix: "$",
    },
    commonZipStep(),
    commonAddressStep("solar panels"),
    {
      key: "utilityCompany",
      title: "What is your electric utility company?",
      type: "select",
      placeholder: "Select utility company",
      searchPlaceholder: "Search utility company",
      dynamicOptionsFrom: "utilityLookup",
      options: [],
    },
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
      title: "What type of bathroom service do you need?",
      type: "options",
      layout: "stack",
      options: [
        "Full Bathroom Remodel",
        "Walk-In Tub",
        "Bath to shower conversion",
        "Bath/Shower Updates",
        "Bath Liner/Shower Enclosure",
        "Walk-In Shower",
      ],
    },
    // {
    //   key: "timeline",
    //   title: "How soon would you like to start?",
    //   type: "options",
    //   options: ["ASAP", "1-3 Months", "3-6 Months", "Just Researching"],
    // },
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
        key: "homeowner",
        title: "Are you a Homeowner?",
        type: "options",
        options: ["Yes", "No"],
      },
          {
        key: "gutterType",
        title: "What type of gutters are you interested in?",
        type: "options",
        options: ["Seamless Metal", "Copper", "Galvanized", "PVC", "Wood", "Not Sure"],
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
      key: "homeowner",
      title: "Are you a Homeowner?",
      type: "options",
      options: ["Yes", "No"],
    },
    {
      key: "hvacSystem",
      title: "Which HVAC system do you need help with?",
      type: "options",
      layout: "stack",
      options: [
        "Boiler",
        "Central A/C",
        "Ductless (mini-split) A/C",
        "Ducts/Vents",
        "Electric Furnace",
        "Gas Furnace",
        "Heat Pump",
        "Humidifier",
        "Oil Furnace",
        "Propane Furnace",
        "Radiant Floor Heating System",
        "Swamp Cooler",
        "Thermostat",
      ],
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
      title: "What type of painting service do you need?",
      type: "options",
      layout: "stack",
      options: [
        "Exterior Painting - Trim/Shutters",
        "Exterior Painting - Whole House",
        "Interior Painting - 1 to 2 Rooms",
        "Interior Painting - 3+ Rooms",
        "Paint/Stain - Deck/Fence/Porch",
        "Paint/Stain Exterior Door",
        "Paint/Stain Interior Door",
        "Painting - Faux Finishes",
      ],
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
      key: "homeowner",
      title: "Are you a Homeowner?",
      type: "options",
      options: ["Yes", "No"],
    },
    {
      key: "sidingMaterial",
      title: "Select the type of siding material you have:",
      type: "options",
      layout: "stack",
      options: [
        "Aluminum",
        "Brick or Stone",
        "Cement",
        "Metal",
        "Stucco",
        "Vinyl",
        "Wood",
      ],
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
      key: "homeowner",
      title: "Are you a Homeowner?",
      type: "options",
      options: ["Yes", "No"],
    },
      // {
      //   key: "service",
      //   title: "What type of project do you need?",
      //   type: "options",
      //   options: ["New Walk-In Tub", "Replacement", "Need Advice"],
      // },
      // {
      //   key: "mobilityNeed",
      //   title: "Is improved accessibility a priority?",
      //   type: "options",
      //   options: ["Yes", "No"],
      // },
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
    hasLinkedConsent: true,
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
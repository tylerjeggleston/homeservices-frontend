const SHARED_TCPA_CONSENT = `By clicking Submit, I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of use</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">privacy policy</a> and authorize up to <a href="/marketing-partners" target="_blank" rel="noopener noreferrer">4 home improvement companies, their contractors and partners</a> to contact me with offers about home improvement products or services by telephone calls, emails, artificial voice, and pre-recorded/text messages, using an automated telephone technology, to the number and email I provided above, even if my number is a mobile number or is currently listed on any state, federal or corporate Do Not Call list. I understand that my consent here is not a condition of purchase of any goods or services. Message and data rates may apply. <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">California Residents</a>. (or <a href="/do-not-sell-my-personal-information" target="_blank" rel="noopener noreferrer">Do Not Contact</a>).`;

export const funnelConfigs = {
  "roofing-v1pvcs": {
    heading: "Free Roofing Quotes",
    steps: [
      commonZipStep(),
      commonHomeTypeStep(),
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
      commonCreditStep(),
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
      commonZipStep(),
      commonHomeTypeStep(),
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
        disqualifyOn: {
          values: ["No"],
          title: "Thank you for checking!",
          message: "As of now, there aren't any offers available in your area.",
        },
      },
      {
        key: "windowCount",
        title: "How many windows?",
        type: "options",
        layout: "stack",
        options: ["1-2", "3-5", "6-9", "10+"],
      },
      commonCreditStep(),
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
  heading: "Find Out If Solar Makes Sense For Your Home",
  description: "We'll check your local utility rates, available solar programs, and whether your area is a good fit.",
  subtitle: "Takes about 30 seconds.",
  steps: [
    { ...commonZipStep(), title: "First, what ZIP code is the property located in?" },
    { ...commonHomeTypeStep(), subtitle: "Different home types have different solar requirements. This helps us determine whether solar may be a fit for your property." },
    {
      key: "homeowner",
      title: "Do you own the home?",
      description: "Solar programs are typically available to property owners.",
      type: "options",
      options: ["Yes", "No"],
      disqualifyOn: {
        values: ["No"],
        title: "Thank you for checking!",
        message: "As of now, there aren't any offers available in your area.",
      },
    },
    {
      key: "existingSolar",
      title: "Does your home already have solar panels?",
      description: "This helps us determine which solar options may be available for your property.",
      type: "options",
      defaultValue: "No",
      options: ["No", "Yes"],
      disqualifyOn: {
        values: ["Yes"],
        title: "Thank you for checking!",
        message: "This offer is only available for those who haven't gone solar yet.",
      },
    },
    {
      key: "utilityCompany",
      title: "Who provides your electricity?",
      description: "Utility rates vary significantly by provider. We'll use this to estimate how solar may compare to your current electricity costs.",
      type: "select",
      placeholder: "Select utility company",
      searchPlaceholder: "Search utility company",
      dynamicOptionsFrom: "utilityLookup",
      options: [],
    },
    {
      key: "electricBill",
      title: "About how much is your average monthly electric bill?",
      description: "We'll use this to estimate how solar compares to your current electricity costs.",
      type: "range",
      min: 0,
      max: 500,
      step: 5,
      defaultValue: 150,
      prefix: "$",
      markers: [0, 100, 200, 300, 400, 500],
      maxLabel: "$500+",
    },
    {
      key: "address",
      title: "What's the property address?",
      description: "We'll use satellite imagery to review roof size, shading, and solar potential.",
      type: "input",
      placeholder: "Enter property address",
    },
    {
      key: "roofSun",
      title: "Before we review your property, is your roof mostly sunny or mostly shaded?",
      type: "options",
      layout: "stack",
      options: [
        { label: "Mostly Sunny", value: "No Shade" },
        { label: "Some shade during the day", value: "Some Shade" },
        { label: "Heavy shade most of the day", value: "Full Shade" },
        { label: "Not sure", value: "Not Sure" },
      ],
    },
    {
      key: "creditRating",
      title: "Which best describes your credit profile?",
      description: "Financing options and available solar programs can vary based on credit profile.",
      type: "options",
      options: [
        { label: "Excellent (720+)", value: "Excellent" },
        { label: "Good (680-719)", value: "Good" },
        { label: "Fair (620-679)", value: "Fair" },
        { label: "Below 620", value: "Poor" },
      ],
    },
    { ...commonFirstNameStep(), title: "Who should this report go to?" },
    { ...commonLastNameStep(), title: "And your last name?" },
    {
      ...commonEmailStep(),
      title: "What email should we send it to?",
      pageHeading: "Your solar assessment is ready!",
      pageDescription: null,
      pageSubtitle: "",
      progressComplete: true,
    },
    {
      ...commonPhoneStep(),
      title: "What's the best number to reach you if your property appears to be a good fit for solar?",
      pageHeading: "Your property review is complete.",
      pageDescription: null,
      pageSubtitle: "",
      progressComplete: true,
    },
    commonVerificationStep(),
  ],
},

  "bathroom-v1pvcs": {
  heading: "Free Bathroom Quotes",
  steps: [
    commonZipStep(),
    commonHomeTypeStep(),
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
      disqualifyOn: {
        values: ["No"],
        title: "Thank you for checking!",
        message: "As of now, there aren't any offers available in your area.",
      },
    },
    commonCreditStep(),
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
      commonZipStep(),
      commonHomeTypeStep(),
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
        disqualifyOn: {
          values: ["No"],
          title: "Thank you for checking!",
          message: "As of now, there aren't any offers available in your area.",
        },
      },
      {
        key: "gutterType",
        title: "What type of gutters are you interested in?",
        type: "options",
        options: ["Seamless Metal", "Copper", "Galvanized", "PVC", "Wood", "Not Sure"],
      },
      commonCreditStep(),
      commonAddressStep("gutters"),
      commonEmailStep(),
      commonFirstNameStep(),
      commonLastNameStep(),
      commonPhoneStep(),
      commonVerificationStep(),
    ],
  },

  "hvac-v1pvcs": {
  heading: "Free A/C & Heating Inspection",
  steps: [
    { ...commonZipStep(), title: "What ZIP code should we check service availability for?" },
    commonHomeTypeStep(),
    {
      key: "service",
      title: "What HVAC service do you need?",
      type: "options",
      options: [
        "Install",
        "Replace",
        "Repair",
        "Free Inspection",
      ],
    },
    {
      key: "homeowner",
      title: "Do you own the home?",
      type: "options",
      options: ["Yes", "No"],
      disqualifyOn: {
        values: ["No"],
        title: "Thank you for checking!",
        message: "As of now, there aren't any offers available in your area.",
      },
    },
    {
      key: "hvacSystem",
      title: "Which HVAC system do you need help with?",
      type: "options",
      layout: "stack",
      options: [
        { label: "Air Conditioner", value: "Air Conditioner" },
        { label: "Heating System", value: "Heating System" },
        { label: "Both", value: "Both" },
      ],
    },
    { ...commonCreditStep(), title: "If repairs or replacement are needed, how would you describe your credit?" },
    { ...commonAddressStep("HVAC work"), title: "What address needs the A/C & Heating inspection?", hideLocationHint: true },
    { ...commonEmailStep(), title: "What email address should we use for your inspection?" },
    commonFirstNameStep(),
    commonLastNameStep(),
    { ...commonPhoneStep(), title: "What is the best number to reach you?" },
    commonVerificationStep(),
  ],
},

  "painting-v1pvcs": {
  heading: "Free Painting Quotes",
  steps: [
    commonZipStep(),
    commonHomeTypeStep(),
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
      disqualifyOn: {
        values: ["No"],
        title: "Thank you for checking!",
        message: "As of now, there aren't any offers available in your area.",
      },
    },
    commonCreditStep(),
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
    commonZipStep(),
    commonHomeTypeStep(),
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
      disqualifyOn: {
        values: ["No"],
        title: "Thank you for checking!",
        message: "As of now, there aren't any offers available in your area.",
      },
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
    commonCreditStep(),
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
      commonZipStep(),
      commonHomeTypeStep(),
      {
        key: "homeowner",
        title: "Are you a Homeowner?",
        type: "options",
        options: ["Yes", "No"],
        disqualifyOn: {
          values: ["No"],
          title: "Thank you for checking!",
          message: "As of now, there aren't any offers available in your area.",
        },
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
      commonCreditStep(),
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

function commonCreditStep() {
  return {
    key: "creditRating",
    title: "What's your estimated credit score?",
    type: "options",
    options: ["Excellent", "Good", "Fair", "Poor"],
  };
}

function commonHomeTypeStep() {
  return {
    key: "propertyType",
    title: "What Type Of Home Do You Live In?",
    type: "image-options",
    subtitle: "Select Your Response Below",
    options: [
      { label: "Single Family Home", icon: "🏠", image: "/single-family-home.webp" },
      { label: "Mobile Home", icon: "🚐", image: "/services/mobile-home.webp" },
      { label: "Apartment", icon: "🏢", image: "/services/apartment.webp" },
    ],
  };
}
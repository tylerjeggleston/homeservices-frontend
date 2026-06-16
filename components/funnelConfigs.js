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
    heading: "Get New Windows With No Upfront Cost",
    subtitle: "",
    steps: [
      commonZipStep(),
      commonHomeTypeStep(),
      {
        key: "service",
        title: "What's the biggest issue with your current windows?",
        type: "options",
        options: [
          { label: "Rooms get too hot or cold", value: "Rooms get too hot or cold" },
          { label: "High energy bills", value: "High energy bills" },
          { label: "Windows are damaged or outdated", value: "Windows are damaged or outdated" },
          { label: "Just exploring replacement options", value: "Just exploring replacement options" },
        ],
      },
      {
        key: "homeowner",
        title: "Are you the Homeowner?",
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
        title: "How many windows need to be fixed or replaced?",
        type: "options",
        layout: "stack",
        options: ["1-2", "3-5", "6-9", "10+"],
      },
      { ...commonCreditStep(), title: "If financing is needed, how would you rate your credit?" },
      {
        key: "address",
        title: "What is the property address?",
        type: "input",
        placeholder: "Complete Address",
        hideLocationHint: true,
      },
      {
        key: "email",
        title: "What email should we use for your window project?",
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
        title: "What's the best number for discussing your window project?",
        placeholder: "e.g 7021234567",
      },
      commonVerificationStep(),
    ],
  },

  "solar-v1pvcs": {
  heading: "Get Solar For No Upfront Cost!",
  description: null,
  subtitle: "It only takes 30 seconds.",
  steps: [
    {
      ...commonZipStep(),
      title: "What's your ZIP code?",
      pageHeading: "See if your home qualifies for the {state}No Cost Solar Program",
      pageSubtitle: "Not all areas qualify — check your ZIP code",
      nextLabel: "Check My Area →",
    },
    {
      key: "existingSolar",
      title: "Do you currently have solar panels installed?",
      description: "These programs are available for new installations only.",
      type: "options",
      defaultValue: "No",
      options: [
        { label: "No, not yet", value: "No" },
        { label: "Yes", value: "Yes" },
      ],
      pageHeading: "",
      pageSubtitle: "",
      disqualifyOn: {
        values: ["Yes"],
        title: "Thank you for checking!",
        message: "This offer is only available for those who haven't gone solar yet.",
      },
    },
    {
      key: "homeowner",
      title: "Do you own your home?",
      description: "Homeowners may qualify for no cost installation",
      type: "options",
      options: ["Yes", "No"],
      pageHeading: "",
      pageSubtitle: "",
      disqualifyOn: {
        values: ["No"],
        title: "Thank you for checking!",
        message: "As of now, there aren't any offers available in your area.",
      },
    },
    { ...commonHomeTypeStep(), pageHeading: "", pageSubtitle: "" },
    {
      key: "utilityCompany",
      title: "Who provides your electricity?",
      type: "select",
      placeholder: "Select utility company",
      searchPlaceholder: "Search utility company",
      dynamicOptionsFrom: "utilityLookup",
      options: [],
      pageHeading: "",
      pageSubtitle: "",
    },
    {
      key: "electricBill",
      title: "About how much is your average monthly electric bill?",
      type: "range",
      min: 0,
      max: 500,
      step: 5,
      defaultValue: 150,
      prefix: "$",
      markers: [0, 100, 200, 300, 400, 500],
      maxLabel: "$500+",
      pageHeading: "",
      pageSubtitle: "",
    },
    {
      key: "address",
      title: "Let's analyze your roof",
      description: "We use satellite imagery to estimate your home's solar potential",
      hideLocationHint: true,
      type: "input",
      placeholder: "Enter property address",
      pageHeading: "",
      pageSubtitle: "",
      nextLabel: "Analyze My Roof",
      showAnalyzing: true,
    },
    {
      key: "creditRating",
      title: "What's your approximate credit score?",
      description: "This helps us determine which programs you qualify for",
      type: "options",
      options: [
        { label: "Excellent", value: "Excellent" },
        { label: "Good", value: "Good" },
        { label: "Fair", value: "Fair" },
        { label: "Poor", value: "Poor" },
      ],
      pageHeading: "",
      pageSubtitle: "",
    },
    {
      key: "name",
      title: "Who should we prepare this estimate for?",
      description: "So we can personalize your savings results",
      type: "input",
      fields: [
        { key: "firstName", placeholder: "First Name" },
        { key: "lastName", placeholder: "Last Name" },
      ],
      pageHeading: "",
      pageSubtitle: "",
    },
    {
      ...commonEmailStep(),
      title: "What's your email?",
      progressComplete: true,
      pageHeading: "",
      pageSubtitle: "",
    },
    {
      ...commonPhoneStep(),
      title: "What's the best phone number to reach you?",
      pageHeading: "You're Almost Done!",
      pageDescription: null,
      pageSubtitle: "",
      progressComplete: true,
    },
    { ...commonVerificationStep(), pageHeading: "", pageSubtitle: "" },
  ],
},

  "bathroom-v1pvcs": {
  heading: "Free Bathroom Quotes",
  steps: [
    commonZipStep(),
    commonHomeTypeStep(),
    {
      key: "service",
      title: "What type of bathroom project are you considering?",
      type: "options",
      layout: "stack",
      options: [
        { label: "Walk-In Shower", value: "Walk-In Shower" },
        { label: "Bath to Shower Conversion", value: "Bath to Shower Conversion" },
        { label: "Full Bathroom Remodel", value: "Full Bathroom Remodel" },
        { label: "Bath/Shower Updates", value: "Bath/Shower Updates" },
        { label: "Walk-In Tub", value: "Walk-In Tub" },
        { label: "Not Sure / Need Recommendations", value: "Not Sure / Need Recommendations" },
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
      title: "Do you own the home?",
      type: "options",
      options: ["Yes", "No"],
      disqualifyOn: {
        values: ["No"],
        title: "Thank you for checking!",
        message: "As of now, there aren't any offers available in your area.",
      },
    },
    { ...commonCreditStep(), title: "If financing is needed, how would you rate your credit?" },
    { ...commonAddressStep("bathroom project"), title: "What is the property address for this bathroom project?", hideLocationHint: true },
    { ...commonEmailStep(), title: "What email address should we send your quotes to?" },
    commonFirstNameStep(),
    commonLastNameStep(),
    { ...commonPhoneStep(), title: "What's the best number to reach you?" },
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
    {
      key: "service",
      title: "To help with your free inspection, how would you describe your A/C or Heating system?",
      type: "options",
      options: [
        { label: "Not working properly", value: "Not working properly" },
        { label: "Working, but getting old", value: "Working, but getting old" },
        { label: "Just want a routine inspection", value: "Just want a routine inspection" },
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
    { ...commonCreditStep(), title: "If repairs or replacement are needed, how would you describe your credit?" },
    { ...commonAddressStep("HVAC work"), title: "What address needs the A/C or Heating inspection?", hideLocationHint: true },
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
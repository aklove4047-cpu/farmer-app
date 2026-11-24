export const schemesData = [
  {
    id: "pm-kisan",
    nameHi: "प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)",
    nameEn: "PM Kisan Samman Nidhi Yojana",
    category: "Financial Support (वित्तीय सहायता)",
    badge: "₹6,000 प्रति वर्ष",
    officialLink: "https://pmkisan.gov.in",
    descHi: "देश के सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की वित्तीय सहायता। यह राशि 3 समान किस्तों में सीधे बैंक खाते (DBT) में भेजी जाती है।",
    descEn: "Financial benefit of ₹6,000 per year in three equal installments directly into bank accounts of landholding farmer families.",
    eligibilityHi: [
      "सभी भूमिधारक किसान परिवार जिनके नाम कृषि भूमि दर्ज है",
      "ई-केवाईसी (e-KYC) पूर्ण होना अनिवार्य है",
      "बैंक खाता आधार और एनपीसीआई (NPCI) से लिंक होना चाहिए"
    ],
    eligibilityEn: [
      "All landholding farmer families with cultivable land in their name",
      "Mandatory e-KYC verification",
      "Bank account must be Aadhaar & NPCI mapped"
    ],
    documentsHi: ["आधार कार्ड", "जमीन की खतौनी / भूलेख नकल", "बैंक पासबुक", "मोबाइल नंबर (आधार लिंक्ड)"],
    documentsEn: ["Aadhaar Card", "Land Khatauni / Revenue records", "Bank Passbook", "Aadhaar-linked Mobile"],
    stepsHi: "pmkisan.gov.in पर जाएं > 'New Farmer Registration' पर क्लिक करें > आधार व मोबाइल नंबर दर्ज करें > खतौनी का विवरण भरें व सबमिट करें।"
  },
  {
    id: "pmfby",
    nameHi: "प्रधानमंत्री फसल बीमा योजना (PMFBY)",
    nameEn: "PM Fasal Bima Yojana",
    category: "Crop Insurance (फसल सुरक्षा)",
    badge: "न्यूनतम प्रीमियम दर",
    officialLink: "https://pmfby.gov.in",
    descHi: "सूखा, बाढ़, कीट प्रकोप या बेमौसम बारिश से फसल नष्ट होने पर वित्तीय सुरक्षा। खरीफ के लिए केवल 2%, रबी के लिए 1.5% और वाणिज्यिक फसलों के लिए 5% प्रीमियम।",
    descEn: "Comprehensive risk insurance for crop loss due to non-preventable natural risks from pre-sowing to post-harvest.",
    eligibilityHi: [
      "बटाईदार और पट्टेदार किसानों सहित सभी अधिसूचित क्षेत्रों के किसान",
      "फसल क्षति होने पर 72 घंटे के भीतर सूचना देना आवश्यक"
    ],
    eligibilityEn: [
      "All farmers including sharecroppers and tenant farmers growing notified crops",
      "Crop loss intimation within 72 hours of localized calamity"
    ],
    documentsHi: ["आधार कार्ड", "खसरा/खतौनी नकल", "फसल बुवाई स्व-घोषणा पत्र", "बैंक खाता विवरण"],
    documentsEn: ["Aadhaar Card", "Land Records (Khasra/Khatauni)", "Sowing Certificate / Declaration", "Bank Passbook"],
    stepsHi: "सीएससी (CSC) केंद्र या pmfby.gov.in पोर्टल पर जाकर अपनी फसल का बीमा कराएं। नुकसान होने पर टोल-फ्री 14447 पर 72 घंटे में कॉल करें।"
  },
  {
    id: "pm-kusum",
    nameHi: "पीएम कुसुम योजना (सोलर कृषि पंप सब्सिडी)",
    nameEn: "PM KUSUM Solar Pump Scheme",
    category: "Subsidy (सौर ऊर्जा सब्सिडी)",
    badge: "60% तक भारी सब्सिडी",
    officialLink: "https://pmkusum.mnre.gov.in",
    descHi: "किसानों को खेतों में सिंचाई के लिए सौर ऊर्जा से चलने वाले सोलर पंप स्थापित करने पर 60% तक सरकारी अनुदान और 30% बैंक ऋण सहायता।",
    descEn: "Up to 60% subsidy for setting up solar irrigation pumps, reducing electricity and diesel dependence.",
    eligibilityHi: [
      "व्यक्तिगत किसान, किसान समूह या एफपीओ (FPO)",
      "सिंचाई के लिए खेत में बोरवेल या जल स्रोत उपलब्ध होना चाहिए"
    ],
    eligibilityEn: [
      "Individual farmers, water user associations, FPOs",
      "Available water source (borewell/well) in agriculture field"
    ],
    documentsHi: ["आधार कार्ड", "जमीन के कागजात", "बैंक पासबुक", "बिजली कनेक्शन रसीद (यदि लागू हो)"],
    documentsEn: ["Aadhaar Card", "Land Ownership Proof", "Bank Details", "Electricity Bill (if grid pump)"],
    stepsHi: "राज्य के कृषि/ऊर्जा विभाग पोर्टल या pmkusum.mnre.gov.in पर ऑनलाइन आवेदन करें।"
  },
  {
    id: "kisan-credit-card",
    nameHi: "किसान क्रेडिट कार्ड (KCC)",
    nameEn: "Kisan Credit Card (KCC)",
    category: "Credit / Loan (सस्ता कृषि ऋण)",
    badge: "मात्र 4% ब्याज दर पर",
    officialLink: "https://agricoop.nic.in",
    descHi: "फसली ऋण ₹3 लाख तक केवल 4% प्रभावी वार्षिक ब्याज पर (समय पर भुगतान करने पर 3% की अतिरिक्त छूट)। बिना किसी बंधक (Collateral) के ₹1.60 लाख तक ऋण।",
    descEn: "Timely and hassle-free institutional credit up to ₹3 Lakh at an effective interest rate of 4% per annum.",
    eligibilityHi: [
      "सभी किसान (मालिक अथवा पट्टेदार/बटाईदार)",
      "पशुपालन और मत्स्य पालन करने वाले किसान भी पात्र हैं"
    ],
    eligibilityEn: [
      "All farmers (owner-cultivators, tenant farmers, oral lessees)",
      "Animal husbandry and fisheries farmers also eligible"
    ],
    documentsHi: ["केसीसी फॉर्म", "पहचान पत्र (आधार/वोटर आईडी)", "जमीन का पर्चा/खतौनी", "फसल बुवाई रिपोर्ट"],
    documentsEn: ["Filled KCC application form", "Identity proof", "Land revenue records", "Crop sowing certificate"],
    stepsHi: "निकटतम ग्रामीण बैंक या राष्ट्रीयकृत बैंक शाखा में जाएं अथवा बैंक मित्र/CSC से संपर्क करें।"
  },
  {
    id: "soil-health-card",
    nameHi: "मृदा स्वास्थ्य कार्ड योजना (Soil Health Card)",
    nameEn: "Soil Health Card Scheme",
    category: "Soil Health (नि:शुल्क मिट्टी जांच)",
    badge: "100% मुफ़्त जांच",
    officialLink: "https://soilhealth.dac.gov.in",
    descHi: "खेत की मिट्टी में 12 आवश्यक पोषक तत्वों (N, P, K, pH, Zinc, आदि) की जांच कर संतुलित खाद उपयोग की लिखित सिफारिश। खाद खर्च में 20% तक बचत।",
    descEn: "Free soil testing for 12 parameters to optimize chemical fertilizer use and improve soil fertility.",
    eligibilityHi: ["भारत का प्रत्येक किसान अपने खेत की मिट्टी का नि:शुल्क परीक्षण करा सकता है"],
    eligibilityEn: ["Every Indian farmer is eligible for free soil testing"],
    documentsHi: ["खेत की मिट्टी का नमूना (Sample)", "आधार कार्ड", "खसरा नंबर"],
    documentsEn: ["Soil sample from field", "Aadhaar Card", "Khasra Number"],
    stepsHi: "खेत से 15 सेमी गहराई से 'V' आकार में मिट्टी का नमूना लेकर निकटतम कृषि विज्ञान केंद्र (KVK) या कृषि कार्यालय में जमा करें।"
  }
];

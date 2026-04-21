/**
 * Thyrocare Health Offers Data
 */

export interface PackageOffer {
  id: string;
  name: string;
  testsCount: number;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  dualOffer?: string;
  tags: string[];
}

export const packages: PackageOffer[] = [
  {
    id: "executive-full-body",
    name: "Executive Full Body Health Checkup",
    testsCount: 127,
    description: "COMPLETE URINE ANALYSIS (24), TOXIC ELEMENTS (22), WELLNESS (4), COMPLETE HEMOGRAM (30), IRON DEFICIENCY (4), DIABETES (3), RENAL (10), LIPID (10), LIVER (12), ELECTROLYTES (3), THYROID (3), VITAMIN (2)",
    originalPrice: 3200,
    discountedPrice: 1579,
    discount: "50% off",
    dualOffer: "Rs. 1479 per person for 2 or more",
    tags: ["Bestseller", "Full Body"]
  },
  {
    id: "extensive-vitamins",
    name: "Extensive Checkup with 14 Vitamins",
    testsCount: 127,
    description: "CANCER MARKERS (1), CARDIAC RISK MARKERS (5), COMPLETE HEMOGRAM (28), URINOGRAM (10), DIABETES (3), ELECTROLYTES (2), METABOLIC (1), IRON DEFICIENCY (5), LIPID (10), LIVER (12), ELEMENTS (2), RENAL (7), THYROID (3), TOXIC ELEMENTS (22), PANCREATIC (2), VITAMINS (14)",
    originalPrice: 5500,
    discountedPrice: 2679,
    discount: "51% off",
    dualOffer: "Rs. 2479 per person for 2 or more",
    tags: ["Vitamin Boost", "Comprehensive"]
  },
  {
    id: "aarogyam-basic",
    name: "Aarogyam Basic",
    testsCount: 66,
    description: "Lipid (10), Thyroid (1), Diabetic (2), Iron Deficiency (4), CBC Hemogram (28), Kidney (7), Vitamin (2), Liver (12)",
    originalPrice: 1600,
    discountedPrice: 999,
    discount: "37% off",
    dualOffer: "Rs. 899 per person for 2 or more",
    tags: ["Essential"]
  },
  {
    id: "aarogyam-advanced",
    name: "Aarogyam Advanced",
    testsCount: 78,
    description: "Lipid (10), Thyroid (3), Diabetic (4), Iron Deficiency (4), Liver (12), CBC Hemogram (28), Kidney (8), Vitamin (2), Cardiac Risk Markers (5), Elements(2)",
    originalPrice: 2099,
    discountedPrice: 1589,
    discount: "24% off",
    dualOffer: "Rs. 1499 per person for 2 or more",
    tags: ["Risk Markers"]
  },
  {
    id: "aarogyam-male",
    name: "Aarogyam Male",
    testsCount: 103,
    description: "Cardiac Risk Markers (5), Complete Hemogram (28), Diabetics (2), Iron (4), Lipid Profile (10), Liver (12), Toxic Elements(22), Kidney (7), Thyroid Profile (3), Vitamin (3), Pancreatic (2), Electrolytes (3), Testosterone, Prostate Specific Antigen - PSA",
    originalPrice: 4000,
    discountedPrice: 2159,
    discount: "46% off",
    tags: ["Male Health"]
  },
  {
    id: "aarogyam-female",
    name: "Aarogyam Female",
    testsCount: 105,
    description: "Cardiac Risk Markers (5), Complete Hemogram (28), Diabetics (2), Iron (4), Lipid Profile (10), Liver (12), Toxic Elements(22), Luteinising Hormone - LH, Kidney (7), Thyroid Profile (3), Vitamin (3), Pancreatic (2), Electrolytes (3), Testosterone, Prolactin - PRL, Follicle Stimulating Hormone - FSH",
    originalPrice: 4200,
    discountedPrice: 2259,
    discount: "46% off",
    tags: ["Female Health"]
  },
  {
    id: "senior-citizen-male",
    name: "Senior Citizen Profile Male",
    testsCount: 127,
    description: "CANCER MARKERS (2), CARDIAC RISK MARKERS (5), COMPLETE HEMOGRAM (28), COMPLETE URINE ANALYSIS (24), DIABETES (3), ELECTROLYTES (2), IRON DEFICIENCY (5), LIPID (10), LIVER (12), PANCREATIC (2), RENAL (7), THYROID (3), TOXIC ELEMENTS (22), VITAMIN (2)",
    originalPrice: 4500,
    discountedPrice: 2399,
    discount: "46% off",
    tags: ["Senior Citizen", "Male"]
  },
  {
    id: "senior-citizen-female",
    name: "Senior Citizen Profile Female",
    testsCount: 127,
    description: "CANCER MARKERS (2), CARDIAC RISK MARKERS (5), COMPLETE HEMOGRAM (28), COMPLETE URINE ANALYSIS (24), DIABETES (3), ELECTROLYTES (2), IRON DEFICIENCY (5), LIPID (10), LIVER (12), PANCREATIC (2), RENAL (7), THYROID (3), TOXIC ELEMENTS (22), VITAMIN (2)",
    originalPrice: 4500,
    discountedPrice: 2399,
    discount: "46% off",
    tags: ["Senior Citizen", "Female"]
  },
  {
    id: "aarogyam-dual",
    name: "Aarogyam 1+1 Dual Offer",
    testsCount: 98,
    description: "Lipid (10), Thyroid (3), Diabetic (3), Iron Deficiency (4), Liver (12), Electrolytes(3), CBC Hemogram (28), Kidney (7), Infection (1), Vitamin (2), Urinogram(24), Hepatitis (1)",
    originalPrice: 5000,
    discountedPrice: 2998,
    discount: "40% off",
    tags: ["Couple Offer", "Dual"]
  },
  {
    id: "aarogyam-comprehensive",
    name: "Aarogyam Comprehensive",
    testsCount: 74,
    description: "Lipid (10), Thyroid (1), Diabetic (2), Urinogram(14), Liver (12), CBC Hemogram (28), Kidney (7)",
    originalPrice: 999,
    discountedPrice: 859,
    discount: "14% off",
    dualOffer: "Rs. 799 per person for 2 or more",
    tags: ["Budget Friendly"]
  },
  {
    id: "health-check-vitamins",
    name: "Complete Health Check with Vitamins",
    testsCount: 122,
    description: "CANCER MARKERS (1), CARDIAC RISK MARKERS (5), COMPLETE HEMOGRAM (28), COMPLETE URINE ANALYSIS (24), DIABETES (2), ELECTROLYTES (2), IRON DEFICIENCY (4), LIPID (10), LIVER (12), RENAL (7), THYROID (3), TOXIC ELEMENTS (22), VITAMINS (2)",
    originalPrice: 2599,
    discountedPrice: 1699,
    discount: "34% off",
    dualOffer: "Rs. 1599 per person for 2 or more",
    tags: ["Vitamins", "Routine"]
  },
  {
    id: "tax-saver-advanced",
    name: "Aarogyam Tax Saver Advanced",
    testsCount: 136,
    description: "Arthritis (2), Cardiac Risk Markers (7), CBC / Hemogram (28), Diabetics (6), Iron (5), Lipid (10), Liver (12), Urinogram (10), Misc(3), Kidney (10), Thyroid (3), Vitamin (12), Pancreatic (2), Electrolytes (2), Hormone (1), Toxic Elements (22), Metabolic(1)",
    originalPrice: 7000,
    discountedPrice: 4379,
    discount: "37% off",
    dualOffer: "Rs. 4279 per person for 2 or more",
    tags: ["Tax Benefit", "Comprehensive"]
  }
];

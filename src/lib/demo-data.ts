/**
 * Central demo data layer for KrishiRakshak AI.
 *
 * Every screen reads from this module. When a real backend (Lovable Cloud /
 * Supabase) is connected, each exported collection below maps 1:1 to a table
 * (users, farms, crops, crop_scans, disease_predictions, weather_data,
 * soil_data, pest_traps, pest_observations, outbreak_reports,
 * risk_predictions, expert_reviews, lab_referrals, advisories, followups,
 * notifications) and only the fetch layer needs to change.
 */

export type Role = "farmer" | "extension" | "expert" | "official";

export type RiskLevel = "low" | "moderate" | "high" | "critical";

export interface DemoUser {
  id: string;
  name: string;
  role: Role;
  title: string;
  location: string;
  avatar: string;
}

export const DEMO_USERS: Record<Role, DemoUser> = {
  farmer: {
    id: "u-farmer-01",
    name: "Ramesh Patil",
    role: "farmer",
    title: "Farmer · 4.2 acres",
    location: "Rampur, Nashik, Maharashtra",
    avatar: "RP",
  },
  extension: {
    id: "u-ext-01",
    name: "Sunita Deshmukh",
    role: "extension",
    title: "Extension Worker · Block 4",
    location: "Nashik Block 4, Maharashtra",
    avatar: "SD",
  },
  expert: {
    id: "u-exp-01",
    name: "Dr. A. Krishnan",
    role: "expert",
    title: "Plant Pathologist",
    location: "State Agriculture University",
    avatar: "AK",
  },
  official: {
    id: "u-off-01",
    name: "Vikram Singh",
    role: "official",
    title: "District Agriculture Officer",
    location: "Nashik District",
    avatar: "VS",
  },
};

export const ROLE_LABEL: Record<Role, string> = {
  farmer: "Farmer",
  extension: "Extension Worker",
  expert: "Agriculture Expert",
  official: "Agriculture Official",
};

export const riskLevelFromScore = (score: number): RiskLevel =>
  score >= 80 ? "critical" : score >= 65 ? "high" : score >= 40 ? "moderate" : "low";

export const RISK_STYLES: Record<RiskLevel, { label: string; dot: string; chip: string; text: string; bar: string }> = {
  low: {
    label: "Low",
    dot: "bg-risk-low",
    chip: "bg-risk-low/12 text-risk-low border-risk-low/25",
    text: "text-risk-low",
    bar: "bg-risk-low",
  },
  moderate: {
    label: "Moderate",
    dot: "bg-risk-moderate",
    chip: "bg-risk-moderate/15 text-risk-moderate border-risk-moderate/30",
    text: "text-risk-moderate",
    bar: "bg-risk-moderate",
  },
  high: {
    label: "High",
    dot: "bg-risk-high",
    chip: "bg-risk-high/15 text-risk-high border-risk-high/30",
    text: "text-risk-high",
    bar: "bg-risk-high",
  },
  critical: {
    label: "Critical",
    dot: "bg-risk-critical",
    chip: "bg-risk-critical/12 text-risk-critical border-risk-critical/30",
    text: "text-risk-critical",
    bar: "bg-risk-critical",
  },
};

/* ---------------------------------- farm --------------------------------- */

export const FARM = {
  id: "farm-1042",
  name: "Patil Farm",
  village: "Rampur",
  district: "Nashik",
  state: "Maharashtra",
  area: "4.2 acres",
  soil: "Medium black soil",
  irrigation: "Drip",
  coords: "20.0059° N, 73.7910° E",
  crop: "Tomato (Abhinav hybrid)",
  stage: "Flowering / early fruiting",
  sownOn: "12 July 2026",
  healthScore: 82,
  diseaseRisk: 71,
  pestRisk: 64,
  weatherRisk: 86,
  lastScan: "2 hours ago",
};

export const CROPS = ["Tomato", "Wheat", "Rice", "Cotton", "Onion", "Soybean"];
export const CROP_STAGES = [
  "Germination",
  "Vegetative",
  "Flowering",
  "Fruiting",
  "Maturity",
  "Harvest",
];

export const WEATHER = {
  temp: 29,
  humidity: 88,
  humidityNormal: 70,
  rainfall: 46,
  wind: 11,
  condition: "Humid · Intermittent showers",
  soilMoisture: 74,
  leafWetness: 9.4,
};

/* --------------------------------- scans --------------------------------- */

export interface Scan {
  id: string;
  crop: string;
  date: string;
  suspected: string;
  confidence: number;
  severity: string;
  affected: number;
  status: "Awaiting validation" | "Expert confirmed" | "Lab referred" | "Closed";
}

export const RECENT_SCANS: Scan[] = [
  {
    id: "SC-20941",
    crop: "Tomato",
    date: "Today, 14:20",
    suspected: "Early Blight",
    confidence: 91,
    severity: "Moderate",
    affected: 20,
    status: "Awaiting validation",
  },
  {
    id: "SC-20903",
    crop: "Tomato",
    date: "2 Sep, 09:05",
    suspected: "Leaf Curl Virus",
    confidence: 64,
    severity: "Low",
    affected: 8,
    status: "Lab referred",
  },
  {
    id: "SC-20844",
    crop: "Onion",
    date: "30 Aug, 17:40",
    suspected: "Purple Blotch",
    confidence: 88,
    severity: "Low",
    affected: 6,
    status: "Expert confirmed",
  },
];

export const AI_RESULT = {
  suspected: "Tomato Early Blight",
  pathogen: "Alternaria solani (suspected)",
  confidence: 91,
  severity: "Moderate",
  affected: 20,
  symptoms: [
    "Concentric dark rings on lower leaves",
    "Yellow halo surrounding lesions",
    "Lesion spread pattern from base upward",
    "Mild leaf curling at margins",
  ],
  causes: [
    "Prolonged leaf wetness (9.4 h/day)",
    "Humidity 18% above seasonal normal",
    "Dense canopy limiting air movement",
    "Previous blight reports within 4 km",
  ],
  alternatives: [
    { name: "Septoria Leaf Spot", probability: 6 },
    { name: "Bacterial Spot", probability: 3 },
  ],
};

/* ------------------------------ risk factors ----------------------------- */

export const RISK_SCORE = 87;

export const RISK_FACTORS = [
  { label: "Humidity", detail: "+18% above normal", weight: 24, value: 88 },
  { label: "Rainfall", detail: "High rainfall expected", weight: 21, value: 82 },
  { label: "Crop Stage", detail: "Highly susceptible stage", weight: 19, value: 78 },
  { label: "Historical Disease", detail: "Previously reported nearby", weight: 18, value: 71 },
  { label: "Pest Activity", detail: "Increasing", weight: 18, value: 66 },
];

export const FORECAST = [
  { day: "Today", disease: 42, pest: 30, weather: 48 },
  { day: "Tomorrow", disease: 58, pest: 38, weather: 62 },
  { day: "Day 3", disease: 71, pest: 49, weather: 74 },
  { day: "Day 4", disease: 86, pest: 61, weather: 88 },
  { day: "Day 5", disease: 91, pest: 70, weather: 90 },
];

/* --------------------------------- traps --------------------------------- */

export interface Trap {
  id: string;
  location: string;
  pests: number;
  trend: number;
  status: "Normal" | "Increasing" | "Critical" | "Offline";
  battery: number;
}

export const TRAPS: Trap[] = [
  { id: "Trap #01", location: "North Field", pests: 32, trend: 41, status: "Increasing", battery: 82 },
  { id: "Trap #02", location: "East Field", pests: 11, trend: 4, status: "Normal", battery: 91 },
  { id: "Trap #03", location: "South Boundary", pests: 27, trend: 22, status: "Increasing", battery: 66 },
  { id: "Trap #04", location: "West Block", pests: 48, trend: 63, status: "Critical", battery: 54 },
  { id: "Trap #05", location: "Nursery Shed", pests: 9, trend: -6, status: "Normal", battery: 78 },
  { id: "Trap #06", location: "Canal Side", pests: 16, trend: 12, status: "Normal", battery: 88 },
  { id: "Trap #07", location: "Orchard Edge", pests: 0, trend: 0, status: "Offline", battery: 12 },
  { id: "Trap #08", location: "Central Plot", pests: 0, trend: 0, status: "Offline", battery: 0 },
];

export const PEST_FEED = [
  { species: "Tomato Fruit Borer", count: 46, trend: "+38%", risk: "high" as RiskLevel, time: "12 min ago" },
  { species: "Whitefly", count: 39, trend: "+21%", risk: "moderate" as RiskLevel, time: "38 min ago" },
  { species: "Leaf Miner", count: 28, trend: "+9%", risk: "moderate" as RiskLevel, time: "1 h ago" },
  { species: "Aphid", count: 21, trend: "-4%", risk: "low" as RiskLevel, time: "2 h ago" },
  { species: "Thrips", count: 9, trend: "+2%", risk: "low" as RiskLevel, time: "3 h ago" },
];

export const PEST_WEEK = [
  { day: "Mon", count: 62 },
  { day: "Tue", count: 71 },
  { day: "Wed", count: 88 },
  { day: "Thu", count: 96 },
  { day: "Fri", count: 118 },
  { day: "Sat", count: 131 },
  { day: "Sun", count: 143 },
];

/* ------------------------------- hotspots -------------------------------- */

export interface Hotspot {
  id: string;
  village: string;
  crop: string;
  disease: string;
  pest: string;
  reports: number;
  score: number;
  trend: string;
  lastReported: string;
  worker: string;
  district: string;
  x: number; // % position on the schematic map
  y: number;
}

export const HOTSPOTS: Hotspot[] = [
  { id: "h1", village: "Rampur", crop: "Tomato", disease: "Early Blight", pest: "Fruit Borer", reports: 42, score: 91, trend: "+31%", lastReported: "1 h ago", worker: "S. Deshmukh", district: "Nashik", x: 34, y: 38 },
  { id: "h2", village: "Shivpur", crop: "Wheat", disease: "Yellow Rust", pest: "Aphid", reports: 27, score: 74, trend: "+18%", lastReported: "3 h ago", worker: "M. Jadhav", district: "Nashik", x: 58, y: 26 },
  { id: "h3", village: "Lakshmipur", crop: "Rice", disease: "Blast", pest: "Stem Borer", reports: 23, score: 69, trend: "+11%", lastReported: "5 h ago", worker: "P. Kale", district: "Dhule", x: 68, y: 58 },
  { id: "h4", village: "Ganeshwadi", crop: "Cotton", disease: "Leaf Curl", pest: "Whitefly", reports: 16, score: 52, trend: "+6%", lastReported: "9 h ago", worker: "R. Pawar", district: "Jalgaon", x: 24, y: 66 },
  { id: "h5", village: "Bhatwadi", crop: "Onion", disease: "Purple Blotch", pest: "Thrips", reports: 9, score: 34, trend: "-4%", lastReported: "1 d ago", worker: "S. Deshmukh", district: "Nashik", x: 46, y: 72 },
  { id: "h6", village: "Kolwadi", crop: "Tomato", disease: "Late Blight", pest: "Leaf Miner", reports: 31, score: 82, trend: "+24%", lastReported: "2 h ago", worker: "M. Jadhav", district: "Nashik", x: 78, y: 40 },
  { id: "h7", village: "Devgaon", crop: "Wheat", disease: "Powdery Mildew", pest: "Aphid", reports: 6, score: 28, trend: "0%", lastReported: "2 d ago", worker: "P. Kale", district: "Dhule", x: 16, y: 24 },
  { id: "h8", village: "Nandur", crop: "Rice", disease: "Sheath Blight", pest: "Plant Hopper", reports: 12, score: 44, trend: "+3%", lastReported: "14 h ago", worker: "R. Pawar", district: "Jalgaon", x: 52, y: 50 },
];

export const OUTBREAK_REPORTS = [
  { id: "OR-881", crop: "Tomato", suspicion: "Early Blight", village: "Rampur", distance: "0.8 km", when: "42 min ago", symptoms: "Dark concentric spots on lower leaves" },
  { id: "OR-879", crop: "Tomato", suspicion: "Early Blight", village: "Rampur", distance: "1.4 km", when: "2 h ago", symptoms: "Yellowing leaf margins, spots spreading" },
  { id: "OR-877", crop: "Tomato", suspicion: "Fruit Borer", village: "Kolwadi", distance: "3.2 km", when: "5 h ago", symptoms: "Bore holes near fruit calyx" },
  { id: "OR-871", crop: "Onion", suspicion: "Purple Blotch", village: "Bhatwadi", distance: "3.9 km", when: "9 h ago", symptoms: "Purple lesions on older leaves" },
  { id: "OR-864", crop: "Wheat", suspicion: "Yellow Rust", village: "Shivpur", distance: "6.1 km", when: "1 d ago", symptoms: "Yellow stripes along leaf veins" },
];

/* --------------------------- expert / lab / AI ---------------------------- */

export interface ExpertCase {
  id: string;
  farmerRef: string;
  crop: string;
  aiPrediction: string;
  confidence: number;
  village: string;
  submitted: string;
  symptoms: string;
  severity: string;
  state: "pending" | "confirmed" | "rejected" | "lab";
  expertDiagnosis?: string;
}

export const EXPERT_CASES: ExpertCase[] = [
  { id: "CS-4411", farmerRef: "Farmer #1042", crop: "Tomato", aiPrediction: "Early Blight", confidence: 91, village: "Rampur", submitted: "2 h ago", symptoms: "Concentric rings, lower-leaf yellowing", severity: "Moderate", state: "pending" },
  { id: "CS-4409", farmerRef: "Farmer #1188", crop: "Wheat", aiPrediction: "Yellow Rust", confidence: 58, village: "Shivpur", submitted: "4 h ago", symptoms: "Yellow stripes on leaf blades", severity: "High", state: "pending" },
  { id: "CS-4402", farmerRef: "Farmer #0977", crop: "Rice", aiPrediction: "Blast", confidence: 46, village: "Lakshmipur", submitted: "8 h ago", symptoms: "Spindle-shaped lesions", severity: "Moderate", state: "pending" },
  { id: "CS-4398", farmerRef: "Farmer #1301", crop: "Cotton", aiPrediction: "Leaf Curl Virus", confidence: 87, village: "Ganeshwadi", submitted: "1 d ago", symptoms: "Upward curling, vein thickening", severity: "High", state: "confirmed", expertDiagnosis: "Leaf Curl Virus" },
  { id: "CS-4390", farmerRef: "Farmer #1120", crop: "Tomato", aiPrediction: "Early Blight", confidence: 72, village: "Kolwadi", submitted: "1 d ago", symptoms: "Water-soaked lesions, rapid spread", severity: "High", state: "confirmed", expertDiagnosis: "Late Blight" },
  { id: "CS-4385", farmerRef: "Farmer #1055", crop: "Onion", aiPrediction: "Purple Blotch", confidence: 39, village: "Bhatwadi", submitted: "2 d ago", symptoms: "Tip dieback", severity: "Low", state: "rejected", expertDiagnosis: "Nutrient deficiency (non-pathogenic)" },
  { id: "CS-4377", farmerRef: "Farmer #0912", crop: "Rice", aiPrediction: "Sheath Blight", confidence: 41, village: "Nandur", submitted: "3 d ago", symptoms: "Irregular sheath lesions", severity: "Moderate", state: "lab" },
];

export const LAB_REFERRALS = [
  { id: "LR-2201", case: "CS-4409", crop: "Wheat", reason: "AI confidence below 60%", stage: 2, requested: "4 h ago", lab: "District Plant Health Lab, Nashik", result: null as string | null },
  { id: "LR-2198", case: "CS-4377", crop: "Rice", reason: "High-risk disease suspicion", stage: 3, requested: "3 d ago", lab: "State Agri University Lab", result: null },
  { id: "LR-2190", case: "CS-4362", crop: "Tomato", reason: "Conflicting expert opinions", stage: 4, requested: "6 d ago", lab: "District Plant Health Lab, Nashik", result: "Alternaria solani confirmed · moderate infection load" },
  { id: "LR-2184", case: "CS-4351", crop: "Cotton", reason: "Unusual symptom pattern", stage: 5, requested: "11 d ago", lab: "Regional Pathology Centre", result: "Bacterial blight confirmed · advisory issued and closed" },
];

export const LAB_STAGES = ["Requested", "Sample Collection", "Under Testing", "Result Available", "Closed"];

export const ACCURACY_TREND = [
  { month: "Mar", accuracy: 78, verified: 410 },
  { month: "Apr", accuracy: 81, verified: 620 },
  { month: "May", accuracy: 84, verified: 910 },
  { month: "Jun", accuracy: 86, verified: 1240 },
  { month: "Jul", accuracy: 89, verified: 1680 },
  { month: "Aug", accuracy: 91, verified: 2140 },
  { month: "Sep", accuracy: 93, verified: 2480 },
];

export const LEARNING_STATS = [
  { label: "AI Predictions", value: "18,420" },
  { label: "Expert Confirmations", value: "9,876" },
  { label: "Lab Confirmations", value: "1,204" },
  { label: "Incorrect Predictions", value: "1,338" },
];

export const CONFUSION = [
  { disease: "Early Blight", correct: 412, corrected: 38 },
  { disease: "Late Blight", correct: 288, corrected: 51 },
  { disease: "Yellow Rust", correct: 196, corrected: 24 },
  { disease: "Leaf Curl", correct: 174, corrected: 41 },
  { disease: "Blast", correct: 141, corrected: 33 },
];

/* ------------------------------- advisory -------------------------------- */

export const IPM_STEPS = [
  {
    tier: "1. Monitor",
    icon: "search",
    title: "Inspect 10 randomly selected plants",
    detail:
      "Scout lower leaves and inner canopy every 2 days. Record number of plants showing lesions to track spread rate before deciding on any intervention.",
  },
  {
    tier: "2. Cultural Control",
    icon: "sprout",
    title: "Reduce leaf wetness and canopy density",
    detail:
      "Irrigate at the base early in the day, improve spacing/staking for airflow, and avoid working in the field when foliage is wet.",
  },
  {
    tier: "3. Mechanical Control",
    icon: "scissors",
    title: "Remove heavily infected leaves where appropriate",
    detail:
      "Carefully remove and dispose of severely affected leaves away from the field. Clean tools between plants to limit spread.",
  },
  {
    tier: "4. Biological Control",
    icon: "bug",
    title: "Consider suitable biological options and trapping",
    detail:
      "Use recommended monitoring/trapping methods and consider approved biological control agents available through your local agriculture department.",
  },
  {
    tier: "5. Chemical Control",
    icon: "flask",
    title: "Only when monitoring shows it is warranted",
    detail:
      "If chemical treatment is warranted, consult approved local recommendations. Follow locally approved agricultural guidance and product labels.",
  },
];

/* ------------------------------ notifications ----------------------------- */

export interface Notification {
  id: string;
  type: "Disease Risk" | "Pest Outbreak" | "Weather Risk" | "Expert Response" | "Lab Result" | "Preventive Action";
  level: "critical" | "warning" | "update";
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export const NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "Pest Outbreak", level: "critical", title: "High pest activity detected near your farm", body: "Trap #04 (West Block) recorded 48 fruit borer captures, up 63% in 24 hours.", time: "18 min ago", read: false },
  { id: "n2", type: "Disease Risk", level: "warning", title: "Fungal disease risk rising over next 3 days", body: "Forecast risk moves from 58% to 86% by Day 4 due to humidity and rainfall.", time: "1 h ago", read: false },
  { id: "n3", type: "Weather Risk", level: "warning", title: "Heavy rainfall expected on Day 3–4", body: "46 mm forecast with prolonged leaf wetness. Plan field activity accordingly.", time: "3 h ago", read: false },
  { id: "n4", type: "Expert Response", level: "update", title: "Expert validated your submitted crop image", body: "Dr. A. Krishnan confirmed Purple Blotch on scan SC-20844 and issued an advisory.", time: "1 d ago", read: true },
  { id: "n5", type: "Lab Result", level: "update", title: "Laboratory result available", body: "LR-2190: Alternaria solani confirmed, moderate infection load.", time: "2 d ago", read: true },
  { id: "n6", type: "Preventive Action", level: "update", title: "Follow-up image due tomorrow", body: "Day 7 reassessment for advisory ADV-7741 on your tomato plot.", time: "2 d ago", read: true },
];

/* -------------------------------- timeline -------------------------------- */

export const TIMELINE = [
  { date: "Aug 28", title: "Normal", detail: "Farm health 89/100. No anomalies detected in scan or trap data.", tone: "low" as RiskLevel },
  { date: "Aug 30", title: "Pest activity increased", detail: "Trap captures rose 22%. Fruit borer flagged as emerging.", tone: "moderate" as RiskLevel },
  { date: "Sep 1", title: "Disease suspected", detail: "AI suspected Early Blight at 91% confidence on lower-leaf imagery.", tone: "high" as RiskLevel },
  { date: "Sep 2", title: "Expert validated", detail: "Dr. A. Krishnan confirmed Early Blight and released an IPM advisory.", tone: "high" as RiskLevel },
  { date: "Sep 3", title: "Preventive action", detail: "Canopy thinning and irrigation timing changed. Infected leaves removed.", tone: "moderate" as RiskLevel },
  { date: "Sep 4", title: "Risk decreased", detail: "Reassessment shows risk down from 87% to 51%. Monitoring continues.", tone: "low" as RiskLevel },
];

export const FOLLOWUP = {
  advisory: "ADV-7741",
  disease: "Early Blight (expert confirmed)",
  riskBefore: 87,
  riskNow: 51,
  steps: [
    { day: "Day 0", title: "Disease suspected", state: "done", detail: "Initial scan uploaded, AI suspicion recorded." },
    { day: "Day 3", title: "Upload another image", state: "done", detail: "Follow-up image submitted, affected area down to 12%." },
    { day: "Day 7", title: "Reassessment", state: "current", detail: "Due tomorrow. Upload lower-leaf image for progression check." },
    { day: "Day 14", title: "Closure review", state: "upcoming", detail: "Advisory closes if risk stays below 40%." },
  ],
  progression: [
    { day: "Day 0", risk: 87, affected: 20 },
    { day: "Day 3", risk: 74, affected: 16 },
    { day: "Day 5", risk: 62, affected: 13 },
    { day: "Day 7", risk: 51, affected: 12 },
  ],
};

/* -------------------------------- official -------------------------------- */

export const OFFICIAL_STATS = [
  { label: "Total Farms", value: "12,540", delta: "+124 this week" },
  { label: "Active Alerts", value: "327", delta: "+41 in 24 h" },
  { label: "High-Risk Zones", value: "18", delta: "+3 today" },
  { label: "Pending Validation", value: "42", delta: "avg 6 h wait" },
  { label: "Affected Villages", value: "36", delta: "+5 this week" },
];

export const DISEASE_DISTRIBUTION = [
  { name: "Early Blight", value: 34 },
  { name: "Yellow Rust", value: 22 },
  { name: "Leaf Curl", value: 18 },
  { name: "Blast", value: 15 },
  { name: "Others", value: 11 },
];

export const RISK_TREND = [
  { week: "W1", disease: 38, pest: 25 },
  { week: "W2", disease: 44, pest: 31 },
  { week: "W3", disease: 51, pest: 44 },
  { week: "W4", disease: 63, pest: 52 },
  { week: "W5", disease: 72, pest: 61 },
  { week: "W6", disease: 79, pest: 68 },
];

export const VILLAGE_CASES = [
  { village: "Rampur", cases: 42 },
  { village: "Kolwadi", cases: 31 },
  { village: "Shivpur", cases: 27 },
  { village: "Lakshmipur", cases: 23 },
  { village: "Ganeshwadi", cases: 16 },
  { village: "Nandur", cases: 12 },
];

export const CROP_CASES = [
  { crop: "Tomato", cases: 88 },
  { crop: "Wheat", cases: 54 },
  { crop: "Rice", cases: 47 },
  { crop: "Cotton", cases: 33 },
  { crop: "Onion", cases: 21 },
];

export const RESPONSE_TIME = [
  { month: "Apr", hours: 34 },
  { month: "May", hours: 29 },
  { month: "Jun", hours: 24 },
  { month: "Jul", hours: 19 },
  { month: "Aug", hours: 14 },
  { month: "Sep", hours: 11 },
];

/* ------------------------------- extension -------------------------------- */

export const PRIORITY_VISITS = [
  { rank: 1, village: "Rampur", risk: "critical" as RiskLevel, farms: 12, note: "Early Blight cluster, 42 reports", time: "09:30" },
  { rank: 2, village: "Shivpur", risk: "high" as RiskLevel, farms: 8, note: "Yellow rust spreading in wheat plots", time: "12:00" },
  { rank: 3, village: "Lakshmipur", risk: "high" as RiskLevel, farms: 6, note: "Rice blast suspicion, lab sample pending", time: "15:15" },
  { rank: 4, village: "Bhatwadi", risk: "moderate" as RiskLevel, farms: 4, note: "Routine follow-up on onion advisory", time: "17:00" },
];

export const EXTENSION_STATS = [
  { label: "Assigned Villages", value: "6" },
  { label: "Pending Farmer Cases", value: "23" },
  { label: "High-Risk Farms", value: "14" },
  { label: "Field Visits (week)", value: "31" },
  { label: "Expert Requests", value: "5" },
];

/* ------------------------- field intelligence ----------------------------- */

export const FIELD_LAYERS = [
  { key: "satellite", label: "Satellite vegetation health (NDVI)", value: 0, unit: "", available: false, note: "Cloud cover 84%" },
  { key: "ground", label: "Ground image health", value: 78, unit: "/100", available: true, note: "14 scans in last 7 days" },
  { key: "weather", label: "Weather intelligence", value: 62, unit: "/100", available: true, note: "Humidity 88%, rainfall 46 mm" },
  { key: "soil", label: "Soil moisture", value: 74, unit: "%", available: true, note: "Above optimal band" },
  { key: "pest", label: "Pest activity index", value: 66, unit: "/100", available: true, note: "+37% week over week" },
];

export const NDVI_HISTORY = [
  { week: "W1", ndvi: 0.68, ground: 84 },
  { week: "W2", ndvi: 0.71, ground: 86 },
  { week: "W3", ndvi: 0.66, ground: 81 },
  { week: "W4", ndvi: 0.61, ground: 79 },
  { week: "W5", ndvi: 0.0, ground: 78 },
];

/* -------------------------------- chatbot --------------------------------- */

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "bn", label: "বাংলা" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

export const ASSISTANT_GREETING: Record<LangCode, string> = {
  en: "Namaste! I am KrishiRakshak AI. Ask about crop symptoms, weather risk or advisories. I share AI suspicions, not confirmed diagnoses.",
  hi: "नमस्ते! मैं कृषिरक्षक AI हूँ। फसल के लक्षण, मौसम जोखिम या सलाह के बारे में पूछें। मैं केवल AI आधारित संभावना बताता हूँ, पुष्टि निदान नहीं।",
  mr: "नमस्कार! मी कृषीरक्षक AI आहे. पिकाची लक्षणे, हवामान धोका किंवा सल्ल्याबद्दल विचारा. मी फक्त AI शक्यता सांगतो, निश्चित निदान नाही.",
  bn: "নমস্কার! আমি কৃষিরক্ষক AI। ফসলের লক্ষণ, আবহাওয়ার ঝুঁকি বা পরামর্শ জিজ্ঞাসা করুন। আমি কেবল AI সন্দেহ জানাই, নিশ্চিত রোগনির্ণয় নয়।",
  ta: "வணக்கம்! நான் கிருஷிரக்ஷக் AI. பயிர் அறிகுறிகள், வானிலை ஆபத்து அல்லது ஆலோசனை பற்றி கேளுங்கள். நான் AI சந்தேகத்தை மட்டுமே தருகிறேன்.",
  te: "నమస్కారం! నేను కృషిరక్షక్ AI. పంట లక్షణాలు, వాతావరణ ప్రమాదం లేదా సలహా గురించి అడగండి. నేను AI అనుమానాన్ని మాత్రమే తెలియజేస్తాను.",
};

export const ASSISTANT_REPLY: Record<LangCode, string[]> = {
  en: [
    "Yellowing with spots on wheat often points to rust or a nutrient issue. Please send a clear photo of the leaf — I can run a preliminary symptom analysis.",
    "Based on your farm data (humidity 88%, susceptible stage), fungal risk is high for the next 3–5 days. Inspect lower leaves and monitor moisture.",
    "This is an AI suspicion only. Expert or laboratory confirmation is recommended before any chemical treatment. Follow locally approved guidance and product labels.",
  ],
  hi: [
    "गेहूं में पीले धब्बे अक्सर रस्ट या पोषक तत्व की कमी के कारण होते हैं। कृपया पत्ते की साफ तस्वीर भेजें। मैं लक्षणों का प्रारंभिक विश्लेषण कर सकता हूँ।",
    "आपके खेत के आंकड़ों के अनुसार (नमी 88%, संवेदनशील अवस्था) अगले 3–5 दिनों में फफूंद रोग का जोखिम अधिक है। निचली पत्तियों की जाँच करें।",
    "यह केवल AI आधारित संभावना है। किसी भी रासायनिक उपचार से पहले विशेषज्ञ या प्रयोगशाला पुष्टि कराएँ। स्थानीय स्वीकृत सिफारिशों का पालन करें।",
  ],
  mr: [
    "गव्हावर पिवळे डाग म्हणजे अनेकदा तांबेरा किंवा अन्नद्रव्य कमतरता. कृपया पानाचा स्पष्ट फोटो पाठवा, मी प्राथमिक विश्लेषण करू शकतो.",
    "तुमच्या शेताच्या माहितीनुसार (आर्द्रता 88%) पुढील 3–5 दिवसांत बुरशीजन्य रोगाचा धोका जास्त आहे. खालची पाने तपासा.",
    "ही केवळ AI शक्यता आहे. रासायनिक उपचारापूर्वी तज्ज्ञ किंवा प्रयोगशाळा पुष्टी आवश्यक आहे.",
  ],
  bn: [
    "গমে হলুদ দাগ প্রায়ই মরিচা রোগ বা পুষ্টির অভাব নির্দেশ করে। অনুগ্রহ করে পাতার একটি পরিষ্কার ছবি পাঠান।",
    "আপনার খামারের তথ্য অনুযায়ী (আর্দ্রতা ৮৮%) আগামী ৩–৫ দিনে ছত্রাক রোগের ঝুঁকি বেশি। নিচের পাতাগুলি পরীক্ষা করুন।",
    "এটি কেবল AI সন্দেহ। রাসায়নিক প্রয়োগের আগে বিশেষজ্ঞ বা ল্যাব নিশ্চিতকরণ নিন।",
  ],
  ta: [
    "கோதுமையில் மஞ்சள் புள்ளிகள் பெரும்பாலும் துரு நோய் அல்லது ஊட்டச்சத்து குறைபாட்டைக் குறிக்கும். இலையின் தெளிவான புகைப்படத்தை அனுப்பவும்.",
    "உங்கள் பண்ணை தரவின்படி (ஈரப்பதம் 88%) அடுத்த 3–5 நாட்களில் பூஞ்சை நோய் அபாயம் அதிகம். கீழ் இலைகளை பரிசோதிக்கவும்.",
    "இது AI சந்தேகம் மட்டுமே. வேதிப்பொருள் பயன்படுத்தும் முன் நிபுணர் உறுதிப்படுத்தல் அவசியம்.",
  ],
  te: [
    "గోధుమలో పసుపు మచ్చలు తరచుగా తుప్పు తెగులు లేదా పోషక లోపాన్ని సూచిస్తాయి. దయచేసి ఆకు స్పష్టమైన ఫోటో పంపండి.",
    "మీ పొలం డేటా ప్రకారం (తేమ 88%) రాబోయే 3–5 రోజుల్లో శిలీంధ్ర వ్యాధి ప్రమాదం ఎక్కువ. కింది ఆకులను పరిశీలించండి.",
    "ఇది AI అనుమానం మాత్రమే. రసాయన చికిత్సకు ముందు నిపుణుల నిర్ధారణ అవసరం.",
  ],
};

export const ASSISTANT_SUGGESTIONS: Record<LangCode, string[]> = {
  en: ["Why are there yellow spots on my wheat?", "What is my disease risk this week?", "How do I control fruit borer safely?"],
  hi: ["मेरी गेहूं की फसल में पीले दाग क्यों हैं?", "इस सप्ताह मेरा रोग जोखिम क्या है?", "फल छेदक कीट को सुरक्षित तरीके से कैसे रोकें?"],
  mr: ["माझ्या गव्हावर पिवळे डाग का आहेत?", "या आठवड्यात रोगाचा धोका किती?", "फळ पोखरणारी अळी कशी नियंत्रित करावी?"],
  bn: ["আমার গমে হলুদ দাগ কেন?", "এই সপ্তাহে রোগের ঝুঁকি কত?", "ফল ছিদ্রকারী পোকা কীভাবে নিয়ন্ত্রণ করব?"],
  ta: ["என் கோதுமையில் மஞ்சள் புள்ளிகள் ஏன்?", "இந்த வாரம் நோய் ஆபத்து என்ன?", "காய் துளைப்பானை எப்படி கட்டுப்படுத்துவது?"],
  te: ["నా గోధుమలో పసుపు మచ్చలు ఎందుకు?", "ఈ వారం వ్యాధి ప్రమాదం ఎంత?", "కాయ తొలుచు పురుగును ఎలా నియంత్రించాలి?"],
};

export const AI_DISCLAIMER =
  "AI-generated results are preliminary and should not replace expert or laboratory diagnosis.";

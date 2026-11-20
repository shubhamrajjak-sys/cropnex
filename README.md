# AgriGuard AI

Build a production-quality, responsive web application called “KrishiRakshak AI” for Smart India Hackathon (SIH) Problem Statement 26131.



TAGLINE:

“Detect Early. Predict Risk. Act Smart.”  



CORE PURPOSE:

Build an AI-powered crop-health early-warning and decision-support platform for farmers, extension workers, experts, and agriculture officials.



IMPORTANT:

This should NOT look like a generic AI chatbot or simple crop disease detection website. It must feel like a real agriculture technology platform with an impressive hackathon-ready dashboard, realistic workflows, interactive maps, charts, alerts, AI analysis, expert validation, and explainable recommendations.



==================================================

1. USER ROLES

==================================================



Create role-based interfaces:



A. FARMER

B. EXTENSION WORKER

C. AGRICULTURE EXPERT

D. AGRICULTURE OFFICIAL / ADMIN



Add a login/role selection screen.



For demo purposes, authentication can use mock/demo accounts. Structure the application so real authentication can be added later.



==================================================

2. FARMER DASHBOARD

==================================================



Create a modern farmer dashboard with:



- Farmer name

- Farm location

- Crop currently being monitored

- Crop growth stage

- Farm health score

- Current disease risk

- Pest activity

- Weather

- Alerts

- Recent scans

- Recommended actions



Dashboard cards:



Farm Health: 82/100

Disease Risk: Moderate

Pest Activity: Increasing

Weather Risk: High

Last Scan: 2 hours ago



Add prominent buttons:



[Scan Crop]

[Ask KrishiRakshak AI]

[View Risk Forecast]

[Report Pest/Disease]

[My Farm]



Use simple icons and multilingual-friendly UI.



==================================================

3. AI CROP IMAGE DETECTION

==================================================



Create a Crop Health Scanner page.



Allow:



- Upload image

- Drag and drop

- Camera capture UI

- Crop selection

- Crop stage selection

- Location



After upload, show an AI analysis screen with animated processing.



Result example:



Suspected Disease:

Tomato Early Blight



AI Confidence:

91%



Severity:

Moderate



Affected Area:

~20%



Show:



Symptoms detected

Possible causes

Confidence score

Recommended next step



IMPORTANT:

Do not claim diagnosis as certain.



Use wording such as:

“AI suspects Early Blight. Expert/laboratory confirmation is recommended before chemical treatment.”



Add:

[Request Expert Validation]



For the MVP, use realistic mock AI results if no actual computer vision API is connected.



Structure the code so a real AI vision model/API can be integrated later.



==================================================

4. EXPLAINABLE AI

==================================================



Create an “Why is my crop at risk?” section.



Example:



Risk Score: 87/100 HIGH



Reasons:



Humidity:

+18% above normal



Rainfall:

High rainfall expected



Crop Stage:

Highly susceptible stage



Historical Disease:

Previously reported nearby



Pest Activity:

Increasing



Show these factors using attractive charts/progress bars.



Add an “AI Explanation” card:



“Risk is high because humidity and rainfall conditions are favorable for fungal disease while your crop is currently in a susceptible growth stage.”



==================================================

5. EARLY WARNING SYSTEM

==================================================



Create a Disease & Pest Risk Forecast page.



Show 5-day forecast:



Today       42% 🟡

Tomorrow    58% 🟡

Day 3       71% 🟠

Day 4       86% 🔴

Day 5       91% 🔴



Show separate risk:



- Disease risk

- Pest risk

- Weather risk



Create line charts.



Add an Early Warning card:



“High probability of fungal infection within the next 3–5 days.”



Recommended action:



- Inspect lower leaves

- Monitor moisture

- Check nearby plants

- Avoid unnecessary pesticide application

- Contact extension worker if symptoms increase



==================================================

6. MULTI-SOURCE AI RISK ENGINE

==================================================



Create a visual “AI Risk Engine” page showing how different data sources contribute to risk.



Inputs:



1. Crop Image

2. Weather

3. Crop Stage

4. Crop Variety

5. Soil Condition

6. Pest Trap

7. Historical Disease Data

8. GPS Location

9. Satellite Vegetation Data



Display:



DATA SOURCES

      ↓

AI RISK ENGINE

      ↓

Disease Risk

Pest Risk

Yield Risk

      ↓

Recommended Action



Create an attractive interactive visualization.



==================================================

7. SMART PEST TRAP / IOT

==================================================



Create a Pest Monitoring page.



Show:



Connected Traps: 8

Active Sensors: 6

Pests Detected Today: 143

Weekly Change: +37%



Create individual trap cards:



Trap #01

Location: North Field

Pests detected: 32

Status: Increasing



Trap #02

Location: East Field

Pests detected: 11

Status: Normal



Add a simulated pest detection feed.



Show:



Pest Species

Count

Trend

Risk Level



Include a mock camera image area for trap monitoring.



Architecture visualization:



Pest Trap → Camera/Sensor → AI Pest Detection → Pest Count → Risk Engine → Farmer Alert



==================================================

8. COMMUNITY OUTBREAK INTELLIGENCE

==================================================



Create a community disease reporting system.



Farmers can submit:



- Crop

- Disease/pest suspicion

- Photo

- Location

- Symptoms

- Date



Aggregate reports anonymously.



Show:



Reports in last 72 hours

Active clusters

Affected villages

Disease trends



Example:



“Possible disease cluster detected.”



17 reports

Within 4 km

Last 72 hours



Create an interactive outbreak map.



Do NOT expose unnecessary personal information.



==================================================

9. GIS HOTSPOT MAP

==================================================



Create a full-screen interactive map for agriculture officials.



Use map visualization with:



🟢 Low Risk

🟡 Moderate Risk

🟠 High Risk

🔴 Critical



Show disease/pest hotspots.



Clicking a hotspot should open:



Village

Crop

Disease

Number of reports

Risk level

Trend

Last reported

Extension worker assigned



Add filters:



Crop

Disease

Pest

Date

Risk Level

District

Village



If a real map API is unavailable, create a realistic interactive map mockup using a suitable map library and sample coordinates.



==================================================

10. SATELLITE + GROUND DATA FUSION

==================================================



Create a “Field Intelligence” page.



Show:



Satellite vegetation health

Ground image health

Weather

Soil moisture

Pest activity



Important feature:



If satellite imagery is unavailable because of cloud cover, automatically show:



“Satellite data unavailable due to cloud cover.”



Then show:



“Ground + Weather + IoT intelligence active.”



Explain that the platform does not depend entirely on satellite imagery.



Create a Satellite/Ground Fusion score.



==================================================

11. WHAT-IF KRISHIRISK SIMULATOR

==================================================



This must be a standout feature.



Create a “KrishiRisk Simulator”.



Allow the user to modify:



- Rainfall

- Temperature

- Humidity

- Soil moisture

- Crop stage

- Pest population



Use sliders.



Example:



Current Risk:

42%



Increase humidity:

+20%



Predicted Risk:

68%



Increase pest population:

+30%



Predicted Risk:

81%



Show a dynamic graph.



Create scenarios:



“What if rainfall increases?”



“What if pest population doubles?”



“What if I take preventive action?”



“What if I delay intervention?”



Use simulated calculations for MVP.



==================================================

12. IPM RECOMMENDATION ENGINE

==================================================



Create a Smart Advisory page.



Recommendations must follow Integrated Pest Management principles.



Show:



1. MONITOR

2. CULTURAL CONTROL

3. MECHANICAL CONTROL

4. BIOLOGICAL CONTROL

5. CHEMICAL CONTROL ONLY WHEN NECESSARY



Example:



Step 1:

Inspect 10 randomly selected plants.



Step 2:

Remove heavily infected leaves where appropriate.



Step 3:

Use recommended monitoring/trapping methods.



Step 4:

Consider suitable biological control options.



Step 5:

If chemical treatment is warranted, consult approved local recommendations.



IMPORTANT SAFETY:

Do not invent pesticide names, doses, mixing instructions, or unsafe chemical recommendations.



For chemical advice, show:

“Follow locally approved agricultural guidance and product labels.”



==================================================

13. EXPERT VALIDATION SYSTEM

==================================================



Create an Expert Review dashboard.



Experts can see:



Pending Cases

Confirmed Cases

Rejected Cases

Lab Referrals



Each case contains:



Farmer submission

Crop image

AI prediction

Confidence

Location

Symptoms

Risk factors



Expert actions:



[Confirm]

[Correct Diagnosis]

[Reject]

[Refer to Laboratory]



When expert changes the diagnosis, show:



AI Prediction:

Disease A



Expert Confirmation:

Disease B



This becomes feedback data.



==================================================

14. LAB REFERRAL WORKFLOW

==================================================



Create a laboratory referral workflow.



If AI confidence is low or disease is high-risk:



Show:



“Laboratory confirmation recommended.”



Create status tracking:



Requested

Sample Collection

Under Testing

Result Available

Closed



Display lab result when available.



==================================================

15. LEARNING / FEEDBACK LOOP

==================================================



Create a page called:



“AI Learning Center”



Show:



AI Predictions

Expert Confirmations

Lab Confirmations

Incorrect Predictions

Model Accuracy Trend



Architecture:



AI Prediction

↓

Field Observation

↓

Expert/Lab Confirmation

↓

Verified Dataset

↓

Model Improvement



Use charts and statistics with realistic demo data.



==================================================

16. MULTILINGUAL AI FARMER ASSISTANT

==================================================



Create a chatbot called:



“KrishiRakshak AI”



Support:



English

Hindi

Marathi

Bengali

Tamil

Telugu



Add language selector.



The farmer can ask:



“मेरी गेहूं की फसल में पीले दाग क्यों हैं?”



The assistant should answer in the selected language.



Add:



🎤 Voice Input UI

🔊 Read Aloud UI

📷 Upload Crop Image



Example:



Farmer:

“मेरी फसल में पत्ते पीले हो रहे हैं।”



AI:

“कृपया पत्ते की साफ तस्वीर भेजें। मैं लक्षणों का प्रारंभिक विश्लेषण कर सकता हूँ।”



Important:

The assistant must clearly distinguish between AI suspicion and confirmed diagnosis.



==================================================

17. AGRICULTURE OFFICIAL DASHBOARD

==================================================



Create an advanced government/agriculture dashboard.



Top statistics:



Total Farms

12,540



Active Alerts

327



High-Risk Zones

18



Pending Validation

42



Affected Villages

36



Show charts:



Disease distribution

Pest trends

Risk trends

Village-wise cases

Crop-wise cases

Intervention response time



Add map.



Add “Priority Areas”.



Example:



Priority #1

Village: Rampur

Disease: Fungal

Risk: Critical

Cases: 42

Trend: +31%



Button:

[Deploy Extension Team]



==================================================

18. EXTENSION WORKER DASHBOARD

==================================================



Create an extension-worker interface.



Show:



Assigned villages

Pending farmer cases

High-risk farms

Field visits

Expert requests



Create:



“Today’s Priority Visits”



Example:



1. Rampur — Critical

2. Shivpur — High

3. Lakshmipur — High



Allow:



Mark Visit Completed

Upload Field Image

Add Observation

Request Expert



==================================================

19. ALERT SYSTEM

==================================================



Create notification center.



Alert types:



Disease Risk

Pest Outbreak

Weather Risk

Expert Response

Lab Result

Preventive Action



Examples:



🔴 Critical:

High pest activity detected near your farm.



🟠 Warning:

Fungal disease risk expected to increase over the next 3 days.



🟢 Update:

Expert validated your submitted crop image.



==================================================

20. FOLLOW-UP MONITORING

==================================================



After an advisory, create a follow-up workflow.



Example:



Day 0:

Disease suspected



Day 3:

Upload another image



Day 7:

Reassessment



Show:



Risk before intervention: 87%

Current risk: 51%



Add:



[Upload Follow-up Image]



This demonstrates continuous monitoring rather than one-time diagnosis.



==================================================

21. FARM HEALTH TIMELINE

==================================================



Create a timeline:



Aug 28

Normal



Aug 30

Pest activity increased



Sep 1

Disease suspected



Sep 2

Expert validated



Sep 3

Preventive action



Sep 4

Risk decreased



Use visual timeline cards.



==================================================

22. NOTIFICATION / SMS FALLBACK UI

==================================================



Create a notification preference page.



Options:



App notification

SMS

WhatsApp

Voice alert



For farmers with poor internet connectivity, show:



“Last known advisory available offline.”



Use mock functionality for MVP.



==================================================

23. UI/UX DESIGN

==================================================



Design should look premium, modern, clean and trustworthy.



Theme:

Agriculture + AI + Government Technology.



Use:



- White/light backgrounds

- Green agriculture accents

- Modern cards

- Rounded corners

- Professional typography

- Clear charts

- Accessible buttons

- Mobile-first farmer interface

- Desktop dashboard for officials



Do not make it look childish.



Do not overload screens with unnecessary animations.



Use subtle animations:



- Card hover

- Loading states

- AI scanning animation

- Map transitions

- Chart animations

- Notification animations



==================================================

24. LANDING PAGE

==================================================



Create a strong landing page.



Hero:



KRISHIRAKSHAK AI



“Detect Early. Predict Risk. Act Smart.”



Subtitle:



“An AI-powered crop-health early warning and decision-support platform combining crop images, weather, IoT, satellite intelligence and expert validation.”



Buttons:



[Scan Your Crop]

[Explore Dashboard]



Show 5-layer intelligence:



SEE

PREDICT

MAP

VERIFY

LEARN



Add section:



How it works



Farmer

↓

AI

↓

Risk Engine

↓

Expert

↓

Action

↓

Monitoring



==================================================

25. DEMO MODE

==================================================



Create a Demo Mode so the entire project can be demonstrated without external APIs.



Add a small:



“Demo Mode”



button.



Provide realistic sample data for:



- Tomato

- Wheat

- Rice

- Cotton

- Pest cases

- Disease cases

- Weather

- Satellite data

- Soil data

- IoT traps

- Expert confirmations



Buttons should actually update the UI.



==================================================

26. DATABASE STRUCTURE

==================================================



Create clean data models for:



users

farms

crops

crop_scans

disease_predictions

weather_data

soil_data

pest_traps

pest_observations

outbreak_reports

risk_predictions

expert_reviews

lab_referrals

advisories

followups

notifications



Use Supabase if available.



If Supabase is not configured, use realistic local mock data and clearly structure the code for later Supabase integration.



==================================================

27. AI ARCHITECTURE PAGE

==================================================



Create an “AI Architecture” page explaining:



Computer Vision Model

+

Risk Prediction Model

+

Weather Intelligence

+

GIS

+

IoT

+

LLM Advisory

+

Expert Validation



↓



Unified Crop Health Intelligence Engine



Make this page presentation-ready for SIH judges.



==================================================

28. IMPORTANT TRUST & SAFETY

==================================================



The system must clearly state:



“AI-generated results are preliminary and should not replace expert or laboratory diagnosis.”



Never present uncertain AI predictions as confirmed diagnoses.



Do not generate unsafe pesticide recommendations.



When chemical intervention is mentioned:



“Follow locally approved agricultural recommendations and product labels.”



==================================================

29. TECHNICAL REQUIREMENTS

==================================================



Use:



React

TypeScript

Tailwind CSS

Modern component architecture

Responsive design

Charts

Interactive map

Reusable components

Clean routing

Good error states

Loading states

Empty states



Prefer a scalable architecture.



Make the application functional, not just static mock screens.



All navigation buttons should work.



Use realistic sample data wherever live APIs are unavailable.



==================================================

30. FINAL NAVIGATION

==================================================



Sidebar:



Dashboard

My Farm

Crop Scanner

Risk Forecast

Pest Monitoring

Hotspot Map

KrishiRisk Simulator

AI Assistant

Smart Advisory

Expert Validation

Lab Referral

Follow-up Monitoring

AI Learning Center

Notifications

Profile

Settings



For officials:



Official Dashboard

Hotspot Map

Outbreak Intelligence

Extension Teams

Expert Validation

Analytics

AI Learning Center



==================================================

FINAL GOAL

==================================================



The final product should demonstrate this complete journey:



FARMER UPLOADS CROP IMAGE

        ↓

AI ANALYZES SYMPTOMS

        ↓

WEATHER + CROP + SOIL + PEST + LOCATION DATA

        ↓

AI RISK ENGINE

        ↓

DISEASE / PEST RISK SCORE

        ↓

EXPLAINABLE RISK REASONS

        ↓

EARLY WARNING

        ↓

IPM RECOMMENDATION

        ↓

EXPERT VALIDATION

        ↓

LAB REFERRAL IF NEEDED

        ↓

FOLLOW-UP MONITORING

        ↓

CONFIRMED FIELD DATA

        ↓

AI LEARNING

        ↓

AGRICULTURE OFFICIAL HOTSPOT DASHBOARD



The key USP should be:



“KrishiRakshak AI does not merely detect crop disease. It combines SEE + PREDICT + MAP + VERIFY + LEARN to provide an end-to-end crop-health early warning system.”



Build the complete MVP now with polished UI, realistic demo data, working navigation, interactive dashboards, charts, map visualization, simulated AI processing, and all core workflows.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://crop-sentinel-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2901253a-baec-4294-8732-fa88a623abd5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

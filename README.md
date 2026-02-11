🛡 Sentinel Eye
AI-Assisted Threat Detection for Enterprise Systems

Sentinel Eye is an AI-powered cybersecurity platform designed to detect persistent and stealthy enterprise threats by analyzing network traffic and system logs. The system combines modern web architecture with AI-driven anomaly detection to transform raw security data into actionable intelligence.

📖 Project Concept

Traditional rule-based security systems often generate high volumes of alerts without context, making it difficult to identify Advanced Persistent Threats (APTs). Sentinel Eye improves detection by:

Identifying behavioral anomalies

Correlating suspicious events

Assigning contextual risk scores

Providing explainable threat insights

🏗 Architecture
User → Next.js Frontend → Firebase Backend → Genkit AI Engine → Risk Scoring → Dashboard Alerts

Components:

Frontend: Next.js (React) dashboard for log upload and visualization

Backend: Firebase (Authentication + Firestore + Hosting)

AI Layer: Genkit for anomaly detection and threat classification

Runtime: Node.js 20+

🔄 How It Works

User uploads network or system logs.

Data is securely stored in Firebase.

Genkit analyzes patterns such as:

Unusual port usage

Repeated failed logins

High data transfer spikes

Privilege escalation attempts

A risk score is generated:

Normal

Suspicious

Critical

Results are displayed on the dashboard with explanations.

🎯 Goal

To demonstrate how AI can enhance enterprise cybersecurity systems by enabling intelligent anomaly detection, event correlation, and risk-based threat prioritization.

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

Sentinel Eye follows a modular, cloud-native architecture designed for scalability, security, and intelligent threat detection.

Flow:
User → Next.js Frontend → Firebase Backend → Genkit AI Engine → Risk Scoring → Dashboard Alerts

🔹 Frontend Layer – Next.js (React)

The frontend is built using Next.js and provides a responsive dashboard interface where security analysts can upload network traffic data or system logs in CSV/JSON format. It visualizes detected anomalies, displays categorized risk levels, and provides clear explanations of suspicious activity. The UI ensures a smooth user experience while securely communicating with backend services.

🔹 Backend Layer – Firebase

Firebase acts as the secure backend infrastructure, handling:

Authentication and access control

Firestore database for structured log storage

Cloud hosting and environment configuration

All uploaded log data is validated and securely stored in Firestore before being passed to the AI engine for analysis.

🔹 AI Layer – Genkit

The Genkit AI engine performs the core intelligence operations. It processes log data, extracts security-relevant features, detects anomalies, correlates suspicious patterns, and generates contextual threat classifications. This layer transforms raw log entries into meaningful security insights.

🔹 Runtime

The system runs on Node.js 20+, ensuring modern JavaScript performance and compatibility with cloud-based services.

🔄 How It Works

A user uploads network traffic or system logs through the dashboard.

The data is validated and securely stored in Firebase Firestore.

Genkit analyzes behavioral patterns such as:

Unusual port usage

Repeated failed login attempts

High data transfer spikes

Privilege escalation attempts

The AI engine evaluates correlations between events within specific time windows.

A weighted risk score is computed and categorized as:

Normal

Suspicious

Critical

The results are displayed on the dashboard with human-readable explanations to assist decision-making.

🎯 Goal

The primary objective of Sentinel Eye is to demonstrate how AI can enhance enterprise cybersecurity systems by moving beyond static rule-based monitoring. By integrating anomaly detection, behavioral analysis, and risk-based prioritization, the system reduces false positives and helps security teams focus on genuine threats. Sentinel Eye illustrates how intelligent architecture can transform raw security logs into actionable, context-aware threat intelligence.

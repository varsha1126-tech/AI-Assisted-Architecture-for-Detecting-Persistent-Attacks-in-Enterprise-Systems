🛡 Sentinel Eye
AI-Assisted Architecture for Detecting Persistent Attacks in Enterprise Systems

Sentinel Eye is an end-to-end AI-powered cybersecurity platform designed to detect persistent and stealthy enterprise threats through intelligent analysis of network traffic and system logs.

The system combines modern web architecture with AI-driven anomaly detection to transform raw log data into actionable security intelligence.

🚀 Overview

Traditional security monitoring systems generate massive volumes of alerts with limited context. Sentinel Eye enhances threat detection by:

Detecting anomalous network behavior

Identifying suspicious login patterns

Correlating system log events

Assigning contextual risk scores

Reducing false positives

Providing explainable threat insights

🏗 Architecture
🔹 Frontend

Next.js (React + App Router)

Real-time dashboard

Log upload interface (CSV / JSON)

Threat visualization & risk scoring

🔹 Backend

Firebase

Authentication

Firestore database

Secure cloud storage

App hosting

🔹 AI Layer

Genkit AI Flows

Anomaly detection

Event correlation

Risk classification

Threat explanation engine

🔹 Runtime

Node.js 20+

🔄 How It Works

User uploads network traffic or system log datasets.

Data is securely stored in Firebase Firestore.

Genkit AI processes and extracts behavioral patterns.

The system evaluates:

Unusual port activity

High-volume data transfers

Repeated failed login attempts

Privilege escalation indicators

A risk score is generated:

Normal

Suspicious

Critical

Results are displayed on the dashboard with explanations.

🧠 Core Features

AI-driven anomaly detection

Persistent attack identification

Behavioral log correlation

Risk-based threat classification

Real-time dashboard visualization

Cloud-native scalable architecture

🏢 Use Cases

Security Operations Centers (SOC)

Enterprise IT infrastructure monitoring

Cloud security management

Incident response automation

Threat hunting & investigation

📦 Installation & Setup
Prerequisites

Node.js 20+

npm

Clone Repository
git clone https://github.com/your-username/AI-Assisted-Architecture-for-Detecting-Persistent-Attacks-in-Enterprise-Systems.git
cd AI-Assisted-Architecture-for-Detecting-Persistent-Attacks-in-Enterprise-Systems

Install Dependencies
npm install

▶ Running the Application
Start Frontend
npm run dev


Runs on:
http://localhost:9002

Start Genkit AI Server
npm run genkit:watch


Both services must run simultaneously.

🔐 Security Design Considerations

Secure authentication via Firebase

Controlled access to log data

Isolated AI processing layer

Risk scoring to prioritize alerts

Explainable AI outputs

📊 Future Enhancements

Integration with SIEM tools

Real-time streaming log ingestion

Machine learning-based anomaly detection (Isolation Forest / Autoencoders)

Automated incident response workflows

Cloud deployment with CI/CD pipeline

🛠 Tech Stack

Next.js

React

Firebase (Auth + Firestore + Hosting)

Genkit

Node.js

JavaScript / TypeScript

📌 Project Goal

The goal of Sentinel Eye is to demonstrate how AI can enhance traditional security monitoring by introducing contextual reasoning, anomaly detection, and intelligent prioritization of enterprise threats.

📄 License

This project is intended for educational and research purposes.

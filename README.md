# TatkalX ⚡ — High-Velocity Anti-Tout Queue Ingestion Engine

> Built for **Hackyard Build 2026** (IIT Guwahati)  
> Track Submission: **Best Use of Adaption ($100 Sponsor Track)**

---

## 📌 Problem Statement
During peak Tatkal booking windows (10:00 AM AC / 11:00 AM Non-AC), automated tout scripts flood IRCTC servers with high-frequency concurrent requests. This causes database lock contention, crashes payment gateways, and denies genuine passengers ticket availability within 60 seconds.

## 💡 Solution: TatkalX + Adaption AI
TatkalX introduces a distributed virtual waiting room and telemetry screening layer in front of the reservation backend:
- **Telemetry Ingestion**: Monitors request bursts, device fingerprints, and interaction latency.
- **Adaption Classifier**: Routes request signals into an Adaption agent to detect automated scripting anomalies in sub-50ms intervals.
- **Dynamic Disposition**: Genuine passengers receive guaranteed queue slots; detected tout farms are dropped immediately at the edge.

---

## 🛠️ Tech Stack
- **Frontend / Dashboard**: React 18, Vite, TypeScript, Tailwind CSS
- **Icons & Visuals**: Lucide React, Canvas Confetti
- **Telemetry & Anti-Bot AI**: Adaption Labs AI Platform API

---

## 🚀 Running Locally
```bash
# Clone the repository
git clone [https://github.com/swayamshoubinsahoo/tatkalx.git](https://github.com/swayamshoubinsahoo/tatkalx.git)
cd tatkalx

# Install dependencies
npm install

# Start the development server
npm run dev

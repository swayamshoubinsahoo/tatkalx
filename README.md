# TatkalX ⚡ — High-Velocity Anti-Tout Queue Ingestion Engine



## 📌 Problem Statement
During peak Tatkal booking windows (10:00 AM AC / 11:00 AM Non-AC), automated tout scripts flood IRCTC servers with high-frequency concurrent requests. This causes database lock contention, crashes payment gateways, and denies genuine passengers ticket availability within 60 seconds.

## 💡 Solution: TatkalX Architecture & Ecosystem
TatkalX introduces a distributed virtual waiting room and telemetry screening layer in front of the reservation backend:

* **Telemetry Ingestion**: Monitors request bursts, device fingerprints, and interaction latency.
* **Agent Sandboxing (Agent37)**: Runs autonomous edge screening agents (`tatkalx-agent`) in isolated cloud containers.
* **Behavioral Anomaly Classifier (Adaption AI)**: Evaluates behavioral telemetry signals to detect automated scripting anomalies in sub-35ms intervals.
* **High-Availability Cloud Edge (Render)**: Provides resilient global CDN distribution and continuous delivery for the ingestion interface.
* **Dynamic Disposition**: Genuine passengers receive guaranteed queue slots; detected tout farms are dropped immediately at the edge.
---

## 🛠️ Tech Stack
- **Frontend / Dashboard**: React 18, Vite, TypeScript, Tailwind CSS
- **Icons & Visuals**: Lucide React, Canvas Confetti
- **Telemetry & Anti-Bot AI**: Adaption Labs AI Platform API
- **Edge Agent Infrastructure**: Agent37 Cloud Sandboxes
- **Cloud Hosting & CI/CD**: Render (Static Site Distribution)

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

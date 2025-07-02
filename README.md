## ✈️ Air Transit Trip Planner
Live App : https://magical-lollipop-839b79.netlify.app/
### 🧭 Smart Tourism Assistant for Transit Passengers | DevOps-Enabled Project

**Air Transit Trip Planner** is an intelligent travel assistant that helps **airport transit passengers** make the most of their layover time by planning **short trips to nearby tourist spots**. It uses **Google Maps API** and **Google Places API** to suggest attractions based on the passenger's current location, available transit hours, and flight schedule.

This project is integrated with a full **DevOps lifecycle** using tools like **Docker**, **GitHub Actions**, and **cloud deployment** for automated testing, building, and deployment.

---

### 🚀 Features

* 📍 Auto-detects user location using GPS
* ⏱️ Calculates tour options based on transit hours
* 🗺️ Interactive map with tourist spot markers and popups
* 📋 Scrollable list view of recommended places with details
* 🔊 Voice-guided GPS navigation to destinations
* 📈 Monthly reports on passenger usage and nearby attractions

---

### 🛠️ DevOps Stack

* **Source Control**: Git + GitHub
* **Containerization**: Docker
* **CI/CD**: GitHub Actions
* **Cloud Deployment**: AWS EC2 / Render
* **Monitoring**: (Optional) Prometheus + Grafana
* **Secrets Management**: GitHub Secrets / .env
* **Infrastructure as Code** (Optional): Terraform

---

### 📂 Project Structure

```
/frontend        → React Native or Flutter app
/backend         → Flask or Node.js server
/docker          → Dockerfiles for services
/.github         → CI/CD workflows
/terraform       → Infrastructure provisioning scripts
```

---

### ✅ Getting Started

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/air-transit-trip-planner.git
   ```
2. Run with Docker:

   ```bash
   docker-compose up --build
   ```
3. Set your `.env` file with:

   ```
   GOOGLE_API_KEY=your_key_here
   ```

---

### 📊 Reports Generated

* Passenger Usage Report
* Flight Timing Summary
* Nearby Tourism Activity Report (Monthly)

---

### 📌 Useful References

* [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
* [Expedia](https://www.expedia.com)
* [Travel Planner](https://travelplanner.co.in)

---

### 👨‍💻 Maintainer

Made with 💙 by \ Laahiri Indhirani
Project for academic + DevOps deployment practice.

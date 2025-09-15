# NabhaSeva – Telemedicine Access for Rural Healthcare in Nabha

## 🏥 Project Background

Nabha and its surrounding rural areas face a critical healthcare crisis.  
The Civil Hospital, meant to serve 173 villages, operates at less than 50% staff capacity — only 11 doctors for 23 sanctioned posts. Patients often travel long distances on poor roads, miss daily wages, and arrive only to find that doctors or medicines are unavailable.  

This lack of accessible healthcare worsens health outcomes, increases financial strain, and deepens the healthcare gap between urban and rural populations.  

---

## 💡 Problem Statement
**ID:** 25018  
**Title:** *Telemedicine Access for Rural Healthcare in Nabha*  

The challenge: Deliver timely healthcare access, reduce unnecessary travel, and build a scalable system that works even in low-bandwidth rural areas.

---

## 🎯 Our Vision

We aim to create **NabhaSeva** — a multilingual, offline-first **telemedicine and health management platform**.  
The goal is to bridge the healthcare gap by enabling **video consultations, AI-powered symptom checking, digital health records, and live medicine availability updates** for rural patients.  

---

## 🚀 Key Features (MVP – Phase 1)

- ✅ **Video & Audio Consultations** with doctors (fallback to audio-only in low bandwidth).  
- ✅ **Multilingual UI** – Punjabi, Hindi, English.  
- ✅ **AI-Powered Symptom Checker** – lightweight, text-based, offline-capable.  
- ✅ **Digital Health Records (Patient Wallet)** – QR-based portable history, synced when online.  
- ✅ **Medicine Availability Tracker** – real-time pharmacy stock updates (with SMS/USSD fallback).  
- ✅ **Doctor Availability Schedule** – real-time doctor status and appointment updates.  

---

## 👩‍🌾 Expected User Flow

**Patients**  
1. Select language → Use symptom checker.  
2. Book slot with available doctor.  
3. Join video/audio consultation.  
4. Receive e-prescription → stored in digital health wallet.  
5. Check local pharmacies for medicine availability.  

**Doctors**  
1. Login to doctor portal.  
2. View queued patients.  
3. Conduct consultation.  
4. Upload prescription → synced to patient’s record.  

---

## 🛠️ Tech Stack

- **Frontend (Patients):** Android app (offline-first with SQLite sync).  
- **Frontend (Doctors/Admins):** Web + Mobile responsive portal.  
- **Backend:**  
  - **Migrated from Node.js → Python (FastAPI/Django)** for better AI/ML integration.  
  - **Database:** PostgreSQL / MySQL (scalable, secure).  
  - **Cache:** Redis for real-time availability.  
- **AI Symptom Checker:** Python microservice (light NLP + rules engine).  
- **Offline Sync:** SQLite (local) → cloud sync when online.  
- **Fallback Connectivity:** SMS/USSD for critical queries.  

---

## 📈 Expected Outcomes

- 50% reduction in unnecessary patient travel to Civil Hospital.  
- Onboard **200+ rural patients from 173 villages** within 6 months.  
- Integrate **10+ pharmacies** for real-time stock updates.  
- Improve doctor-patient ratio through remote consultations.  

---

## 🔮 Future Scalability (Phase 2+)

- Wearable/IoT integration for chronic care (BP, sugar levels).  
- Emergency tele-ambulance coordination.  
- Voice-based AI diagnostics (Punjabi/Hindi).  
- Expansion to other rural regions in Punjab & India.  

---

## 👥 The Minds Behind NabhaSeva

This project is an initiative under the **Government of Punjab, Department of Higher Education**, driven by young innovators and supported by healthcare experts.  

Our mission: **to ensure that no rural patient is left without access to timely medical care.**

---

## 📌 Why Python Backend?

Originally designed in **Node.js**, we migrated to **Python (FastAPI/Django)** because:  
- Python integrates seamlessly with **AI/ML models** (for symptom checker).  
- Easier integration with healthcare data standards (FHIR/HL7).  
- Strong ecosystem for **offline sync, security, and scalability**.  

This choice ensures NabhaSeva is **future-ready** for advanced AI features and large-scale rural deployments.  

---

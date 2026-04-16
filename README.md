# Massive-Scale Distributed Voting System 🗳️

A high-concurrency full-stack application built to demonstrate **System Design** principles, specifically the **Write-Behind Caching Pattern** using Spring Boot, Redis, and PostgreSQL.

## 🏗️ The Architecture
In a high-traffic election, a traditional database would crash under the load of thousands of simultaneous write requests. This system solves that using a multi-layer storage approach:

1. **Frontend:** React (Vite) provides a real-time dashboard that polls for updates every second.
2. **Ingestion Layer:** Spring Boot REST API handles incoming traffic.
3. **Speed Layer (Redis):** Votes are first recorded in **Upstash Redis**. Since Redis operates in RAM, it acts as a "shock absorber" for thousands of clicks per second.
4. **Persistence Layer (PostgreSQL):** A background **Cron Job** (Scheduled Task) syncs the data from Redis to PostgreSQL every 10 seconds, ensuring permanent data integrity without overloading the database.



## 🛠️ Tech Stack
- **Frontend:** React.js, CSS3
- **Backend:** Java, Spring Boot, Spring Data JPA
- **Cache:** Redis (Upstash)
- **Database:** PostgreSQL
- **Architecture:** Write-Behind Caching / Distributed Systems

## 🚀 How to Run Locally

### 1. Prerequisites
- Java 17+
- Node.js & npm
- An Upstash Redis account (or local Redis)
- PostgreSQL database

### 2. Backend Setup
1. Navigate to `/backend`.
2. Update `src/main/resources/application.properties` with your Redis and PostgreSQL credentials.
3. Run the server:
   ```cmd
   ./mvnw spring-boot:run

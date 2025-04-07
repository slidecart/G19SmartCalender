# README for testing authentication endpoints

This README provides instructions on setting up the project using Docker for Redis and Mailhog, and testing the API endpoints with Postman and cURL.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Java 21** (or compatible JDK)
- **Maven** (for building and running the Spring Boot app)
- **Docker** (for running Redis and Mailhog)
- **Postman** (optional, for GUI-based testing)
- **cURL** (optional, for terminal-based testing)
- Access to the PostgreSQL server at `pgserver.mau.se`

## Project Setup

### Configuration Overview

- **Database**: PostgreSQL is hosted externally at `pgserver.mau.se:5432/g19smartcalender`. 
- **Redis**: Used for storing OTPs (one-time passwords) for email verification. Runs locally via Docker.
- **Mailhog**: A local SMTP server for capturing emails during development. Runs via Docker.
- **Spring Boot**: The backend application, configured via `application.properties`.

#### Step 1: Clone the Repository
If you haven't already, clone the repository to your local machine:
```bash
git clone https://github.com/slidecart/G19SmartCalender.git
cd smartcalender
```

#### Step 3: Start Up Docker Services
We use Docker to run Redis and Mailhog locally. PostgreSQL is external, so it doesn’t require Docker.

Run the following command in `backend/backend/app` folder to start Redis and Mailhog:
```bash
docker-compose up -d
```

Stop Docker Services (When Done) in the same folder:
```bash
docker-compose down
```
Note: Data in Redis (OTPs) and Mailhog (emails) is not persisted across restarts.

#### Step 4: Build and Run the Application
With Docker services running, start the Spring Boot app either from the command line or your IDE.:

##### Command Line
```bash
mvn clean install
mvn spring-boot:run
```
##### IDE
1. Open the project in your IDE (e.g., IntelliJ IDEA, Eclipse).
2. Import the Maven project.
3. Run the `main` method in the `SmartCalenderApplication` class.

The app will start on http://localhost:8080 and connect to:
- PostgreSQL (pgserver.mau.se:5432)
- Redis (localhost:6379)
- Mailhog (localhost:1025)

### Testing Endpoints
Below are instructions for testing the key authentication endpoints using Postman and cURL. All endpoints are under /api/auth/.

1. Register a User (POST /api/auth/register)
   Registers a new user and sends a verification email.

    **Postman**
Method: POST
URL: http://localhost:8080/api/auth/register
Headers:
Content-Type: application/json
Body (Raw JSON) for example:
   {
   "username": "testuser",
   "email": "test@example.com",
   "password": "test123"
   }

    **cURL**
```bash
curl -X POST http://localhost:8080/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username": "testuser", "email": "test@example.com", "password": "test123"}'
```

#### Check Email
Open http://localhost:8025 (Mailhog UI) to see the verification email with a link like http://localhost:8080/api/auth/verify?uid=1&otp=ABC123.

2. Verify Email (GET /api/auth/verify)
   Verifies a user’s email using the OTP from the email.

    **Postman**
Method: GET
URL: http://localhost:8080/api/auth/verify?uid=<uid>&otp=<otp>
Replace <uid> and <otp> with values from the email (e.g., uid=1&otp=ABC123).

    **cURL**
```bash
curl -X GET "http://localhost:8080/api/auth/verify?uid=1&otp=ABC123"
```

3. Resend Verification Email (POST /api/auth/resend-verification)
   Resends a verification email if the OTP expires or the email is lost.

    **Postman**
Method: POST
URL: http://localhost:8080/api/auth/resend-verification?email=test@example.com
Change the email in the url to the email you used in the register step.

    **cURL**
```bash
curl -X POST "http://localhost:8080/api/auth/resend-verification?email=test@example.com"
```

Check Mailhog (http://localhost:8025) for the new email.

### Notes on Persistence
PostgreSQL: User data persists on the external server (pgserver.mau.se). Restarting the app or Docker doesn’t affect it.
Redis: OTPs are lost when the Redis container restarts (e.g., docker-compose down). Use /resend-verification to generate a new OTP.
Mailhog: Emails are lost on restart. Trigger a new action (register or resend) to see emails again.


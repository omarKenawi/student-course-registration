# Student Course Registration System

A student course registration backend built with **Java, Spring Boot, and PostgreSQL**, featuring JWT-based authentication, role-based access control, transactional enrollment handling with capacity enforcement, and audit logging. Includes a React/TypeScript client that exercises the main flows.

<p>
  <img src="https://img.shields.io/badge/Java-25-orange?logo=openjdk&logoColor=white" alt="Java 25" />
  <img src="https://img.shields.io/badge/Spring%20Boot-4.1-6DB33F?logo=springboot&logoColor=white" alt="Spring Boot 4.1" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL 16" />
  <img src="https://img.shields.io/badge/JWT-Auth-black?logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-Vite-3178C6?logo=typescript&logoColor=white" alt="TypeScript + Vite" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white" alt="Docker Compose" />
</p>

---

## 🔑 Test Accounts

The app is fully seeded on startup (`data.sql`) — no manual setup needed to try it out. Everyone shares the same password below.

**Password (all accounts):** `<password>`

| Role | Count | Emails |
|---|---|---|
| 🛡️ Admin | 1 | `admin@university.com` |
| 🗂️ Registrar | 2 | `registrar1@university.com` → `registrar2@university.com` |
| 🎓 Instructor | 5 | `instructor1@university.com` → `instructor5@university.com` |
| 📘 Student | 10 | `student1@university.com` → `student10@university.com` |

> Log in via `POST /api/auth/login`, or through the frontend at `http://localhost:3000`.

---

## Tech Stack

| Layer | Stack |
|---|---|
| **Language / Runtime** | Java 25 |
| **Framework** | Spring Boot 4.1 — Web MVC, Spring Data JPA, Spring Security, Bean Validation |
| **Database** | PostgreSQL 16 |
| **Auth** | JWT (`jjwt`) + BCrypt password hashing |
| **API Docs** | springdoc-openapi (Swagger UI) |
| **Build** | Maven |
| **Boilerplate** | Lombok |
| **Frontend** | React 19 + TypeScript, Vite, TanStack Query, React Router, Tailwind CSS, Axios |
| **Infra** | Docker / Docker Compose (Postgres + backend + frontend) |

## Architecture Overview

The backend follows a standard layered structure:

```
controller/    REST endpoints, role-based access via @PreAuthorize
service/       Business logic and transactional boundaries
repository/    Spring Data JPA repositories
entity/        JPA entities
dto/           Request/response records, grouped by domain
mapper/        Entity <-> DTO mapping
security/      JWT filter/service, Spring Security user details, method-level authorization rules
exception/     Custom exceptions + centralized @RestControllerAdvice error handling
enums/         Role, Term, AcademicLevel, EnrollmentStatus, AuditAction
config/        Security config, OpenAPI config
```

## Entity-Relationship Diagram

<img width="2524" height="2446" alt="erd" src="https://github.com/user-attachments/assets/7dfd8803-b0da-4e99-acc1-75a4ba7dce2f" />

## Data Model Summary

| Table | Key columns | Notes |
|---|---|---|
| `users` | `id`, `full_name`, `email` (unique), `password_hash`, `role`, `created_at`, `updated_at` | Single table for all account types; `role` is `ADMIN`, `REGISTRAR`, `INSTRUCTOR`, or `STUDENT` |
| `students` | `id`, `user_id` (FK, unique), `student_number` (unique), `academic_level` | One-to-one with `users` |
| `instructors` | `id`, `user_id` (FK, unique), `employee_number` (unique) | One-to-one with `users` |
| `courses` | `id`, `code`, `title`, `description`, `credit_hours`, `capacity`, `term`, `academic_level`, `academic_year`, `instructor_id` (FK) | Unique constraint on `(code, term, academic_year)` |
| `enrollments` | `id`, `student_id` (FK), `course_id` (FK), `status`, `enrolled_at`, `dropped_at` | Unique constraint on `(student_id, course_id)`; status is `ACTIVE` or `DROPPED` |
| `audit_logs` | `id`, `user_id` (FK), `action`, `entity_type`, `entity_id`, `logged_at` | Written for course/student/instructor creation and registration/drop actions |

## Design Decisions & Assumptions

- **Four roles instead of three.** In addition to `ADMIN`, `REGISTRAR`, and `INSTRUCTOR`, a `STUDENT` role was added so students can authenticate and self-service their own schedule and registrations, rather than staff having to act on their behalf.
- **Single `users` table with a `role` column**, and separate `students` / `instructors` tables holding role-specific attributes (`student_number`, `academic_level`, `employee_number`). This avoids duplicating auth/identity fields across three tables while still keeping domain-specific fields normalized.
- **No waitlist.** Registration hard-fails once a course reaches `capacity`, rather than queuing students. This was a scope decision to keep the enrollment flow simple and easier to reason about correctness for; it can be layered on top of the existing `EnrollmentStatus` enum later (e.g. adding a `WAITLISTED` status).
- **Capacity is enforced with row-level locking**, not just an application-level count check. `registration` loads the target course with `SELECT … FOR UPDATE` (`findByIdForUpdate`) inside a `@Transactional` method before comparing active-enrollment count to capacity. This prevents a race condition where two concurrent registrations could both pass the "is there a seat" check for the last open seat.
- **Duplicate registration protection is enforced twice**: at the database level via a unique constraint on `(student_id, course_id)`, and at the application level by checking for an existing `ACTIVE` enrollment before inserting. Dropping and re-registering reuses the same enrollment row (flips `status` back to `ACTIVE`, clears `dropped_at`) instead of creating a new one, so enrollment history for a given student/course pair stays on a single row.
- **Courses are scoped by term and academic year.** The same course `code` can exist across multiple terms/years (e.g. `CS101` offered in `FALL 2025` and `FALL 2026`) because the uniqueness constraint is on `(code, term, academic_year)` together, not `code` alone.
- **Students can only register for courses matching their academic level.** A course has a single `academic_level`, and a student can only enroll in courses at their own level. This was an assumption made to keep the model simple; a real registrar's system would likely allow more flexible eligibility rules (prerequisites, cross-level electives, etc.).
- **Role-based access uses Spring Security method security (`@PreAuthorize`)** rather than URL-pattern-based rules, so authorization logic lives next to each endpoint. Ownership checks (e.g. "is this the student's own schedule/enrollment", "is this the instructor's own course roster") are implemented in a dedicated `AuthorizationService` and referenced from `@PreAuthorize` SpEL expressions, keeping controllers free of manual permission logic.
- **Passwords are hashed with BCrypt** (`spring-security-crypto`'s `BCryptPasswordEncoder`) before being persisted; plaintext passwords are never stored or logged.
- **Authentication is stateless JWT.** `/api/auth/login` issues a signed JWT (24h expiry by default) that the client sends as a `Bearer` token on subsequent requests. Session creation is disabled (`SessionCreationPolicy.STATELESS`), and a custom `JwtAuthenticationFilter` populates the Spring Security context per-request.
- **Audit logging is append-only** and captures the acting user, action type (`CREATE`, `UPDATE`, `REGISTER`, `DROP`), entity type, and entity id for staff/registration actions. Only `ADMIN` can read the audit log (`GET /api/audit-logs`).
- **Account provisioning is staff-driven and role-scoped**: `ADMIN` can create students and instructors and can promote a user to `REGISTRAR`; there is no public self-registration endpoint. This mirrors how a real registrar's office controls who gets institutional accounts.
- **`ddl-auto=create` + `data.sql`** is used for this take-home so the schema and seed data are always reproducible from a clean database on startup. In a production setting this would be replaced with a proper migration tool (Flyway/Liquibase).

## Prerequisites

- Java 25 (JDK)
- Maven 3.9+ (or use the included Maven wrapper, if present)
- Docker & Docker Compose (recommended — easiest way to run everything)
- Node.js 20+ (only needed if running the frontend outside Docker)

## Running with Docker Compose (recommended)

This spins up Postgres, the Spring Boot API, and the React frontend together.

```bash
docker compose up --build
```

Once it's up:

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8081 |
| Swagger UI | http://localhost:8081/swagger-ui.html |
| OpenAPI JSON | http://localhost:8081/v3/api-docs |
| PostgreSQL | localhost:5432 (`student_course_registration` / `postgres` / `postgres`) |

The database schema and seed data (`src/main/resources/data.sql`) are (re)created automatically on backend startup.

## Running Locally (without Docker)

1. **Start PostgreSQL** and create a database:
   ```sql
   CREATE DATABASE student_course_registration;
   ```
   Default credentials expected by `application.properties`: user `postgres`, password `postgres`, on `localhost:5432`. Update `src/main/resources/application.properties` if yours differ.

2. **Run the backend**:
   ```bash
   ./mvnw spring-boot:run
   ```
   The API starts on `http://localhost:8081`. On first startup, Hibernate creates the schema and `data.sql` seeds sample users, students, instructors, courses, and enrollments.

3. **Run the frontend** (optional):
   ```bash
   cd client
   npm install
   npm run dev
   ```
   The dev server starts on `http://localhost:5173` (Vite default) and expects the API at `http://localhost:8081`.

## Sample Data

`data.sql` seeds a ready-to-use dataset: 1 admin, 2 registrars, 5 instructors, 10 students at different academic levels, a batch of courses across terms, and existing enrollments (including at least one course seeded near/at capacity to exercise the "course is full" rule). See [Test Accounts](#-test-accounts) above for login credentials.

## Authentication

1. `POST /api/auth/login` with an email/password to receive a JWT.
2. Send the token on every subsequent request:
   ```
   Authorization: Bearer <token>
   ```
3. `GET /api/auth/me` returns the currently authenticated user.

Tokens are valid for 24 hours by default (`jwt.expiration` in `application.properties`).

## API Endpoints

Base URL: `http://localhost:8081`

### Auth — `/api/auth`
| Method | Path | Access | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Authenticate with email/password, returns a JWT |
| GET | `/api/auth/me` | Authenticated | Returns the current user's profile |

### Users — `/api/users`
| Method | Path | Access | Description |
|---|---|---|---|
| POST | `/api/users/registrars` | ADMIN | Create a new registrar account |

### Students — `/api/students`
| Method | Path | Access | Description |
|---|---|---|---|
| POST | `/api/students` | ADMIN | Create a new student account |
| GET | `/api/students` | ADMIN, REGISTRAR, INSTRUCTOR | List all students |
| GET | `/api/students/{id}` | ADMIN, REGISTRAR, INSTRUCTOR, or the student themself | Get a student's profile |
| PUT | `/api/students/{id}` | ADMIN | Update a student |
| GET | `/api/students/me` | STUDENT | Get the logged-in student's own profile |
| GET | `/api/students/me/schedule` | STUDENT | Get the logged-in student's own current schedule |
| GET | `/api/students/{studentId}/schedule` | ADMIN, REGISTRAR, or the student themself | Get a student's current schedule (active enrollments) |

### Instructors — `/api/instructors`
| Method | Path | Access | Description |
|---|---|---|---|
| POST | `/api/instructors` | ADMIN | Create a new instructor account |
| GET | `/api/instructors` | ADMIN, REGISTRAR, INSTRUCTOR | List all instructors |
| GET | `/api/instructors/{id}` | ADMIN, REGISTRAR, INSTRUCTOR | Get an instructor's profile |
| PUT | `/api/instructors/{id}` | ADMIN | Update an instructor |
| GET | `/api/instructors/me` | INSTRUCTOR | Get the logged-in instructor's own profile |

### Courses — `/api/courses`
| Method | Path | Access | Description |
|---|---|---|---|
| POST | `/api/courses` | ADMIN, REGISTRAR | Create a course |
| PUT | `/api/courses/{id}` | ADMIN, REGISTRAR | Update a course |
| GET | `/api/courses` | Authenticated | List all courses |
| GET | `/api/courses/{id}` | Authenticated | Get a course by id |
| GET | `/api/courses/{courseId}/roster` | ADMIN, REGISTRAR, or the assigned instructor | Get the list of actively enrolled students for a course |

### Enrollments — `/api/enrollments`
| Method | Path | Access | Description |
|---|---|---|---|
| POST | `/api/enrollments` | ADMIN, REGISTRAR, or the student themself | Register a student for a course (enforces capacity, academic-level match, and no duplicate active enrollment) |
| PATCH | `/api/enrollments/{id}/drop` | ADMIN, REGISTRAR, or the enrolled student | Drop a course (marks the enrollment `DROPPED`) |

### Audit Logs — `/api/audit-logs`
| Method | Path | Access | Description |
|---|---|---|---|
| GET | `/api/audit-logs` | ADMIN | Paginated list of all audit log entries |

### Error format

All errors return a consistent JSON body:
```json
{
  "timestamp": "2026-07-29T10:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Course is full.",
  "path": "/api/enrollments"
}
```
Validation errors (`400`) instead return a field → message map. Common status codes: `400` (validation / business rule violation), `401` (bad credentials / missing token), `403` (authenticated but not authorized), `404` (not found), `409` (duplicate / constraint violation).

## Business Rules Enforced

- A student cannot hold two `ACTIVE` enrollments for the same course (unique DB constraint + application check).
- Registration is rejected once a course's active-enrollment count reaches its `capacity`; the course row is locked (`SELECT … FOR UPDATE`) during the check to prevent overbooking under concurrent requests. No waitlist is implemented.
- A student can only register for a course whose `academic_level` matches their own.
- Only `ADMIN`/`REGISTRAR` (or the owning student/instructor, where applicable) can access student schedules, course rosters, or perform registration/drop actions.
- Course/student/instructor creation, updates, registrations, and drops are all written to `audit_logs` with the acting user.

## API Documentation (Swagger)

Interactive API docs are available once the backend is running:
- Swagger UI: `http://localhost:8081/swagger-ui.html`
- OpenAPI spec (JSON): `http://localhost:8081/v3/api-docs`

Use the "Authorize" button in Swagger UI with a JWT obtained from `/api/auth/login` (format: `Bearer <token>`) to call protected endpoints directly from the docs.

## Testing

```bash
./mvnw test
```

## Project Structure

```
.
├── src/main/java/com/example/studentcourseregistration/
│   ├── config/            # Security & OpenAPI configuration
│   ├── controller/        # REST controllers
│   ├── dto/               # Request/response records
│   ├── entity/             # JPA entities
│   ├── enums/              # Role, Term, AcademicLevel, EnrollmentStatus, AuditAction
│   ├── exception/          # Custom exceptions + global error handling
│   ├── mapper/              # Entity <-> DTO mapping
│   ├── repository/          # Spring Data JPA repositories
│   ├── security/            # JWT filter/service, user details, authorization rules
│   └── service/              # Business logic
├── src/main/resources/
│   ├── application.properties
│   └── data.sql            # Sample data (users, students, instructors, courses, enrollments)
├── client/                  # React + TypeScript frontend
├── docker-compose.yml
├── Dockerfile
└── pom.xml
```

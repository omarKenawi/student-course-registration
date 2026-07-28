INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Admin', 'admin@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'ADMIN', NOW(), NOW());

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'User', 1, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Registrar One', 'registrar1@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'REGISTRAR', NOW(), NOW());

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'User', 2, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Registrar Two', 'registrar2@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'REGISTRAR', NOW(), NOW());

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'User', 3, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Instructor One', 'instructor1@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'INSTRUCTOR', NOW(), NOW());

INSERT INTO instructors (user_id, employee_number)
VALUES (4, 'EMP001');

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Instructor', 1, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Instructor Two', 'instructor2@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'INSTRUCTOR', NOW(), NOW());

INSERT INTO instructors (user_id, employee_number)
VALUES (5, 'EMP002');

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Instructor', 2, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Instructor Three', 'instructor3@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'INSTRUCTOR', NOW(), NOW());

INSERT INTO instructors (user_id, employee_number)
VALUES (6, 'EMP003');

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Instructor', 3, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Instructor Four', 'instructor4@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'INSTRUCTOR', NOW(), NOW());

INSERT INTO instructors (user_id, employee_number)
VALUES (7, 'EMP004');

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Instructor', 4, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Instructor Five', 'instructor5@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'INSTRUCTOR', NOW(), NOW());

INSERT INTO instructors (user_id, employee_number)
VALUES (8, 'EMP005');

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Instructor', 5, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Student One', 'student1@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'STUDENT', NOW(), NOW());

INSERT INTO students (user_id, student_number, academic_level)
VALUES (9, 'STU001', 'FIRST_YEAR');

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Student', 1, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Student Two', 'student2@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'STUDENT', NOW(), NOW());

INSERT INTO students (user_id, student_number, academic_level)
VALUES (10, 'STU002', 'FIRST_YEAR');

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Student', 2, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Student Three', 'student3@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'STUDENT', NOW(), NOW());

INSERT INTO students (user_id, student_number, academic_level)
VALUES (11, 'STU003', 'SECOND_YEAR');

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Student', 3, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Student Four', 'student4@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'STUDENT', NOW(), NOW());

INSERT INTO students (user_id, student_number, academic_level)
VALUES (12, 'STU004', 'SECOND_YEAR');

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Student', 4, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Student Five', 'student5@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'STUDENT', NOW(), NOW());

INSERT INTO students (user_id, student_number, academic_level)
VALUES (13, 'STU005', 'THIRD_YEAR');

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Student', 5, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Student Six', 'student6@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'STUDENT', NOW(), NOW());

INSERT INTO students (user_id, student_number, academic_level)
VALUES (14, 'STU006', 'THIRD_YEAR');

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Student', 6, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Student Seven', 'student7@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'STUDENT', NOW(), NOW());

INSERT INTO students (user_id, student_number, academic_level)
VALUES (15, 'STU007', 'FOURTH_YEAR');

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Student', 7, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Student Eight', 'student8@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'STUDENT', NOW(), NOW());

INSERT INTO students (user_id, student_number, academic_level)
VALUES (16, 'STU008', 'FOURTH_YEAR');

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Student', 8, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Student Nine', 'student9@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'STUDENT', NOW(), NOW());

INSERT INTO students (user_id, student_number, academic_level)
VALUES (17, 'STU009', 'FIRST_YEAR');

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Student', 9, NOW());

INSERT INTO users (full_name, email, password_hash, role, created_at, updated_at)
VALUES ('Student Ten', 'student10@university.com', '$2a$10$Q11x99l4yRRG2HwqwUOt2eFcySnDUphkoLd31zGm0Er1HqkoVLvm.', 'STUDENT', NOW(), NOW());

INSERT INTO students (user_id, student_number, academic_level)
VALUES (18, 'STU010', 'SECOND_YEAR');

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Student', 10, NOW());

INSERT INTO courses (code, title, description, credit_hours, capacity, term, academic_level, academic_year, instructor_id, created_at, updated_at)
VALUES ('CS101', 'Intro to Programming', 'Fundamentals of programming', 3, 30, 'FALL', 'FIRST_YEAR', 2026, 1, NOW(), NOW());

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Course', 1, NOW());

INSERT INTO courses (code, title, description, credit_hours, capacity, term, academic_level, academic_year, instructor_id, created_at, updated_at)
VALUES ('CS201', 'Data Structures', 'Linear and non-linear data structures', 3, 25, 'FALL', 'SECOND_YEAR', 2026, 1, NOW(), NOW());

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Course', 2, NOW());

INSERT INTO courses (code, title, description, credit_hours, capacity, term, academic_level, academic_year, instructor_id, created_at, updated_at)
VALUES ('CS301', 'Algorithms', 'Design and analysis of algorithms', 4, 20, 'SPRING', 'THIRD_YEAR', 2026, 2, NOW(), NOW());

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Course', 3, NOW());

INSERT INTO courses (code, title, description, credit_hours, capacity, term, academic_level, academic_year, instructor_id, created_at, updated_at)
VALUES ('CS401', 'Machine Learning', 'Introduction to ML algorithms', 4, 20, 'SPRING', 'FOURTH_YEAR', 2026, 2, NOW(), NOW());

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Course', 4, NOW());

INSERT INTO courses (code, title, description, credit_hours, capacity, term, academic_level, academic_year, instructor_id, created_at, updated_at)
VALUES ('MATH101', 'Calculus I', 'Limits, derivatives, and integrals', 3, 35, 'FALL', 'FIRST_YEAR', 2026, 3, NOW(), NOW());

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Course', 5, NOW());

INSERT INTO courses (code, title, description, credit_hours, capacity, term, academic_level, academic_year, instructor_id, created_at, updated_at)
VALUES ('MATH201', 'Linear Algebra', 'Vectors, matrices, and linear transformations', 3, 30, 'SPRING', 'SECOND_YEAR', 2026, 3, NOW(), NOW());

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Course', 6, NOW());

INSERT INTO courses (code, title, description, credit_hours, capacity, term, academic_level, academic_year, instructor_id, created_at, updated_at)
VALUES ('PHY101', 'Physics I', 'Mechanics and thermodynamics', 4, 30, 'FALL', 'FIRST_YEAR', 2026, 4, NOW(), NOW());

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Course', 7, NOW());

INSERT INTO courses (code, title, description, credit_hours, capacity, term, academic_level, academic_year, instructor_id, created_at, updated_at)
VALUES ('PHY201', 'Physics II', 'Electromagnetism and optics', 4, 25, 'SPRING', 'SECOND_YEAR', 2026, 4, NOW(), NOW());

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Course', 8, NOW());

INSERT INTO courses (code, title, description, credit_hours, capacity, term, academic_level, academic_year, instructor_id, created_at, updated_at)
VALUES ('ENG101', 'English Composition', 'Academic writing and communication', 2, 40, 'FALL', 'FIRST_YEAR', 2026, 5, NOW(), NOW());

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Course', 9, NOW());

INSERT INTO courses (code, title, description, credit_hours, capacity, term, academic_level, academic_year, instructor_id, created_at, updated_at)
VALUES ('ENG201', 'Technical Writing', 'Technical documentation and reports', 2, 35, 'SUMMER', 'THIRD_YEAR', 2026, 5, NOW(), NOW());

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at)
VALUES (1, 'CREATE', 'Course', 10, NOW());

INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (1, 1, 'ACTIVE', NOW());
INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (1, 5, 'ACTIVE', NOW());
INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (2, 1, 'ACTIVE', NOW());
INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (2, 7, 'ACTIVE', NOW());
INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (3, 2, 'ACTIVE', NOW());
INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (3, 6, 'ACTIVE', NOW());
INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (4, 2, 'ACTIVE', NOW());
INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (4, 8, 'ACTIVE', NOW());
INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (5, 3, 'ACTIVE', NOW());
INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (5, 10, 'ACTIVE', NOW());
INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (6, 3, 'ACTIVE', NOW());
INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (7, 4, 'ACTIVE', NOW());
INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (8, 4, 'ACTIVE', NOW());
INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (9, 5, 'ACTIVE', NOW());
INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (9, 9, 'ACTIVE', NOW());
INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (10, 6, 'ACTIVE', NOW());
INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (10, 8, 'ACTIVE', NOW());

INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (9, 'REGISTER', 'Enrollment', 1, NOW());
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (9, 'REGISTER', 'Enrollment', 2, NOW());
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (10, 'REGISTER', 'Enrollment', 3, NOW());
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (10, 'REGISTER', 'Enrollment', 4, NOW());
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (11, 'REGISTER', 'Enrollment', 5, NOW());
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (11, 'REGISTER', 'Enrollment', 6, NOW());
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (12, 'REGISTER', 'Enrollment', 7, NOW());
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (12, 'REGISTER', 'Enrollment', 8, NOW());
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (13, 'REGISTER', 'Enrollment', 9, NOW());
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (13, 'REGISTER', 'Enrollment', 10, NOW());
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (14, 'REGISTER', 'Enrollment', 11, NOW());
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (15, 'REGISTER', 'Enrollment', 12, NOW());
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (16, 'REGISTER', 'Enrollment', 13, NOW());
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (17, 'REGISTER', 'Enrollment', 14, NOW());
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (17, 'REGISTER', 'Enrollment', 15, NOW());
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (18, 'REGISTER', 'Enrollment', 16, NOW());
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, logged_at) VALUES (18, 'REGISTER', 'Enrollment', 17, NOW());
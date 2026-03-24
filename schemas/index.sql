create database job_application;
use job_application;

-- LOOKUP TABLES
CREATE TABLE genders (
    gender_id INT AUTO_INCREMENT PRIMARY KEY,
    gender_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE countries (
    country_id INT AUTO_INCREMENT PRIMARY KEY,
    country_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE states(
    state_id INT AUTO_INCREMENT PRIMARY KEY,
    country_id INT NOT NULL,
    state_name VARCHAR(50) NOT NULL UNIQUE,
	FOREIGN KEY (country_id) REFERENCES countries(country_id)
);

CREATE TABLE cities(
	city_id INT AUTO_INCREMENT PRIMARY KEY,
    state_id INT NOT NULL,
    city_name VARCHAR(50) NOT NULL UNIQUE,
    FOREIGN KEY (state_id) REFERENCES states(state_id)
);

CREATE TABLE marital_statuses (
    marital_status_id INT AUTO_INCREMENT PRIMARY KEY,
    marital_status_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE course_types (
    course_type_id INT AUTO_INCREMENT PRIMARY KEY,
    course_type_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE languages (
    language_id INT AUTO_INCREMENT PRIMARY KEY,
    language_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE proficiency_levels (
    proficiency_level_id INT AUTO_INCREMENT PRIMARY KEY,
    proficiency_level_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE reference_relationships (
    reference_relationship_id INT AUTO_INCREMENT PRIMARY KEY,
    relationship_name VARCHAR(100) NOT NULL UNIQUE
);
CREATE TABLE technologies(
    technology_id INT AUTO_INCREMENT PRIMARY KEY,
    technology_name VARCHAR(100) NOT NULL UNIQUE
);


-- MAIN TABLE

CREATE TABLE applicants (
    applicant_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    surname VARCHAR(100) NOT NULL,

    gender_id INT NOT NULL,
    date_of_birth DATE NOT NULL,
    marital_status_id INT NOT NULL,

    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city INT NOT NULL,
    state INT NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country INT NOT NULL,

    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,

    current_designation VARCHAR(150),
    total_experience_years DECIMAL(4,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (gender_id) REFERENCES genders(gender_id),
	FOREIGN KEY (city) REFERENCES cities(city_id),
	FOREIGN KEY (state) REFERENCES states(state_id),
    FOREIGN KEY (country) REFERENCES countries(country_id),
    FOREIGN KEY (marital_status_id) REFERENCES marital_statuses(marital_status_id)
);

-- EDUCATION DETAILS

CREATE TABLE applicant_educations (
    applicant_education_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,
    course_type_id INT NOT NULL,

    board_or_university VARCHAR(255) NOT NULL,
    passing_year YEAR NOT NULL,
    percentage DECIMAL(5,2),

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE,
    FOREIGN KEY (course_type_id) REFERENCES course_types(course_type_id)
);


-- WORK EXPERIENCE

CREATE TABLE applicant_work_experiences (
    applicant_work_experience_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,

    company_name VARCHAR(255) NOT NULL,
    designation VARCHAR(150) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current_job BOOLEAN DEFAULT FALSE,
    job_description TEXT,

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE
);


-- LANGUAGES KNOWN

CREATE TABLE applicant_languages (
    applicant_language_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,
    language_id INT NOT NULL,

    can_read BOOLEAN DEFAULT FALSE,
    can_write BOOLEAN DEFAULT FALSE,
    can_speak BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(language_id)
);


-- TECHNOLOGIES

CREATE TABLE applicant_technologies (
    applicant_technology_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,
	technology_id INT NOT NULL,
    proficiency_level_id INT NOT NULL,

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE,
    FOREIGN KEY (technology_id) REFERENCES technologies(technology_id),
    FOREIGN KEY (proficiency_level_id) REFERENCES proficiency_levels(proficiency_level_id)
);


-- REFERENCE DETAILS

CREATE TABLE applicant_references (
    applicant_reference_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,

    reference_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(150),
    designation VARCHAR(150),
    phone_number VARCHAR(20),
    email VARCHAR(150),

    reference_relationship_id INT NOT NULL,

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE,
    FOREIGN KEY (reference_relationship_id) REFERENCES reference_relationships(reference_relationship_id)
);
SET FOREIGN_KEY_CHECKS= 0 ;

select * from applicant_references;

select * from applicant_languages;


SELECT at.applicant_id,
 t.technology_name,
 p.proficiency_level_name
 FROM applicant_technologies at
 JOIN technologies t
 ON t.technology_id = at.technology_id
 JOIN proficiency_levels p 
 ON p.proficiency_level_id=at.proficiency_level_id
 WHERE at.applicant_id = 1;




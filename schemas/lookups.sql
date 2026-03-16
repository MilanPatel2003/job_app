-- =========================
-- GENDERS
-- =========================
INSERT INTO genders (gender_name) VALUES
('Male'),
('Female'),
('Other');

INSERT INTO states (state_name) VALUES
('Andhra Pradesh'),
('Arunachal Pradesh'),
('Assam'),
('Bihar'),
('Chhattisgarh'),
('Goa'),
('Gujarat'),
('Haryana'),
('Himachal Pradesh'),
('Jharkhand'),
('Karnataka'),
('Kerala'),
('Madhya Pradesh'),
('Maharashtra'),
('Manipur'),
('Meghalaya'),
('Mizoram'),
('Nagaland'),
('Odisha'),
('Punjab'),
('Rajasthan'),
('Sikkim'),
('Tamil Nadu'),
('Telangana'),
('Tripura'),
('Uttar Pradesh'),
('Uttarakhand'),
('West Bengal');


-- =========================
-- MARITAL STATUSES
-- =========================
INSERT INTO marital_statuses (marital_status_name) VALUES
('Unmarried'),
('Married'),
('Divorced'),
('Widowed');


-- =========================
-- COURSE TYPES
-- =========================
INSERT INTO course_types (course_type_name) VALUES
('SSC'),
('HSC'),
('Diploma'),
('ITI'),
('BA'),
('BSc'),
('BCom'),
('BCA'),
('BBA'),
('BE'),
('BTech'),
('LLB'),
('MA'),
('MSc'),
('MCom'),
('MCA'),
('MBA'),
('ME'),
('MTech'),
('LLM'),
('PhD');

-- =========================
-- LANGUAGES
-- =========================
INSERT INTO languages (language_name) VALUES
('English'),
('Hindi'),
('Gujarati'),
('Spanish'),
('French'),
('German'),
('Chinese'),
('Japanese');


-- =========================
-- PROFICIENCY LEVELS
-- =========================
INSERT INTO proficiency_levels (proficiency_level_name) VALUES
('Beginner'),
('Intermediate'),
('Advanced'),
('Expert');

-- =========================
-- TECHNOLOGIES
-- =========================

INSERT INTO technologies (technology_name) VALUES
('Python'), ('JavaScript'), ('TypeScript'), ('Java'), ('C#'),
('Go'), ('Rust'), ('PHP'), ('Swift'), ('Kotlin'),
('React'), ('Node.js'), ('Angular'), ('Django'), ('Spring Boot'),
('PostgreSQL'), ('MongoDB'), ('Redis'), ('MySQL'), ('Docker'),
('Kubernetes'), ('AWS'), ('Azure'), ('Terraform'), ('Git'),
('TensorFlow'), ('PyTorch'), ('GraphQL'), ('Elasticsearch');

-- =========================
-- REFERENCE RELATIONSHIPS
-- =========================
INSERT INTO reference_relationships (relationship_name) VALUES
('Friend'),
('Colleague'),
('Manager'),
('Supervisor'),
('Professor'),
('Mentor');


SELECT * FROM applicants;
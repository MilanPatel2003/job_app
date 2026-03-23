-- =========================
-- DYNAMIC COMBO SYSTEM
-- =========================

CREATE TABLE combo_master (
    combo_id INT AUTO_INCREMENT PRIMARY KEY,
    combo_name VARCHAR(100) NOT NULL UNIQUE COMMENT 'Unique identifier for the combo (e.g., gender, state, marital_status)',
    combo_label VARCHAR(255) NOT NULL COMMENT 'Display label for the combo',
    html_element_type ENUM('select', 'radio', 'checkbox', 'multiselect') NOT NULL DEFAULT 'select',
    html_name VARCHAR(100) NOT NULL COMMENT 'HTML name attribute',
    html_id VARCHAR(100) NOT NULL COMMENT 'HTML id attribute',
    html_class VARCHAR(255) COMMENT 'HTML class attribute',
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE combo_options (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    combo_id INT NOT NULL,
    option_value VARCHAR(100) NOT NULL COMMENT 'Value for HTML option/input',
    option_label VARCHAR(255) NOT NULL COMMENT 'Display label',
    parent_option_id INT NULL COMMENT 'For hierarchical relationships (e.g., city → state)',
    sort_order INT DEFAULT 0,
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    metadata JSON COMMENT 'Additional data like color, icon, description',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (combo_id) REFERENCES combo_master(combo_id) ON DELETE CASCADE,
    FOREIGN KEY (parent_option_id) REFERENCES combo_options(option_id) ON DELETE SET NULL,
    
    UNIQUE KEY unique_combo_option (combo_id, option_value)
);

-- =========================
-- MAIN TABLE (UPDATED FOREIGN KEYS)
-- ================== 
CREATE TABLE applicants (
    applicant_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    surname VARCHAR(100) NOT NULL,

    gender_option_id INT NOT NULL COMMENT 'References combo_options.option_id',
    date_of_birth DATE NOT NULL,
    marital_status_option_id INT NOT NULL COMMENT 'References combo_options.option_id',

    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city_option_id INT NOT NULL COMMENT 'References combo_options.option_id',
    state_option_id INT NOT NULL COMMENT 'References combo_options.option_id',
    postal_code VARCHAR(20) NOT NULL,
    country_option_id INT NOT NULL COMMENT 'References combo_options.option_id',

    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,

    current_designation VARCHAR(150),
    total_experience_years DECIMAL(4,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (gender_option_id) REFERENCES combo_options(option_id),
    FOREIGN KEY (marital_status_option_id) REFERENCES combo_options(option_id),
    FOREIGN KEY (city_option_id) REFERENCES combo_options(option_id),
    FOREIGN KEY (state_option_id) REFERENCES combo_options(option_id),
    FOREIGN KEY (country_option_id) REFERENCES combo_options(option_id)
);

-- =========================
-- EDUCATION DETAILS (UPDATED)
-- =========================

CREATE TABLE applicant_educations (
    applicant_education_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,
    course_type_option_id INT NOT NULL COMMENT 'References combo_options.option_id',

    board_or_university VARCHAR(255) NOT NULL,
    passing_year YEAR NOT NULL,
    percentage DECIMAL(5,2),

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE,
    FOREIGN KEY (course_type_option_id) REFERENCES combo_options(option_id)
);

-- =========================
-- LANGUAGES KNOWN (UPDATED)
-- =========================

CREATE TABLE applicant_languages (
    applicant_language_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,
    language_option_id INT NOT NULL COMMENT 'References combo_options.option_id',

    can_read BOOLEAN DEFAULT FALSE,
    can_write BOOLEAN DEFAULT FALSE,
    can_speak BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE,
    FOREIGN KEY (language_option_id) REFERENCES combo_options(option_id)
);

-- =========================
-- TECHNOLOGIES (UPDATED)
-- =========================

CREATE TABLE applicant_technologies (
    applicant_technology_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,
    technology_option_id INT NOT NULL COMMENT 'References combo_options.option_id',
    proficiency_level_option_id INT NOT NULL COMMENT 'References combo_options.option_id',

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE,
    FOREIGN KEY (technology_option_id) REFERENCES combo_options(option_id),
    FOREIGN KEY (proficiency_level_option_id) REFERENCES combo_options(option_id)
);

-- =========================
-- REFERENCE DETAILS (UPDATED)
-- =========================

CREATE TABLE applicant_references (
    applicant_reference_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,

    reference_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(150),
    designation VARCHAR(150),
    phone_number VARCHAR(20),
    email VARCHAR(150),

    reference_relationship_option_id INT NOT NULL COMMENT 'References combo_options.option_id',

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE,
    FOREIGN KEY (reference_relationship_option_id) REFERENCES combo_options(option_id)
);

-- =========================
-- SAMPLE DATA FOR COMBO SYSTEM
-- =========================

-- Insert combo definitions
INSERT INTO combo_master (combo_name, combo_label, html_element_type, html_name, html_id, html_class) VALUES
('gender', 'Gender', 'radio', 'gender', 'genderInput', 'form-control'),
('marital_status', 'Marital Status', 'select', 'marital_status', 'maritalStatus', 'form-select'),
('state', 'State', 'select', 'state', 'stateSelect', 'form-select state-combo'),
('city', 'City', 'select', 'city', 'citySelect', 'form-select city-combo'),
('country', 'Country', 'select', 'country', 'countrySelect', 'form-select'),
('course_type', 'Course Type', 'select', 'course_type', 'courseType', 'form-select'),
('language', 'Language', 'checkbox', 'languages[]', 'languageGroup', 'form-check-input'),
('proficiency_level', 'Proficiency Level', 'select', 'proficiency_level', 'proficiencyLevel', 'form-select'),
('technology', 'Technology', 'multiselect', 'technologies[]', 'techSelect', 'form-select multiple'),
('reference_relationship', 'Reference Relationship', 'select', 'reference_relationship', 'refRelationship', 'form-select');

-- Insert options (sample data)
INSERT INTO combo_options (combo_id, option_value, option_label, sort_order, is_default) VALUES
-- Gender options (combo_id = 1)
(1, 'male', 'Male', 1, FALSE),
(1, 'female', 'Female', 2, FALSE),
(1, 'other', 'Other', 3, FALSE),

-- Marital Status (combo_id = 2)
(2, 'single', 'Single', 1, TRUE),
(2, 'married', 'Married', 2, FALSE),
(2, 'divorced', 'Divorced', 3, FALSE),

-- States (combo_id = 3)
(3, 'MH', 'Maharashtra', 1, FALSE),
(3, 'DL', 'Delhi', 2, FALSE),
(3, 'KA', 'Karnataka', 3, FALSE),

-- Cities with parent relationship (combo_id = 4)
(4, 'MUM', 'Mumbai', 1, FALSE, 1), -- parent_option_id = 1 (Maharashtra)
(4, 'PUN', 'Pune', 2, FALSE, 1),   -- parent_option_id = 1
(4, 'ND', 'New Delhi', 3, FALSE, 2), -- parent_option_id = 2
(4, 'BLR', 'Bengaluru', 4, FALSE, 3), -- parent_option_id = 3

-- Countries (combo_id = 5)
(5, 'IN', 'India', 1, TRUE),
(5, 'US', 'United States', 2, FALSE),
(5, 'UK', 'United Kingdom', 3, FALSE);



sql Copy

-- =========================
-- DYNAMIC COMBO SYSTEM
-- =========================

CREATE TABLE combo_master (
    combo_id INT AUTO_INCREMENT PRIMARY KEY,
    combo_name VARCHAR(100) NOT NULL UNIQUE COMMENT 'Unique identifier for the combo (e.g., gender, state, marital_status)',
    combo_label VARCHAR(255) NOT NULL COMMENT 'Display label for the combo',
    html_element_type ENUM('select', 'radio', 'checkbox', 'multiselect') NOT NULL DEFAULT 'select',
    html_name VARCHAR(100) NOT NULL COMMENT 'HTML name attribute',
    html_id VARCHAR(100) NOT NULL COMMENT 'HTML id attribute',
    html_class VARCHAR(255) COMMENT 'HTML class attribute',
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE combo_options (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    combo_id INT NOT NULL,
    option_value VARCHAR(100) NOT NULL COMMENT 'Value for HTML option/input',
    option_label VARCHAR(255) NOT NULL COMMENT 'Display label',
    parent_option_id INT NULL COMMENT 'For hierarchical relationships (e.g., city → state)',
    sort_order INT DEFAULT 0,
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    metadata JSON COMMENT 'Additional data like color, icon, description',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (combo_id) REFERENCES combo_master(combo_id) ON DELETE CASCADE,
    FOREIGN KEY (parent_option_id) REFERENCES combo_options(option_id) ON DELETE SET NULL,
    
    UNIQUE KEY unique_combo_option (combo_id, option_value)
);

-- =========================
-- MAIN TABLE (UPDATED FOREIGN KEYS)
-- =========================

CREATE TABLE applicants (
    applicant_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    surname VARCHAR(100) NOT NULL,

    gender_option_id INT NOT NULL COMMENT 'References combo_options.option_id',
    date_of_birth DATE NOT NULL,
    marital_status_option_id INT NOT NULL COMMENT 'References combo_options.option_id',

    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city_option_id INT NOT NULL COMMENT 'References combo_options.option_id',
    state_option_id INT NOT NULL COMMENT 'References combo_options.option_id',
    postal_code VARCHAR(20) NOT NULL,
    country_option_id INT NOT NULL COMMENT 'References combo_options.option_id',

    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,

    current_designation VARCHAR(150),
    total_experience_years DECIMAL(4,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (gender_option_id) REFERENCES combo_options(option_id),
    FOREIGN KEY (marital_status_option_id) REFERENCES combo_options(option_id),
    FOREIGN KEY (city_option_id) REFERENCES combo_options(option_id),
    FOREIGN KEY (state_option_id) REFERENCES combo_options(option_id),
    FOREIGN KEY (country_option_id) REFERENCES combo_options(option_id)
);

-- =========================
-- EDUCATION DETAILS (UPDATED)
-- =========================

CREATE TABLE applicant_educations (
    applicant_education_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,
    course_type_option_id INT NOT NULL COMMENT 'References combo_options.option_id',

    board_or_university VARCHAR(255) NOT NULL,
    passing_year YEAR NOT NULL,
    percentage DECIMAL(5,2),

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE,
    FOREIGN KEY (course_type_option_id) REFERENCES combo_options(option_id)
);

-- =========================
-- LANGUAGES KNOWN (UPDATED)
-- =========================

CREATE TABLE applicant_languages (
    applicant_language_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,
    language_option_id INT NOT NULL COMMENT 'References combo_options.option_id',

    can_read BOOLEAN DEFAULT FALSE,
    can_write BOOLEAN DEFAULT FALSE,
    can_speak BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE,
    FOREIGN KEY (language_option_id) REFERENCES combo_options(option_id)
);

-- =========================
-- TECHNOLOGIES (UPDATED)
-- =========================

CREATE TABLE applicant_technologies (
    applicant_technology_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,
    technology_option_id INT NOT NULL COMMENT 'References combo_options.option_id',
    proficiency_level_option_id INT NOT NULL COMMENT 'References combo_options.option_id',

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE,
    FOREIGN KEY (technology_option_id) REFERENCES combo_options(option_id),
    FOREIGN KEY (proficiency_level_option_id) REFERENCES combo_options(option_id)
);

-- =========================
-- REFERENCE DETAILS (UPDATED)
-- =========================

CREATE TABLE applicant_references (
    applicant_reference_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,

    reference_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(150),
    designation VARCHAR(150),
    phone_number VARCHAR(20),
    email VARCHAR(150),

    reference_relationship_option_id INT NOT NULL COMMENT 'References combo_options.option_id',

    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE,
    FOREIGN KEY (reference_relationship_option_id) REFERENCES combo_options(option_id)
);

-- =========================
-- SAMPLE DATA FOR COMBO SYSTEM
-- =========================

-- Insert combo definitions
INSERT INTO combo_master (combo_name, combo_label, html_element_type, html_name, html_id, html_class) VALUES
('gender', 'Gender', 'radio', 'gender', 'genderInput', 'form-control'),
('marital_status', 'Marital Status', 'select', 'marital_status', 'maritalStatus', 'form-select'),
('state', 'State', 'select', 'state', 'stateSelect', 'form-select state-combo'),
('city', 'City', 'select', 'city', 'citySelect', 'form-select city-combo'),
('country', 'Country', 'select', 'country', 'countrySelect', 'form-select'),
('course_type', 'Course Type', 'select', 'course_type', 'courseType', 'form-select'),
('language', 'Language', 'checkbox', 'languages[]', 'languageGroup', 'form-check-input'),
('proficiency_level', 'Proficiency Level', 'select', 'proficiency_level', 'proficiencyLevel', 'form-select'),
('technology', 'Technology', 'multiselect', 'technologies[]', 'techSelect', 'form-select multiple'),
('reference_relationship', 'Reference Relationship', 'select', 'reference_relationship', 'refRelationship', 'form-select');

-- Insert options (sample data)
INSERT INTO combo_options (combo_id, option_value, option_label, sort_order, is_default) VALUES
-- Gender options (combo_id = 1)
(1, 'male', 'Male', 1, FALSE),
(1, 'female', 'Female', 2, FALSE),
(1, 'other', 'Other', 3, FALSE),

-- Marital Status (combo_id = 2)
(2, 'single', 'Single', 1, TRUE),
(2, 'married', 'Married', 2, FALSE),
(2, 'divorced', 'Divorced', 3, FALSE),

-- States (combo_id = 3)
(3, 'MH', 'Maharashtra', 1, FALSE),
(3, 'DL', 'Delhi', 2, FALSE),
(3, 'KA', 'Karnataka', 3, FALSE),

-- Cities with parent relationship (combo_id = 4)
(4, 'MUM', 'Mumbai', 1, FALSE, 1), -- parent_option_id = 1 (Maharashtra)
(4, 'PUN', 'Pune', 2, FALSE, 1),   -- parent_option_id = 1
(4, 'ND', 'New Delhi', 3, FALSE, 2), -- parent_option_id = 2
(4, 'BLR', 'Bengaluru', 4, FALSE, 3), -- parent_option_id = 3

-- Countries (combo_id = 5)
(5, 'IN', 'India', 1, TRUE),
(5, 'US', 'United States', 2, FALSE),
(5, 'UK', 'United Kingdom', 3, FALSE);



Why this structure enables dynamic frontend generation:

    Single Source of Truth: All combos are defined in two tables instead of multiple lookup tables
    HTML Metadata: Each combo has html_element_type, html_name, html_id, html_class for direct frontend rendering
    Hierarchical Support: parent_option_id handles relationships like state→city
    Flexible Element Types: Supports select, radio, checkbox, and multiselect inputs
    Easy Frontend Integration: Your JavaScript can fetch a combo by name and generate the complete HTML structure
    Data Consistency: All foreign keys now point to combo_options.option_id

Frontend generation example (conceptual):
javascript Copy

// Fetch combo by name
const genderCombo = await fetchCombo('gender');
// Returns: {combo_id: 1, html_element_type: 'radio', html_name: 'gender', options: [...]}

// Generate HTML based on html_element_type
if(genderCombo.html_element_type === 'radio') {
    // Generate radio buttons with name="gender"
}

The schema maintains all your existing relationships while making the lookup system completely dynamic and frontend-ready.

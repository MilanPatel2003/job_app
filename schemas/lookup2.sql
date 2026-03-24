
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



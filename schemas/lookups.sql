-- =========================
-- GENDERS
-- =========================
INSERT INTO genders (gender_name) VALUES
('Male'),
('Female'),
('Other');


-- =========================
-- STATES
-- =========================

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
-- CITIES
-- =========================

INSERT INTO cities (state_id, city_name)
SELECT s.state_id, c.city_name
FROM states s
JOIN (
SELECT 'Andhra Pradesh' state_name,'Visakhapatnam' city_name
UNION ALL SELECT 'Andhra Pradesh','Vijayawada'
UNION ALL SELECT 'Andhra Pradesh','Guntur'
UNION ALL SELECT 'Andhra Pradesh','Nellore'
UNION ALL SELECT 'Andhra Pradesh','Tirupati'

UNION ALL SELECT 'Arunachal Pradesh','Itanagar'
UNION ALL SELECT 'Arunachal Pradesh','Tawang'
UNION ALL SELECT 'Arunachal Pradesh','Pasighat'

UNION ALL SELECT 'Assam','Guwahati'
UNION ALL SELECT 'Assam','Silchar'
UNION ALL SELECT 'Assam','Dibrugarh'
UNION ALL SELECT 'Assam','Jorhat'

UNION ALL SELECT 'Bihar','Patna'
UNION ALL SELECT 'Bihar','Gaya'
UNION ALL SELECT 'Bihar','Muzaffarpur'
UNION ALL SELECT 'Bihar','Bhagalpur'

UNION ALL SELECT 'Chhattisgarh','Raipur'
UNION ALL SELECT 'Chhattisgarh','Bhilai'
UNION ALL SELECT 'Chhattisgarh','Bilaspur'

UNION ALL SELECT 'Goa','Panaji'
UNION ALL SELECT 'Goa','Margao'
UNION ALL SELECT 'Goa','Vasco da Gama'

UNION ALL SELECT 'Gujarat','Ahmedabad'
UNION ALL SELECT 'Gujarat','Surat'
UNION ALL SELECT 'Gujarat','Vadodara'
UNION ALL SELECT 'Gujarat','Rajkot'
UNION ALL SELECT 'Gujarat','Gandhinagar'
UNION ALL SELECT 'Gujarat','Bhavnagar'
UNION ALL SELECT 'Gujarat','Jamnagar'
UNION ALL SELECT 'Gujarat','Junagadh'
UNION ALL SELECT 'Gujarat','Anand'
UNION ALL SELECT 'Gujarat','Mehsana'

UNION ALL SELECT 'Haryana','Gurgaon'
UNION ALL SELECT 'Haryana','Faridabad'
UNION ALL SELECT 'Haryana','Panipat'
UNION ALL SELECT 'Haryana','Ambala'

UNION ALL SELECT 'Himachal Pradesh','Shimla'
UNION ALL SELECT 'Himachal Pradesh','Manali'
UNION ALL SELECT 'Himachal Pradesh','Dharamshala'

UNION ALL SELECT 'Jharkhand','Ranchi'
UNION ALL SELECT 'Jharkhand','Jamshedpur'
UNION ALL SELECT 'Jharkhand','Dhanbad'

UNION ALL SELECT 'Karnataka','Bangalore'
UNION ALL SELECT 'Karnataka','Mysore'
UNION ALL SELECT 'Karnataka','Mangalore'
UNION ALL SELECT 'Karnataka','Hubli'
UNION ALL SELECT 'Karnataka','Belgaum'

UNION ALL SELECT 'Kerala','Kochi'
UNION ALL SELECT 'Kerala','Thiruvananthapuram'
UNION ALL SELECT 'Kerala','Kozhikode'
UNION ALL SELECT 'Kerala','Thrissur'

UNION ALL SELECT 'Madhya Pradesh','Bhopal'
UNION ALL SELECT 'Madhya Pradesh','Indore'
UNION ALL SELECT 'Madhya Pradesh','Gwalior'
UNION ALL SELECT 'Madhya Pradesh','Jabalpur'

UNION ALL SELECT 'Maharashtra','Mumbai'
UNION ALL SELECT 'Maharashtra','Pune'
UNION ALL SELECT 'Maharashtra','Nagpur'
UNION ALL SELECT 'Maharashtra','Nashik'
UNION ALL SELECT 'Maharashtra','Aurangabad'
UNION ALL SELECT 'Maharashtra','Thane'

UNION ALL SELECT 'Manipur','Imphal'
UNION ALL SELECT 'Meghalaya','Shillong'
UNION ALL SELECT 'Mizoram','Aizawl'
UNION ALL SELECT 'Nagaland','Kohima'

UNION ALL SELECT 'Odisha','Bhubaneswar'
UNION ALL SELECT 'Odisha','Cuttack'
UNION ALL SELECT 'Odisha','Rourkela'

UNION ALL SELECT 'Punjab','Ludhiana'
UNION ALL SELECT 'Punjab','Amritsar'
UNION ALL SELECT 'Punjab','Jalandhar'

UNION ALL SELECT 'Rajasthan','Jaipur'
UNION ALL SELECT 'Rajasthan','Jodhpur'
UNION ALL SELECT 'Rajasthan','Udaipur'
UNION ALL SELECT 'Rajasthan','Kota'
UNION ALL SELECT 'Rajasthan','Ajmer'
UNION ALL SELECT 'Rajasthan','Bikaner'

UNION ALL SELECT 'Sikkim','Gangtok'

UNION ALL SELECT 'Tamil Nadu','Chennai'
UNION ALL SELECT 'Tamil Nadu','Coimbatore'
UNION ALL SELECT 'Tamil Nadu','Madurai'
UNION ALL SELECT 'Tamil Nadu','Salem'
UNION ALL SELECT 'Tamil Nadu','Tiruchirappalli'

UNION ALL SELECT 'Telangana','Hyderabad'
UNION ALL SELECT 'Telangana','Warangal'
UNION ALL SELECT 'Telangana','Karimnagar'

UNION ALL SELECT 'Tripura','Agartala'

UNION ALL SELECT 'Uttar Pradesh','Lucknow'
UNION ALL SELECT 'Uttar Pradesh','Kanpur'
UNION ALL SELECT 'Uttar Pradesh','Varanasi'
UNION ALL SELECT 'Uttar Pradesh','Agra'
UNION ALL SELECT 'Uttar Pradesh','Noida'
UNION ALL SELECT 'Uttar Pradesh','Ghaziabad'

UNION ALL SELECT 'Uttarakhand','Dehradun'
UNION ALL SELECT 'Uttarakhand','Haridwar'
UNION ALL SELECT 'Uttarakhand','Rishikesh'

UNION ALL SELECT 'West Bengal','Kolkata'
UNION ALL SELECT 'West Bengal','Howrah'
UNION ALL SELECT 'West Bengal','Durgapur'
UNION ALL SELECT 'West Bengal','Siliguri'
) c
ON s.state_name = c.state_name;


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
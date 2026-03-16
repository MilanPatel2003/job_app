SELECT 
    a.applicant_id,
    a.first_name,
    a.middle_name,
    a.surname,
    g.gender_name,
    a.date_of_birth,
    ms.marital_status_names AS marital_status,
    a.address_line1,
    a.address_line2,
    c.city_name,
    s.state_name,
    a.postal_code,
    a.country,
    a.phone_number,
    a.email,
    a.current_designation,
    a.total_experience_years,
    a.created_at
FROM applicants a
JOIN genders g 
    ON a.gender_id = g.gender_id
JOIN marital_statuses ms 
    ON a.marital_status_id = ms.marital_status_id
JOIN cities c 
    ON a.city = c.city_id
JOIN states s 
    ON a.state = s.state_id
WHERE a.applicant_id = 1;
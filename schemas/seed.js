import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Dev@1234",
  database: "job_application",
});

const firstNames = [
  "Aarav","Vivaan","Aditya","Vihaan","Arjun","Sai","Reyansh","Krishna","Ishaan","Shaurya",
  "Ayaan","Kabir","Ananya","Diya","Ira","Myra","Aadhya","Anika","Navya","Sara"
];

const surnames = [
  "Patel","Sharma","Verma","Gupta","Mehta","Joshi","Reddy","Nair","Iyer","Singh",
  "Khan","Das","Choudhary","Pillai","Shetty","Bansal","Kapoor","Agarwal","Jain","Trivedi"
];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomBool = () => Math.random() > 0.5;

const getRandomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const run = async () => {
  const [states] = await db.execute("SELECT * FROM states");
  const [cities] = await db.execute("SELECT * FROM cities");
  const [genders] = await db.execute("SELECT * FROM genders");
  const [maritals] = await db.execute("SELECT * FROM marital_statuses");
  const [courses] = await db.execute("SELECT * FROM course_types");
  const [languages] = await db.execute("SELECT * FROM languages");
  const [techs] = await db.execute("SELECT * FROM technologies");
  const [levels] = await db.execute("SELECT * FROM proficiency_levels");
  const [relations] = await db.execute("SELECT * FROM reference_relationships");

  for (let i = 0; i < 500; i++) {
    const first = random(firstNames);
    const last = random(surnames);

    const gender = random(genders);
    const marital = random(maritals);
    const state = random(states);

    const stateCities = cities.filter(c => c.state_id === state.state_id);
    const city = random(stateCities);

    const email = `${first.toLowerCase()}.${last.toLowerCase()}${i}@gmail.com`;

    const [result] = await db.execute(
      `INSERT INTO applicants 
      (first_name, surname, gender_id, date_of_birth, marital_status_id,
       address_line1, city, state, postal_code, country,
       phone_number, email, current_designation, total_experience_years)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        first,
        last,
        gender.gender_id,
        getRandomDate(new Date(1990,0,1), new Date(2002,0,1)),
        marital.marital_status_id,
        `Flat ${Math.floor(Math.random()*200)}, ${city.city_name}`,
        city.city_id,
        state.state_id,
        380000 + Math.floor(Math.random()*999),
        "India",
        `9${Math.floor(100000000 + Math.random()*900000000)}`,
        email,
        "Software Engineer",
        (Math.random()*5).toFixed(1)
      ]
    );

    const applicantId = result.insertId;

    // 🎓 EDUCATION
    for (let j = 0; j < 2; j++) {
      const course = random(courses);
      await db.execute(
        `INSERT INTO applicant_educations 
        (applicant_id, course_type_id, board_or_university, passing_year, percentage)
        VALUES (?,?,?,?,?)`,
        [
          applicantId,
          course.course_type_id,
          "Gujarat University",
          2015 + Math.floor(Math.random()*8),
          (60 + Math.random()*30).toFixed(2)
        ]
      );
    }

    // 💼 WORK EXPERIENCE
    await db.execute(
      `INSERT INTO applicant_work_experiences
      (applicant_id, company_name, designation, start_date, end_date, is_current_job)
      VALUES (?,?,?,?,?,?)`,
      [
        applicantId,
        "TCS",
        "Developer",
        "2020-01-01",
        null,
        true
      ]
    );

    // 🌐 LANGUAGES
    for (let j = 0; j < 2; j++) {
      const lang = random(languages);
      await db.execute(
        `INSERT INTO applicant_languages
        (applicant_id, language_id, can_read, can_write, can_speak)
        VALUES (?,?,?,?,?)`,
        [
          applicantId,
          lang.language_id,
          randomBool(),
          randomBool(),
          true
        ]
      );
    }

    // 🧠 TECHNOLOGIES
    for (let j = 0; j < 3; j++) {
      const tech = random(techs);
      const level = random(levels);

      await db.execute(
        `INSERT INTO applicant_technologies
        (applicant_id, technology_id, proficiency_level_id)
        VALUES (?,?,?)`,
        [applicantId, tech.technology_id, level.proficiency_level_id]
      );
    }

    // 👥 REFERENCES
    const relation = random(relations);
    await db.execute(
      `INSERT INTO applicant_references
      (applicant_id, reference_name, company_name, designation, phone_number, email, reference_relationship_id)
      VALUES (?,?,?,?,?,?,?)`,
      [
        applicantId,
        `${random(firstNames)} ${random(surnames)}`,
        "Infosys",
        "Manager",
        `9${Math.floor(100000000 + Math.random()*900000000)}`,
        `ref${i}@mail.com`,
        relation.reference_relationship_id
      ]
    );
  }

  console.log("✅ 500 records inserted successfully");
};

run();
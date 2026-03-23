export async function generateQuery(search) {
    // const searchTerm = "$Milan^9157770634(milan@gmail.com#softwaredeveloper_2$kaksha";
const symbols = ["$", "^", "(", "#", "_"];
let parts = [];

let start = 0;

for (let i = 0; i <= search.length; i++) {
  if (symbols.includes(search[i]) || i == search.length) {
    let str = search.substring(start, i);
    if (str) {
      parts.push(str);
      start = i;
    }
  }
}
console.log(parts);



let result = {
  firstname: [],
  phone: [],
  email: [],
  designation: [],
  experience: [],
};

for (let i = 0; i < parts.length; i++) {
  const prefix = parts[i][0];
  const value = parts[i].slice(1);
  if (prefix == "$") {
    result.firstname.push(value);
  }
  if (prefix == "^") {
    result.phone.push(value);
  }
  if (prefix == "(") {
    result.email.push(value);
  }
  if (prefix == "#") {
    result.designation.push(value);
  }
  if (prefix == "_") {
    result.experience.push(value);
  }
}


let query = `WHERE 1=1 `;

if (result.firstname.length) {
  query += "AND first_name IN" + "('" + result.firstname.join("','") + "') ";
}
if (result.email.length) {
  query += "AND email IN" + "('" + result.email.join("','") + "') ";
}
if (result.designation.length) {
  query += "AND current_designation IN" + "('" + result.designation.join("','") + "') ";
}
if (result.experience.length) {
  query += "AND total_experience_years IN" + "('" + result.experience.join("','") + "') ";
}
if (result.phone.length) {
  query += "AND phone_number IN" + "('" + result.phone.join("','") + "') ";
}


return query
}



// export async function generateQuery(search) {
//   const symbols = ["$", "^", "(", "#", "_"];

//   const result = {
//     firstname: [],
//     phone: [],
//     email: [],
//     designation: [],
//     experience: [],
//   };

//   let start = 0;
//   for (let i = 0; i <= search.length; i++) {
//     if (symbols.includes(search[i]) || i === search.length) {
//       const str = search.substring(start, i);
//       if (str) {
//         const prefix = str[0];
//         const value = str.slice(1);
//         if (prefix === "$") result.firstname.push(value);
//         if (prefix === "^") result.phone.push(value);
//         if (prefix === "(") result.email.push(value);
//         if (prefix === "#") result.designation.push(value);
//         if (prefix === "_") result.experience.push(value);
//       }
//       start = i;
//     }
//   }

//   let query = `WHERE 1=1 `;
//   if (result.firstname.length) {
//     query += "AND first_name IN ('" + result.firstname.join("','") + "') ";
//   }
//   if (result.email.length) {
//     query += "AND email IN ('" + result.email.join("','") + "') ";
//   }
//   if (result.designation.length) {
//     query += "AND current_designation IN ('" + result.designation.join("','") + "') ";
//   }
//   if (result.experience.length) {
//     query += "AND total_experience_years IN ('" + result.experience.join("','") + "') ";
//   }
//   if (result.phone.length) {
//     query += "AND phone_number IN ('" + result.phone.join("','") + "') ";
//   }

//   return query;
// }

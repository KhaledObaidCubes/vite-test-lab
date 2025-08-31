import axios from "axios";
import type { TPerson } from "../domain/contract/i-types";

//you can use the following code to simulate data receive throttling
axios.interceptors.request.use(async (config) => {
  await new Promise((res) => setTimeout(res, 10)); // delay every request by 5s
  return config;
});

// Define the type for a Person

// Fetch data from the API
const fetchPersons = (delay = 10): Promise<TPerson[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        const response = await axios.get<TPerson[]>(
          "https://654b92025b38a59f28ef5698.mockapi.io/person"
        );
        resolve(response.data);
      } catch (error) {
        console.error("Error fetching persons:", error);
        resolve([]); // Resolve with empty array on error
      }
    }, delay);
  });
};

// Example usage
// fetchPersons().then((people): object => {
//   console.log("Fetched persons:", people);
//   return people;
// });

// delayed function
const delayedSum = async (a: number, b: number): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000); // 5000 milliseconds = 5 seconds
  });
};

export { fetchPersons, delayedSum, type TPerson as IPerson };

//////////////////////////////////////////////////////////////////////////

const BASE_URL = "https://654b92025b38a59f28ef5698.mockapi.io/person"; // replace with your endpoint

/**
 * Fetch all entries
 */
async function getAllPeople() {
  const res = await fetch(BASE_URL);
  return await res.json();
}

/**
 * Add a new person
 * @param {Object} person - { user, personalInfo, firstName, lastName, email }
 */
export async function addPerson(person: any) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  });
  return await res.json();
}

/**
 * Update an existing person
 * @param {string} id - ID of the person to update
 * @param {Object} updates - Partial object with fields to update
 */
async function updatePerson(id: string, updates: any) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH", // or PUT to replace the entire object
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return await res.json();
}

/**
 * Delete a person
 * @param {string} id - ID of the person to delete
 */
async function deletePerson(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

/* ---------------------- Usage Examples ---------------------- */

// 1. Add a new person
// addPerson({
//   user: {},
//   personalInfo: {},
//   firstName: "hhhhhh",
//   lastName: "ghfhfghfghfghfgh",
//   email: "dfgdfg.doe@dfgdfg.dgdfg",
// }).then(console.log);

// // 2. Update person with id = "3"
// updatePerson("3", { email: "newemail3@example.com" }).then(console.log);

// // 3. Delete person with id = "5"
// deletePerson("5").then(console.log);

// // 4. Get all people
// getAllPeople().then(console.log);

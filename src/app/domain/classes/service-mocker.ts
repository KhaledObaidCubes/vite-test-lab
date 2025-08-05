import axios from "axios";

//you can use the following code to simulate data receive throttling
axios.interceptors.request.use(async (config) => {
  await new Promise((res) => setTimeout(res, 1)); // delay every request by 5s
  return config;
});

// Define the type for a Person
export interface IPerson {
  user: object;
  personalInfo: object;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

// Fetch data from the API
const fetchPersons = async (): Promise<IPerson[]> => {
  await new Promise((res) => setTimeout(res, 10));
  try {
    const response = await axios.get<IPerson[]>(
      "https://654b92025b38a59f28ef5698.mockapi.io/person"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching persons:", error);
    return [];
  }
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

export { fetchPersons, delayedSum };

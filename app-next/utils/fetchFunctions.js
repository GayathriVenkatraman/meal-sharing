export async function getMealById(id) {
  const res = await fetch(`http://localhost:3001/api/meals/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch meal");
  }

  return res.json();
}

export const getReservations = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/reservations/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

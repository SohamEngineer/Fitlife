export function calculateCalories({ age, gender, height, weight, activity }) {
  const w = parseFloat(weight);
  const h = parseFloat(height);
  const a = parseInt(age);

  const bmr =
    gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

  return (bmr * parseFloat(activity)).toFixed(2);
}

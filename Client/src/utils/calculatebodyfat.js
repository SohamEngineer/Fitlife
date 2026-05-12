const ACE_CATEGORIES = {
  male: [
    { label: "Essential fat", min: 2, max: 5 },
    { label: "Athletes", min: 6, max: 13 },
    { label: "Fitness", min: 14, max: 17 },
    { label: "Average", min: 18, max: 24 },
    { label: "Obese", min: 25, max: Infinity },
  ],
  female: [
    { label: "Essential fat", min: 10, max: 13 },
    { label: "Athletes", min: 14, max: 20 },
    { label: "Fitness", min: 21, max: 24 },
    { label: "Average", min: 25, max: 31 },
    { label: "Obese", min: 32, max: Infinity },
  ],
};

const IDEAL_BODY_FAT_BY_AGE = [
  { age: 20, female: 17.7, male: 8.5 },
  { age: 25, female: 18.4, male: 10.5 },
  { age: 30, female: 19.3, male: 12.7 },
  { age: 35, female: 21.5, male: 13.7 },
  { age: 40, female: 22.2, male: 15.3 },
  { age: 45, female: 22.9, male: 16.4 },
  { age: 50, female: 25.2, male: 18.9 },
  { age: 55, female: 26.3, male: 20.9 },
];

const round = (value, digits = 1) => Number(value.toFixed(digits));

const interpolateIdealBodyFat = (age, gender) => {
  if (age <= IDEAL_BODY_FAT_BY_AGE[0].age) {
    return IDEAL_BODY_FAT_BY_AGE[0][gender];
  }

  const last = IDEAL_BODY_FAT_BY_AGE[IDEAL_BODY_FAT_BY_AGE.length - 1];
  if (age >= last.age) return last[gender];

  for (let i = 0; i < IDEAL_BODY_FAT_BY_AGE.length - 1; i += 1) {
    const lower = IDEAL_BODY_FAT_BY_AGE[i];
    const upper = IDEAL_BODY_FAT_BY_AGE[i + 1];

    if (age >= lower.age && age <= upper.age) {
      const progress = (age - lower.age) / (upper.age - lower.age);
      return lower[gender] + (upper[gender] - lower[gender]) * progress;
    }
  }

  return last[gender];
};

const getCategory = (percentage, gender) => {
  const categories = ACE_CATEGORIES[gender];
  const first = categories[0];

  if (percentage < first.min) return "Below essential range";

  return categories.find((category) => percentage >= category.min && percentage <= category.max)?.label || "Average";
};

export const getBodyFatCategoryRanges = () => ACE_CATEGORIES;

export function calculateBodyFat({
  age,
  gender,
  height,
  weight,
  neck,
  waist,
  hip,
}) {
  const parsed = {
    age: Number(age),
    height: Number(height),
    weight: Number(weight),
    neck: Number(neck),
    waist: Number(waist),
    hip: gender === "female" ? Number(hip) : 0,
  };

  if (Object.values(parsed).some((value) => Number.isNaN(value))) {
    throw new Error("Enter valid numbers for all required fields.");
  }

  if (gender === "male" && parsed.waist <= parsed.neck) {
    throw new Error("Waist must be greater than neck for the Navy method.");
  }

  if (gender === "female" && parsed.waist + parsed.hip <= parsed.neck) {
    throw new Error("Waist plus hip must be greater than neck for the Navy method.");
  }

  const denominator =
    gender === "male"
      ? 1.0324 - 0.19077 * Math.log10(parsed.waist - parsed.neck) + 0.15456 * Math.log10(parsed.height)
      : 1.29579 - 0.35004 * Math.log10(parsed.waist + parsed.hip - parsed.neck) + 0.221 * Math.log10(parsed.height);

  const bodyFatPercentage = 495 / denominator - 450;
  const bmi = parsed.weight / (parsed.height / 100) ** 2;
  const bmiMethod = 1.2 * bmi + 0.23 * parsed.age - (gender === "male" ? 16.2 : 5.4);
  const fatMass = parsed.weight * (bodyFatPercentage / 100);
  const leanMass = parsed.weight - fatMass;
  const idealBodyFat = interpolateIdealBodyFat(parsed.age, gender);
  const bodyFatToLose = Math.max(0, parsed.weight * ((bodyFatPercentage - idealBodyFat) / 100));

  return {
    bodyFatPercentage: round(bodyFatPercentage),
    category: getCategory(bodyFatPercentage, gender),
    fatMass: round(fatMass),
    leanMass: round(leanMass),
    idealBodyFat: round(idealBodyFat),
    bodyFatToLose: round(bodyFatToLose),
    bmiMethod: round(bmiMethod),
    bmi: round(bmi),
    waistToHeightRatio: round(parsed.waist / parsed.height, 2),
  };
}

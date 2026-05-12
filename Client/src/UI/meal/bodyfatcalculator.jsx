import React, { useMemo, useState } from "react";
import { FaCalculator, FaRotateLeft } from "react-icons/fa6";
import { calculateBodyFat, getBodyFatCategoryRanges } from "../../utils/calculatebodyfat";
import "./style/bodyfatcalculator.css";

const initialForm = {
  gender: "male",
  age: "",
  weight: "",
  height: "",
  neck: "",
  waist: "",
  hip: "",
};

const ResultRow = ({ label, value }) => (
  <div className="body-fat-result-row">
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

function BodyFatCalculator() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const ranges = useMemo(() => getBodyFatCategoryRanges(), []);

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const calculate = (event) => {
    event.preventDefault();
    setError("");

    const requiredFields = ["gender", "age", "weight", "height", "neck", "waist"];
    if (form.gender === "female") requiredFields.push("hip");

    if (requiredFields.some((field) => !form[field])) {
      setResult(null);
      setError("Fill all required measurements before calculating.");
      return;
    }

    try {
      setResult(calculateBodyFat(form));
    } catch (calculationError) {
      setResult(null);
      setError(calculationError.message);
    }
  };

  const reset = () => {
    setForm(initialForm);
    setResult(null);
    setError("");
  };

  const activeRange = ranges[form.gender];
  const markerPosition = result ? Math.min(Math.max(result.bodyFatPercentage, 2), 35) : 18;

  return (
    <section className="body-fat-calculator">
      <div className="body-fat-heading">
        <p>More tools</p>
        <h2>Body Fat Calculator</h2>
        <span>Metric U.S. Navy method with Fitlife-ready body composition insight.</span>
      </div>

      <div className="body-fat-layout">
        <form className="body-fat-card body-fat-form" onSubmit={calculate}>
          <div className="body-fat-tabs" aria-label="Gender">
            <button
              type="button"
              className={form.gender === "male" ? "active" : ""}
              onClick={() => setForm((prev) => ({ ...prev, gender: "male" }))}
            >
              Male
            </button>
            <button
              type="button"
              className={form.gender === "female" ? "active" : ""}
              onClick={() => setForm((prev) => ({ ...prev, gender: "female" }))}
            >
              Female
            </button>
          </div>

          <div className="body-fat-fields">
            <label>
              Age
              <input name="age" type="number" min="18" max="80" value={form.age} onChange={updateForm} placeholder="22" />
            </label>
            <label>
              Weight (kg)
              <input name="weight" type="number" min="35" max="220" step="0.1" value={form.weight} onChange={updateForm} placeholder="103" />
            </label>
            <label>
              Height (cm)
              <input name="height" type="number" min="120" max="230" step="0.1" value={form.height} onChange={updateForm} placeholder="176" />
            </label>
            <label>
              Neck (cm)
              <input name="neck" type="number" min="20" max="80" step="0.1" value={form.neck} onChange={updateForm} placeholder="44" />
            </label>
            <label>
              Waist (cm)
              <input name="waist" type="number" min="40" max="220" step="0.1" value={form.waist} onChange={updateForm} placeholder="100" />
            </label>
            {form.gender === "female" && (
              <label>
                Hip (cm)
                <input name="hip" type="number" min="50" max="220" step="0.1" value={form.hip} onChange={updateForm} placeholder="96" />
              </label>
            )}
          </div>

          {error && <p className="body-fat-error">{error}</p>}

          <div className="body-fat-actions">
            <button type="button" className="body-fat-clear" onClick={reset}>
              <FaRotateLeft /> Clear
            </button>
            <button type="submit" className="body-fat-submit">
              <FaCalculator /> Calculate
            </button>
          </div>
        </form>

        <aside className={`body-fat-card body-fat-results ${result ? "has-result" : ""}`}>
          <div className="body-fat-result-top">
            <p>Result</p>
            <h3>{result ? `${result.bodyFatPercentage}%` : "--"}</h3>
            <span>{result ? result.category : "Complete the form to see your result"}</span>
          </div>

          <div className="body-fat-gauge" aria-hidden="true">
            <span style={{ left: `${((markerPosition - 2) / 33) * 100}%` }} />
          </div>

          <div className="body-fat-result-grid">
            <ResultRow label="Body Fat Mass" value={result ? `${result.fatMass} kg` : "--"} />
            <ResultRow label="Lean Body Mass" value={result ? `${result.leanMass} kg` : "--"} />
            <ResultRow label="Ideal for Age" value={result ? `${result.idealBodyFat}%` : "--"} />
            <ResultRow label="Fat to Lose" value={result ? `${result.bodyFatToLose} kg` : "--"} />
            <ResultRow label="BMI Method" value={result ? `${result.bmiMethod}%` : "--"} />
            <ResultRow label="Waist / Height" value={result ? result.waistToHeightRatio : "--"} />
          </div>
        </aside>
      </div>

      <div className="body-fat-reference">
        <h3>ACE body fat categories</h3>
        <div className="body-fat-reference-table">
          <div>Description</div>
          <div>Women</div>
          <div>Men</div>
          {activeRange.map((range) => {
            const femaleRange = ranges.female.find((item) => item.label === range.label);
            const maleRange = ranges.male.find((item) => item.label === range.label);
            const formatRange = (item) => (item.max === Infinity ? `${item.min}+%` : `${item.min}-${item.max}%`);

            return (
              <React.Fragment key={range.label}>
                <span>{range.label}</span>
                <span>{formatRange(femaleRange)}</span>
                <span>{formatRange(maleRange)}</span>
              </React.Fragment>
            );
          })}
        </div>
        <p>
          Uses the Calculator.net-style U.S. Navy circumference method. This is an estimate, not a medical diagnosis.
        </p>
      </div>
    </section>
  );
}

export default BodyFatCalculator;

import { useState } from "react";
import "./App.css";

const API_URL = "https://mental-health-predictor-4-3xgz.onrender.com/predict";

const initialForm = {
  age: "", gender: "", country: "", academic_level: "",
  most_used_platform: "", purpose_of_use: "",
  avg_daily_usage_hours: "", daily_unlocks: "", study_hours: "",
  physical_activity_hours: "", sleep_hours_per_night: "", stress_level: ""
};

const options = {
  gender: ["Male", "Female"],
  academic_level: ["Undergraduate", "Graduate", "High School"],
  most_used_platform: ["Facebook","LinkedIn","Instagram","Snapchat","Twitter","YouTube","TikTok","LINE","KakaoTalk","VKontakte","WhatsApp","WeChat"],
  purpose_of_use: ["Networking","Education","Entertainment","News"],
  stress_level: ["Medium","Low","Very High","High"]
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
    setPrediction(null); setError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setPrediction(null); setError("");

    const payload = {
      age: Number(form.age),
      gender: form.gender,
      country: form.country,
      academic_level: form.academic_level,
      most_used_platform: form.most_used_platform,
      purpose_of_use: form.purpose_of_use,
      avg_daily_usage_hours: Number(form.avg_daily_usage_hours),
      daily_unlocks: Number(form.daily_unlocks),
      study_hours: Number(form.study_hours),
      physical_activity_hours: Number(form.physical_activity_hours),
      sleep_hours_per_night: Number(form.sleep_hours_per_night),
      stress_level: form.stress_level
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        if (Array.isArray(data.detail)) {
          throw new Error(data.detail.map(x => `${x.loc?.at(-1) || "field"}: ${x.msg}`).join("\n"));
        }
        throw new Error(data.detail || "Prediction request failed.");
      }

      const responsePrediction = data.prediction ?? data.predicted_mental_health_score;
      if (responsePrediction === undefined || responsePrediction === null) {
        throw new Error("Prediction result was not returned by the API.");
      }

      setPrediction(responsePrediction);
    } catch (err) {
      setError(err instanceof TypeError
        ? "Cannot connect to FastAPI. Start the backend on http://127.0.0.1:8000."
        : (err.message || "Something went wrong."));
    } finally {
      setLoading(false);
    }
  };

  const select = (name, label, list, placeholder) => (
    <div className="field">
      <label>{label} <span>*</span></label>
      <select name={name} value={form[name]} onChange={change} required>
        <option value="">{placeholder}</option>
        {list.map(x => <option key={x} value={x}>{x}</option>)}
      </select>
    </div>
  );

  const number = (name, label, placeholder, min, max, step="1", unit="") => (
    <div className="field">
      <label>{label} <span>*</span></label>
      <div className={unit ? "unit-input" : ""}>
        <input name={name} type="number" min={min} max={max} step={step}
          placeholder={placeholder} value={form[name]} onChange={change} required />
        {unit && <small>{unit}</small>}
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="glow one"/><div className="glow two"/>
      <header className="navbar">
        <div className="brand"><b>M</b><div><strong>MentalHealth AI</strong><small>ML Prediction System</small></div></div>
        <div className="status"><i/> API Ready</div>
      </header>

      <section className="hero">
        <div className="badge">✦ AI POWERED ANALYSIS</div>
        <h1>Understand Your <em>Mental Health</em></h1>
        <p>Enter your lifestyle and social media information to generate a machine-learning based prediction.</p>
      </section>

      <main className="content">
        <form className="card" onSubmit={submit}>
          <div className="cardhead"><div><h2>Your Information</h2><p>Provide accurate information for the prediction.</p></div><label>12 Fields</label></div>
          <div className="grid">
            {number("age","Age","e.g. 22",10,100)}
            {select("gender","Gender",options.gender,"Select gender")}
            <div className="field"><label>Country <span>*</span></label><input name="country" placeholder="e.g. India" value={form.country} onChange={change} required /></div>
            {select("academic_level","Academic Level",options.academic_level,"Select academic level")}
            {select("most_used_platform","Most Used Platform",options.most_used_platform,"Select platform")}
            {select("purpose_of_use","Purpose of Use",options.purpose_of_use,"Select purpose")}
            {number("avg_daily_usage_hours","Daily Social Media Usage","e.g. 5",0,24,"0.1","hours")}
            {number("daily_unlocks","Daily Unlocks","e.g. 30",0)}
            {number("study_hours","Study Hours / Day","e.g. 4",0,24,"0.1","hours")}
            {number("physical_activity_hours","Physical Activity","e.g. 1",0,24,"0.1","hours")}
            {number("sleep_hours_per_night","Sleep / Night","e.g. 7",0,24,"0.1","hours")}
            {select("stress_level","Stress Level",options.stress_level,"Select stress level")}
          </div>
          <div className="actions">
            <button type="button" className="reset" onClick={() => {setForm(initialForm);setPrediction(null);setError("")}}>Reset</button>
            <button className="predict" disabled={loading}>{loading ? "⟳ Analyzing..." : "Predict Mental Health →"}</button>
          </div>
        </form>

        {error && <div className="error"><b>!</b><div><strong>Prediction Failed</strong><p>{error}</p></div></div>}
        {prediction !== null && <div className="result"><div className="check">✓</div><small>ML PREDICTION</small><h2>Prediction Result</h2><div className="value">{prediction}</div><p>This result is generated by a machine-learning model for educational purposes only. It is not a medical diagnosis.</p></div>}
      </main>
      <footer>MentalHealth AI · Machine Learning Project</footer>
    </div>
  );
}
export default App;
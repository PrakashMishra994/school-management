import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [serverMsg, setServerMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setServerMsg("");
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (k === "image" && v && v.length) {
          formData.append("image", v[0]);
        } else {
          formData.append(k, v);
        }
      });
      const res = await fetch("/api/addSchool", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setServerMsg(json.message || "School added successfully");
      reset();
    } catch (err) {
      setServerMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h1>Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="grid">
          <div className="field">
            <label>School Name</label>
            <input
              type="text"
              placeholder="e.g., St. Joseph's High School"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "At least 2 characters" }
              })}
            />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>

          <div className="field full">
            <label>Address</label>
            <input
              type="text"
              placeholder="Street, Area"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && <span className="error">{errors.address.message}</span>}
          </div>

          <div className="field">
            <label>City</label>
            <input
              type="text"
              placeholder="City"
              {...register("city", { required: "City is required" })}
            />
            {errors.city && <span className="error">{errors.city.message}</span>}
          </div>

          <div className="field">
            <label>State</label>
            <input
              type="text"
              placeholder="State"
              {...register("state", { required: "State is required" })}
            />
            {errors.state && <span className="error">{errors.state.message}</span>}
          </div>

          <div className="field">
            <label>Contact Number</label>
            <input
              type="tel"
              placeholder="10-digit mobile"
              {...register("contact", {
                required: "Contact is required",
                pattern: { value: /^[0-9]{10}$/, message: "Enter 10 digit number" }
              })}
            />
            {errors.contact && <span className="error">{errors.contact.message}</span>}
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              {...register("email_id", {
                required: "Email is required",
                pattern: { value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, message: "Invalid email" }
              })}
            />
            {errors.email_id && <span className="error">{errors.email_id.message}</span>}
          </div>

          <div className="field full">
            <label>School Image (optional)</label>
            <input type="file" accept="image/*" {...register("image")} />
          </div>
        </div>

        <button type="submit" disabled={submitting} className="btn">
          {submitting ? "Saving..." : "Save School"}
        </button>
        {serverMsg && <p className="serverMsg">{serverMsg}</p>}
      </form>

      <style jsx>{`
        .container { max-width: 960px; margin: 0 auto; padding: 24px; }
        h1 { margin-bottom: 16px; }
        .form { background: #fff; border-radius: 16px; box-shadow: 0 6px 20px rgba(0,0,0,0.06); padding: 20px; }
        .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .field { display: flex; flex-direction: column; }
        .field.full { grid-column: 1 / -1; }
        label { font-weight: 600; margin-bottom: 6px; }
        input { border: 1px solid #e5e7eb; border-radius: 10px; padding: 10px 12px; font-size: 14px; }
        .error { color: #b91c1c; font-size: 12px; margin-top: 4px; }
        .btn { margin-top: 14px; background: #111827; color: #fff; border: 0; padding: 12px 16px; border-radius: 12px; cursor: pointer; }
        .btn:disabled { opacity: .7; cursor: not-allowed; }
        .serverMsg { margin-top: 12px; }
        @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

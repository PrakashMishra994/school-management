import { useEffect, useState } from "react";
import SchoolCard from "../components/SchoolCard";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);   // always array
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");

  // fetch schools from API
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/getSchools");
        const data = await res.json();
        // ✅ ensure we only set array
        setSchools(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching schools:", err);
        setSchools([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // filter logic with safeguard
  const filtered = Array.isArray(schools)
    ? schools.filter((s) =>
        [s.name, s.address, s.city]
          .join(" ")
          .toLowerCase()
          .includes(q.toLowerCase())
      )
    : [];

  return (
    <div className="container">
      <div className="topbar">
        <h1>Schools</h1>
        <input
          className="search"
          placeholder="Search by name, address, city..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {loading && <p>Loading…</p>}

      <div className="grid">
        {filtered.map((school) => (
          <SchoolCard key={school._id} school={school} />
        ))}
        {!filtered.length && !loading && <p>No schools found.</p>}
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
        }
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }
        .search {
          flex: 1;
          max-width: 380px;
          border: 1px solid #e5e7eb;
          border-radius: 999px;
          padding: 10px 14px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        @media (max-width: 1100px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 860px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

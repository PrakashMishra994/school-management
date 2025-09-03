import Image from "next/image";
export default function SchoolCard({ school }) {
return (
<div className="card">
<div className="imageWrap">
{school.image ? (
// Use next/image for optimization; falls back to img if needed
<Image
src={school.image}
alt={school.name}
width={400}
height={250}
className="image"
/>
) : (
<div className="noImage">No Image</div>
)}
</div>
<div className="content">
<h3 className="title">{school.name}</h3>
<p className="address">{school.address}</p>
<p className="city">{school.city}</p>
</div>
<style jsx>{`
 .card { background: #fff; border-radius: 16px; box-shadow: 0 6px 20px
rgba(0,0,0,0.08); overflow: hidden; display: flex; flex-direction: column; }
 .imageWrap { position: relative; width: 100%; padding-top: 56%;
background: #f3f4f6; }
 .image { object-fit: cover; }
 .noImage { display:flex; align-items:center; justify-content:center;
height:100%; color:#888; font-size:14px; }
 .content { padding: 14px; }
 .title { margin: 0 0 6px; font-size: 18px; line-height: 1.3; }
 .address, .city { margin: 0; color: #555; font-size: 14px; }
 `}</style>
</div>
);
}

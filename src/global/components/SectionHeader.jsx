export default function SectionHeader({ title, subTitle }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      <p>{subTitle}</p>
    </div>
  );
}

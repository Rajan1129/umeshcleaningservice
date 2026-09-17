export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', as: Tag = 'h2', id }) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left';
  return (
    <div className={`flex max-w-3xl flex-col gap-3 ${alignment}`}>
      {eyebrow && <span className="eyebrow self-start">{eyebrow}</span>}
      <Tag id={id}>{title}</Tag>
      {subtitle && <p className="lede">{subtitle}</p>}
    </div>
  );
}

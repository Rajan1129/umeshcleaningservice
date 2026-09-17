import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-navy/5 bg-mist">
      <ol className="container-x flex flex-wrap items-center gap-1.5 py-3 text-sm text-slateink">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.to} className="flex items-center gap-1.5">
              {last ? (
                <span className="font-medium text-navy" aria-current="page">{item.label}</span>
              ) : (
                <>
                  <Link to={item.to} className="hover:text-aqua">{item.label}</Link>
                  <ChevronRight className="h-3.5 w-3.5 text-navy/30" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

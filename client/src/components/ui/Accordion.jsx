import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function Accordion({ items = [], defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="divide-y divide-navy/8 overflow-hidden rounded-xl2 ring-1 ring-navy/8">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="bg-white">
            <h3 className="text-base">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy hover:bg-mist"
              >
                {item.question}
                {isOpen
                  ? <Minus className="h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                  : <Plus className="h-5 w-5 shrink-0 text-teal" aria-hidden="true" />}
              </button>
            </h3>
            {isOpen && <div className="px-5 pb-5 -mt-1 max-w-prose2 text-slateink">{item.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}

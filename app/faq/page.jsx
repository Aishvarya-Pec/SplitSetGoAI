export default function FAQPage() {
  const faqs = [
    { q: "Is SplitSetGO free?", a: "Yes, it’s free for personal use." },
    { q: "Can I invite people without accounts?", a: "Yes, invite links work—recipients can sign up and join instantly." },
    { q: "What split types are supported?", a: "Equal, percentage, and exact amounts." },
  ];
  return (
    <div className="container mx-auto max-w-3xl py-24 space-y-8">
      <h1 className="text-4xl gradient-title">FAQ</h1>
      <div className="space-y-4">
        {faqs.map(({ q, a }) => (
          <div key={q} className="rounded-lg border p-4">
            <h3 className="font-semibold">{q}</h3>
            <p className="text-muted-foreground mt-1">{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



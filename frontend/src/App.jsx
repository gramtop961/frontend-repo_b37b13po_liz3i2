import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

function Section({ title, children, id }) {
  return (
    <section id={id} className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">{title}</h2>
        <div className="space-y-4 text-slate-600">{children}</div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Agence Outbound AI avec enrichissement en cascade
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl">
          Emails vérifiés et numéros personnels grâce à +16 fournisseurs de données.
          Ciblage par intent data: recrutement, nouvelles nominations, visites site,
          engagement social, variations de trafic et budget publicitaire, stack techno.
        </p>
        <a href="#contact" className="inline-block mt-10 bg-white text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-200 transition">Planifier un 1er RDV</a>
      </div>
    </div>
  );
}

function MethodCard({ step, title, points }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-6 bg-white/70 backdrop-blur shadow-sm">
      <div className="text-sm font-semibold text-slate-500">Atelier {step}</div>
      <div className="mt-1 text-xl font-semibold">{title}</div>
      <ul className="mt-4 space-y-2 list-disc list-inside text-slate-600">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

function Methodology() {
  return (
    <Section id="metho" title="Méthodologie Outbound AI">
      <div className="grid md:grid-cols-2 gap-6">
        <MethodCard
          step="1"
          title="Compréhension du business model"
          points={[
            "Diagnostic approfondi de votre offre et ICP",
            "Objectifs de revenus et contraintes",
            "Alignement avec vos priorités commerciales",
          ]}
        />
        <MethodCard
          step="2"
          title="Persona & scoring CRM"
          points={[
            "Identification des contacts à plus forte propension",
            "Analyse données CRM + signaux d'intent",
            "Priorisation des comptes & contacts",
          ]}
        />
        <MethodCard
          step="3"
          title="Copywriting multicanal"
          points={[
            "Emails personnalisés par persona",
            "Scripts de cold call alignés métier",
            "Angle basé pains/valeurs spécifiques",
          ]}
        />
        <MethodCard
          step="3 bis"
          title="Match Cold Caller"
          points={[
            "Sélection par industrie & personas",
            "Onboarding et guidelines",
            "Pilotage qualité des appels",
          ]}
        />
        <MethodCard
          step="4"
          title="Lancement & itérations"
          points={[
            "Activation des campagnes",
            "Monitoring des signaux d'intent",
            "Optimisations hebdomadaires",
          ]}
        />
      </div>
    </Section>
  );
}

function IntentGrid() {
  const items = [
    "Entreprises avec X offres d'emploi actives",
    "Recrutement de postes spécifiques",
    "Nominations < 3 mois",
    "Visites de votre site",
    "Commentaires sur posts concurrents",
    "Likes sur vos posts",
    "Hausse/Baisse de trafic site",
    "Hausse/Baisse budget publicitaire",
    "Stack techno & outils utilisés",
  ];
  return (
    <Section id="intent" title="Signaux d'intent suivis">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((t) => (
          <div key={t} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm text-slate-700">
            {t}
          </div>
        ))}
      </div>
    </Section>
  );
}

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setDone(false);

    const form = new FormData(e.currentTarget);
    const payload = {
      company: form.get("company"),
      contact_email: form.get("email"),
      contact_name: form.get("name"),
      business_model: form.get("business"),
      goals: form.get("goals"),
    };

    try {
      const res = await fetch(`${API_BASE}/workshops/1-meeting`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erreur d'envoi");
      setDone(true);
      (e.target).reset();
    } catch (err) {
      setError(err.message || "Erreur inattendue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="contact" title="Planifier un 1er RDV">
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <input name="company" required placeholder="Entreprise" className="border rounded-lg px-3 py-2" />
        <input name="name" placeholder="Nom" className="border rounded-lg px-3 py-2" />
        <input name="email" type="email" required placeholder="Email" className="border rounded-lg px-3 py-2 md:col-span-2" />
        <input name="business" required placeholder="Business model" className="border rounded-lg px-3 py-2 md:col-span-2" />
        <textarea name="goals" placeholder="Objectifs" className="border rounded-lg px-3 py-2 md:col-span-2" />
        <button disabled={loading} className="mt-2 bg-slate-900 text-white rounded-lg px-4 py-2 hover:bg-slate-700 transition md:col-span-2">
          {loading ? "Envoi..." : "Envoyer"}
        </button>
        {done && <p className="text-green-600 md:col-span-2">Merci, nous revenons vers vous rapidement.</p>}
        {error && <p className="text-red-600 md:col-span-2">{error}</p>}
      </form>
    </Section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Hero />
      <IntentGrid />
      <Methodology />
      <ContactForm />
      <footer className="py-10 text-center text-slate-500">© {new Date().getFullYear()} Outbound AI</footer>
    </div>
  );
}

import { profile } from "@/constants";
import { aliases, siteUrl } from "@/constants/seo";
import { faqs } from "@/constants/faqs";

/**
 * Server-rendered, plain-HTML version of the portfolio. The interactive screens only fill in after
 * JavaScript runs, so this is what crawlers, link previews, screen readers and AI answer engines read.
 * It repeats content that is already visible in the app (it is visually hidden, not different).
 */
export function SeoContent() {
  return (
    <article className="sr-only" aria-label={`About ${profile.name}`}>
      <h1>
        {profile.name}: {profile.role} in Bangalore (Bengaluru), India, open to immediate joining
      </h1>
      <p>{profile.tagline}</p>
      <p>{profile.bio}</p>
      <p>
        Also known as {aliases.slice(0, 4).join(", ")}. Studied at Presidency University, Bengaluru. Location: {profile.location}. {profile.availability}. Email: {profile.email}.
      </p>

      <h2>Experience</h2>
      {profile.experience.map((j) => (
        <section key={j.company}>
          <h3>
            {j.role} at {j.company} ({j.period})
          </h3>
          {j.plain && <p>{j.plain}</p>}
          {j.points.length > 0 && (
            <ul>
              {j.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <h2>Projects</h2>
      {profile.projects.map((p) => (
        <section key={p.title}>
          <h3>{p.title}</h3>
          <p>{p.blurb}</p>
          <p>{p.approach}</p>
          <p>Technologies: {(p.stack ?? p.tags).join(", ")}</p>
          {p.live && (
            <p>
              Live: <a href={p.live}>{p.live}</a>
            </p>
          )}
          {p.repo && (
            <p>
              Source code: <a href={p.repo}>{p.repo}</a>
            </p>
          )}
        </section>
      ))}

      <h2>Skills</h2>
      {profile.skills.map((s) => (
        <section key={s.id}>
          <h3>{s.title}</h3>
          <p>{s.items.join(", ")}</p>
          <p>{s.built}</p>
        </section>
      ))}

      <h2>Frequently asked questions</h2>
      {faqs.map((f) => (
        <section key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </section>
      ))}

      <h2>Find Mohammed Saif online</h2>
      <ul>
        <li>
          <a href={siteUrl}>Official website {siteUrl}</a>
        </li>
        {profile.socials.map((s) => (
          <li key={s.id}>
            <a href={s.href}>
              {s.label} {s.handle}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

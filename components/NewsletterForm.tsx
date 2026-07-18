"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      className="mt-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setDone(true);
      }}
    >
      {done ? (
        <p className="rounded-xl border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-amber">
          🏁 You&apos;re in! Watch your inbox for weekly free assets.
        </p>
      ) : (
        <div className="flex max-w-sm gap-2">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full rounded-full border border-line bg-night px-4 py-2.5 text-sm text-white placeholder:text-mist/60 focus:border-ember focus:outline-none"
          />
          <button type="submit" className="btn-primary shrink-0 px-5 py-2.5 text-sm">
            Join
          </button>
        </div>
      )}
    </form>
  );
}

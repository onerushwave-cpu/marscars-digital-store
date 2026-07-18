import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl font-extrabold text-ember-gradient">404</p>
      <h1 className="font-display mt-4 text-2xl font-bold">Wrong turn, driver.</h1>
      <p className="mt-3 max-w-md text-mist">
        This page took the exit ramp. Head back to the marketplace and keep cruising.
      </p>
      <Link href="/" className="btn-primary mt-8 px-8 py-3.5 text-sm">
        ← Back to Home
      </Link>
    </div>
  );
}

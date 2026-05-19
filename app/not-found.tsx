import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cream text-ocean px-4 text-center">
      <h1 className="font-serif text-6xl md:text-8xl tracking-wider text-sunset mb-4">404</h1>
      <h2 className="font-serif text-2xl md:text-3xl uppercase tracking-widest text-ocean mb-6">Lost in the Drift</h2>
      <p className="font-sans text-text-muted max-w-md mb-8 leading-relaxed">
        The page you are looking for has washed away with the tide. Let us guide you back to the shore.
      </p>
      <Link
        href="/"
        className="px-8 py-3.5 bg-ocean text-sand hover:bg-sunset hover:text-white uppercase text-xs tracking-widest font-semibold transition-all duration-300"
      >
        Return to Shore
      </Link>
    </div>
  );
}

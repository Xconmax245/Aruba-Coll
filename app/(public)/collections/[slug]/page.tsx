import React from 'react';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="py-20 px-8 max-w-7xl mx-auto bg-cream">
      <h1 className="font-serif text-3xl md:text-5xl uppercase tracking-widest text-ocean mb-6">
        Collection
      </h1>
      <p className="font-sans text-text-muted">
        Collection Slug: <span className="font-semibold text-sunset">{slug}</span>
      </p>
    </div>
  );
}

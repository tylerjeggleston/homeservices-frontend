import { notFound } from "next/navigation";
import { AFFILIATES } from "../../../lib/affiliates";
import AffiliateHome from "../../../components/AffiliateHome";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const affiliate = AFFILIATES[slug];
  if (!affiliate) return { title: "Remodel Your Home" };
  return {
    title: "Remodel Your Home",
    description: "Remodel funnel for home improvement services",
  };
}

export default async function AffiliatePage({ params }) {
  const { slug } = await params;
  const affiliate = AFFILIATES[slug];

  if (!affiliate) notFound();

  return <AffiliateHome affiliateSlug={slug} affiliate={affiliate} />;
}

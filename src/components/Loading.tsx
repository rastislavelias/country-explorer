export default function Loading({ loading }: { loading: boolean }) {
  return (loading && <p className="loading">Loading countries...</p>) || null;
}

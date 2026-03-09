export default function Error({ error }: { error?: string | null }) {
  return (error && <p className="error">{error}</p>) || null;
}

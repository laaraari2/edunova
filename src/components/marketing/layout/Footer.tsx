export default function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Edunova — Tous droits réservés.
      </div>
    </footer>
  );
}
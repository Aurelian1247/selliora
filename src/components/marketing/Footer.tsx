export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24 py-10 text-center text-sm text-white/60">
      <div className="space-y-3">
        <p>© {new Date().getFullYear()} Selliora AI. All rights reserved.</p>

        <p>
          Need help?{" "}
          <a
            href="mailto:support@selliora.app"
            className="text-violet-400 hover:underline"
          >
            support@selliora.app
          </a>
        </p>
      </div>
    </footer>
  );
}
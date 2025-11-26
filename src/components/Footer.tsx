export default function Footer() {
  return (
    <footer className="border-t border-slate-800 text-sm">
      <div className="section py-8 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <h3 className="text-lg gradient-text">Cloudisoft</h3>
          <p className="text-slate-400 mt-2">
            Intelligent AI automations &amp; predictive decision tools.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-1">Contact</h4>
          <p>connect@cloudisoft.com</p>
          <p>+1 205-696-8477</p>
        </div>

        <div>
          <h4 className="font-semibold mb-1">Location</h4>
          <p>473 Mundet Place</p>
          <p>Hillside, NJ 07205</p>
        </div>
      </div>

      <div className="text-center text-slate-500 py-4 border-t border-slate-900">
        © {new Date().getFullYear()} Cloudisoft — All Rights Reserved.
      </div>
    </footer>
  );
}

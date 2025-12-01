import { useEffect } from "react";
import "../cloudicore.css";

export default function CloudiCore() {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/cloudicore.js";   // must be inside public/
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <div id="cloudicore-root">
          <div class="cc-shell">
            <!-- LEFT inputs ... -->
            <div> ... ENTIRE HTML CONTENT HERE ... </div>
            <!-- RIGHT Dashboard ... -->
          </div>
        </div>
        `
      }}
    />
  );
}

import { useEffect } from "react";
import "../cloudicore.css";

export default function CloudiCore() {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/cloudicore.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <div id="cloudicore-root">
          <!-- YOUR ENTIRE HTML UI HERE -->
        </div>
        `,
      }}
    />
  );
}

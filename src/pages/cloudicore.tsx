import { useEffect } from "react";
import "./cloudicore.css";

export default function CloudiCore() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/cloudicore.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: `
      <!-- START SIMULATOR HTML -->
      <!-- PASTE EVERYTHING BETWEEN <body> AND </body> FROM YOUR ORIGINAL SIMULATOR HERE -->
    ` }} />
  );
}

import { ServerRequest } from "https://deno.land/std@0.71.0/http/server.ts";

export default async (req: ServerRequest) => {
  const splittedUrl = req.url.split("?");

  if (splittedUrl.length < 2 || !splittedUrl[1].startsWith("text")) {
    req.respond({
      body: "This request must be query parameters: text",
    });
    return;
  }

  const parameter = splittedUrl[1].split("=");
  const text = parameter[1];

  const render = `<div class="container">
  <svg viewBox="0 0 500 72" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="flashing_points" viewBox="0,0,13,13" width="1%" height="10%">
        <circle cx="7" cy="7" r="5" fill="#FF8F00"/>
      </pattern>
      <pattern id="normal_points" viewBox="0,0,13,13" width="1%" height="10%">
        <circle cx="7" cy="7" r="5" fill="#323232"/>
      </pattern>
    </defs>
    <clipPath id="moving_text">
      <text x="0" y="60" font-size="2.5vw" class="text__animate" fill="white" font-weight="900">
        ${text}
      </text>
    </clipPath>
    <rect width="500" height="72" fill="url(#normal_points)"/>
    <rect width="500" height="72" fill="url(#flashing_points)" clip-path="url(#moving_text)"/>
  </svg>
  <style>
    .container { width: 100%; background: #121212; }
    .text__animate { animation: 16s linear 0s infinite moving; }
    @keyframes moving {
      from { transform: translate(100%, 0px); }
      to { transform: translate(-${2.5 * text.length}vw, 0px); }
    }
  </style>
</div>`;

  const headers = new Headers([["content-type", "text/html"]]);
  req.respond({ body: render, headers: headers });
};

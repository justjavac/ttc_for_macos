import { serve } from "https://deno.land/std@0.152.0/http/server.ts";

const shell = `#!/usr/bin/env bash
wget https://us.tamrieltradecentre.com/download/PriceTable -O PriceTable.zip
unzip PriceTable.zip -d ./PriceTable/
cp ./PriceTable/*.lua ~/Documents/Elder\ Scrolls\ Online/live/AddOns/TamrielTradeCentre/
rm PriceTable.zip
rm -rf PriceTable
`;

const help = `(TTC)Tamriel Trade Centre prices sync script for macOS.

https://github.com/justjavac/ttc_for_macos

Usage:

  curl -fsSL https://ttc.deno.dev | sh
`;

serve((req: Request) => {
  const userAgent = req.headers.get("User-Agent") || "";

  if (userAgent.includes("curl")) {
    return new Response(shell);
  }

  return new Response(help);
});

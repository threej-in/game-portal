import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const appRoot = process.cwd().endsWith("game-portal") ? process.cwd() : path.join(process.cwd(), "game-portal");
const publicRoot = path.join(appRoot, "public");
const gamesRoot = path.join(publicRoot, "games");

const leavePromptScriptTag = '<script src="/threej-game-leave-prompt.js" defer></script>';

type GameHtmlShellProps = {
  params: Promise<{
    gamePath?: string[];
  }>;
};

function injectLeavePrompt(html: string) {
  if (html.includes("threej-game-leave-prompt.js")) {
    return html;
  }

  if (html.includes("</head>")) {
    return html.replace("</head>", `${leavePromptScriptTag}\n</head>`);
  }

  if (html.includes("</body>")) {
    return html.replace("</body>", `${leavePromptScriptTag}\n</body>`);
  }

  return `${html}\n${leavePromptScriptTag}`;
}

function resolveGameHtmlPath(gamePath?: string[]) {
  if (!gamePath?.length || gamePath[0] !== "games" || !gamePath.at(-1)?.endsWith(".html")) {
    return null;
  }

  const resolvedPath = path.resolve(publicRoot, ...gamePath);
  const isInsideGames = resolvedPath.startsWith(`${gamesRoot}${path.sep}`);

  return isInsideGames ? resolvedPath : null;
}

export async function GET(_request: Request, { params }: GameHtmlShellProps) {
  const { gamePath } = await params;
  const filePath = resolveGameHtmlPath(gamePath);

  if (!filePath) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const html = await readFile(filePath, "utf8");
    return new NextResponse(injectLeavePrompt(html), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}

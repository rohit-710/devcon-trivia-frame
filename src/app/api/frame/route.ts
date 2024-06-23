import { NextRequest, NextResponse } from "next/server";
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const idString: any = searchParams.get("id");
  const id = parseInt(idString);
  const nextId = id + 1;
  const data = await req.json();
  const buttonId = data.untrustedData?.buttonIndex;

  const answerOptions = [
    ["2014", "2015", "2016"],
    ["Berlin", "London", "Shanghai"],
    ["Ether Bunny", "Deva the Unicorn", "CryptoKitty"],
  ];

  const correctAnswers = [0, 1, 1];

  const headers = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });

  // Check if the answer is incorrect
  if (id > 0 && buttonId - 1 !== correctAnswers[id - 1]) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head>
      <title>Wrong! Try the next question.</title>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${NEXT_PUBLIC_URL}/wrong.png" />
      <meta property="fc:frame:button:1" content="Next question"} />
      <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/frame?id=${nextId}" />
      <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
      </head>
      <body>
      <h1>Wrong! Try the next question.</h1>
      </body>
      </html>`,
      { headers }
    );
  }

  // Check if the answer is correct and not the final frame
  if (id > 0 && buttonId - 1 === correctAnswers[id - 1] && id < 4) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head>
      <title>Correct! Move to the next question.</title>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${NEXT_PUBLIC_URL}/correct.png" />
      <meta property="fc:frame:button:1" content="Next question"} />
      <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/frame?id=${nextId}" />
      <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
      </head>
      <body>
      <h1>Correct! Move to the next question.</h1>
      </body>
      </html>`,
      { headers }
    );
  }

  // Check if this is the final frame
  if (id === 4) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head>
      <title>The End</title>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${NEXT_PUBLIC_URL}/end.png" />
      <meta property="fc:frame:button:1" content="Play again"} />
      <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/end" />
      <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
      </head>
      <body>
      <h1>The End</h1>
      </body>
      </html>`,
      { headers }
    );
  }

  // Default case for initial frame or if id is out of expected range
  if (id >= 0 && id < 4) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head>
      <title>This is frame ${id}</title>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${NEXT_PUBLIC_URL}/${id}.png"/>
      <meta property="fc:frame:button:1" content="${answerOptions[id][0]}" />
      <meta property="fc:frame:button:2" content="${answerOptions[id][1]}" />
      <meta property="fc:frame:button:3" content="${answerOptions[id][2]}" />
      <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
      <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/frame?id=${nextId}" />
      </head>
      <body>
      <h1>This is frame ${id}</h1>
      </body>
      </html>`,
      { headers }
    );
  }

  // Return a default response in case of unexpected input
  return new NextResponse(
    `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Error</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${NEXT_PUBLIC_URL}/error.png" />
    <meta property="fc:frame:button:1" content="Start again"} />
    <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/frame?id=0" />
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
    </head>
    <body>
    <h1>Error</h1>
    </body>
    </html>`,
    { headers }
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";

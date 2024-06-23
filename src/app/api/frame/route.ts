import { NextRequest, NextResponse } from "next/server";
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const idString: any = searchParams.get("id");
  const action = searchParams.get("action");
  const id = parseInt(idString) || 1;
  const nextId = id + 1;
  const data = await req.json();
  const buttonId = data.untrustedData.buttonIndex;

  const answerOptions = [
    ["2014", "2015", "2016"],
    ["Berlin", "London", "Shanghai"],
    ["Ether Bunny", "Deva the Unicorn", "CryptoKitty"],
  ];

  const correctAnswers = [0, 1, 1];

  // Handle showing correct or incorrect response
  if (action === "showCorrect") {
    return new NextResponse(`
        <!DOCTYPE html>
        <html>
        <head>
        <title>Correct! Move to the next question.</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${NEXT_PUBLIC_URL}/correct.png" />
        <meta property="fc:frame:button:1" content="Next question"} />
        <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/frame?id=${nextId}&action=showQuestion" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        </head>
        </html>`);
  }

  if (action === "showIncorrect") {
    return new NextResponse(`
        <!DOCTYPE html>
        <html>
        <head>
        <title>Wrong! Try the next question.</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${NEXT_PUBLIC_URL}/wrong.png" />
        <meta property="fc:frame:button:1" content="Next question"} />
        <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/frame?id=${nextId}&action=showQuestion" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        </head>
        </html>`);
  }

  // Check if this is the final frame
  if (id === 4 && action === "showQuestion") {
    return new NextResponse(`
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
    </html>`);
  }

  // Display the question frame
  if (action === "showQuestion") {
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
      <head>
      <title>This is frame ${id}</title>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${NEXT_PUBLIC_URL}/${id}.png"/>
      <meta property="fc:frame:button:1" content="${
        answerOptions[id - 1][0]
      }" />
      <meta property="fc:frame:button:2" content="${
        answerOptions[id - 1][1]
      }" />
      <meta property="fc:frame:button:3" content="${
        answerOptions[id - 1][2]
      }" />
      <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
      <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/frame?id=${id}&action=answer" />
      </head>
      </html>`);
  }

  // Handling answer submission
  if (action === "answer") {
    if (buttonId - 1 === correctAnswers[id - 1]) {
      return new NextResponse(`
        <!DOCTYPE html>
        <html>
        <head>
        <title>Correct! Move to the next question.</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${NEXT_PUBLIC_URL}/correct.png" />
        <meta property="fc:frame:button:1" content="Next question"} />
        <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/frame?id=${nextId}&action=showQuestion" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        </head>
        </html>`);
    } else {
      return new NextResponse(`
        <!DOCTYPE html>
        <html>
        <head>
        <title>Wrong! Try the next question.</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${NEXT_PUBLIC_URL}/wrong.png" />
        <meta property="fc:frame:button:1" content="Next question"} />
        <meta property="fc:frame:post_url" content="${NEXT_PUBLIC_URL}/api/frame?id=${nextId}&action=showQuestion" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        </head>
        </html>`);
    }
  }

  return new NextResponse("Invalid action");
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const idString: any = searchParams.get("id");
  const id = parseInt(idString);
  const nextId = id + 1;
  const data = await req.json();
  const buttonId = data.untrustedData.buttonIndex;

  const answerOptions = [
    ["2014", "2015", "2016", "2017"],
    ["Berlin", "London", "Shanghai", "Cancun"],
    [
      "Discuss Ethereum ETF",
      "Scaling Ethereum",
      "Empower Ethereum Builders",
      "Say gm IRL",
    ],
    [
      "Ether Bunny",
      "Deva the Unicorn",
      "CryptoKitty",
      "Casper the Friendly Validator",
    ],
    [
      "Devcon 3 in Cancun",
      "Devcon 4 in Prague",
      "Devcon 5 in Osaka",
      "Devcon 6 in Bogotá",
    ],
    [
      "The future of Ethereum",
      "Vitalik's meme review",
      "Ethereum for dummies",
      "Ethereum in 30 Minutes",
    ],
    [
      "Developer Infrastructure",
      "Opportunity & Global Impact",
      "Layer 2s",
      "Staking and Validator Experience",
    ],
    ["Crowdsourcing", "Dogfooding", "Open Sourcing", "Beta Testing"],
  ];

  const correctAnswers = [0, 1, 2, 1, 2, 3, 1, 1];

  if (id > 1 && buttonId - 1 !== correctAnswers[id - 2]) {
    return new NextResponse(`<!DOCTYPE html><html><head>
    <title>Wrong! Try again.</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${
      process.env.NEXT_PUBLIC_URL
    }/wrong${id - 1}.png" />
    <meta property="fc:frame:button:1" content="Play again"} />
    <meta property="fc:frame:post_url" content="${
      process.env.NEXT_PUBLIC_URL
    }/api/frame?id=1" />
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
  </head></html>`);
  }

  if (id === 9) {
    return new NextResponse(`<!DOCTYPE html><html><head>
    <title>You won</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL}/end.png" />
    <meta property="fc:frame:button:1" content="Follow Rohit"} />
    <meta property="fc:frame:button:1:action" content="link"} />
    <meta property="fc:frame:button:1:target" content="https://warpcast.com/rohit7101" />
     <meta property="fc:frame:button:2" content="Follow Rohit"} />
    <meta property="fc:frame:button:2:action" content="link"} />
    <meta property="fc:frame:button:2:target" content="https://warpcast.com/rosee" />
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
  </head></html>`);
  } else {
    return new NextResponse(`<!DOCTYPE html><html><head>
    <title>This is frame ${id}</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${
      process.env.NEXT_PUBLIC_URL
    }/${id}.png" />
    <meta property="fc:frame:button:1" content=${answerOptions[id - 1][0]} />
    <meta property="fc:frame:button:2" content=${answerOptions[id - 1][1]} />
    <meta property="fc:frame:button:3" content=${answerOptions[id - 1][2]} />
    <meta property="fc:frame:button:4" content=${answerOptions[id - 1][3]} />
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
    <meta property="fc:frame:post_url" content="${
      process.env.NEXT_PUBLIC_URL
    }/api/frame?id=${nextId}" />
  </head></html>`);
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";

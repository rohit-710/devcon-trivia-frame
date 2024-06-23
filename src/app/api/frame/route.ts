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
    "Content-Type": "application/json; charset=utf-8",
  });

  // Check if the answer is incorrect
  if (id > 0 && buttonId - 1 !== correctAnswers[id - 1]) {
    return new NextResponse(
      JSON.stringify({
        title: "Wrong! Try the next question.",
        frame: "vNext",
        image: `${NEXT_PUBLIC_URL}/wrong.png`,
        buttons: [
          {
            content: "Next question",
            post_url: `${NEXT_PUBLIC_URL}/api/frame?id=${nextId}`,
          },
        ],
        aspect_ratio: "1.91:1",
      }),
      { headers }
    );
  }

  // Check if the answer is correct and not the final frame
  if (id > 0 && buttonId - 1 === correctAnswers[id - 1] && id < 4) {
    return new NextResponse(
      JSON.stringify({
        title: "Correct! Move to the next question.",
        frame: "vNext",
        image: `${NEXT_PUBLIC_URL}/correct.png`,
        buttons: [
          {
            content: "Next question",
            post_url: `${NEXT_PUBLIC_URL}/api/frame?id=${nextId}`,
          },
        ],
        aspect_ratio: "1.91:1",
      }),
      { headers }
    );
  }

  // Check if this is the final frame
  if (id === 4) {
    return new NextResponse(
      JSON.stringify({
        title: "The End",
        frame: "vNext",
        image: `${NEXT_PUBLIC_URL}/end.png`,
        buttons: [
          { content: "Play again", post_url: `${NEXT_PUBLIC_URL}/api/end` },
        ],
        aspect_ratio: "1.91:1",
      }),
      { headers }
    );
  }

  // Default case for initial frame or if id is out of expected range
  if (id >= 0 && id < 4) {
    return new NextResponse(
      JSON.stringify({
        title: `This is frame ${id}`,
        frame: "vNext",
        image: `${NEXT_PUBLIC_URL}/${id}.png`,
        buttons: [
          {
            content: answerOptions[id][0],
            post_url: `${NEXT_PUBLIC_URL}/api/frame?id=${nextId}`,
          },
          {
            content: answerOptions[id][1],
            post_url: `${NEXT_PUBLIC_URL}/api/frame?id=${nextId}`,
          },
          {
            content: answerOptions[id][2],
            post_url: `${NEXT_PUBLIC_URL}/api/frame?id=${nextId}`,
          },
        ],
        aspect_ratio: "1.91:1",
      }),
      { headers }
    );
  }

  // Return a default response in case of unexpected input
  return new NextResponse(
    JSON.stringify({
      title: "Error",
      frame: "vNext",
      image: `${NEXT_PUBLIC_URL}/error.png`,
      buttons: [
        {
          content: "Start again",
          post_url: `${NEXT_PUBLIC_URL}/api/frame?id=0`,
        },
      ],
      aspect_ratio: "1.91:1",
    }),
    { headers }
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";

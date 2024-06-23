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

  const responseJson = {
    fcFrame: "vNext",
    fcImageAspectRatio: "1.91:1",
  };

  // Check if the answer is incorrect
  if (id > 0 && buttonId - 1 !== correctAnswers[id - 1]) {
    return new NextResponse(
      JSON.stringify({
        ...responseJson,
        title: "Wrong! Try the next question.",
        fcFrameImage: `${NEXT_PUBLIC_URL}/wrong.png`,
        fcFrameButton1: "Next question",
        fcFramePostUrl: `${NEXT_PUBLIC_URL}/api/frame?id=${nextId}`,
      }),
      { headers }
    );
  }

  // Check if the answer is correct and not the final frame
  if (id > 0 && buttonId - 1 === correctAnswers[id - 1] && id < 4) {
    return new NextResponse(
      JSON.stringify({
        ...responseJson,
        title: "Correct! Move to the next question.",
        fcFrameImage: `${NEXT_PUBLIC_URL}/correct.png`,
        fcFrameButton1: "Next question",
        fcFramePostUrl: `${NEXT_PUBLIC_URL}/api/frame?id=${nextId}`,
      }),
      { headers }
    );
  }

  // Check if this is the final frame
  if (id === 4) {
    return new NextResponse(
      JSON.stringify({
        ...responseJson,
        title: "The End",
        fcFrameImage: `${NEXT_PUBLIC_URL}/end.png`,
        fcFrameButton1: "Play again",
        fcFramePostUrl: `${NEXT_PUBLIC_URL}/api/end`,
      }),
      { headers }
    );
  }

  // Default case for initial frame or if id is out of expected range
  if (id >= 0 && id < 4) {
    return new NextResponse(
      JSON.stringify({
        ...responseJson,
        title: `This is frame ${id}`,
        fcFrameImage: `${NEXT_PUBLIC_URL}/${id}.png`,
        fcFrameButton1: answerOptions[id][0],
        fcFrameButton2: answerOptions[id][1],
        fcFrameButton3: answerOptions[id][2],
        fcFramePostUrl: `${NEXT_PUBLIC_URL}/api/frame?id=${nextId}`,
      }),
      { headers }
    );
  }

  // Return a default response in case of unexpected input
  return new NextResponse(
    JSON.stringify({
      ...responseJson,
      title: "Error",
      fcFrameImage: `${NEXT_PUBLIC_URL}/error.png`,
      fcFrameButton1: "Start again",
      fcFramePostUrl: `${NEXT_PUBLIC_URL}/api/frame?id=0`,
    }),
    { headers }
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";

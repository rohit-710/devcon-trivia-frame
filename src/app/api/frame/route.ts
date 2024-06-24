import { NextRequest, NextResponse } from "next/server";
import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit";
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const idString: any = searchParams.get("id");
  const id = parseInt(idString);
  const nextId = id + 1;
  const data = await req.json();
  const buttonId = data.untrustedData.buttonIndex;

  const answerOptions = [
    ["A", "B", "C", "D"],
    ["A", "B", "C", "D"],
    ["A", "B", "C", "D"],
    ["A", "B", "C", "D"],
    ["A", "B", "C", "D"],
    ["A", "B", "C", "D"],
    ["A", "B", "C", "D"],
    ["A", "B", "C", "D"],
  ];

  const correctAnswers = [0, 1, 2, 1, 2, 3, 1, 1];

  if (id > 1 && buttonId - 1 !== correctAnswers[id - 2]) {
    return new NextResponse(
      getFrameHtmlResponse({
        image: {
          src: `${process.env.NEXT_PUBLIC_URL}/wrong${id - 1}.png`,
          aspectRatio: "1.91:1",
        },
        ogTitle: "Wrong! Try again.",
        postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frame?id=1`,
        buttons: [
          {
            label: "Play again",
            action: "post",
          },
        ],
      })
    );
  }

  if (id === 9) {
    return new NextResponse(
      getFrameHtmlResponse({
        image: {
          src: `${process.env.NEXT_PUBLIC_URL}/end.png`,
          aspectRatio: "1.91:1",
        },
        ogTitle: "You won",
        postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frame?id=1`,
        buttons: [
          {
            label: "Follow Rohit",
            action: "link",
            target: "https://warpcast.com/rohit7101",
          },
          {
            label: "Follow Rose",
            action: "link",
            target: "https://warpcast.com/rosee",
          },
          {
            label: "Devcon Channel",
            action: "link",
            target: "https://warpcast.com/~/channel/devcon",
          },
        ],
      })
    );
  } else {
    return new NextResponse(
      getFrameHtmlResponse({
        image: {
          src: `${process.env.NEXT_PUBLIC_URL}/${id}.png`,
          aspectRatio: "1.91:1",
        },
        ogTitle: `This is frame ${id}`,
        postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frame?id=${nextId}`,
        buttons: [
          {
            label: `${answerOptions[id - 1][0]}`,
            action: "post",
          },
          {
            label: `${answerOptions[id - 1][1]}`,
            action: "post",
          },
          {
            label: `${answerOptions[id - 1][2]}`,
            action: "post",
          },
          {
            label: `${answerOptions[id - 1][3]}`,
            action: "post",
          },
        ],
      })
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";

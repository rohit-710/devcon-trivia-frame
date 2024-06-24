import { NextRequest, NextResponse } from "next/server";
import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit";
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

let retryingQuestionId: number | null = null; // Stores the ID of the question being retried (can be null)

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const idString: any = searchParams.get("id");
  const id = parseInt(idString);

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

  // Check if retrying a question
  const isRetrying = retryingQuestionId !== null && retryingQuestionId === id;

  if (isRetrying) {
    retryingQuestionId = null; // Clear retry state after handling
  } else if (id > 1 && buttonId - 1 !== correctAnswers[id - 2]) {
    retryingQuestionId = id; // Set retry state for next request
  }

  // Ensure image for first question is displayed for initial render and retry
  const selectedImageId = isRetrying && id === 1 ? 1 : id; // Use 1 for first question retry

  // Show appropriate content based on question and retry state
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
          // Replace with your actual buttons
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
          src: `${NEXT_PUBLIC_URL}/${selectedImageId}.png`,
          aspectRatio: "1.91:1",
        },
        ogTitle: `This is frame ${id}`,
        postUrl: `${NEXT_PUBLIC_URL}/api/frame?id=${id === 9 ? 1 : id + 1}`,
        buttons: [
          // Replace with your actual buttons (answer options)
          {
            label: `${answerOptions[selectedImageId - 1][0]}`, // Use selectedImageId for answer options
            action: "post",
          },
          {
            label: `${answerOptions[selectedImageId - 1][1]}`,
            action: "post",
          },
          {
            label: `${answerOptions[selectedImageId - 1][2]}`,
            action: "post",
          },
          {
            label: `${answerOptions[selectedImageId - 1][3]}`,
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

import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Start Quiz",
      action: "post",
      target: `${NEXT_PUBLIC_URL}/api/frame?id=1`,
    },
    {
      label: "Devcon Website",
      action: "link",
      target: "https://devcon.org/",
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/default.png`,
    aspectRatio: "1.91:1",
  },
  post_url: `${process.env.NEXT_PUBLIC_URL}/api/frame?id=1`,
});

export const metadata: Metadata = {
  title: "Devcon Trivia Frame",
  description: "This is a travia frame dedicated to Devcon!",
  openGraph: {
    title: "Devcon Trivia Frame",
    description: "This is a travia frame dedicated to Devcon!",
    images: [`${NEXT_PUBLIC_URL}/default.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Devcon Trivia Frame</h1>
    </>
  );
}

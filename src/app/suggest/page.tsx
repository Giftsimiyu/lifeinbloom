import { Metadata } from "next";
import SuggestPageClient from "./suggest-client";

export const metadata: Metadata = {
  title: "Suggest a Post",
  description: "Have an idea for a blog post? Let us know!",
};

export default function SuggestPage() {
  return <SuggestPageClient />};

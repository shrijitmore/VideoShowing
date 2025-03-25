import { redirect } from "next/navigation";

// Redirect from the home page to the first course
export default function Home() {
  // Redirect to the AWS Fundamentals course
  redirect("/introduction-to-data-engineering");

  // This won't be rendered due to the redirect
  return null;
}

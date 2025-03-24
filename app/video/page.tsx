import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

// This is required for static site generation with `output: export`
export function generateStaticParams() {
  // Pre-render these video pages at build time
  return [
    {
      videoId: "1Ruy5DovO7k61YocuiOgReFgkp4OR7xYa",
      title: "Power BI Introduction",
      courseName: "Power BI",
      id: "video6",
    },
    {
      videoId: "1Oipgg1Ls_YQv1psGVmvOsW7xYLRH5ZuC",
      title: "Power BI Visualizations",
      courseName: "Power BI",
      id: "video8",
    },
    {
      videoId: "1u778a3sxJMzP2SAn3wWp_QWxpnaRVVOJ",
      title: "Power BI DAX Basics",
      courseName: "Power BI",
      id: "video9",
    },
    {
      videoId: "1MMhRqEUlI_9O4dtbAGurpwQMv41WdYIU",
      title: "Power BI Reports and Dashboards",
      courseName: "Power BI",
      id: "video10",
    },
    {
      videoId: "1xIgQLot3wcLrrJLXimhPerCHLQNRUYe2",
      title: "Power BI Sharing and Collaboration",
      courseName: "Power BI",
      id: "video11",
    },
    { videoId: "favicon.ico" }, // Add favicon.ico to prevent static generation error
  ];
}

export default function VideoPage({ params }: { params: { videoId: string } }) {
  const videoId = params.videoId;

  if (!videoId) {
    notFound();
  }

  // Redirect to the course page
  // For simplicity, we'll redirect all to the aws-fundamentals course
  redirect("/aws-fundamentals");

  return null;
}

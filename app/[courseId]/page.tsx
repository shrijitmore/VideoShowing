import { VideoLearningInterface } from "@/components/video-learning-interface";

export interface CourseData {
  id: string;
  title: string;
  videos: {
    id: string;
    title: string;
    courseName: string;
  }[];
}

// Mock data for courses
const coursesData: CourseData[] = [
  {
    id: "power-bi",
    title: "Power BI",
    videos: [
      {
        id: "video6",
        title: "Power BI Introduction",
        courseName: "Power BI",
      },
      { id: "video7", title: "Power BI Data Modeling", courseName: "Power BI" },
      {
        id: "video8",
        title: "Power BI Visualizations",
        courseName: "Power BI",
      },
      { id: "video9", title: "Power BI DAX Basics", courseName: "Power BI" },
      {
        id: "video10",
        title: "Power BI Reports and Dashboards",
        courseName: "Power BI",
      },
      {
        id: "video11",
        title: "Power BI Sharing and Collaboration",
        courseName: "Power BI",
      },
    ],
  },
  {
    id: "aws-fundamentals",
    title: "AWS Fundamentals",
    videos: [
      {
        id: "aws-intro",
        title: "Introduction to AWS",
        courseName: "AWS Fundamentals",
      },
      { id: "aws-ec2", title: "EC2 Instances", courseName: "AWS Fundamentals" },
      { id: "aws-s3", title: "S3 Storage", courseName: "AWS Fundamentals" },
      {
        id: "aws-lambda",
        title: "Lambda Functions",
        courseName: "AWS Fundamentals",
      },
    ],
  },
  {
    id: "docker-basics",
    title: "Docker Basics",
    videos: [
      {
        id: "docker-intro",
        title: "Introduction to Docker",
        courseName: "Docker Basics",
      },
      {
        id: "docker-containers",
        title: "Working with Containers",
        courseName: "Docker Basics",
      },
      {
        id: "docker-compose",
        title: "Docker Compose",
        courseName: "Docker Basics",
      },
    ],
  },
  {
    id: "kubernetes-101",
    title: "Kubernetes 101",
    videos: [
      {
        id: "k8s-intro",
        title: "Introduction to Kubernetes",
        courseName: "Kubernetes 101",
      },
      {
        id: "k8s-pods",
        title: "Pods and Deployments",
        courseName: "Kubernetes 101",
      },
      {
        id: "k8s-services",
        title: "Services and Networking",
        courseName: "Kubernetes 101",
      },
      {
        id: "k8s-storage",
        title: "Storage in Kubernetes",
        courseName: "Kubernetes 101",
      },
      { id: "k8s-helm", title: "Helm Charts", courseName: "Kubernetes 101" },
    ],
  },
];

export function generateStaticParams() {
  // Create an array for all course IDs
  const params = coursesData.map((course) => ({
    courseId: course.id,
  }));

  // Add a special case for favicon.ico
  params.push({
    courseId: "favicon.ico",
  });

  return params;
}

export default function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const { courseId } = params;
  const courseData =
    coursesData.find((course) => course.id === courseId) || coursesData[0];

  // Default to the first video if available
  const defaultVideoId = courseData.videos[0]?.id || "";

  return (
    <VideoLearningInterface
      courseId={courseId}
      courseName={courseData.title}
      videoIds={courseData.videos}
      videoId={defaultVideoId}
    />
  );
}

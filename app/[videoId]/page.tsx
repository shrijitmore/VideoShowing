import { VideoLearningInterface } from '@/components/video-learning-interface';
import { notFound } from 'next/navigation';

// This is required for static site generation with `output: export`
export function generateStaticParams() {
  // Pre-render these video pages at build time
  return [
    { videoId: '1Ruy5DovO7k61YocuiOgReFgkp4OR7xYa', title: 'Power BI Introduction', courseName: 'Course A', id: 'video6' },
    { videoId: '1ZEft0f1HDUrmfQ_rvzUr7NRWp-vRoFcu', title: 'Power BI Data Modeling', courseName: 'Course A', id: 'video7' },
    { videoId: '1Oipgg1Ls_YQv1psGVmvOsW7xYLRH5ZuC', title: 'Power BI Visualizations', courseName: 'Course A', id: 'video8' },
    { videoId: '1u778a3sxJMzP2SAn3wWp_QWxpnaRVVOJ', title: 'Power BI DAX Basics', courseName: 'Course A', id: 'video9' },
    { videoId: '1MMhRqEUlI_9O4dtbAGurpwQMv41WdYIU', title: 'Power BI Reports and Dashboards', courseName: 'Course A', id: 'video10' },
    { videoId: '1xIgQLot3wcLrrJLXimhPerCHLQNRUYe2', title: 'Power BI Sharing and Collaboration', courseName: 'Course A', id: 'video11' },
  ];
}

export default function VideoPage({ params }: { params: { videoId: string } }) {
  const videoId = params.videoId;
  
  if (!videoId) {
    notFound();
  }

  const videoIds = generateStaticParams(); // Get all video IDs and titles
  const currentVideo = videoIds.find(video => video.videoId === videoId); // Find the current video
  const courseName = currentVideo?.courseName || 'Default Course Name'; // Extract course name

  return <VideoLearningInterface videoId={videoId} videoIds={videoIds} courseName={courseName} />;
}
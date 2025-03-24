import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const demoVideos = [
    {
      id: 'aws-fundamentals',
      title: 'AWS Fundamentals',
      description: 'Learn the basics of AWS cloud computing',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop',
      duration: '2h 30m',
      students: 1234,
      modules: 8,
    },
    {
      id: 'docker-basics',
      title: 'Docker Basics',
      description: 'Introduction to containerization with Docker',
      image: 'https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8?q=80&w=2940&auto=format&fit=crop',
      duration: '1h 45m',
      students: 856,
      modules: 6,
    },
    {
      id: 'kubernetes-101',
      title: 'Kubernetes 101',
      description: 'Getting started with container orchestration',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2940&auto=format&fit=crop',
      duration: '3h 15m',
      students: 567,
      modules: 10,
    },
  ];

  return (
    <div className="container px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
          Master New Skills with Interactive Learning
        </h1>
        <p className="mx-auto mb-8 max-w-[700px] text-lg text-muted-foreground">
          Dive into hands-on virtual labs and expert-led video content. Learn at your own pace
          with our cutting-edge learning platform.
        </p>
      </section>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demoVideos.map((video) => (
          <Card key={video.id} className="group overflow-hidden transition-all hover:shadow-lg">
            <div
              className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url(${video.image})` }}
            />
            <div className="p-6">
              <h2 className="mb-2 text-2xl font-semibold">{video.title}</h2>
              <p className="mb-4 text-muted-foreground">{video.description}</p>
              
              <div className="mb-6 grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{video.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{video.students}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{video.modules} modules</span>
                </div>
              </div>

              <Link href={`/${encodeURIComponent(video.id)}`}>
                <Button className="w-full">Start Learning</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
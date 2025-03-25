import { VideoLearningInterface } from "@/components/video-learning-interface";
import { notFound } from "next/navigation";

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
    id: "introduction-to-data-engineering",
    title: "Introduction to Data Engineering",
    videos: [
      { id: "1", title: "What is Data Engineering & why it is needed?", courseName: "Introduction to Data Engineering" },
      { id: "2", title: "Key tasks in Data Engineering Lifecycle", courseName: "Introduction to Data Engineering" },
      { id: "3", title: "Data sources in manufacturing", courseName: "Introduction to Data Engineering" },
    ],
  },
  {
    id: "introduction-to-sql",
    title: "Introduction to SQL",
    videos: [
      { id: "4", title: "Overview of Databases and SQL", courseName: "Introduction to SQL" },
      { id: "5", title: "Data Types", courseName: "Introduction to SQL" },
      { id: "6", title: "DDL & DML", courseName: "Introduction to SQL" },
      { id: "7", title: "Basic Query Operations: Filtering Data (WHERE clause, logical operators)", courseName: "Introduction to SQL" },
      { id: "8", title: "Sorting Data (ORDER BY)", courseName: "Introduction to SQL" },
      { id: "9", title: "Built-in Functions (COUNT, SUM, AVG, MIN, MAX)", courseName: "Introduction to SQL" },
      { id: "10", title: "Joins", courseName: "Introduction to SQL" },
      { id: "11", title: "Advanced Query Operations: Aggregate Functions", courseName: "Introduction to SQL" },
      { id: "12", title: "Grouping Data (GROUP BY)", courseName: "Introduction to SQL" },
      { id: "13", title: "Filtering Groups (HAVING)", courseName: "Introduction to SQL" },
    ],
  },
  {
    id: "data-storage-and-management",
    title: "Data Storage and Management",
    videos: [
      { id: "14", title: "Introduction to DBMS", courseName: "Data Storage and Management" },
      { id: "15", title: "Data Models", courseName: "Data Storage and Management" },
      { id: "16", title: "Relational & NoSQL Databases", courseName: "Data Storage and Management" },
      { id: "17", title: "Database Design", courseName: "Data Storage and Management" },
      { id: "18", title: "Data Storage and Retrieval", courseName: "Data Storage and Management" },
      { id: "19", title: "Data Warehousing and Data Mining", courseName: "Data Storage and Management" },
    ],
  },
  {
    id: "data-integration",
    title: "Data Integration",
    videos: [
      { id: "20", title: "Extract Data from Various Sources", courseName: "Data Integration" },
      { id: "21", title: "Connection Managers", courseName: "Data Integration" },
      { id: "22", title: "Data Source Components", courseName: "Data Integration" },
      { id: "23", title: "Data Extraction Logic", courseName: "Data Integration" },
    ],
  },
  {
    id: "building-data-pipelines",
    title: "Building Data Pipelines",
    videos: [
      { id: "24", title: "Control flow", courseName: "Building Data Pipelines" },
      { id: "25", title: "Data flow", courseName: "Building Data Pipelines" },
      { id: "26", title: "Implementing ETL pipelines for data ingestion, transformation & loading", courseName: "Building Data Pipelines" },
      { id: "27", title: "Error handling in ETL pipeline", courseName: "Building Data Pipelines" },
    ],
  },
  {
    id: "deploying-and-scheduling",
    title: "Deploying and Scheduling",
    videos: [
      { id: "28", title: "Methods for deploying SSIS packages", courseName: "Deploying and Scheduling" },
      { id: "29", title: "Using SQL Server Agent", courseName: "Deploying and Scheduling" },
      { id: "30", title: "Monitoring and managing SSIS package execution", courseName: "Deploying and Scheduling" },
    ],
  },
  {
    id: "business-intelligence",
    title: "Business Intelligence (BI)",
    videos: [
      { id: "31", title: "What is BI?", courseName: "Business Intelligence (BI)" },
      { id: "32", title: "Data Visualization and Reporting", courseName: "Business Intelligence (BI)" },
      { id: "33", title: "Create dashboards using Power BI", courseName: "Business Intelligence (BI)" },
      { id: "34", title: "Predictive Modeling", courseName: "Business Intelligence (BI)" },
      { id: "35", title: "Regression Analysis", courseName: "Business Intelligence (BI)" },
      { id: "36", title: "Classification Techniques", courseName: "Business Intelligence (BI)" },
    ],
  },
  {
    id: "introduction-and-compliances",
    title: "Introduction & Compliances",
    videos: [
      { id: "37", title: "Importance of data quality & standards in manufacturing operations", courseName: "Introduction & Compliances" },
      { id: "38", title: "Importance of data security & privacy in manufacturing", courseName: "Introduction & Compliances" },
      { id: "39", title: "Data Security Regulations and Compliance (GDPR, HIPAA, etc.)", courseName: "Introduction & Compliances" },
    ],
  },
  {
    id: "data-quality-and-security-etl",
    title: "Data Quality & Security of ETL Pipeline",
    videos: [
      { id: "40", title: "Secure Data Connections: Encrypted Connections, Secure Connection Strings", courseName: "Data Quality & Security of ETL Pipeline" },
      { id: "41", title: "Data Validation and Cleansing: Tools and Techniques for Data Profiling in SSIS, Transformation and Cleansing", courseName: "Data Quality & Security of ETL Pipeline" },
      { id: "42", title: "Error Handling and Logging", courseName: "Data Quality & Security of ETL Pipeline" },
      { id: "43", title: "Data Encryption and Masking", courseName: "Data Quality & Security of ETL Pipeline" },
      { id: "44", title: "Auditing Changes & Continuous Monitoring", courseName: "Data Quality & Security of ETL Pipeline" },
    ],
  },
  {
    id: "data-quality-and-security-databases",
    title: "Data Quality & Security of Databases",
    videos: [
      { id: "45", title: "Data Integrity and Consistency: primary and foreign key constraints, unique indexes, etc.", courseName: "Data Quality & Security of Databases" },
      { id: "46", title: "Database Encryption and Access Control", courseName: "Data Quality & Security of Databases" },
      { id: "47", title: "Data Backup, Recovery, and Auditing", courseName: "Data Quality & Security of Databases" },
    ],
  },
  {
    id: "introduction-to-python",
    title: "Introduction to Python",
    videos: [
      { id: "48", title: "Python Basics", courseName: "Introduction to Python" },
      { id: "49", title: "Data Structures", courseName: "Introduction to Python" },
      { id: "50", title: "Data Manipulation with Pandas", courseName: "Introduction to Python" },
      { id: "51", title: "Database Interaction", courseName: "Introduction to Python" },
    ],
  },
  {
    id: "databricks",
    title: "Databricks",
    videos: [
      { id: "52", title: "Databricks Workspaces", courseName: "Databricks" },
      { id: "53", title: "ETL process in Databricks", courseName: "Databricks" },
      { id: "54", title: "Orchestration and Scheduling", courseName: "Databricks" },
      { id: "55", title: "Analytics and Machine Learning", courseName: "Databricks" },
    ],
  },
  {
    id: "hadoop-and-spark",
    title: "Hadoop & Spark",
    videos: [
      { id: "56", title: "Hadoop Vs Spark Core Components", courseName: "Hadoop & Spark" },
      { id: "57", title: "Data Processing Frameworks: Apache Spark", courseName: "Hadoop & Spark" },
    ],
  },
  {
    id: "airflow",
    title: "Airflow",
    videos: [
      { id: "58", title: "DAGs (Directed Acyclic Graphs)", courseName: "Airflow" },
      { id: "59", title: "Task Execution and Operators", courseName: "Airflow" },
      { id: "60", title: "Task Monitoring and Management", courseName: "Airflow" },
      { id: "61", title: "Scheduling and Execution", courseName: "Airflow" },
      { id: "62", title: "Error Handling and Notifications", courseName: "Airflow" },
      { id: "63", title: "Security and Authentication", courseName: "Airflow" },
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
    coursesData.find((course) => course.id === courseId);

  // Check if courseData is undefined and show 404 if it is
  if (!courseData) {
    notFound(); // Redirect to 404 page
  }

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

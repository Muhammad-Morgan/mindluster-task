import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { headers } from "next/headers";
import Dashboard from "@/components/page/Dashboard";
import { fetchTasks } from "@/lib/tasksApi";

const getBaseUrl = () => {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  return host ? `${protocol}://${host}` : "http://localhost:3000";
};

const prefetchTasks = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(getBaseUrl()),
  });
};

export default async function TasksPage() {
  const queryClient = new QueryClient();

  await prefetchTasks(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Dashboard from "@/components/page/Dashboard";

export default async function TasksPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const resp = await fetch(
        "https://mindluster-task-olive.vercel.app/api/tasks/gettasks",
      );
      return resp.json();
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}

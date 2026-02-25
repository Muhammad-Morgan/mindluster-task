import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Dashboard from "@/components/page/Dashboard";

type TasksPageProps = {
  params?: { q?: string };
};

export default async function TasksPage({ params }: TasksPageProps) {
  const q = (await params?.q) ?? "";
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tasks", q],
    queryFn: async () => {
      const resp = await fetch(
        `https://mindluster-task-olive.vercel.app/api/tasks/gettasks?q=${encodeURIComponent(q)}`,
        { cache: "no-store" },
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

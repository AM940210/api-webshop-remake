import EditProductClient from "./EditProductClient";

// Add dynamic configuration for route parameters
export const dynamic = "force-dynamic";
export const dynamicParams = true;

// This time, let's simplify the component structure completely
export default function EditProductPage({
  params,
}: {
  params: { articleNumber: string };
}) {
  // Return the client component with the articleNumber
  return <EditProductClient articleNumber={params.articleNumber} />;
}

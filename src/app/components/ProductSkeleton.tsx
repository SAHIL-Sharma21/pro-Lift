import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <Card className="flex flex-col justify-between">
      <CardContent className="pt-4">
        <Skeleton className="h-48 rounded-md w-full" />
        <div className="space-y-2 mt-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-24" />
      </CardFooter>
    </Card>
  );
}

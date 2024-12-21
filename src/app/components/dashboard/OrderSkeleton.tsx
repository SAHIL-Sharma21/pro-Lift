import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function OrderSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-10 w-48 mb-6" />
      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Summary Card */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Details Card */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items Table */}
      <Card className="mt-6">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {[1, 2, 3, 4].map((i) => (
                  <TableHead key={i}>
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map((row) => (
                <TableRow key={row}>
                  {[1, 2, 3, 4].map((cell) => (
                    <TableCell key={cell}>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
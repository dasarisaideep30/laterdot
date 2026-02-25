import { Badge } from "@/components/ui/badge";

type PostStatus = "PROCESSING" | "APPROVED" | "DECLINED" | "PUBLISHED";

const statusVariants: Record<PostStatus, string> = {
    PROCESSING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-200",
    APPROVED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-200",
    DECLINED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 hover:bg-red-200",
    PUBLISHED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200",
};

export default function StatusBadge({ status }: { status: PostStatus }) {
    return (
        <Badge className={statusVariants[status]}>
            {status}
        </Badge>
    );
}

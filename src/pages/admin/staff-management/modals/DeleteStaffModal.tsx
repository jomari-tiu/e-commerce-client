import { Modal, Button } from "@/components";
import { AlertCircle } from "lucide-react";

type StaffType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type DeleteStaffModalProps = {
  staff: StaffType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
};

export default function DeleteStaffModal({
  staff,
  open,
  onOpenChange,
  onDelete,
}: DeleteStaffModalProps) {
  if (!staff) return null;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Staff Member"
      description="This action cannot be undone"
      maxWidth="sm"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-900">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {staff.firstName} {staff.lastName}
              </span>
              ?
            </p>
            <p className="text-xs text-red-700 mt-1">
              This will permanently remove the staff member and all their
              activity logs. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={onDelete} className="flex-1">
            Delete Staff
          </Button>
        </div>
      </div>
    </Modal>
  );
}

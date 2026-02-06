import { Modal, Button } from "@/components";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/@raw-shadcn/Label";
import RadioGroup from "@/components/ui/RadioButton/RadioGroup";
import { Switch } from "@/components/ui/@raw-shadcn/switch";
import { useToast } from "@/components/ui/Toast/useToast";
import { useState, useMemo } from "react";

type StaffRole = "super_admin" | "sales_staff";

type StaffType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: StaffRole;
  employeeId: string;
  isActive: boolean;
};

type StaffFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff?: StaffType | null;
};

const getInitialFormData = (staff?: StaffType | null) => {
  if (staff) {
    return {
      email: staff.email,
      firstName: staff.firstName,
      lastName: staff.lastName,
      phone: staff.phone,
      role: staff.role,
      employeeId: staff.employeeId,
      password: "",
      confirmPassword: "",
      isActive: staff.isActive,
    };
  }
  return {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "sales_staff" as StaffRole,
    employeeId: "",
    password: "",
    confirmPassword: "",
    isActive: true,
  };
};

export default function StaffFormModal({
  open,
  onOpenChange,
  staff,
}: StaffFormModalProps) {
  const { success } = useToast();
  const initialFormData = useMemo(() => getInitialFormData(staff), [staff]);
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form data when modal opens/closes or staff changes
  if (open && JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
    setFormData(initialFormData);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!staff && formData.password !== formData.confirmPassword) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      success(
        staff ? "Staff Updated" : "Staff Added",
        `${formData.firstName} ${formData.lastName} has been ${
          staff ? "updated" : "added"
        } successfully`
      );
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  const roleOptions = [
    { value: "sales_staff", label: "Sales Staff" },
    { value: "super_admin", label: "Super Admin" },
  ];

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={staff ? "Edit Staff Member" : "Add Staff Member"}
      description={
        staff
          ? "Update staff member information"
          : "Add a new staff member to your team"
      }
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Employee ID */}
        <div className="space-y-2">
          <Label htmlFor="employeeId">
            Employee ID <span className="text-red-500">*</span>
          </Label>
          <Input
            id="employeeId"
            type="text"
            placeholder="EMP-001"
            value={formData.employeeId}
            onChange={(e) =>
              setFormData({ ...formData, employeeId: e.target.value })
            }
            required
          />
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+63 912 345 6789"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
        </div>

        {/* Role Selection */}
        <div className="space-y-3">
          <Label>
            Role <span className="text-red-500">*</span>
          </Label>
            <RadioGroup
              options={roleOptions}
              value={formData.role}
              onValueChange={(value: string) =>
                setFormData({ ...formData, role: value as StaffRole })
              }
              orientation="horizontal"
            />
          <p className="text-xs text-muted-foreground">
            Super Admin has full access, Sales Staff can only access POS and
            orders
          </p>
        </div>

        {/* Password Fields (only for new staff) */}
        {!staff && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
              {formData.password !== formData.confirmPassword &&
                formData.confirmPassword && (
                  <p className="text-xs text-red-500">
                    Passwords do not match
                  </p>
                )}
            </div>
          </div>
        )}

        {/* Active Status */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-0.5">
            <Label htmlFor="isActive">Active Status</Label>
            <p className="text-xs text-muted-foreground">
              Inactive staff cannot log in to the system
            </p>
          </div>
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isActive: checked })
            }
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            disabled={
              isSubmitting ||
              (!staff &&
                formData.password !== formData.confirmPassword)
            }
          >
            {isSubmitting
              ? "Saving..."
              : staff
              ? "Update Staff"
              : "Add Staff"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

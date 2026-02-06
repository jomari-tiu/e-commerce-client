import { Button, IconMenuDropdown, Table, Badge } from "@/components";
import PageWrapper from "@/components/ui/PageWrapper";
import TableFilter from "@/components/ui/TableFilter";
import { useState } from "react";
import { Edit, Trash2, UserPlus, Lock } from "lucide-react";
import StaffFormModal from "./modals/StaffFormModal";
import DeleteStaffModal from "./modals/DeleteStaffModal";

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
  lastLogin: string;
  createdAt: string;
};

// Mock data
const staffMembers: StaffType[] = [
  {
    id: "1",
    email: "admin@ecommerce.com",
    firstName: "John",
    lastName: "Admin",
    phone: "+63 912 345 6789",
    role: "super_admin",
    employeeId: "EMP-001",
    isActive: true,
    lastLogin: "2026-01-10T10:30:00",
    createdAt: "2025-01-01T00:00:00",
  },
  {
    id: "2",
    email: "sales1@ecommerce.com",
    firstName: "Maria",
    lastName: "Santos",
    phone: "+63 923 456 7890",
    role: "sales_staff",
    employeeId: "EMP-002",
    isActive: true,
    lastLogin: "2026-01-10T09:15:00",
    createdAt: "2025-02-15T00:00:00",
  },
  {
    id: "3",
    email: "sales2@ecommerce.com",
    firstName: "Pedro",
    lastName: "Cruz",
    phone: "+63 934 567 8901",
    role: "sales_staff",
    employeeId: "EMP-003",
    isActive: true,
    lastLogin: "2026-01-09T16:45:00",
    createdAt: "2025-03-20T00:00:00",
  },
  {
    id: "4",
    email: "inactive@ecommerce.com",
    firstName: "Ana",
    lastName: "Garcia",
    phone: "+63 945 678 9012",
    role: "sales_staff",
    employeeId: "EMP-004",
    isActive: false,
    lastLogin: "2025-12-20T10:00:00",
    createdAt: "2025-04-10T00:00:00",
  },
];

export default function StaffManagementPage() {
  const [selectedStaff, setSelectedStaff] = useState<StaffType | null>(null);
  const [staffToDelete, setStaffToDelete] = useState<StaffType | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState<{
    search: string;
    sortBy: keyof StaffType;
    orderBy: "asc" | "desc";
  }>({
    search: "",
    sortBy: "firstName",
    orderBy: "asc",
  });

  const getRoleBadge = (role: StaffRole) => {
    return role === "super_admin" ? "primary" : "info";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleEdit = (staff: StaffType) => {
    setSelectedStaff(staff);
  };

  const handleDelete = (staff: StaffType) => {
    setStaffToDelete(staff);
  };

  const handleResetPassword = (staff: StaffType) => {
    console.log("Reset password for:", staff.email);
    // TODO: Implement password reset
  };

  return (
    <>
      <StaffFormModal
        open={showAddModal || selectedStaff !== null}
        onOpenChange={() => {
          setShowAddModal(false);
          setSelectedStaff(null);
        }}
        staff={selectedStaff}
      />
      <DeleteStaffModal
        staff={staffToDelete}
        open={staffToDelete !== null}
        onOpenChange={() => setStaffToDelete(null)}
        onDelete={() => {
          console.log("Delete staff:", staffToDelete?.id);
          setStaffToDelete(null);
        }}
      />
      <PageWrapper
        title="Staff Management"
        description="Manage staff accounts and permissions"
      >
        <TableFilter
          filters={filters}
          setFilters={setFilters}
          actions={
            <Button
              variant="primary"
              onClick={() => setShowAddModal(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Staff Member
            </Button>
          }
        />
        <Table
          data={staffMembers}
          sortable
          striped
          hoverable
          sort={{
            column: filters.sortBy,
            direction: filters.orderBy,
          }}
          onSortChange={(
            column: keyof StaffType,
            direction: "asc" | "desc"
          ) => setFilters({ ...filters, sortBy: column, orderBy: direction })}
        >
          {({ Column }) => (
            <>
              <Column
                id="employeeId"
                name="employeeId"
                header="Employee ID"
                sortable
              />
              <Column
                id="firstName"
                name="firstName"
                header="Name"
                sortable
                render={({ row }: { row: StaffType }) => (
                  <div>
                    <div className="font-medium">
                      {row.firstName} {row.lastName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {row.email}
                    </div>
                  </div>
                )}
              />
              <Column
                id="phone"
                name="phone"
                header="Phone"
                render={({ value }) => (
                  <span className="text-sm">{value}</span>
                )}
              />
              <Column
                id="role"
                name="role"
                header="Role"
                sortable
                render={({ value }: { value: StaffRole }) => (
                  <Badge variant={getRoleBadge(value)}>
                    {value === "super_admin" ? "Super Admin" : "Sales Staff"}
                  </Badge>
                )}
              />
              <Column
                id="isActive"
                name="isActive"
                header="Status"
                sortable
                render={({ value }: { value: boolean }) => (
                  <Badge variant={value ? "success" : "danger"}>
                    {value ? "Active" : "Inactive"}
                  </Badge>
                )}
              />
              <Column
                id="lastLogin"
                name="lastLogin"
                header="Last Login"
                sortable
                render={({ value }) => (
                  <span className="text-sm">{formatDateTime(value)}</span>
                )}
              />
              <Column
                id="createdAt"
                name="createdAt"
                header="Joined"
                sortable
                render={({ value }) => (
                  <span className="text-sm">{formatDate(value)}</span>
                )}
              />
              <Column
                id="actions"
                header="Actions"
                width="100px"
                sticky="right"
                render={({ row }: { row: StaffType }) => (
                  <IconMenuDropdown
                    variant="primary"
                    items={[
                      {
                        label: "Edit",
                        onClick: () => handleEdit(row),
                        icon: <Edit className="h-4 w-4" />,
                      },
                      {
                        label: "Reset Password",
                        onClick: () => handleResetPassword(row),
                        icon: <Lock className="h-4 w-4" />,
                      },
                      { type: "separator" },
                      {
                        label: "Delete",
                        onClick: () => handleDelete(row),
                        icon: <Trash2 className="h-4 w-4" />,
                        destructive: true,
                      },
                    ]}
                  />
                )}
              />
            </>
          )}
        </Table>
      </PageWrapper>
    </>
  );
}

import React, { useState } from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import { Table } from "./Table";
import { Badge } from "../badge";
import { Button } from "../button";
import { SelectionState } from "./types";
import { IconMenuDropdown } from "../Dropdown";

type Employee = {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  status: "active" | "inactive" | "pending";
  hireDate: string;
  avatar?: string;
};

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "available" | "out-of-stock" | "discontinued";
  lastUpdated: string;
};

const employeeData: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    department: "Engineering",
    role: "Senior Developer",
    salary: 85000,
    status: "active",
    hireDate: "2022-03-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@company.com",
    department: "Design",
    role: "UI/UX Designer",
    salary: 70000,
    status: "active",
    hireDate: "2021-08-20",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    department: "Marketing",
    role: "Marketing Manager",
    salary: 75000,
    status: "pending",
    hireDate: "2023-01-10",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    department: "Engineering",
    role: "Frontend Developer",
    salary: 78000,
    status: "inactive",
    hireDate: "2022-11-05",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@company.com",
    department: "Sales",
    role: "Sales Representative",
    salary: 65000,
    status: "active",
    hireDate: "2023-02-28",
  },
];

const productData: Product[] = [
  {
    id: "PROD-001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 50,
    status: "available",
    lastUpdated: "2023-09-15",
  },
  {
    id: "PROD-002",
    name: "Gaming Mouse",
    category: "Electronics",
    price: 79.99,
    stock: 0,
    status: "out-of-stock",
    lastUpdated: "2023-09-10",
  },
  {
    id: "PROD-003",
    name: "Office Chair",
    category: "Furniture",
    price: 299.99,
    stock: 25,
    status: "available",
    lastUpdated: "2023-09-12",
  },
  {
    id: "PROD-004",
    name: "Old Laptop Model",
    category: "Electronics",
    price: 599.99,
    stock: 5,
    status: "discontinued",
    lastUpdated: "2023-08-30",
  },
];

export const TableExample: React.FC = () => {
  const [employeeSelection, setEmployeeSelection] = useState<
    SelectionState<Employee>
  >({
    mode: "multiple",
    selectedRows: [],
  });
  const [employeeSort, setEmployeeSort] = useState<
    { column: string; direction: "asc" | "desc" } | undefined
  >();

  const [productSelection, setProductSelection] = useState<
    SelectionState<Product>
  >({
    mode: "single",
    selectedRow: undefined,
  });
  const [productSort, setProductSort] = useState<
    { column: string; direction: "asc" | "desc" } | undefined
  >();
  const handleEmployeeAction = (action: string, employee: Employee) => {
    console.log(`${action} action for employee:`, employee.name);
  };

  const handleProductAction = (action: string, product: Product) => {
    console.log(`${action} action for product:`, product.name);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "success",
      inactive: "danger",
      pending: "warning",
      available: "success",
      "out-of-stock": "danger",
      discontinued: "default",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "default"}>
        {status.replace("-", " ")}
      </Badge>
    );
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Table Component Examples</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Employee Management (Multiple Selection)
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Demonstrates multiple row selection, sorting, custom rendering,
              and sticky columns.
            </p>

            {employeeSelection.selectedRows &&
              employeeSelection.selectedRows.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-800">
                    {employeeSelection.selectedRows.length} employee(s)
                    selected:{" "}
                    {employeeSelection.selectedRows
                      .map((emp) => emp.name)
                      .join(", ")}
                  </p>
                </div>
              )}
          </div>

          <Table
            data={employeeData}
            selection={{
              mode: "multiple",
              selectedRows: employeeSelection.selectedRows,
              onSelectionChange: setEmployeeSelection,
              getRowId: (row) => row.id,
            }}
            sortable
            sort={employeeSort}
            onSortChange={(column, direction) =>
              setEmployeeSort({ column, direction })
            }
            striped
            hoverable
            size="default"
            className="border border-gray-200 rounded-lg"
            onRowClick={(row) => console.log("Row clicked:", row.name)}
          >
            {({ Column }) => (
              <>
                <Column
                  id="name"
                  header="Name"
                  name="name"
                  width="200px"
                  sticky="left"
                  sortable
                  render={({ row: employee }: { row: Employee }) => (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                        {employee.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-gray-500">
                          {employee.email}
                        </div>
                      </div>
                    </div>
                  )}
                />
                <Column
                  id="department"
                  header="Department"
                  name="department"
                  width="150px"
                  sortable
                />
                <Column
                  id="role"
                  header="Role"
                  name="role"
                  width="180px"
                  sortable
                />
                <Column
                  id="salary"
                  header="Salary"
                  name="salary"
                  width="120px"
                  align="right"
                  sortable
                  render={({ value }) => formatCurrency(value)}
                />
                <Column
                  id="status"
                  header="Status"
                  name="status"
                  width="100px"
                  render={({ value }) => getStatusBadge(value)}
                />
                <Column
                  id="hireDate"
                  header="Hire Date"
                  name="hireDate"
                  width="120px"
                  sortable
                  render={({ value }) => formatDate(value)}
                />
                <Column
                  id="actions"
                  header="Actions"
                  width="100px"
                  sticky="right"
                  render={({ row: employee }: { row: Employee }) => (
                    <IconMenuDropdown
                      variant="primary"
                      items={[
                        {
                          label: "View",
                          onClick: () => handleEmployeeAction("view", employee),
                          icon: <Eye className="h-4 w-4" />,
                        },
                        {
                          label: "Edit",
                          onClick: () => handleEmployeeAction("edit", employee),
                          icon: <Edit className="h-4 w-4" />,
                        },
                        { type: "separator" },
                        {
                          label: "Delete",
                          onClick: () =>
                            handleEmployeeAction("delete", employee),
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
        </div>

        <div className="space-y-4 mt-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Product Catalog (Single Selection)
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Demonstrates single row selection with radio buttons and custom
              styling.
            </p>

            {productSelection.selectedRow && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800">
                  Selected product: {productSelection.selectedRow.name} (ID:{" "}
                  {productSelection.selectedRow.id})
                </p>
              </div>
            )}
          </div>

          <Table
            data={productData}
            selection={{
              mode: "single",
              selectedRow: productSelection.selectedRow,
              onSelectionChange: setProductSelection,
              getRowId: (row) => row.id,
            }}
            sortable
            sort={productSort}
            onSortChange={(column, direction) =>
              setProductSort({ column, direction })
            }
            bordered
            size="sm"
            className="max-w-4xl"
          >
            {({ Column }) => (
              <>
                <Column
                  id="id"
                  header="Product ID"
                  name="id"
                  width="120px"
                  sortable
                  cellClassName="font-mono text-xs"
                />
                <Column
                  id="name"
                  header="Product Name"
                  name="name"
                  minWidth="200px"
                  sortable
                  render={({ row: product }: { row: Product }) => (
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-gray-500">
                        {product.category}
                      </div>
                    </div>
                  )}
                />
                <Column
                  id="price"
                  header="Price"
                  name="price"
                  width="100px"
                  align="right"
                  sortable
                  render={({ value }) => formatCurrency(value)}
                />
                <Column
                  id="stock"
                  header="Stock"
                  name="stock"
                  width="80px"
                  align="center"
                  sortable
                  render={({ value }) => (
                    <span
                      className={value === 0 ? "text-red-600 font-medium" : ""}
                    >
                      {value}
                    </span>
                  )}
                />
                <Column
                  id="status"
                  header="Status"
                  name="status"
                  width="120px"
                  render={({ value }) => getStatusBadge(value)}
                />
                <Column
                  id="lastUpdated"
                  header="Last Updated"
                  name="lastUpdated"
                  width="120px"
                  sortable
                  render={({ value }) => formatDate(value)}
                />
                <Column
                  id="actions"
                  header="Actions"
                  width="100px"
                  render={({ row: product }: { row: Product }) => (
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleProductAction("edit", product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleProductAction("delete", product)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                />
              </>
            )}
          </Table>
        </div>

        <div className="space-y-4 mt-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Empty State Example</h3>
            <p className="text-gray-600 text-sm mb-4">
              Demonstrates how the table handles empty data.
            </p>
          </div>

          <Table data={[]} className="border border-gray-200 rounded-lg">
            {({ Column }) => (
              <>
                <Column id="name" header="Name" name="name" />
                <Column id="email" header="Email" name="email" />
                <Column id="role" header="Role" name="role" />
              </>
            )}
          </Table>
        </div>

        <div className="space-y-4 mt-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Render Prop Pattern Example
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Demonstrates the new render prop pattern with type-safe Column
              component.
            </p>
          </div>

          <Table
            data={[
              {
                id: 1,
                name: "John Doe",
                email: "john@example.com",
                role: "Admin",
              },
              {
                id: 2,
                name: "Jane Smith",
                email: "jane@example.com",
                role: "User",
              },
              {
                id: 3,
                name: "Bob Johnson",
                email: "bob@example.com",
                role: "User",
              },
            ]}
            className="border border-gray-200 rounded-lg"
          >
            {({ Column }) => (
              <>
                <Column
                  id="name"
                  header="Name"
                  name="name"
                  render={({ value, index }) => (
                    <div className="font-medium text-blue-600">
                      {value} (#{index + 1})
                    </div>
                  )}
                />
                <Column
                  id="email"
                  header="Email"
                  name="email"
                  render={({ value }) => (
                    <a
                      href={`mailto:${value}`}
                      className="text-blue-500 hover:underline"
                    >
                      {value}
                    </a>
                  )}
                />
                <Column
                  id="role"
                  header="Role"
                  name="role"
                  render={({ value }) => (
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        value === "Admin"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {value}
                    </span>
                  )}
                />
              </>
            )}
          </Table>
        </div>

        <div className="space-y-4 mt-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Loading State Example
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Demonstrates the loading state.
            </p>
          </div>

          <Table
            data={employeeData}
            loading={true}
            className="border border-gray-200 rounded-lg"
          >
            {({ Column }) => (
              <>
                <Column id="name" header="Name" name="name" />
                <Column id="email" header="Email" name="email" />
                <Column id="role" header="Role" name="role" />
              </>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TableExample;

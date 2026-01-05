import React, { useState } from "react";
import { Pagination } from "./Pagination";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../@raw-shadcn/card";
import { Select } from "../Select";

export const PaginationExample: React.FC = () => {
  const [basicPage, setBasicPage] = useState(1);
  const [compactPage, setCompactPage] = useState(1);
  const [customPage, setCustomPage] = useState(1);
  const [sizePage, setSizePage] = useState(1);
  const [disabledPage, setDisabledPage] = useState(1);
  const [dataPage, setDataPage] = useState(1);
  const [pageSize, setPageSize] = useState<{ value: string; label: string }>({
    value: "10",
    label: "10 per page",
  });

  // Sample data for pagination with data example
  const totalItems = 95;
  const itemsPerPage = parseInt(pageSize.value);
  const totalDataPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (dataPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(dataPage * itemsPerPage, totalItems);

  const pageSizeOptions = [
    { value: "5", label: "5 per page" },
    { value: "10", label: "10 per page" },
    { value: "20", label: "20 per page" },
    { value: "50", label: "50 per page" },
  ];

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">
          Pagination Component Examples
        </h2>
        <p className="text-muted-foreground">
          Pagination component for navigating through multiple pages of content.
        </p>
      </div>

      {/* Basic Pagination */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Pagination</CardTitle>
          <CardDescription>
            Simple pagination with Previous/Next buttons and page numbers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Pagination
              currentPage={basicPage}
              totalPages={10}
              onPageChange={setBasicPage}
            />
            <p className="text-sm text-muted-foreground">
              Current page: <span className="font-semibold">{basicPage}</span>{" "}
              of 10
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Compact Pagination */}
      <Card>
        <CardHeader>
          <CardTitle>Compact Pagination</CardTitle>
          <CardDescription>
            Pagination with fewer sibling pages shown (siblingCount=0)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Pagination
              currentPage={compactPage}
              totalPages={20}
              onPageChange={setCompactPage}
              siblingCount={0}
            />
            <p className="text-sm text-muted-foreground">
              Current page: <span className="font-semibold">{compactPage}</span>{" "}
              of 20
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Extended Pagination */}
      <Card>
        <CardHeader>
          <CardTitle>Extended Pagination</CardTitle>
          <CardDescription>
            Pagination with more sibling pages and first/last buttons
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Pagination
              currentPage={customPage}
              totalPages={50}
              onPageChange={setCustomPage}
              siblingCount={2}
              showFirstLast={true}
            />
            <p className="text-sm text-muted-foreground">
              Current page: <span className="font-semibold">{customPage}</span>{" "}
              of 50
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Different Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Different Sizes</CardTitle>
          <CardDescription>Pagination in various sizes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium">Small</p>
            <Pagination
              currentPage={sizePage}
              totalPages={15}
              onPageChange={setSizePage}
              size="sm"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Default</p>
            <Pagination
              currentPage={sizePage}
              totalPages={15}
              onPageChange={setSizePage}
              size="default"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Large</p>
            <Pagination
              currentPage={sizePage}
              totalPages={15}
              onPageChange={setSizePage}
              size="lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Without Previous/Next */}
      <Card>
        <CardHeader>
          <CardTitle>Without Previous/Next Buttons</CardTitle>
          <CardDescription>
            Pagination showing only page numbers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Pagination
              currentPage={basicPage}
              totalPages={8}
              onPageChange={setBasicPage}
              showPreviousNext={false}
            />
            <p className="text-sm text-muted-foreground">
              Current page: <span className="font-semibold">{basicPage}</span>{" "}
              of 8
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Disabled State */}
      <Card>
        <CardHeader>
          <CardTitle>Disabled State</CardTitle>
          <CardDescription>
            Pagination in disabled state (non-interactive)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Pagination
              currentPage={disabledPage}
              totalPages={10}
              onPageChange={setDisabledPage}
              disabled
            />
            <p className="text-sm text-muted-foreground">
              This pagination is disabled and cannot be interacted with
            </p>
          </div>
        </CardContent>
      </Card>

      {/* With Page Size Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Pagination with Page Size Selector</CardTitle>
          <CardDescription>
            Common pattern with items per page selector
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <p className="text-sm text-muted-foreground">
                Showing {startItem} to {endItem} of {totalItems} items
              </p>
              <div className="w-40">
                <Select
                  options={pageSizeOptions}
                  value={pageSize}
                  onValueChange={(value) => {
                    setPageSize(value!);
                    setDataPage(1); // Reset to first page when page size changes
                  }}
                  size="sm"
                />
              </div>
            </div>
            <Pagination
              currentPage={dataPage}
              totalPages={totalDataPages}
              onPageChange={setDataPage}
            />
          </div>
        </CardContent>
      </Card>

      {/* Few Pages Example */}
      <Card>
        <CardHeader>
          <CardTitle>Few Pages (No Ellipsis)</CardTitle>
          <CardDescription>
            When total pages is small, all pages are shown
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Pagination
              currentPage={1}
              totalPages={5}
              onPageChange={() => {}}
            />
            <p className="text-sm text-muted-foreground">
              All 5 pages are visible without ellipsis
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaginationExample;

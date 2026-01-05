import * as React from "react";

export type TableRowData = Record<string, any>;

export type ColumnProps<T extends TableRowData = TableRowData> = {
  id: string;
  header: string;
  name?: keyof T | ((row: T) => any);
  render?: (props: { row: T; value: any; index: number }) => React.ReactNode;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  sticky?: "left" | "right" | false;
  stickyOffset?: string;
  sortable?: boolean;
  headerClassName?: string;
  cellClassName?: string;
  resizable?: boolean;
  align?: "left" | "center" | "right";
};

export type ColumnRenderProps<T extends TableRowData = TableRowData> = {
  Column: React.ComponentType<ColumnProps<T>>;
  index: number;
};

export type SelectionMode = "none" | "single" | "multiple";

export type SelectionState<T extends TableRowData = TableRowData> = {
  selectedRow?: T;
  selectedRows?: T[];
  mode: SelectionMode;
};

export type TableProps<T extends TableRowData = TableRowData> = {
  data: T[];
  children: (props: ColumnRenderProps<T>) => React.ReactNode;
  selection?: {
    mode: SelectionMode;
    selectedRow?: T;
    selectedRows?: T[];
    onSelectionChange?: (selection: SelectionState<T>) => void;
    getRowId?: (row: T, index?: number) => string | number;
  };
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  striped?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  emptyState?: React.ReactNode;
  sortable?: boolean;
  sort?: {
    column: string;
    direction: "asc" | "desc";
  };
  onSortChange?: (column: string, direction: "asc" | "desc") => void;
  bordered?: boolean;
  size?: "sm" | "default" | "lg";
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
  fillHeight?: boolean;
  headerHeight?: number;
  rowHeight?: number;
};

export type TableContextType<T extends TableRowData = TableRowData> = {
  selection: SelectionState<T>;
  setSelection: (selection: SelectionState<T>) => void;
  sort?: {
    column: string;
    direction: "asc" | "desc";
  };
  onSortChange?: (column: string, direction: "asc" | "desc") => void;
  getRowId: (row: T, index?: number) => string | number;
  data: T[];
  rowClassName?: string | ((row: T, index: number) => string);
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
  size: "sm" | "default" | "lg";
};

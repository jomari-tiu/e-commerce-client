import * as React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import Checkbox from '../Checkbox/Checkbox';
import {
  Table as BaseTable,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '../@raw-shadcn/table';
import {
  TableProps,
  TableRowData,
  ColumnProps,
  SelectionState,
  TableContextType,
} from './types';

const TableContext = React.createContext<TableContextType | null>(null);

const extractColumns = <T extends TableRowData = TableRowData>(
  children: React.ReactElement<ColumnProps<T>>[] | React.ReactNode
): ColumnProps<T>[] => {
  if (!Array.isArray(children)) {
    const childArray = React.Children.toArray(children) as React.ReactElement<
      ColumnProps<T>
    >[];
    return React.Children.map(childArray, child => {
      if (React.isValidElement(child)) {
        return child.props as ColumnProps<T>;
      }
      return null;
    }).filter(Boolean);
  }

  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return child.props as ColumnProps<T>;
    }
    return null;
  }).filter(Boolean);
};

const getStickyStyles = (
  sticky: 'left' | 'right' | false | undefined,
  offset: string = '0px'
) => {
  if (!sticky) return {};

  return {
    position: 'sticky' as const,
    [sticky]: offset,
    zIndex: 10,
    backgroundColor: 'inherit',
  };
};

const getCellValue = <T extends TableRowData = TableRowData>(
  row: T,
  name?: keyof T | ((row: T) => any)
): any => {
  if (!name) return '';
  if (typeof name === 'function') {
    return name(row);
  }
  return row[name];
};

const SelectionColumn = <T extends TableRowData = TableRowData>({
  mode,
  data,
  selection,
  onSelectionChange,
  getRowId,
}: {
  mode: 'single' | 'multiple';
  data: T[];
  selection: SelectionState<T>;
  onSelectionChange: (selection: SelectionState<T>) => void;
  getRowId: (row: T, index?: number) => string | number;
}) => {
  if (mode === 'multiple') {
    const allSelected =
      data.length > 0 &&
      data.every(row =>
        selection.selectedRows?.some(
          selected => getRowId(selected) === getRowId(row)
        )
      );
    const someSelected = data.some(row =>
      selection.selectedRows?.some(
        selected => getRowId(selected) === getRowId(row)
      )
    );

    const handleSelectAll = (checked: boolean) => {
      onSelectionChange({
        ...selection,
        selectedRows: checked ? [...data] : [],
      });
    };

    return (
      <TableHead className="w-12 pr-0">
        <Checkbox
          checked={allSelected}
          onCheckedChange={handleSelectAll}
          className={cn(
            someSelected && !allSelected && 'data-[state=checked]:opacity-50'
          )}
        />
      </TableHead>
    );
  }

  return <TableHead className="w-12" />;
};

const SelectionCell = <T extends TableRowData = TableRowData>({
  mode,
  row,
  selection,
  onSelectionChange,
  getRowId,
}: {
  mode: 'single' | 'multiple';
  row: T;
  selection: SelectionState<T>;
  onSelectionChange: (selection: SelectionState<T>) => void;
  getRowId: (row: T, index?: number) => string | number;
}) => {
  const rowId = getRowId(row);

  if (mode === 'multiple') {
    const isSelected =
      selection.selectedRows?.some(selected => getRowId(selected) === rowId) ??
      false;

    const handleSelect = (checked: boolean) => {
      const currentSelected = selection.selectedRows || [];
      const newSelected = checked
        ? [...currentSelected, row]
        : currentSelected.filter(selected => getRowId(selected) !== rowId);

      onSelectionChange({
        ...selection,
        selectedRows: newSelected,
      });
    };

    return (
      <TableCell className="pr-0">
        <Checkbox checked={isSelected} onCheckedChange={handleSelect} />
      </TableCell>
    );
  }

  if (mode === 'single') {
    const isSelected =
      selection.selectedRow && getRowId(selection.selectedRow) === rowId;

    const handleSelect = () => {
      onSelectionChange({
        ...selection,
        selectedRow: isSelected ? undefined : row,
      });
    };

    return (
      <TableCell className="pr-0">
        <div className="flex items-center">
          <input
            type="radio"
            checked={isSelected ?? false}
            onChange={handleSelect}
            className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
          />
        </div>
      </TableCell>
    );
  }

  return null;
};

export const Table = <T extends TableRowData = TableRowData>({
  data,
  children,
  selection,
  className,
  tableClassName,
  headerClassName,
  bodyClassName,
  rowClassName,
  striped = false,
  hoverable = true,
  loading = false,
  emptyMessage = 'No data available',
  emptyState,
  sortable = false,
  sort,
  onSortChange,
  bordered = false,
  size = 'default',
  onRowClick,
  onRowDoubleClick,
  fillHeight = false,
  headerHeight,
  rowHeight,
}: TableProps<T>) => {
  const columnsRef = React.useRef<ColumnProps<T>[]>([]);

  const ColumnComponent = React.useCallback((props: ColumnProps<T>) => {
    const existingIndex = columnsRef.current.findIndex(
      col => col.id === props.id
    );
    if (existingIndex >= 0) {
      columnsRef.current[existingIndex] = props;
    } else {
      columnsRef.current.push(props);
    }
    return null;
  }, []);

  const columns = React.useMemo(() => {
    if (typeof children === 'function') {
      // Call the children function to get the JSX
      const childrenResult = children({
        Column: ColumnComponent,
        index: 0,
      });

      // Extract columns from the JSX elements
      const extractedColumns: ColumnProps<T>[] = [];

      const processElement = (element: any) => {
        if (React.isValidElement(element)) {
          if (element.type === ColumnComponent) {
            extractedColumns.push(element.props as ColumnProps<T>);
          } else if (
            element.props &&
            typeof element.props === 'object' &&
            'children' in element.props
          ) {
            React.Children.forEach(
              (element.props as any).children,
              processElement
            );
          }
        }
      };

      if (React.isValidElement(childrenResult)) {
        if (
          childrenResult.type === React.Fragment &&
          (childrenResult.props as any).children
        ) {
          React.Children.forEach((childrenResult.props as any).children, processElement);
        } else {
          processElement(childrenResult);
        }
      }

      return extractedColumns;
    } else if (children) {
      console.warn(
        'Traditional Column children pattern is deprecated. Please use the render prop pattern.'
      );
      const childArray = Array.isArray(children) ? children : [children];
      return extractColumns(childArray);
    }
    return [];
  }, [children, ColumnComponent]);

  const defaultGetRowId = React.useCallback((row: T, index?: number) => {
    if ('id' in row && row.id !== undefined) return String(row.id);
    if ('_id' in row && row._id !== undefined) return String(row._id);
    return String(index || 0);
  }, []);

  const getRowId = selection?.getRowId || defaultGetRowId;
  const [internalSelection, setInternalSelection] = React.useState<
    SelectionState<T>
  >({
    mode: selection?.mode || 'none',
    selectedRow: selection?.selectedRow,
    selectedRows: selection?.selectedRows || [],
  });

  const currentSelection = React.useMemo(
    () =>
      selection
        ? {
            mode: selection.mode,
            selectedRow: selection.selectedRow,
            selectedRows: selection.selectedRows || [],
          }
        : internalSelection,
    [selection, internalSelection]
  );

  const handleSelectionChange = React.useCallback(
    (newSelection: SelectionState<T>) => {
      if (selection?.onSelectionChange) {
        selection.onSelectionChange(newSelection);
      } else {
        setInternalSelection(newSelection);
      }
    },
    [selection]
  );

  const handleSort = React.useCallback(
    (columnId: string) => {
      if (!sortable || !onSortChange) return;

      const newDirection =
        sort?.column === columnId && sort.direction === 'asc' ? 'desc' : 'asc';
      onSortChange(columnId, newDirection);
    },
    [sortable, onSortChange, sort]
  );
  const contextValue = React.useMemo(
    () => ({
      selection: currentSelection,
      setSelection: handleSelectionChange,
      sort,
      onSortChange,
      getRowId,
      data,
      rowClassName,
      onRowClick,
      onRowDoubleClick,
      size,
    }),
    [
      currentSelection,
      handleSelectionChange,
      sort,
      onSortChange,
      getRowId,
      data,
      rowClassName,
      onRowClick,
      onRowDoubleClick,
      size,
    ]
  );

  const sizeClasses = {
    sm: 'text-xs',
    default: 'text-sm',
    lg: 'text-base',
  };

  const rowSizeClasses = {
    sm: '[&_td]:py-2 [&_th]:py-2',
    default: '[&_td]:py-3 [&_th]:py-3',
    lg: '[&_td]:py-4 [&_th]:py-4',
  };

  if (loading) {
    return (
      <div className={cn('flex items-center justify-center p-8', className)}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (data.length === 0) {
    if (emptyState) {
      return <div className={cn('w-full', className)}>{emptyState}</div>;
    }

    return (
      <div
        className={cn(
          'flex items-center justify-center p-8 text-gray-500',
          className
        )}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <TableContext.Provider value={contextValue as any}>
      <div
        className={cn(
          'relative w-full',
          fillHeight && 'h-full flex flex-col',
          className
        )}
      >
        <div
          className={cn(
            'overflow-auto',
            fillHeight && 'flex-1',
            bordered && 'border border-gray-200 rounded-lg'
          )}
        >
          <BaseTable
            className={cn(
              sizeClasses[size],
              rowSizeClasses[size],
              tableClassName
            )}
          >
            <TableHeader
              className={cn(
                'bg-gray-50',
                headerHeight && `h-[${headerHeight}px]`,
                headerClassName
              )}
            >
              <TableRow>
                {currentSelection.mode !== 'none' && (
                  <SelectionColumn
                    mode={currentSelection.mode}
                    data={data}
                    selection={currentSelection}
                    onSelectionChange={handleSelectionChange}
                    getRowId={getRowId}
                  />
                )}

                {columns.map(column => {
                  const canSort = sortable && column.sortable;
                  const isSorted = sort?.column === column.id;

                  return (
                    <TableHead
                      key={column.id}
                      className={cn(
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right',
                        canSort &&
                          'cursor-pointer hover:bg-gray-100 select-none',
                        column.headerClassName
                      )}
                      style={{
                        width: column.width,
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        ...getStickyStyles(column.sticky, column.stickyOffset),
                      }}
                      onClick={() => canSort && handleSort(column.id)}
                    >
                      <div className="flex items-center gap-2">
                        <span>{column.header}</span>
                        {canSort && (
                          <div className="flex flex-col">
                            <ChevronUp
                              className={cn(
                                'h-3 w-3 -mb-1',
                                isSorted && sort?.direction === 'asc'
                                  ? 'text-primary'
                                  : 'text-gray-400'
                              )}
                            />
                            <ChevronDown
                              className={cn(
                                'h-3 w-3',
                                isSorted && sort?.direction === 'desc'
                                  ? 'text-primary'
                                  : 'text-gray-400'
                              )}
                            />
                          </div>
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>

            <TableBody className={bodyClassName}>
              {data.map((row, rowIndex) => {
                const rowId = getRowId(row, rowIndex);

                const isSelected =
                  currentSelection.mode === 'single'
                    ? currentSelection.selectedRow &&
                      getRowId(currentSelection.selectedRow, 0) === rowId
                    : currentSelection.selectedRows?.some(
                        selected => getRowId(selected, 0) === rowId
                      );

                const computedRowClassName =
                  typeof rowClassName === 'function'
                    ? rowClassName(row, rowIndex)
                    : rowClassName;

                return (
                  <TableRow
                    key={rowId}
                    className={cn(
                      striped && rowIndex % 2 === 1 && 'bg-gray-50',
                      hoverable && 'hover:bg-gray-100',
                      isSelected && 'bg-blue-50',
                      onRowClick && 'cursor-pointer',
                      computedRowClassName
                    )}
                    style={rowHeight ? { height: `${rowHeight}px` } : undefined}
                    onClick={() => onRowClick?.(row, rowIndex)}
                    onDoubleClick={() => onRowDoubleClick?.(row, rowIndex)}
                  >
                    {currentSelection.mode !== 'none' && (
                      <SelectionCell
                        mode={currentSelection.mode}
                        row={row}
                        selection={currentSelection}
                        onSelectionChange={handleSelectionChange}
                        getRowId={getRowId}
                      />
                    )}
                    {columns.map(column => {
                      const cellValue = getCellValue(row, column.name);
                      const cellContent = column.render
                        ? column.render({
                            row,
                            value: cellValue,
                            index: rowIndex,
                          })
                        : cellValue;

                      return (
                        <TableCell
                          key={column.id}
                          className={cn(
                            column.align === 'center' && 'text-center',
                            column.align === 'right' && 'text-right',
                            column.cellClassName
                          )}
                          style={{
                            width: column.width,
                            minWidth: column.minWidth,
                            maxWidth: column.maxWidth,
                            ...getStickyStyles(
                              column.sticky,
                              column.stickyOffset
                            ),
                          }}
                        >
                          {cellContent}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </BaseTable>
        </div>
      </div>
    </TableContext.Provider>
  );
};

Table.displayName = 'Table';

import { Search, X } from "lucide-react";
import { Input } from "./Input";
import { Text } from "./Text";
import { TableRowData } from ".";
import { useMemo } from "react";
import { toLabel } from "@/utils/formatText";

type FilterType<T> = {
  search: string;
  sortBy: keyof T;
  orderBy: "asc" | "desc";
};

type Props<T extends TableRowData> = {
  actions: React.ReactNode;
  filters: FilterType<T>;
  setFilters: (filters: FilterType<T>) => void;
};

export default function TableFilter<T extends TableRowData>({
  actions,
  filters,
  setFilters,
}: Props<T>) {
  const activeFilters = useMemo(() => {
    const filtersArray = Object.entries(filters).map(([key, value]) => {
      return {
        key,
        label: toLabel(key),
        value: toLabel(value.toString()),
      };
    });
    return filtersArray.filter((item) => item.value);
  }, [filters]);

  const removeActiveFilterHandler = (key: string) => {
    setFilters({ ...filters, [key]: "" });
  };

  return (
    <>
      <div className="flex items-center justify-between w-full mb-4">
        <Input
          leadingIcon={<Search className="h-4 w-4" />}
          placeholder="Search"
          debounce={500}
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        {actions}
      </div>

      <ActiveFilters
        filters={activeFilters}
        removeActiveFilterHandler={removeActiveFilterHandler}
      />
    </>
  );
}

const ActiveFilters = ({
  filters,
  removeActiveFilterHandler,
}: {
  filters: { key: string; label: string; value: any }[];
  removeActiveFilterHandler: (key: string) => void;
}) => {
  return (
    <div className="flex items-center gap-2 border border-gray-300 p-2 rounded-md w-full mb-4">
      {filters.length === 0 && (
        <div className="flex items-center gap-2">
          <Text size="sm" className="font-bold" color="primary">
            No active filters
          </Text>
        </div>
      )}

      {filters.length > 0 &&
        filters.map((item) => (
          <div
            key={item.key}
            className="border border-dashed border-gray-300 bg-gray-100 px-2 py-1 rounded-md flex gap-3 items-center"
          >
            <Text size="sm" className="font-bold" color="primary">
              {item.label}: {item.value}
            </Text>
            <X
              size={16}
              className="cursor-pointer"
              onClick={() => removeActiveFilterHandler(item.key)}
            />
          </div>
        ))}
    </div>
  );
};

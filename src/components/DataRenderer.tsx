import React from "react";

interface DataRendererProps<T extends Record<string, any>> {
  items: T;
  excludeKeys?: string[];
  valueOnlyKeys?: string[];
  keyLabels?: Record<string, string>;
  keyPrefix?: string;
  customContainerStyle?: string;
  customTextStyle?: string;
}

export const DataRenderer = <T extends Record<string, any>>({
  items,
  excludeKeys = [],
  valueOnlyKeys = [],
  keyLabels = {},
  keyPrefix = "data",
  customContainerStyle = "",
}: DataRendererProps<T>) => {
  return (
    <div className={customContainerStyle}>
      {Object.entries(items)
        .filter(([key]) => ![...excludeKeys, "_id"].includes(key)) // Always exclude "_id"
        .map(([key, value], index) => {
          const formattedValue =
            typeof value === "object" && value !== null && !Array.isArray(value)
              ? Object.entries(value)
                  .map(([subKey, subValue]) => `${subKey}: ${subValue}`)
                  .join(", ")
              : Array.isArray(value)
              ? value.join(", ")
              : value;

          return (
            <div key={`${keyPrefix}-${key}-${index}`}>
              {!valueOnlyKeys.includes(key) && (
                <h1>
                  {(keyLabels[key] || key).charAt(0).toUpperCase() +
                    (keyLabels[key] || key).slice(1)}
                  :
                </h1>
              )}
              <p>{formattedValue}</p>
            </div>
          );
        })}
    </div>
  );
};

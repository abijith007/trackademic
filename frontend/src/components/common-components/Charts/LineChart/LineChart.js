import { Chart } from "react-google-charts";

export function LineChart({ data, options, height, width }) {
  return (
    <div className="min-w-fit shadow-xl rounded-3xl bg-white p-4 my-auto">
      <Chart
        chartType="Line"
        width={width}
        height={height}
        data={data}
        options={options}
      />
    </div>
  );
}

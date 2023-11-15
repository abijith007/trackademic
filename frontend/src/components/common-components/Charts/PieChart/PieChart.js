import { Chart } from "react-google-charts";

function PieChart({ data, options, height, width }) {
  return (
    <div className="min-w-fit shadow-xl rounded-3xl bg-white p-2 my-auto">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={width}
        height={height}
        className="mx-auto my-auto"
      />
    </div>
  )
}

export default PieChart;
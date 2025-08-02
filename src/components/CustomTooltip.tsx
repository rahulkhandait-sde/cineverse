"use cleint"
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const dataKey = payload[0].dataKey;

    return (
      <div className="bg-[#1f2937] p-3 rounded-lg border border-gray-600 shadow-xl text-sm">
        <p className="font-bold text-gray-100">{data.fullTitle || data.name}</p>
        <p className="text-gray-300">
          {dataKey}:{" "}
          <span className="font-bold" style={{ color: payload[0].color }}>
            {data[dataKey]} {data.displayValue && `(${data.displayValue})`}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip
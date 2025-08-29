/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	LabelList,
	CartesianGrid,
} from "recharts";
import CustomTooltip from "@/components/CustomTooltip";
const CustomActiveBar = (props: any) => {
	const { fill, x, y, width, height } = props;
	return (
		<rect
			x={x}
			y={y - 2}
			width={width}
			height={height + 4}
			fill={fill}
			rx={5}
			ry={5}
			opacity={0.8}
		/>
	);
};
const StatChart = ({
	title,
	dataKey,
	data,
	barColor,
	domain,
	tickFormatter,
	legendLabel,
}: {
	title: string;
	dataKey: string;
	data: any[];
	barColor: string;
	domain?: [number, number];
	tickFormatter?: (value: number) => string;
	legendLabel?: string;
}) => (
	<div className='bg-gray-800/20 p-4 rounded-xl border border-gray-700/50'>
		<h3 className='text-lg font-semibold text-gray-100 mb-4 ml-2'>{title}</h3>
		{legendLabel && (
			<div className='mb-2 flex items-center gap-2 text-sm'>
				<div
					className='w-4 h-4 rounded-sm'
					style={{ backgroundColor: barColor }}></div>
				<span className='text-gray-300'>{legendLabel}</span>
			</div>
		)}

		<ResponsiveContainer width='100%' height={250}>
			<BarChart
				data={data}
				margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
				<CartesianGrid
					strokeDasharray='3 3'
					stroke='#4b5563'
					vertical={false}
				/>
				<XAxis
					dataKey='title'
					stroke='#9ca3af'
					fontSize={12}
					tickLine={false}
					axisLine={false}
				/>
				<YAxis
					stroke='#9ca3af'
					fontSize={12}
					domain={domain}
					tickFormatter={tickFormatter}
					tickLine={false}
					axisLine={false}
				/>
				<Tooltip
					content={<CustomTooltip />}
					cursor={{ fill: "rgba(107, 114, 128, 0.1)" }}
				/>
				<Bar
					dataKey={dataKey}
					fill={barColor}
					radius={[4, 4, 0, 0]}
					barSize={40}
					activeBar={<CustomActiveBar />}>
					<LabelList
						dataKey={dataKey}
						position='top'
						fill='#ffffff'
						fontSize={12}
						fontWeight='bold'
					/>
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	</div>
);

export default StatChart;

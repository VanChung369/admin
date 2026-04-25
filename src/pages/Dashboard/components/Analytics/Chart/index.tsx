import { getNumber } from '@/utils/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styleLess from './index.less';

type ChartProps = {
  data?: Array<any>;
  labels?: Array<any>;
};

const CustomTooltip = (params: any) => {
  const { active, payload } = params;
  if (active && payload && payload.length) {
    const tooltip = payload[0].payload.tooltip;
    return (
      <div className={styleLess.chart_tooltip}>
        <p className={styleLess.chart_tooltip_label}>{`${tooltip}`}</p>
        <p>
          Value: <b>{getNumber(payload[0].value)}</b>
        </p>
      </div>
    );
  }

  return null;
};

const Chart = ({ data, labels }: ChartProps) => {
  return (
    <ResponsiveContainer className={styleLess.chart}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" ticks={labels} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;

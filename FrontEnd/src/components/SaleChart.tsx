import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 18000 },
    { month: "Mar", sales: 15000 },
    { month: "Apr", sales: 24000 },
    { month: "May", sales: 28000 },
];

export const SaleChart = () => {
    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{  right: 20, bottom: 10, left: 10 }}>
                    <CartesianGrid strokeDasharray="3,5" stroke="gray" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "black" }} />
                    <YAxis domain={[0, "dataMax + 2000"]} tickFormatter={(value) => {
                        if (value >= 1000) {
                            return `${(value / 1000).toFixed(1)}k`;
                        }
                        return value;
                    }} axisLine={false} tickLine={false} tick={{ fill: "black" }} />
                    <Tooltip contentStyle={{
                        border: "2px solid #000",
                        borderRadius: "10px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        backgroundColor: "#f8fafc"

                    }} />
                    <Line dataKey="sales" strokeWidth={3} stroke="#000" type="natural" activeDot={{ r: 6 }} />

                </LineChart>

            </ResponsiveContainer>
        </div>
    )
}
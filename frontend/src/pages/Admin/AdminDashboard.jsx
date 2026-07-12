import Chart from "react-apexcharts";
import { useGetTotalSalesByDateQuery } from "../../redux/api/orderApiSlice";

const AdminDashboard = () => {
  const { data: salesByDate, isLoading } = useGetTotalSalesByDateQuery();

  if (isLoading) return <div>Loading chart...</div>;

  const categories = salesByDate ? salesByDate.map((item) => item._id) : [];
  const seriesData = salesByDate
    ? salesByDate.map((item) => item.totalSales)
    : [];

  const chartOptions = {
    chart: { type: "line" },
    title: { text: "Sales Trend", align: "left" },
    xaxis: {
      categories: categories,
      title: { text: "Date" },
    },
    yaxis: { title: { text: "Sales" }, min: 0 },
  };

  const chartSeries = [{ name: "Sales", data: seriesData }];

  return (
    <div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        width="700"
      />
    </div>
  );
};

export default AdminDashboard;

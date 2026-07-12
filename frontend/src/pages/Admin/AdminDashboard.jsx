// frontend/src/pages/Admin/AdminDashboard.jsx
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useGetTotalSalesByDateQuery } from "../../redux/api/orderApiSlice";

const AdminDashboard = () => {
  const { data: salesByDate } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: { type: "line" },
      title: { text: "Sales Trend", align: "left" },
      xaxis: { categories: [], title: { text: "Date" } },
      yaxis: { title: { text: "Sales" }, min: 0 },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesByDate) {
      setState((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: {
            ...prev.options.xaxis,
            categories: salesByDate.map((item) => item._id),
          },
        },
        series: [
          { name: "Sales", data: salesByDate.map((item) => item.totalSales) },
        ],
      }));
    }
  }, [salesByDate]);

  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        width="700"
      />
    </div>
  );
};

export default AdminDashboard;

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useEffect, useMemo } from "react";
import { getDashboard } from "../store/actions/dashboardAction";

const COLORS = [
  "#0088FE",
  "#FFBB28",
  "#FF8042",
  "#00C49F",
  "#FF6384",
  "#36A2EB",
  "#9966FF",
  "#4BC0C0",
  "#FFCD56",
  "#C71585",
  "#7B68EE",
  "#32CD32",
  "#FFD700",
  "#DC143C",
  "#00FF7F",
  "#4682B4",
  "#FF4500",
  "#8A2BE2",
  "#00CED1",
  "#FF69B4",
];

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const DashboardAnalytics = () => {
  const dispatch = useAppDispatch();
  const { analyticsData } = useTypedSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  const completionRates = useMemo(() => {
    return (
      analyticsData?.completionRates?.map(
        (course: { completionRate: string }) => ({
          ...course,
          completionRate: parseFloat(course.completionRate),
        })
      ) ?? []
    );
  }, [analyticsData]);

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>
        Most popular courses
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={analyticsData?.popularCourses ?? []}>
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="studentCount" fill="#8884d8" barSize={40} />
        </BarChart>
      </ResponsiveContainer>

      <Typography variant="h6" gutterBottom>
        Student completion rate
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={completionRates}
            dataKey="completionRate"
            nameKey="title"
            cx="50%"
            cy="50%"
            outerRadius={80} // Juda katta emas
            label
          >
            {completionRates.map((_entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DashboardAnalytics;

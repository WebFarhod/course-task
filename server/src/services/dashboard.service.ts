import { Types } from "mongoose";
import Enrollment from "../schemas/enrollment.schema";
import Course from "../schemas/course.schema";
import EnrollStatus from "../enums/enrollStatus";

class DashboardService {
  async getDashboardData() {
    // 1. Eng ommabop kurslarni topish
    const popularCourses = await Enrollment.aggregate([
      {
        $group: {
          _id: "$courseId",
          studentCount: { $sum: 1 },
        },
      },
      { $sort: { studentCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      {
        $project: {
          _id: "$course._id",
          title: "$course.title",
          studentCount: 1,
        },
      },
    ]);

    // 2. Barcha kurslarning o‘zlashtirish foizini hisoblash
    const courses = await Course.find({}, "_id title");

    const completionRates = await Promise.all(
      courses.map(async (course) => {
        const totalStudents = await Enrollment.countDocuments({
          courseId: course._id,
        });

        const completedStudents = await Enrollment.countDocuments({
          courseId: course._id,
          status: EnrollStatus.COMPLETED, // Enum ishlatilmoqda
        });

        const completionRate =
          totalStudents === 0 ? 0 : (completedStudents / totalStudents) * 100;

        return {
          _id: course._id,
          title: course.title,
          completionRate: completionRate.toFixed(2), // 2 xonagacha kamaytirish
        };
      })
    );

    return {
      popularCourses,
      completionRates,
    };
  }
}

export default new DashboardService();

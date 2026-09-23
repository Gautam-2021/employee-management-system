 const Employee = require("../models/employee.model");

const getDashboardStats = async (req, res) => {

    try {

        const employees = await Employee.find()
            .populate("department", "name")
            .populate("designation", "name");

        const totalEmployees = employees.length;

        const activeEmployees = employees.filter(
            employee => employee.status === "Active"
        ).length;

        const inactiveEmployees = employees.filter(
            employee => employee.status !== "Active"
        ).length;


        // Department count
        const departmentMap = {};

        employees.forEach(employee => {

            const departmentName =
                employee.department?.name || "Unknown";

            departmentMap[departmentName] =
                (departmentMap[departmentName] || 0) + 1;

        });


        const departmentStats =
            Object.entries(departmentMap).map(
                ([name, count]) => ({
                    name,
                    count
                })
            );


        // Designation count
        const designationMap = {};

        employees.forEach(employee => {

            const designationName =
                employee.designation?.name || "Unknown";

            designationMap[designationName] =
                (designationMap[designationName] || 0) + 1;

        });


        const designationStats =
            Object.entries(designationMap).map(
                ([name, count]) => ({
                    name,
                    count
                })
            );


        res.status(200).json({

            success: true,

            data: {
                totalEmployees,
                activeEmployees,
                inactiveEmployees,
                departmentStats,
                designationStats
            }

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    getDashboardStats
};
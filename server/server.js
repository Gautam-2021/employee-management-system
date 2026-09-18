const { app, PORT } = require("./config/config");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const employeeRoutes = require("./routes/employee.routes");
const departmentRoutes = require("./routes/department.routes");
const designationRoutes = require("./routes/designation.routes");

const errorMiddleware = require("./middlewares/error.middleware");

// Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/designations", designationRoutes);

// Error middleware
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
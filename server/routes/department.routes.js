const express = require("express");

const {
    getDepartments,
    getDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment
} = require("../controllers/department.controller");

const departmentrouter = express.Router();


// GET all departments
departmentrouter.get("/", getDepartments);

// GET single department
departmentrouter.get("/:id", getDepartment);

// CREATE department
departmentrouter.post("/", createDepartment);

// UPDATE department
departmentrouter.put("/:id", updateDepartment);

// DELETE department
departmentrouter.delete("/:id", deleteDepartment);


module.exports = departmentrouter;
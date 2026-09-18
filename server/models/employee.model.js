const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            required: true
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"]
        },

        dateOfBirth: {
            type: Date
        },

        address: {
            type: String
        },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true
        },

        designation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Designation",
            required: true
        },

        salary: {
            type: Number,
            min: 0
        },

        joiningDate: {
            type: Date,
            required: true
        },

        employmentType: {
            type: String,
            enum: [
                "Full Time",
                "Part Time",
                "Contract",
                "Intern"
            ],
            default: "Full Time"
        },

        status: {
            type: String,
            enum: [
                "Active",
                "Inactive",
                "On Leave"
            ],
            default: "Active"
        },

        profileImage: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Employee",
    employeeSchema
);
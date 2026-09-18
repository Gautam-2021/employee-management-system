const Designation = require("../models/designation.model");


// ===============================
// GET ALL DESIGNATIONS
// ===============================
const getDesignations = async (req, res) => {
    try {

        const designations = await Designation.find()
            .sort({ name: 1 });

        res.status(200).json({
            success: true,
            count: designations.length,
            data: designations
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ===============================
// GET SINGLE DESIGNATION
// ===============================
const getDesignation = async (req, res) => {
    try {

        const designation = await Designation.findById(
            req.params.id
        );

        if (!designation) {
            return res.status(404).json({
                success: false,
                message: "Designation not found"
            });
        }

        res.status(200).json({
            success: true,
            data: designation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ===============================
// CREATE DESIGNATION
// ===============================
const createDesignation = async (req, res) => {
    try {

        const {
            name,
            description,
            status
        } = req.body;


        // Check duplicate designation
        const existingDesignation =
            await Designation.findOne({ name });

        if (existingDesignation) {
            return res.status(400).json({
                success: false,
                message: "Designation already exists"
            });
        }


        const designation = await Designation.create({
            name,
            description,
            status
        });


        res.status(201).json({
            success: true,
            message: "Designation created successfully",
            data: designation
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};


// ===============================
// UPDATE DESIGNATION
// ===============================
const updateDesignation = async (req, res) => {
    try {

        const {
            name,
            description,
            status
        } = req.body;


        const designation =
            await Designation.findByIdAndUpdate(
                req.params.id,
                {
                    name,
                    description,
                    status
                },
                {
                    new: true,
                    runValidators: true
                }
            );


        if (!designation) {
            return res.status(404).json({
                success: false,
                message: "Designation not found"
            });
        }


        res.status(200).json({
            success: true,
            message: "Designation updated successfully",
            data: designation
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};


// ===============================
// DELETE DESIGNATION
// ===============================
const deleteDesignation = async (req, res) => {
    try {

        const designation =
            await Designation.findByIdAndDelete(
                req.params.id
            );


        if (!designation) {
            return res.status(404).json({
                success: false,
                message: "Designation not found"
            });
        }


        res.status(200).json({
            success: true,
            message: "Designation deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    getDesignations,
    getDesignation,
    createDesignation,
    updateDesignation,
    deleteDesignation
};
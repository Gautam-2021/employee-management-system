const express = require("express");

const {
    getDesignations,
    getDesignation,
    createDesignation,
    updateDesignation,
    deleteDesignation
} = require("../controllers/designation.controller");

const authMiddleware = require("../middlewares/auth.middleware");
// const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();


// Get all
router.get(
    "/",
    authMiddleware,
    getDesignations
);


// Get single
router.get(
    "/:id",
    authMiddleware,
    getDesignation
);


// Create - Admin only
router.post(
    "/",
    authMiddleware,
    
    createDesignation
);


// Update - Admin only
router.put(
    "/:id",
    authMiddleware,
 
    updateDesignation
);


// Delete - Admin only
router.delete(
    "/:id",
    authMiddleware,
     
    deleteDesignation
);


module.exports = router;
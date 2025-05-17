/**
 * Simple flash message middleware
 * This is a basic implementation - typically, you would use connect-flash for this
 */
module.exports = (req, res, next) => {
    // Initialize an empty flash object if it doesn't exist
    if (!req.session) {
        req.session = {};
    }
    
    if (!req.session.flash) {
        req.session.flash = {};
    }
    
    // Method to set a flash message
    req.flash = (type, message) => {
        if (!req.session.flash[type]) {
            req.session.flash[type] = [];
        }
        req.session.flash[type].push(message);
    };
    
    // Make flash messages available to views and clear them after use
    res.locals.flash = req.session.flash;
    req.session.flash = {};
    
    next();
};

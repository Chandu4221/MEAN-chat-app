let checkAcceptContentType = (req, res, next) => {
    
    /**
     * This basically just prevents users from making
     * GET request to our endpoints via browsers.
     * Hence only api request with content-type headers set
     * to application/json reach the next middleware handler
     * else a 404 page would be displayed
     */
    
    if (req.accepts('html')) {
        return res.status(404).end();
    }
 
    if (req.accepts('html')) {
        return res.status(404).end();
    }

    if (req.accepts('text/html')) {
       return res.status(404).end();
    }

    next();
};

module.exports = {
    checkAcceptContentType
};

class HttpResponse {
    ok (res, msg) {
        if (!msg) 
            msg = {message: "Request completed successfully"}
        res.status(200).json(msg)
    }

    badRequest (res, msg) {
        if (!msg && process.env.ENV == "production")
            msg = {message: "The request was malformed or invalid."}
        res.status(400).json(msg)
    }

    notFound (res, msg) {
        if (!msg || process.env.ENV == "production")
            msg = {message: "Resource not found."}
        res.status(404).json(msg)
    }

    error (res, msg) {
        if (!msg || process.env.ENV == "production")
            msg = {message: "Internal server error."}
        res.status(500).json(msg)
    }

    unauthorized (res, msg) {
        if (!msg || process.env.ENV == "production")
            msg = {message: "The authentification for this resource was not successful."}
        res.status(401).json(msg)
    }

    // conflict (res, msg) {
    //     if (!msg || process.env.ENV == "production")
    //         msg = {message: "The request could not be completed due to a " +
    //                         "conflict with the current state of the resource."}
    //     res.status(409).json(msg)
    // }
}

module.exports = new HttpResponse()
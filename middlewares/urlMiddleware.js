import urlExist from "url-exist"

const validateURL = async (req, res, next) => {
    const { origUrl } = req.body;
    const isExist = await urlExist(origUrl);
    if (!isExist) {
        return res.json({ message: "Invalid URL", status: false });
    }
    next();
}

export {
    validateURL
}
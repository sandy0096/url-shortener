
import { customAlphabet } from "nanoid";
import { urlModel } from "../models/urlModel.js";

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzQWERTYUIOPLKJHGFDSAZXCVBNM', 5);

const shortURL = async (req, res) => {
    const { origUrl } = req.body;
    const urlData = await urlModel.findOne({ origUrl });
    if (urlData) {
        res.json({
            message: "Url already exist",
            response: {
                shortUrl: urlData.shortUrl
            },
            type: "success"
        })
    } else {
        const id = nanoid();
        const shortUrl = `${process.env.BASE}/${id}`
        const newURL = new urlModel({ id, shortUrl, origUrl });
        try {
            newURL.save();
            res.json({
                message: "url creation success",
                response: { shortUrl },
                type: "success"
            });
        } catch (err) {
            res.json({
                message: 'unable to create url',
                type: "failure",
                response: null
            });
        }
    }

}

const redirecToURL = async (req, res) => {
    try {
        const urlData = await urlModel.findOne({ id: req.params.urlId });
        if (urlData) {
            await urlModel.updateOne(
                {
                    id: req.params.urlId,
                },
                { $inc: { clicks: 1 } }
            );
            return res.redirect(urlData.origUrl);
        } else res.status(404).json('Not found');
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
}


export {
    shortURL,
    redirecToURL
}
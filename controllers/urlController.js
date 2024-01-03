
import { customAlphabet } from "nanoid";
import { urlModel } from "../models/urlModel.js";

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzQWERTYUIOPLKJHGFDSAZXCVBNM', 5);

const shortURL = async (req, res) => {
    let result = {}
    const { origUrl } = req.body;
    const urlData = await urlModel.findOne({ origUrl });
    if (urlData) {
        result = {
            message: "Url already exist",
            response: {
                shortUrl: urlData.shortUrl,
                origUrl: urlData.origUrl,
            },
            type: "success"
        }
    } else {
        const id = nanoid();
        const shortUrl = `${process.env.BASE}/${id}`
        const newURL = new urlModel({ id, shortUrl, origUrl });
        try {
            newURL.save();
            result = {
                message: "url creation success",
                response: { shortUrl, origUrl },
                type: "success"
            }
        } catch (err) {
            result = {
                message: 'unable to create url',
                type: "failure",
                response: null
            }
        }
    }
    res.render('pages/shortener', result);
}

const redirecToURL = async (req, res) => {
    console.log('byrraj');
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

const redirectToPrivacyPolicy = (req, res) => {
    return res.render('pages/privacy-policy');
}

const redirectToHome = (req, res) => {
    res.render('pages/index');
}

const redirectToTerms = (req, res) => {
    res.render('pages/terms-and-conditions');
}


export {
    shortURL,
    redirecToURL,
    redirectToPrivacyPolicy,
    redirectToHome,
    redirectToTerms
}
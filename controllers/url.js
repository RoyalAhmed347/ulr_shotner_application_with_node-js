const { default: ShortUniqueId } = require("short-unique-id");
const URL = require("../models/url");
const uid = new ShortUniqueId({ length: 10 });
const os = require("os");
const USER = require("../models/user");

const createUrl = async (req, res) => {
  try {
    const body = req.body;
    const org_ulr = body.url;
    const url_id = uid.rnd();

    if (!org_ulr) {
      return res.status(400).json({ error: "url is require" });
    }
    const host = req.headers.host;

    await URL.create({
      redrect_url: org_ulr,
      temp_url: `http://${host}/url/v/${url_id}`,
      analize_url: `http://${host}/url/a/${url_id}`,
      short_id: url_id,
      createdBy: req.user.id,
      vistHistry: [],
    });
    const result = await URL.findOne({ short_id: url_id });

    res.redirect("/");
  } catch (error) {
    res.status(400).send(error);
  }
};

const vistUrl = async (req, res) => {
  try {
    const id = req.params.id;
    const reqDevice = os.hostname();
    const result = await URL.findOneAndUpdate(
      { short_id: id },
      {
        $push: {
          vistHistry: { timestamps: Date.now(), deviceName: reqDevice },
        },
      }
    );

    const redirect = result.redrect_url;

    res.redirect(redirect);

    res.end();
  } catch (error) {
    res.status(400).send(error);
  }
};

const analizeUrl = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await URL.findOne({ short_id: id });
    const totalClick = result.vistHistry.length;
    const link = { totalClick, owner: req.user.name, ...result._doc };
    res.render("analyze", { link });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { createUrl, vistUrl, analizeUrl };

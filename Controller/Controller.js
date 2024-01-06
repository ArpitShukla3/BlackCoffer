import dotenv from "dotenv";
dotenv.config();
import blackoffers from "../Model/Schema.js";
export async function oneUserDetail(req, res) {

    try {
        const { id } = req.params;
        const data = await blackoffers.find({
            id: parseInt(id, 10)
        });
        return res.status(200).json({
            data: data
        })
    } catch (error) {
        return res.status(401).json({
            error: error
        })
    }

}
export async function getUserbyID(req, res) {
    try {
        const page = 1;
        if (!page) {
            page = 1;
        }
        const data = await blackoffers.find().limit(page * 19).skip(page * 19 - 19);
        return res.status(200).json({
            data: data
        })
    } catch (error) {
        return res.status(401).json({
            data: error
        })
    }
}
export async function userCreation(req, res) {
    try {
        const { avatar, domain, email, first_name, gender, last_name } = req.body;
        if (!avatar, !domain, !email, !first_name, !gender, !last_name) {
            return res.status(402).json({
                success: false,
                data: "enter all details"
            })
        }

        const foundItem = await blackoffers.findOne({ email });

        if (foundItem) {
            return res.status(404).json({
                success: false,
                message: "user exists"
            })
        }
        const newObj = {
            avatar, domain, email, first_name, gender, last_name
        }
        const userInfo = new blackoffers(newObj);
        const result = await userInfo.save();
        return res.status(200).json({
            success: true,
            data: "users credentials have been saved"
        })

    } catch (error) {
        return res.status(401).json({
            error: error
        })
    }
}
export async function updateUser(req, res) {
    const { id } = req.params;
    try {
        const { avatar, domain, email, first_name, gender, last_name } = req.body;
        console.log(avatar, domain, email, first_name, gender, last_name)
        if (!avatar, !domain, !email, !first_name, !gender, !last_name) {
            return res.status(402).json({
                success: false,
                data: "enter all details"
            })
        }
        const newObj = {
            avatar, domain, email, first_name, gender, last_name
        }
        await blackoffers.findOneAndUpdate({
            id: parseInt(id, 10)
        }, newObj);
        return res.status(205).json({
            success: true,
            data: "users credentials have been saved"
        })

    } catch (error) {
        return res.status(401).json({
            error: error
        })
    }
}
export async function filter(req, res) {
    try {
        const page = 1;
        const filter = req.body;
        if (!page) {
            page = 1;
        }
        const data = await blackoffers.find(filter).limit(page * 19).skip(page * 19 - 19);
        return res.status(200).json({
            data: data
        })
    } catch (error) {
        return res.status(401).json({
            data: error
        })
    }
}
export async function querySearch(req, res) {
    let condition = [];
    let keyword_condition = [];
    const { keyword, end, topic, sector, region, pestle, source, swot, country, city } = req.query;
    let integerValue = parseInt(keyword, 10);
    if (integerValue && integerValue > 0) {
    }
    else {
        integerValue = 6789;
    }
    if (keyword) {
        keyword_condition = [
            { topic: { $regex: new RegExp(keyword, 'i') } },
            { sector: { $regex: new RegExp(keyword, 'i') } },
            { region: { $regex: new RegExp(keyword, 'i') } },
            { pestle: { $regex: new RegExp(keyword, 'i') } },
            { swot: { $regex: new RegExp(keyword, 'i') } },
            { insight: { $regex: new RegExp(keyword, 'i') } },
            { source: { $regex: new RegExp(keyword, 'i') } },
            { country: { $regex: new RegExp(keyword, 'i') } },
            { city: { $regex: new RegExp(keyword, 'i') } },
        ]
    }
    if (topic) {
        condition = [...condition,
        { topic: { $regex: new RegExp(topic, 'i') } }
        ]
    }
    if (sector) {
        condition = [...condition,
        { sector: { $regex: new RegExp(sector, 'i') } }
        ]
    }
    if (region) {
        condition = [...condition,
        { region: { $regex: new RegExp(region, 'i') } }
        ]
    }
    if (pestle) {
        condition = [...condition,
        { pestle: { $regex: new RegExp(pestle, 'i') } }
        ]
    }
    if (swot) {
        condition = [...condition,
        { swot: { $regex: new RegExp(swot, 'i') } }
        ]
    }
    if (source) {
        condition = [...condition,
        { source: { $regex: new RegExp(source, 'i') } }
        ]
    }
    if (country) {
        condition = [...condition,
        { country: { $regex: new RegExp(country, 'i') } }
        ]
    }
    if (city) {
        condition = [...condition,
        { city: { $regex: new RegExp(city, 'i') } }
        ]
    }
    if (end) {
        condition = [...condition,
        {
            end_year: end
        }]
    }



    let val = "";
    if (keyword && condition.length > 0) {
        val = await blackoffers.find({ $or: keyword_condition }).find({ $and: condition });
    }
    else if (condition.length > 0) {
        val = await blackoffers.find({ $and: condition });
    }
    else if (keyword) {

        val = await blackoffers.find({ $or: keyword_condition });
    }
    else {

        val = await blackoffers.find();
    }
    return res.status(200).json({
        success: true,
        data: val
    })
}
export async function distinctType(req, res) {
    const { type, search } = req.query;
    if (search) {
        const val = await blackoffers.find({ [type]: { $regex: new RegExp(search, 'i') } }).distinct(`${type}`)
        return res.status(200).json({
            success: true,
            data: val
        })
    }
    else {
        const val = await blackoffers.distinct(`${type}`)
        return res.status(200).json({
            success: true,
            data: val
        })
    }
}
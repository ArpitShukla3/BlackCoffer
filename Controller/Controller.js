import dotenv from "dotenv";
dotenv.config();
import blackoffers from "../Model/Schema.js";
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

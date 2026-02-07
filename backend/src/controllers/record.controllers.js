import Record from "../models/record.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";

export const createRecord = asyncHandler(async (req, res) => {
  const { type, title, value, meta } = req.body;

  if (!type || !title) throw new ApiError(400, "Type and title are required");

  const record = await Record.create({
    user: req.user._id,
    type,
    title,
    value,
    meta,
  });

  res.status(201).json(record);
});

export const getRecords = asyncHandler(async (req, res) => {
  const { type, page = 1, limit = 10 } = req.query;

  const filter = { user: req.user._id, isDeleted: false };
  if (type) filter.type = type;

  const skip = (Number(page) - 1) * Number(limit);

  const [records, total] = await Promise.all([
    Record.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Record.countDocuments(filter),
  ]);

  res.status(200).json({
    data: records,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

export const deleteRecord = asyncHandler(async (req, res) => {
  const record = await Record.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!record) throw new ApiError(404, "Record not found");

  record.isDeleted = true;
  await record.save();

  res.status(200).json({ message: "Record deleted" });
});

export const updateRecord = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const record = await Record.findOne({
    _id: id,
    user: req.user._id,
    isDeleted: false, 
  });

  if (!record) throw new ApiError(404, "Record not found");

  const allowedFields = ["type", "title", "value", "meta"];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      record[field] = req.body[field];
    }
  });

  await record.save();

  res.status(200).json(record);
});

export const bulkDeleteRecords = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0)
    throw new ApiError(400, "ids must be a non-empty array");

  await Record.updateMany(
    {
      _id: { $in: ids },
      user: req.user._id,
    },
    { isDeleted: true },
  );

  res.status(200).json({ message: "Records deleted" });
});

export const getRecordStats = asyncHandler(async (req, res) => {
  const stats = await Record.aggregate([
    {
      $match: {
        user: req.user._id,
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
        totalValue: { $sum: { $ifNull: ["$value", 0] } },
      },
    },
    {
      $project: {
        _id: 0,
        type: "$_id",
        count: 1,
        totalValue: 1,
      },
    },
  ]);

  res.status(200).json(stats);
});

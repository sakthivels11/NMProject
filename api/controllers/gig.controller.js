import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";


export const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only sellers can create a gig!"));
  console.log("Hello")
  console.log({...req.body})
  const newGig = new Gig({
    ...req.body,
  });
  console.log("Hello2")
  
  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
    console.log("Hello3")
  } catch (err) {
    console.log(err);
    next(err);
  }
};




export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    await Gig.findByIdAndDelete(req.params.id);
    console.log("Gig Deleted Successfully");
    res.status(200).send("Gig has been deleted successfully!");
  } catch (err) {
    console.log(err);
    console.log("Error in Gig Deletion");
    next(err);
  }
};



export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(createError(404, "Gig not found!"));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};



export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};

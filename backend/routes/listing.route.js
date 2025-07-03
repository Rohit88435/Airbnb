import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import {
  addListing,
  deleteListing,
  findListing,
  getListing,
  ratinglisting,
  search,
  updateListing,
} from "../controllers/listing.controller.js";

let listingRoute = express.Router();

listingRoute.post(
  "/add",
  isAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  addListing
);
listingRoute.put(
  "/update/:id",
  isAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  updateListing
);

listingRoute.get("/get", getListing);
listingRoute.delete("/delete/:id", deleteListing);
listingRoute.get("/findlist/:id", isAuth, findListing);
listingRoute.post("/ratings/:id", isAuth, ratinglisting);
listingRoute.get("/search", search);

export default listingRoute;

import EventModel from "../models/EventsModel.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const Secret_Key = process.env.SECRET_key;

export const createEvent = async (req, res) => {
  try {
    const { title, description, category, date, location, timeFrom, timeTo } =
      req.body;

    const token = req.cookies.token;
    const decoded = jwt.verify(token, Secret_Key);
    const organizer = decoded.userId;

    const event = new EventModel({
      title,
      description,
      category,
      date,
      location,
      timeFrom,
      timeTo,
      organizer,
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("Event creation failed", error);
    res.status(500).json({ error: "Event creation failed" });
  }
};

export const listAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const listEventsByOrganizer = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, Secret_Key);
    const userId = decoded.userId;

    const events = await EventModel.find({ organizer: userId });
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Failed to fetch events by organizer",
        message: error.message,
      });
  }
};

export const deleteEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await EventModel.findByIdAndDelete(id);
    if (!event) {
      res.status(404).json({ error: "Event not found" });
    } else {
      res.status(200).json({ message: "Event deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Event deletion failed" });
  }
};

export const updateEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEventData = req.body;
    const event = await EventModel.findByIdAndUpdate(id, updatedEventData, {
      new: true,
    });
    if (!event) {
      res.status(404).json({ error: "Event not found" });
    } else {
      res.status(200).json({ message: "Event updated successfully", event });
    }
  } catch (error) {
    res.status(500).json({ error: "Event update failed" });
  }
};

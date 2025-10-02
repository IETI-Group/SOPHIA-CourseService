import { Request, Response } from 'express';
import { CourseService } from '../services/courseService.js';

export const CourseController = {
  getAll: async (req: Request, res: Response) => {
    const courses = await CourseService.getAll();
    res.json(courses);
  },

  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const course = await CourseService.getById(Number(id));
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  },

  create: async (req: Request, res: Response) => {
    const newCourse = await CourseService.create(req.body);
    res.status(201).json(newCourse);
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedCourse = await CourseService.update(Number(id), req.body);
    res.json(updatedCourse);
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    await CourseService.delete(Number(id));
    res.status(204).send();
  },
};

import { type IRouter, type Request, type Response, Router } from 'express';
import type { AssignmentLessonInDTO } from '../app/index.js';
import container from '../config/diContainer.js';
import type { AssignmentsController } from '../controllers/index.js';
import {
  assignmentLessonInDTOSchema,
  assignmentLessonUpdateDTOSchema,
  type FiltersAssignmentLesson,
  filtersAssignmentLessonSchema,
  idSchema,
  type SortingAssignments,
  sortingAssignmentsSchema,
} from '../utils/index.js';

export const createAssignmentsRouter = (controller?: AssignmentsController): IRouter => {
  const router: IRouter = Router();

  const assignmentsController =
    controller ?? container.resolve<AssignmentsController>('assignmentsController');

  const getAssignmentsByLesson = async (req: Request, res: Response) => {
    const filters: FiltersAssignmentLesson = filtersAssignmentLessonSchema().parse(req.query);
    const sorting: SortingAssignments = sortingAssignmentsSchema().parse(req.query);
    const result = await assignmentsController.getAssignmentsLesson(filters, sorting);
    res.status(200).json(result);
  };

  const getAssignmentById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await assignmentsController.getAssignmentById(id);
    res.status(200).json(result);
  };

  const createAssignment = async (req: Request, res: Response) => {
    const dto: AssignmentLessonInDTO = assignmentLessonInDTOSchema().parse(req.body);
    const result = await assignmentsController.postAssignmentLesson(dto);
    res.status(201).json(result);
  };

  const updateAssignment = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<AssignmentLessonInDTO> = assignmentLessonUpdateDTOSchema().parse(req.body);
    const result = await assignmentsController.putAssignment(id, dto);
    res.status(200).json(result);
  };

  const deleteAssignment = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await assignmentsController.deleteAssignment(id);
    res.status(200).json(result);
  };

  router.get('/lessons/:lessonId/assignments', getAssignmentsByLesson);
  router.get('/assignments/:id', getAssignmentById);
  router.post('/lessons/:lessonId/assignments', createAssignment);
  router.put('/assignments/:id', updateAssignment);
  router.delete('/assignments/:id', deleteAssignment);

  return router;
};

export default createAssignmentsRouter();

import type { ApiResponse, FiltersInscription, SortingInscriptions } from '../../../utils/index.js';
import type { InscriptionCourseInDTO, InscriptionCourseUpdateDTO } from '../../models/index.js';
import type { InscriptionService } from '../index.js';

export class InscriptionServiceImpl implements InscriptionService {
  getInscriptionsCourse(
    _filters: FiltersInscription,
    _sort: SortingInscriptions
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  getInscriptionById(_inscriptionId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postInscriptionCourse(_dto: InscriptionCourseInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putInscription(
    _inscriptionId: string,
    _dto: Partial<InscriptionCourseUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteInscription(_inscriptionId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
}

import type { ApiResponse, FiltersInscription, SortingInscriptions } from '../../../utils/index.js';
import type { InscriptionCourseInDTO, InscriptionCourseUpdateDTO } from '../../models/index.js';

export interface InscriptionService {
  getInscriptionsCourse(
    filters: FiltersInscription,
    sort: SortingInscriptions
  ): Promise<ApiResponse<unknown>>;
  getInscriptionById(inscriptionId: string): Promise<ApiResponse<unknown>>;
  postInscriptionCourse(dto: InscriptionCourseInDTO): Promise<ApiResponse<unknown>>;
  putInscription(
    inscriptionId: string,
    dto: Partial<InscriptionCourseUpdateDTO>
  ): Promise<ApiResponse<unknown>>;
  deleteInscription(inscriptionId: string): Promise<ApiResponse<unknown>>;
}

import type {
  FiltersInscription,
  PaginatedInscriptions,
  SortingInscriptions,
} from '../../../utils/index.js';
import type {
  InscriptionCourseInDTO,
  InscriptionCourseOutDTO,
  InscriptionCourseUpdateDTO,
} from '../../models/index.js';

export interface InscriptionsCourseRepository {
  getInscriptions(
    filters: FiltersInscription,
    sort: SortingInscriptions
  ): Promise<PaginatedInscriptions>;
  getInscriptionById(inscriptionId: string): Promise<InscriptionCourseOutDTO>;
  createInscription(dto: InscriptionCourseInDTO): Promise<InscriptionCourseOutDTO>;
  updateInscription(
    inscriptionId: string,
    dto: Partial<InscriptionCourseUpdateDTO>
  ): Promise<InscriptionCourseOutDTO>;
  deleteInscriptionById(inscriptionId: string): Promise<void>;
}

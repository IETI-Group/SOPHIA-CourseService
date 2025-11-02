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
  getInscriptions(filters: FiltersInscription, sort: SortingInscriptions): PaginatedInscriptions;
  getInscriptionById(inscriptionId: string): InscriptionCourseOutDTO;
  createInscription(dto: InscriptionCourseInDTO): InscriptionCourseOutDTO;
  updateInscription(
    inscriptionId: string,
    dto: InscriptionCourseUpdateDTO
  ): InscriptionCourseOutDTO;
  deleteInscriptionById(inscriptionId: string): void;
}

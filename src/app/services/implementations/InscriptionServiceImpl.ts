import {
  type ApiResponse,
  type FiltersInscription,
  parseApiResponse,
  type SortingInscriptions,
} from '../../../utils/index.js';
import type { InscriptionCourseInDTO, InscriptionCourseUpdateDTO } from '../../models/index.js';
import type { InscriptionsCourseRepository } from '../../repositories/index.js';
import type { InscriptionService } from '../index.js';

export class InscriptionServiceImpl implements InscriptionService {
  private readonly inscriptionsCourseRepository: InscriptionsCourseRepository;
  constructor(inscriptionsCourseRepository: InscriptionsCourseRepository) {
    this.inscriptionsCourseRepository = inscriptionsCourseRepository;
  }
  getInscriptionsCourse(
    filters: FiltersInscription,
    sort: SortingInscriptions
  ): Promise<ApiResponse<unknown>> {
    return this.inscriptionsCourseRepository.getInscriptions(filters, sort);
  }
  async getInscriptionById(inscriptionId: string): Promise<ApiResponse<unknown>> {
    const result = await this.inscriptionsCourseRepository.getInscriptionById(inscriptionId);
    return parseApiResponse(result, 'Inscription retrieved successfully');
  }
  async postInscriptionCourse(dto: InscriptionCourseInDTO): Promise<ApiResponse<unknown>> {
    const result = await this.inscriptionsCourseRepository.createInscription(dto);
    return parseApiResponse(result, 'Inscription created successfully');
  }
  async putInscription(
    inscriptionId: string,
    dto: Partial<InscriptionCourseUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    const result = await this.inscriptionsCourseRepository.updateInscription(inscriptionId, dto);
    return parseApiResponse(result, 'Inscription updated successfully');
  }
  async deleteInscription(inscriptionId: string): Promise<ApiResponse<unknown>> {
    await this.inscriptionsCourseRepository.deleteInscriptionById(inscriptionId);
    return parseApiResponse(null, 'Inscription deleted successfully');
  }
}

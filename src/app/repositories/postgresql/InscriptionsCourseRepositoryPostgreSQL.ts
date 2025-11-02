import type { PrismaClient } from '@prisma/client/default.js';
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
import type { InscriptionsCourseRepository } from '../index.js';

export class InscriptionsCourseRepositoryPostgreSQL implements InscriptionsCourseRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getInscriptions(
    _filters: FiltersInscription,
    _sort: SortingInscriptions
  ): Promise<PaginatedInscriptions> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getInscriptionById(_inscriptionId: string): Promise<InscriptionCourseOutDTO> {
    throw new Error('Method not implemented.');
  }
  createInscription(_dto: InscriptionCourseInDTO): Promise<InscriptionCourseOutDTO> {
    throw new Error('Method not implemented.');
  }
  updateInscription(
    _inscriptionId: string,
    _dto: InscriptionCourseUpdateDTO
  ): Promise<InscriptionCourseOutDTO> {
    throw new Error('Method not implemented.');
  }
  deleteInscriptionById(_inscriptionId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

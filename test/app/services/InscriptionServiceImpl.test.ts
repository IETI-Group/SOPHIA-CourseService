import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  InscriptionCourseInDTO,
  InscriptionCourseUpdateDTO,
} from '../../../src/app/models/index.js';
import type { InscriptionsCourseRepository } from '../../../src/app/repositories/index.js';
import { InscriptionServiceImpl } from '../../../src/app/services/implementations/InscriptionServiceImpl.js';
import type { FiltersInscription, SortingInscriptions } from '../../../src/utils/index.js';

describe('InscriptionServiceImpl', () => {
  const mockInscriptionsCourseRepository = mockDeep<InscriptionsCourseRepository>();
  let service: InscriptionServiceImpl;

  beforeEach(() => {
    service = new InscriptionServiceImpl(mockInscriptionsCourseRepository);
  });

  afterEach(() => {
    mockReset(mockInscriptionsCourseRepository);
  });

  it('should call inscriptionsCourseRepository.getInscriptions with filters and sort', async () => {
    const filters: FiltersInscription = {
      courseId: 'course-123',
      active: null,
      completed: null,
      createdAtStart: null,
      createdAtEnd: null,
    };
    const sort: SortingInscriptions = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };

    await service.getInscriptionsCourse(filters, sort);

    expect(mockInscriptionsCourseRepository.getInscriptions).toHaveBeenCalledWith(filters, sort);
  });

  it('should call inscriptionsCourseRepository.getInscriptionById with inscriptionId', async () => {
    const inscriptionId: string = 'inscription-123';

    await service.getInscriptionById(inscriptionId);

    expect(mockInscriptionsCourseRepository.getInscriptionById).toHaveBeenCalledWith(inscriptionId);
  });

  it('should call inscriptionsCourseRepository.createInscription with dto', async () => {
    const dto: InscriptionCourseInDTO = {
      userId: 'user-123',
      courseId: 'course-123',
    };

    await service.postInscriptionCourse(dto);

    expect(mockInscriptionsCourseRepository.createInscription).toHaveBeenCalledWith(dto);
  });

  it('should call inscriptionsCourseRepository.updateInscription with inscriptionId and dto', async () => {
    const inscriptionId: string = 'inscription-123';
    const dto: Partial<InscriptionCourseUpdateDTO> = {
      progressPercentage: 75,
      active: false,
    };

    await service.putInscription(inscriptionId, dto);

    expect(mockInscriptionsCourseRepository.updateInscription).toHaveBeenCalledWith(
      inscriptionId,
      dto
    );
  });

  it('should call inscriptionsCourseRepository.deleteInscriptionById with inscriptionId', async () => {
    const inscriptionId: string = 'inscription-123';

    await service.deleteInscription(inscriptionId);

    expect(mockInscriptionsCourseRepository.deleteInscriptionById).toHaveBeenCalledWith(
      inscriptionId
    );
  });
});

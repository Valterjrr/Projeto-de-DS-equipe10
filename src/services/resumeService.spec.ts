import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as resumeService from './resumeService'
import { post, get } from './http'

vi.mock('./http', () => {
  return {
    post: vi.fn(),
    get: vi.fn(),
  }
})

describe('resumeService.submitCVRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('throws when required fields are missing', async () => {
    await expect(resumeService.submitCVRequest({} as any)).rejects.toThrow('Missing required fields: full_name or desired_role')
    await expect(resumeService.submitCVRequest({ full_name: 'A' } as any)).rejects.toThrow('Missing required fields: full_name or desired_role')
  })

  it('calls generateCVFromRequest on valid input', async () => {
    const fakeResponse = { generated_cv: { personal_info: { name: 'X' } } }
    vi.mocked(post).mockResolvedValueOnce({ cv_content: fakeResponse } as any)

    const req = { full_name: 'A', desired_role: 'Dev', professional_experience: [], education: [], skills: [] } as any
    const res = await resumeService.submitCVRequest(req)
    expect(res).toBe(fakeResponse)
    expect(post).toHaveBeenCalledWith('/api/v1/generate-cv', req)
  })

  it('createCVFromRequest delegates to generateCVFromRequest', async () => {
    const fakeResponse = { generated_cv: { personal_info: { name: 'FromCreate' } } }
    vi.mocked(post).mockResolvedValueOnce({ cv_content: fakeResponse } as any)

    const res = await resumeService.createCVFromRequest({} as any)
    expect(res).toBe(fakeResponse)
    expect(post).toHaveBeenCalledWith('/api/v1/generate-cv', {})
  })

  it('getOrCreateCV returns null for userId path (fetchUserCV returns null)', async () => {
    // spy fetchUserCV (it returns null currently)
    vi.spyOn(resumeService, 'fetchUserCV').mockResolvedValueOnce(null)
    const res = await resumeService.getOrCreateCV({ userId: 'abc' })
    expect(res).toBeNull()
  })

  it('getOrCreateCV with request delegates to createCVFromRequest', async () => {
    const fakeResponse = { generated_cv: { personal_info: { name: 'Req' } } }
    vi.mocked(post).mockResolvedValueOnce({ cv_content: fakeResponse } as any)
    const res = await resumeService.getOrCreateCV({ request: {} as any })
    expect(res).toBe(fakeResponse)
    expect(post).toHaveBeenCalledWith('/api/v1/generate-cv', {})
  })

  it('getOrCreateCV returns null when neither userId nor request provided', async () => {
    const res = await resumeService.getOrCreateCV({})
    expect(res).toBeNull()
  })
})

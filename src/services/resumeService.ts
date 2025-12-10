import { post, get } from "./http";
import { CVRequest, CVResponse, RawAPIResponse } from "../types/resume";

/**
 * Create a CV by calling the real backend endpoint.
 * The real API returns an envelope { cv_content: CVResponse } so we unwrap it here.
 */
export async function createCVFromRequest(req: CVRequest): Promise<CVResponse> {
    const raw = await post<RawAPIResponse>("/api/v1/generate-cv", req);
    return raw.cv_content;
}

export async function submitCVRequest(req: CVRequest): Promise<CVResponse> {
    // basic validation before sending to API
    if (!req.full_name || !req.desired_role) {
        throw new Error("Missing required fields: full_name or desired_role");
    }

    return createCVFromRequest(req);
}

/**
 * Attempt to fetch a previously created CV by id. Many backends don't persist
 * generated content — keep this as a best-effort helper and return null when
 * not available.
 */
export async function fetchUserCV(id: string): Promise<CVResponse | null> {
    try {
        const raw = await get<RawAPIResponse>(`/api/v1/cv/${id}`);
        return raw.cv_content;
    } catch (err) {
        // treat any fetch error as "not found" for now
        return null;
    }
}

/**
 * Convenience: fetch or generate depending on parameters.
 * If userId provided, return stored CV; otherwise generate from request.
 */
export async function getOrCreateCV(opts: {
    userId?: string;
    request?: CVRequest;
}): Promise<CVResponse | null> {
    if (opts.userId) return fetchUserCV(opts.userId);
    if (opts.request) return createCVFromRequest(opts.request);
    return null;
}

export default {
    createCVFromRequest,
    submitCVRequest,
    fetchUserCV,
    getOrCreateCV,
};

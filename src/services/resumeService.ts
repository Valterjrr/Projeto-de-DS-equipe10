import type { CVRequest, CVResponse, RawAPIResponse } from "@/types/resume";
import { post } from "./http";

/**
 * Fetch the user's CV by id from the data layer. Returns null when not found.
 */
// parameter intentionally unused while API is not persisting CVs
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export async function fetchUserCV(_userId: string): Promise<CVResponse | null> {
    // Future: call API endpoint to fetch by id
    return null;
}

/**
 * Generate a CV from a form/request object. Uses the real API.
 */
export async function createCVFromRequest(req: CVRequest): Promise<CVResponse> {
    // CORREÇÃO CRÍTICA: Captura a resposta bruta e extrai o objeto aninhado 'cv_content'
    const rawResponse = await post<RawAPIResponse>("/api/v1/generate-cv", req);

    // Garante que o objeto retornado (CVResponse) corresponde à interface esperada no frontend
    return rawResponse.cv_content;
}

/**
 * Public API surface: accept CVRequest and return CVResponse.
 * Mirrors the server contract: input CVRequest -> output CVResponse.
 */
export async function submitCVRequest(req: CVRequest): Promise<CVResponse> {
    // Basic validation: required fields (mantido para validação do frontend)
    if (!req.full_name || !req.desired_role) {
        throw new Error("Missing required fields: full_name or desired_role");
    }
    if (!req.professional_experience) throw new Error("professional_experience is required");
    if (!req.education) throw new Error("education is required");
    if (!req.skills) throw new Error("skills is required");

    // Encaminha a requisição para a função que interage com a API.
    return createCVFromRequest(req);
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

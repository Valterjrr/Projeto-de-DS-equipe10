import type { CVRequest } from "@/types/resume";

/**
 * Base URL da API para o backend deployado (URL fixada).
 */
const API_BASE = "https://aid-curriculum-backend.onrender.com";

/**
 * Realiza uma requisição POST para a API.
 * @param path O caminho do endpoint (ex: '/api/v1/generate-cv').
 * @param body O corpo da requisição.
 * @returns Uma Promise com a resposta JSON tipada.
 */
export async function post<T = unknown>(path: string, body?: unknown): Promise<T> {
    const url = `${API_BASE}${path}`;
    const opts: RequestInit = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
    };

    const res = await fetch(url, opts);

    if (!res.ok) {
        const errorBody = await res.text();
        console.error(`ERRO HTTP [${res.status}] em ${url}:`, errorBody);
        // Incluir o corpo da resposta no erro para debug na camada superior
        throw new Error(
            `Falha na requisição. Status: ${res.status}. Detalhes: ${errorBody.substring(0, 200)}`,
        );
    }
    return (await res.json()) as T;
}

/**
 * Realiza uma requisição GET para a API.
 * @param path O caminho do endpoint.
 * @returns Uma Promise com a resposta JSON tipada.
 */
export async function get<T = unknown>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) {
        const errorBody = await res.text();
        console.error(`ERRO HTTP [${res.status}] em ${API_BASE}${path}:`, errorBody);
        throw new Error(`Falha na requisição GET. Status: ${res.status}.`);
    }
    return (await res.json()) as T;
}

export default { post, get };

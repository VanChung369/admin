// @ts-ignore
/* eslint-disable */
import { api } from '..';

export async function updatePet(body: API.Pet, options?: { [key: string]: any }) {
  return api.put<any>({
    endpoint: '/pet',
    headers: { 'Content-Type': 'application/json' },
    body: body,
    options: options,
  });
}

export async function addPet(body: API.Pet, options?: { [key: string]: any }) {
  return api.post<any>({
    endpoint: '/pet',
    headers: { 'Content-Type': 'application/json' },
    body: body,
    options: options,
  });
}

export async function getPetById(params: API.getPetByIdParams, options?: { [key: string]: any }) {
  const { petId: param0, ...queryParams } = params;
  return api.get<API.Pet>({
    endpoint: `/pet/${param0}`,
    params: queryParams,
    options: options,
  });
}

export async function updatePetWithForm(
  params: API.updatePetWithFormParams,
  body: { name?: string; status?: string },
  options?: { [key: string]: any },
) {
  const { petId: param0, ...queryParams } = params;
  const formData = new FormData();

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return api.postFormData<any>({
    endpoint: `/pet/${param0}`,
    params: queryParams,
    body: formData,
    options: options,
  });
}

export async function deletePet(
  params: API.deletePetParams & {
    api_key?: string;
  },
  options?: { [key: string]: any },
) {
  const { petId: param0, ...queryParams } = params;
  return api.delete<any>({ endpoint: `/pet/${param0}`, params: queryParams, options: options });
}

export async function uploadFile(
  params: API.uploadFileParams,
  body: { additionalMetadata?: string; file?: string },
  file?: File,
  options?: { [key: string]: any },
) {
  const { petId: param0, ...queryParams } = params;
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return api.postFormData<API.ApiResponse>({
    endpoint: `/pet/${param0}/uploadImage`,
    params: queryParams,
    body: formData,
    options: options,
  });
}

export async function findPetsByStatus(
  params: API.findPetsByStatusParams,
  options?: { [key: string]: any },
) {
  return api.get<API.Pet[]>({ endpoint: '/pet/findByStatus', params: params, options: options });
}

export async function findPetsByTags(
  params: API.findPetsByTagsParams,
  options?: { [key: string]: any },
) {
  return api.get<API.Pet[]>({ endpoint: '/pet/findByTags', params: params, options: options });
}

import { CreatedNote } from '@types';
import { get } from './api';

export const getNote = async (
    id: string,
    cookies?: string
): Promise<CreatedNote | null> => {
    const url = `/note/${id}`;
    const config = cookies
        ? {
              headers: {
                  Cookie: cookies,
              },
          }
        : {};
    const { data, status, error } = await get<CreatedNote>(url, config);
    if (error || status !== 200 || !data) {
        return null;
    }
    if (!data) {
        return null;
    }
    return data;
};

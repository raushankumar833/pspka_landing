export const extractErrors = (error: any) => {
  const json = error.response?.data;
  try {
    const parsedJson = json;

    if (parsedJson.errors && Array.isArray(parsedJson.errors)) {
      return parsedJson.errors.join(', ');
    } else if (parsedJson.message) {
      return parsedJson.message.toString();
    } else {
      return null; // RETURN NULL IF THERE ARE NO ERRORS OR IF THE FORMAT IS INCORRECT
    }
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null; // RETURN NULL IN CASE OF ANY ERROR
  }
};

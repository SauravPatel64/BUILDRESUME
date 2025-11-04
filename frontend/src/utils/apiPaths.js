

 
// Base API URL

export const BASE_URL = "https://buildresumes.onrender.com";



// API Routes for frontend
export const API_PATH = {
  AUTH: {
    REGISTER: "/api/auth/register", // ✅ matches backend
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },

  RESUME: {
    CREATE: "/api/resume", // POST → create resume
    GET_ALL: "/api/resume", // GET → fetch all resumes
    GET_BY_ID: (id) => `/api/resume/${id}`,
    UPDATE: (id) => `/api/resume/${id}`,
    DELETE: (id) => `/api/resume/${id}`,
    UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`,
  },
  image: {
    UPLOAD_IMAGE: 'api/auth/upload-image'
  }
};



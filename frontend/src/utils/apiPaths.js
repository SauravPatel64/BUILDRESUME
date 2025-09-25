// export const BASE_URL = "http://localhost:4000";

// // API Routes for frontend
// export const API_PATH = {
//   AUTH: {
//     REGISTER: "/api/users/register",
//     LOGIN: "/api/users/login",
//     GET_PROFILE: "/api/users/profile",
//   },

//   RESUME: {
//     CREATE: "/api/resumes",
//     GET_ALL: "/api/resumes",
//     GET_BY_ID: (id) => `/api/resumes/${id}`,
//     UPDATE: (id) => `/api/resumes/${id}`,
//     DELETE: (id) => `/api/resumes/${id}`,
//     UPLOAD_IMAGES: (id) => `/api/resumes/${id}/upload-images`,
//   },
// };


 
// Base API URL
export const BASE_URL = "http://localhost:4000";

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



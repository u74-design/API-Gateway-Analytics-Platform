 import axios from "axios";


 const api = axios.create({
   baseURL: "http://localhost:5000/api",
   headers: {
     "Content-Type": "application/json",
   },
 });

 api.interceptors.request.use(
   (config) => {

     const token = localStorage.getItem("token");

     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }

     return config;

   },
   (error) => Promise.reject(error)
 );
 api.interceptors.response.use(
   (response) => response,

   (error) => {

     if (error.response?.status === 401) {

       localStorage.removeItem("token");

       localStorage.removeItem("user");

       window.location.href = "/";
     }

     return Promise.reject(error);
   }
 );


    export const GetDashboardStats = async () => {
     const response  = await api.get("/dashboard/stats");
     return  response.data;
 }

 export const GetRequestsOverTime = async () => {
     const response = await api.get("/dashboard/requests-over-time");
     return response.data;
 };

 export const GetStatusDistribution = async () => {
   const response = await api.get("/dashboard/status-distribution");   return  response.data;
 }

 export const GetTopApis = async () => {
        const response = await api.get("/dashboard/top-apis");
        return response.data;
 }

 export const GetRecentActivity = async () => {
    const response = await api.get("/dashboard/recent-activity");
    return response.data;
};

export const DeleteApi = async (id) => {
    const response = await api.delete(`/apis/${id}`);
    return response.data;
};

export const CreateApi = async (data) => {
    const response = await api.post("/apis/register", data);
    return response.data;
};

export const GetMyApis = async () => {
    const response = await api.get("/apis/my-apis");
    return response.data;
};

export const RegenerateApiKey = async (id) => {
    const response = await api.patch(`/apis/${id}/regenerate`);
    return response.data;
};

export const UpdateApi = async (id, data) => {
    const response = await api.put(`/apis/${id}`, data);
    return response.data;
};


export default api;




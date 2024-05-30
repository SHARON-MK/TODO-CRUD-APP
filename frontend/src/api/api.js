import {axiosInterceptor} from './interceptor'

export const addTodoAPI = async (newTodo) => {
    try {
        const response = await axiosInterceptor({url:'/api/todo/add', method: "POST", data:{newTodo} });
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};

export const fetchToDoAPI = async () => {
    try {
        const response = await axiosInterceptor({url:'/api/todo/fetch', method: "GET" });
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};


export const updateToDoAPI = async (updatedTodo) => {
    try {
        const response = await axiosInterceptor({url:'/api/todo/update', method: "PUT" , data:{updatedTodo}});
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};



export const completeToDoAPI = async (updatedTodo) => {
    try {
        const response = await axiosInterceptor({url:'/api/todo/complete', method: "POST" , data:{updatedTodo}});
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};


export const deleteToDoAPI = async (id) => {
    try {
        const response = await axiosInterceptor({url:'/api/todo/delete', method: "DELETE" , data:{id}});
        if (response.data.success) {
            return response;
        } else {

            throw new Error(response.data.message);
        }
    } catch (error) {
        throw error;
    }
};
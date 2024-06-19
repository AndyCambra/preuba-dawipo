import { ref } from 'vue';

export const user = ref(null);
export const isAuthenticated = ref(false); 

export const setUser = (userData) => {
  user.value = userData;
  isAuthenticated.value = true; 
};

export const logout = () => {
  user.value = null;
  isAuthenticated.value = false;
};

// export const SET_USER_DATA = "SET_USER_DATA";
//
// const mutations = {
//     [SET_USER_DATA]: (state, payload) => {
//         state = payload;
//         return state;
//     }
// };
//
// export default {
//     namespace: true,
//     state: null,
//     actions: {
//         async fetchUser(context) {
//
//             console.log("context", context)
//
//             const token = localStorage.getItem("Bearer");
//             if (!token) return;
//             try {
//                 const { data } = await this.axios.get('/api/user/get', {
//                     headers: {
//                         Authorization: 'Bearer ' + token
//                     }
//                 });
//                 commit(SET_USER_DATA, data);
//                 console.log("user", data);
//             } catch (e) {
//                 console.log("error", e);
//             }
//         },
//     },
//     mutations
// };

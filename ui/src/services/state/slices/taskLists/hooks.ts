// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../store/store';
// import { useEffect } from 'react';
// import { deleteById, getAll } from './thunks';

// export const useGetAllTaskListsQuery = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   useEffect(() => {
//     dispatch(getAll());
//   }, [dispatch]);

//   return useSelector((state: RootState) => state.taskLists);
// };

// export const useDeleteTaskListByIdMutation = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const deleteTaskListByIdAsync = async (id: string) => {
//     await dispatch(deleteById(id));
//   };

//   const { isLoading, error } = useSelector(
//     (state: RootState) => state.taskLists
//   );

//   return {
//     deleteTaskListByIdAsync,
//     isLoading,
//     error
//   };
// };

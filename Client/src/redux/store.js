import { configureStore } from '@reduxjs/toolkit'
import  serviceSliceReducer  from './features/service/serviceSlice'
import { serviceApi } from './api'

export const store = configureStore({
  reducer: {
    service:serviceSliceReducer ,
    [serviceApi.reducerPath]:serviceApi.reducer,
  },
  middleware : (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        serviceApi.middleware
    ),
})


// service is the name of the feature in store(key in the Redux store where the service state
// will be stored) and sericeSlice(serviceSlice.reducer) 
// contains all reducers which deal with the features updation on recieving the action
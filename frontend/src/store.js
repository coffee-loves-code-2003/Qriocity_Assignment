import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import algorithmReducer from './slices/algorithmSlice';
import singleAlgorithmReducer from './slices/singleAlgorithmSlice'
import initiativeReducer from './slices/initiativeSllice'
import singleinitiativeReducer from './slices/singleInitiativeSlice'
const reducer = combineReducers({
    authState: authReducer,
    algorithmState: algorithmReducer,
    singleAlgorithmState:singleAlgorithmReducer,
    initiativeState:initiativeReducer,
    singleinitiativeState:singleinitiativeReducer
});

const store = configureStore({
    reducer,
    
});

export default store;

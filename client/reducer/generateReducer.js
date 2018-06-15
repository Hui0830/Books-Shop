
function generateReducer(prefix,addState) {
	const  FETCH_START = `${prefix}_FETCH_START`;
	const  FETCH_SUCCESS = `${prefix}_FETCH_SUCCESS`;
	const  FETCH_ERROR = `${prefix}_FETCH_ERROR`;
	const initialState = {...addState}
	return function reducer (state = initialState, action) {
		switch (action.type) {

			case FETCH_START:
				return {...state,status: 'loading'};
			case FETCH_SUCCESS:
				 return {...state,status:'success',...action.result};
			case FETCH_ERROR:
				 return {...state,status:'error',...action.error};
			default:
			 	return state;
		}
	}
}
export default generateReducer;
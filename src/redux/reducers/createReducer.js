export const createReducer = (initialState, handlers) => {
	return function reducer(state = initialState, action) {
		const hasAction = Object.prototype.hasOwnProperty.call(
			handlers,
			action.type
		);
		if (hasAction) {
			return handlers[action.type](state, action);
		}

		return state;
	};
};

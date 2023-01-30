import { reducer as counterReducer } from './counter';
import { reducer as homeReducer } from './home';


function reducer(state = {}, action) {
  return {
    counterInfo: counterReducer(state.counterInfo, action),
    homeInfo: homeReducer(state.homeInfo, action)
  }
}

export default reducer;

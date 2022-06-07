import { createSlice } from '@reduxjs/toolkit';

const initialState = [
        {
          id: 1,
          listName: 'Meus Favoritos',
          favorites: [
            {
              slug:'gabriel-placa-de-video',
            },
            {
              slug:'thiago-mouse-gamer',
            },
          ],
        },
        {
          id: 2,
          listName: 'Periféricos',
          favorites: [
            {
              slug:'felipe-ryzen-3-3200G'
            },
          ],
        },
      ];

const favoriteSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addWishlist(state, action) {
      state.value += action.payload
    }
  },
});

export const { addWishlist } = favoriteSlice.actions;
export default favoriteSlice.reducer;

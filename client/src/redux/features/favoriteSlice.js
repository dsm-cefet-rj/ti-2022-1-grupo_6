import { createSlice } from '@reduxjs/toolkit';

const initialState = [
        {
          id: 1,
          listName: 'Periféricos',
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
          listName: 'Componentes',
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
      const findId = state.find((item) => item.listName === action.payload.listName)
      const newWishlist = {
        id: action.payload.id,
        listName: action.payload.listName,
        favorites: []
      }
      if(!findId){
        state.push(newWishlist)
    }
    },
    addFavorite(state, action) {
      let id = action.payload.id-1;
      let newSlug = action.payload.slug;
      state[id].favorites.push(newSlug);
    },
    removeFavorite(state, action) {
      let id = action.payload.id;
      const newIndex = state[id].favorites.findIndex((item) => item.slug === action.payload.slug);
      state[id].favorites.splice(newIndex, 1);
    }
  },
});

export const { addWishlist, addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;

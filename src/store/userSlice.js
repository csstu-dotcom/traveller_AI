import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { base_url } from "../config";


export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const response = await fetch(`${base_url}/api/auth/get-users`);
    const data = await response.json();
    return data;
}
);

export const loginUser = createAsyncThunk('user/login', async (user) => {
    const response = await fetch(`${base_url}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const data = await response.json();
    return data;
}
);

export const registerUser = createAsyncThunk('user/register', async (user) => {
    const response = await fetch(`${base_url}/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const data = await response.json();
    return data;
}
);

export const updateUser = createAsyncThunk('user/updateUser', async (user) => {
    const response = await fetch(`${base_url}/api/user/update-user/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const data = await response.json();
    return data;
}
);




export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        error: null,
        loading: false,
    },
    extraReducers:(builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });

    }
});

export default userSlice.reducer;


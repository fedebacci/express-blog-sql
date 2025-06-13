import { createContext, useContext, useState } from "react";



const PostsContext = createContext();




function PostsProvider ({ children }) {

    return (
        <PostsContext.Provider value={``}>
            {children}
        </PostsContext.Provider>
    );
};



function usePosts () {
    return useContext(PostsContext);
};



export { PostsProvider, usePosts };
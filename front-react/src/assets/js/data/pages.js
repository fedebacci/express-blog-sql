export default {
    HOME: () => '/',
    ABOUT: () => '/about',
    POSTS: () => '/posts',
    CREATEPOST: () => `/posts/create`,
    SHOWPOST: (id) => `/posts/${id}`,
    MODIFYPOST: (id) => `/posts/update/${id}`,
}
export default {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: "",
  defaultPath: "/",
  baseUrl: import.meta.env.VITE_BASE_URL,
  apiPrefix: import.meta.env.VITE_API_PREFIX,
  staticUrl: import.meta.env.VITE_STATIC_URL,

  defaultAppState: {
    headerOpened: true,
    navbarOpened: true,
    headerHeight: 76,
    navbarWidth: 350,
    layoutSpacing: 0,
  },
}

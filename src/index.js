import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import App from './App';
import { Signup } from './Components/Signup/Signup';
import { SigninMemo as Signin } from './Components/Signin/Signin';
import { Main } from './Components/Main/Main';
import { Products } from './Components/Products/Products';
import { Favourite } from './Components/Favourite/Favourite';
import { Sales } from './Components/Sales/Sales';
import { News } from './Components/News/News';
import { Comments } from './Components/Comments/Comments';
import { Orders } from './Components/Orders/Orders';
import { FAQ } from './Components/FAQ/FAQ';
import { Contacts } from './Components/Contacts/Contacts';
import { Feedback } from './Components/Feedback/Feedback';
import { store } from './redux/store';
import { Cart } from './Components/Cart/Cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'signin',
        element: <Signin />,
      },
      { index: true, element: <Main /> },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'favourite',
        element: <Favourite />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'sales',
        element: <Sales />,
      },
      {
        path: 'news',
        element: <News />,
      },
      {
        path: 'comments',
        element: <Comments />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'faq',
        element: <FAQ />,
      },
      {
        path: 'feedback',
        element: <Feedback />,
      },
      {
        path: 'contacts',
        element: <Contacts />,
      },
    ],
  },
]);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function clearClient() {
  queryClient.invalidateQueries({
    queryKey: ['allProducts'],
  });
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider
    client={queryClient}
    clearClient={clearClient}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </QueryClientProvider>,
);

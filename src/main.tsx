import { ActionIcon, Affix, Card, MantineProvider, Transition } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import React, { useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRoutes from './pages/routers';
import store from './redux/store';
import customTheme from './theme';
import { IconShoppingCart } from '@tabler/icons-react';

function App() {
  const [openCart, setOpenCart] = useState(false);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <CookiesProvider>
          <BrowserRouter>
            <MantineProvider theme={customTheme}>
              <ModalsProvider>
                <Notifications />
                <AppRoutes />
                <Affix onClick={() => setOpenCart((prev) => !prev)} position={{ bottom: 22, right: 24 }}>
                  <ActionIcon size={40} radius={8} variant="filled" color="primary.9">
                    <IconShoppingCart size="20px" />
                  </ActionIcon>
                </Affix>

                <Affix position={{ bottom: 0, right: 80 }}>
                  <Transition transition="slide-up" mounted={openCart}>
                    {(transitionStyles) => (
                      <Card
                        sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                        pos="relative"
                        w={340}
                        style={transitionStyles}
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                      >
                        Danh sách trống
                      </Card>
                    )}
                  </Transition>
                </Affix>
              </ModalsProvider>
            </MantineProvider>
          </BrowserRouter>
        </CookiesProvider>
      </Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);

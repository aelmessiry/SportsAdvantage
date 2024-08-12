import React from 'react';
import Header from './header/header';
import Footer from './footer/footer';

export interface LayoutProps {
  children: React.ReactNode;
  mainClassName?: string;
}

const Layout = (props: LayoutProps) => (
  <div className=" h-screen">
    <Header />
    <main
      className={`${
        props.mainClassName && props.mainClassName
      } pb-12 mb-auto sp-adv-main md:pb-20 limit-max-width`}
    >
      {props.children}
    </main>
    <Footer />
  </div>
);

export default Layout;

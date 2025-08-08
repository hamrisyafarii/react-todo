import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import Footer from "./Footer";
import Header from "./Header";

type PageContainerProps = {
  withHeader?: boolean;
  withFooter?: boolean;
};

export const PageContainer = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & PageContainerProps
>(
  (
    { className, children, withFooter = true, withHeader = true, ...props },
    ref
  ) => {
    return (
      <div className="h-full w-full">
        {withHeader && <Header />}
        <main ref={ref} className={cn("flex flex-col", className)} {...props}>
          {children}
        </main>
        {withFooter && <Footer />}
      </div>
    );
  }
);

PageContainer.displayName = "PageContainer";

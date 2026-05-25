import type {ReactNode} from "react";

type PageContainerProps = {
    children: ReactNode;
    className?: string;
};

export const PageContainer = ({children, className = ""}: PageContainerProps) => {
    return (
        <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
};
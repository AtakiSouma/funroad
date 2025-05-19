// "use client";

// import NProgress from "nprogress";
// import "nprogress/nprogress.css";
// import { useEffect } from "react";
// import { usePathname } from "next/navigation";

// NProgress.configure({ showSpinner: false });
// export default function ProgressBar() {
//   const pathname = usePathname();

//   useEffect(() => {
//     NProgress.start();

//     const timeout = setTimeout(() => {
//       NProgress.done();
//     }, 500);

//     return () => {
//       clearTimeout(timeout);
//       NProgress.done();
//     };
//   }, [pathname]);

//   return null;
// }
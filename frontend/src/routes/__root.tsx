import { createRootRoute, Outlet } from "@tanstack/react-router";


export const Route=createRootRoute({
    component: () => {
        return (
            <>
            <nav className='flex flex-row w-full h-[50px]  p-4 border shadow-md '>
            <div className='flex flex-row gap-4  justify-end'>
            <a href="/login" className="text-blue-500 hover:underline">Login</a>
            <a href="/signup" className="text-blue-500 hover:underline">Signup</a>
            </div>
          </nav>
        <Outlet />
        </>
            
        );
    }
})